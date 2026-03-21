import { NextRequest, NextResponse } from 'next/server';

// Helper function to add CORS headers to any response
function addCorsHeaders(response: NextResponse): NextResponse {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
}

export async function POST(request: NextRequest) {
    return handleProxyRequest(request);
}

export async function GET(request: NextRequest) {
    return handleProxyRequest(request);
}

export async function PUT(request: NextRequest) {
    return handleProxyRequest(request);
}

export async function DELETE(request: NextRequest) {
    return handleProxyRequest(request);
}

export async function OPTIONS(request: NextRequest) {
    return handleProxyRequest(request);
}

async function handleProxyRequest(request: NextRequest) {
    let targetUrl: string | null = null;

    try {
        // Get the target URL from the query parameter
        targetUrl = request.nextUrl.searchParams.get('url');

        console.log(`[PROXY] ${request.method} request:`, { url: targetUrl });

        if (!targetUrl) {
            return addCorsHeaders(NextResponse.json(
                { error: 'Missing target URL' },
                { status: 400 }
            ));
        }

        // Get the request body if it exists
        let body: BodyInit | null = null;
        const contentType = request.headers.get('content-type');

        if (request.method !== 'GET' && request.method !== 'HEAD') {
            if (contentType?.includes('application/json')) {
                const rawBody = await request.text();

                // Some requests (e.g. DELETE) send Content-Type without a body.
                if (rawBody.trim() !== '') {
                    body = rawBody;
                }
            } else if (contentType?.includes('multipart/form-data')) {
                body = await request.formData();
            } else if (contentType) {
                const rawBody = await request.text();

                if (rawBody.trim() !== '') {
                    body = rawBody;
                }
            }
        }

        // Forward the request to the backend
        // Only forward essential headers, not all request headers
        const forwardHeaders: Record<string, string> = {};

        // Let fetch set multipart boundaries automatically when forwarding FormData.
        if (contentType && body !== null && !contentType.includes('multipart/form-data')) {
            forwardHeaders['Content-Type'] = contentType;
        }

        // Forward authorization header if present
        const auth = request.headers.get('authorization');
        if (auth) {
            forwardHeaders['Authorization'] = auth;
        }

        // Forward origin from incoming request (or set to current origin)
        const incomingOrigin = request.headers.get('origin') || request.headers.get('referer')?.split('/').slice(0, 3).join('/');
        if (incomingOrigin) {
            forwardHeaders['Origin'] = incomingOrigin;
        }

        console.log(`[PROXY] Forwarding to backend:`, {
            targetUrl,
            method: request.method,
            headers: forwardHeaders,
            bodySize: body ? (typeof body === 'string' ? body.length : 'FormData') : null,
        });

        const response = await fetch(targetUrl, {
            method: request.method,
            headers: forwardHeaders,
            body,
            redirect: 'follow',
        });

        // Read response as text first
        const responseText = await response.text();
        const responseContentType = response.headers.get('content-type');

        console.log(`[PROXY] Backend response:`, {
            status: response.status,
            statusText: response.statusText,
            contentType: responseContentType,
            bodySize: responseText.length,
            bodyPreview: responseText.substring(0, 500),
        });

        // Debug log for non-JSON responses
        if (!responseContentType?.includes('application/json')) {
            console.warn(`[PROXY] ⚠️ Backend returned non-JSON response:`, {
                contentType: responseContentType,
                bodyPreview: responseText.substring(0, 200),
            });
        }

        // Check if response is HTML (error page) - always treat as error
        if (responseContentType?.includes('text/html')) {
            return addCorsHeaders(NextResponse.json(
                {
                    error: `Backend returned HTML error: ${response.status} ${response.statusText}`,
                    status: response.status,
                },
                { status: response.status || 500 }
            ));
        }

        // If status is not OK, return error JSON
        if (!response.ok) {
            try {
                const errorData = JSON.parse(responseText);
                return addCorsHeaders(NextResponse.json(errorData, { status: response.status }));
            } catch {
                return addCorsHeaders(NextResponse.json(
                    {
                        error: `Backend error: ${response.status} ${response.statusText}`,
                        status: response.status,
                    },
                    { status: response.status || 500 }
                ));
            }
        }

        // Parse successful JSON response
        if (!responseContentType?.includes('application/json')) {
            // Backend returned successful status but not JSON - treat as error
            return addCorsHeaders(NextResponse.json(
                {
                    error: `Backend returned non-JSON response: ${responseContentType || 'no content-type'}`,
                    status: response.status,
                },
                { status: 500 }
            ));
        }

        try {
            // Validate it's valid JSON
            JSON.parse(responseText);
        } catch {
            return addCorsHeaders(NextResponse.json(
                { error: 'Backend returned invalid JSON' },
                { status: 500 }
            ));
        }

        // Create the response with the JSON body
        const result = new NextResponse(responseText, {
            status: response.status,
            statusText: response.statusText,
        });

        // Set content-type to application/json
        result.headers.set('Content-Type', 'application/json');

        return addCorsHeaders(result);
    } catch (error) {
        console.error('Proxy error:', error);

        // More detailed error logging for debugging
        let errorDetails = '';
        if (error instanceof TypeError) {
            errorDetails = `Network error: ${error.message}`;
        } else if (error instanceof Error) {
            errorDetails = error.message;
        } else {
            errorDetails = String(error);
        }

        console.error('Proxy detailed error:', {
            targetUrl,
            method: request.method,
            errorMessage: errorDetails,
            errorType: error?.constructor?.name,
            errorStack: error instanceof Error ? error.stack : 'N/A',
        });

        const errorResponse = NextResponse.json(
            {
                error: 'Proxy request failed',
                details: errorDetails,
                targetUrl: targetUrl,
            },
            { status: 500 }
        );

        return addCorsHeaders(errorResponse);
    }
}
