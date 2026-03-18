import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching data from API
 * @param url - The API endpoint URL
 * @param token - Optional authentication token for protected routes
 */
export function useApiFetch<T>(url: string, token?: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token]);

    return { data, loading, error };
}

/**
 * Custom hook for posting/mutating data
 */
export function useApiMutation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (
        url: string,
        options: {
            method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
            data?: Record<string, unknown>;
            token?: string;
        } = {}
    ) => {
        try {
            setLoading(true);
            setError(null);

            const { method = 'POST', data, token } = options;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: data ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error occurred');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}
