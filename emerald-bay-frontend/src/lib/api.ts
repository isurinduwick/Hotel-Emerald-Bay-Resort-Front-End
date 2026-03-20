/**
 * API Configuration and Constants
 * This file centralizes all API endpoints for the frontend
 */

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
const API_PREFIX = `${API_BASE_URL}/api/${API_VERSION}`;

// ─────────────────────────────────────────────────────────────
// Sections API
// ─────────────────────────────────────────────────────────────
export const SECTIONS_API = {
    LIST: `${API_PREFIX}/sections`,
    DETAIL: (id: string | number) => `${API_PREFIX}/sections/${id}`,
    CREATE: `${API_PREFIX}/sections`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/sections/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/sections/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Rooms API
// ─────────────────────────────────────────────────────────────
export const ROOMS_API = {
    LIST: `${API_PREFIX}/rooms`,
    DETAIL: (id: string | number) => `${API_PREFIX}/rooms/${id}`,
    IMAGES: (id: string | number) => `${API_PREFIX}/rooms/${id}/images`,
    CREATE: `${API_PREFIX}/rooms`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/rooms/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/rooms/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Packages API
// ─────────────────────────────────────────────────────────────
export const PACKAGES_API = {
    LIST: `${API_PREFIX}/packages`,
    DETAIL: (id: string | number) => `${API_PREFIX}/packages/${id}`,
    CREATE: `${API_PREFIX}/packages`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/packages/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/packages/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Offers API
// ─────────────────────────────────────────────────────────────
export const OFFERS_API = {
    LIST: `${API_PREFIX}/offers`,
    DETAIL: (id: string | number) => `${API_PREFIX}/offers/${id}`,
    POPUPS: `${API_PREFIX}/offers/popups`,
    CREATE: `${API_PREFIX}/offers`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/offers/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/offers/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Gallery Images API
// ─────────────────────────────────────────────────────────────
export const GALLERY_IMAGES_API = {
    LIST: `${API_PREFIX}/gallery-images`,
    DETAIL: (id: string | number) => `${API_PREFIX}/gallery-images/${id}`,
    CREATE: `${API_PREFIX}/gallery-images`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/gallery-images/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/gallery-images/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Services API
// ─────────────────────────────────────────────────────────────
export const SERVICES_API = {
    LIST: `${API_PREFIX}/services`,
    DETAIL: (id: string | number) => `${API_PREFIX}/services/${id}`,
    CREATE: `${API_PREFIX}/services`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/services/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/services/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Tours API
// ─────────────────────────────────────────────────────────────
export const TOURS_API = {
    LIST: `${API_PREFIX}/tours`,
    DETAIL: (id: string | number) => `${API_PREFIX}/tours/${id}`,
    CREATE: `${API_PREFIX}/tours`, // Protected
    UPDATE: (id: string | number) => `${API_PREFIX}/tours/${id}`, // Protected
    DELETE: (id: string | number) => `${API_PREFIX}/tours/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Authentication API
// ─────────────────────────────────────────────────────────────
export const AUTH_API = {
    LOGIN: `${API_PREFIX}/auth/login`,
    USER: `${API_PREFIX}/auth/user`, // Protected
    LOGOUT: `${API_PREFIX}/auth/logout`, // Protected
    LOGOUT_ALL: `${API_PREFIX}/auth/logout-all`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Dashboard API
// ─────────────────────────────────────────────────────────────
export const DASHBOARD_API = {
    STATS: `${API_PREFIX}/dashboard/stats`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Image Management API
// ─────────────────────────────────────────────────────────────
export const IMAGES_API = {
    SECTION_IMAGE_UPDATE: (id: string | number) => `${API_PREFIX}/section-images/${id}`, // Protected
    SECTION_IMAGE_DELETE: (id: string | number) => `${API_PREFIX}/section-images/${id}`, // Protected
    ROOM_IMAGE_UPDATE: (id: string | number) => `${API_PREFIX}/room-images/${id}`, // Protected
    ROOM_IMAGE_DELETE: (id: string | number) => `${API_PREFIX}/room-images/${id}`, // Protected
    PACKAGE_IMAGE_UPDATE: (id: string | number) => `${API_PREFIX}/package-images/${id}`, // Protected
    PACKAGE_IMAGE_DELETE: (id: string | number) => `${API_PREFIX}/package-images/${id}`, // Protected
};

// ─────────────────────────────────────────────────────────────
// Fetch Helper with Token Support
// ─────────────────────────────────────────────────────────────
export async function apiFetch(
    url: string,
    options: RequestInit & { token?: string; data?: Record<string, unknown>; formData?: FormData } = {}
) {
    const { token, data, formData, ...fetchOptions } = options;

    const headers: Record<string, string> = {};

    // Only set Content-Type for JSON, not for FormData (browser will set it)
    if (!formData) {
        headers['Content-Type'] = 'application/json';
    }

    // Safely merge existing headers
    if (fetchOptions.headers) {
        Object.assign(headers, fetchOptions.headers as Record<string, string>);
    }

    // Add authorization header if token is provided
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Determine body based on what's provided
    let body: string | FormData | undefined;
    if (formData) {
        body = formData;
    } else if (data) {
        body = JSON.stringify(data);
    } else {
        // Filter out null and convert to proper type
        body = (fetchOptions.body as string | FormData | null | undefined) ?? undefined;
    }

    try {
        // Use proxy for backend API requests to avoid CORS issues
        let fetchUrl = url;
        if (url.startsWith(API_BASE_URL)) {
            // Encode the URL to pass through the proxy
            const proxyUrl = new URL('/api/proxy', typeof window !== 'undefined' ? window.location.origin : '');
            proxyUrl.searchParams.set('url', url);
            fetchUrl = proxyUrl.toString();
        }

        const response = await fetch(fetchUrl, {
            ...fetchOptions,
            headers,
            body,
        });

        // Always try to parse as JSON since proxy guarantees JSON responses
        let responseData: any;
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            try {
                responseData = await response.json();
            } catch (parseError) {
                console.error('[apiFetch] Failed to parse JSON:', {
                    url: fetchUrl,
                    contentType,
                    status: response.status,
                    parseError,
                });
                throw new Error(`Failed to parse response as JSON: ${parseError}`);
            }
        } else {
            console.error('[apiFetch] Invalid content-type from proxy:', {
                url: fetchUrl,
                contentType,
                status: response.status,
            });
            throw new Error(`Expected JSON response from proxy, got: ${contentType || 'no content-type'}`);
        }

        // Check if response indicates an error (proxy returns errors as JSON with error field)
        if (!response.ok) {
            const errorMessage = responseData?.error || `API Error: ${response.status} ${response.statusText}`;
            const details = responseData?.details || '';
            const fullError = details ? `${errorMessage}: ${details}` : errorMessage;
            console.error('[apiFetch] API error response:', {
                status: response.status,
                error: errorMessage,
                details: details,
                targetUrl: responseData?.targetUrl,
            });
            throw new Error(fullError);
        }

        return responseData;
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
}

// ─────────────────────────────────────────────────────────────
// Export API base URL for reference
// ─────────────────────────────────────────────────────────────
export { API_BASE_URL, API_VERSION, API_PREFIX };
