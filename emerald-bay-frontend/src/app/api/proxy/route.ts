import { NextRequest, NextResponse } from 'next/server';

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
    try {
        // Get the target URL from the query parameter
        const targetUrl = request.nextUrl.searchParams.get('url');

        if (!targetUrl) {
            return NextResponse.json(
                { error: 'Missing target URL' },
                { status: 400 }
            );
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

        if (contentType && body !== null) {
            forwardHeaders['Content-Type'] = contentType;
        }

        // Forward authorization header if present
        const auth = request.headers.get('authorization');
        if (auth) {
            forwardHeaders['Authorization'] = auth;
        }

        const response = await fetch(targetUrl, {
            method: request.method,
            headers: forwardHeaders,
            body,
            redirect: 'follow',
        });

        // Read response as text first
        const responseText = await response.text();
        const responseContentType = response.headers.get('content-type');

        // Check if response is HTML (error page) - always treat as error
        if (responseContentType?.includes('text/html')) {
            return NextResponse.json(
                {
                    error: `Backend returned HTML error: ${response.status} ${response.statusText}`,
                    status: response.status,
                },
                { status: response.status || 500 }
            );
        }

        // If status is not OK, return error JSON
        if (!response.ok) {
            try {
                const errorData = JSON.parse(responseText);
                return NextResponse.json(errorData, { status: response.status });
            } catch {
                return NextResponse.json(
                    {
                        error: `Backend error: ${response.status} ${response.statusText}`,
                        status: response.status,
                    },
                    { status: response.status || 500 }
                );
            }
        }

        // Parse successful JSON response
        let responseBody = responseText;
        if (responseContentType?.includes('application/json')) {
            try {
                // Validate it's valid JSON
                JSON.parse(responseText);
                responseBody = responseText;
            } catch {
                return NextResponse.json(
                    { error: 'Backend returned invalid JSON' },
                    { status: 500 }
                );
            }
        }

        // Create the response
        const result = new NextResponse(responseBody, {
            status: response.status,
            statusText: response.statusText,
        });

        // Copy relevant headers
        ['content-type', 'content-length', 'cache-control'].forEach((header) => {
            const value = response.headers.get(header);
            if (value) {
                result.headers.set(header, value);
            }
        });

        // Always ensure content-type is application/json
        result.headers.set('Content-Type', 'application/json');

        return result;
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            {
                error: 'Proxy request failed',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
