import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook to ensure user is authenticated in admin panel
 * Returns the auth token if available, or redirects to login
 */
export function useAdminAuth() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const authToken = localStorage.getItem("authToken");

            if (!authToken) {
                router.push("/admin/login");
                return;
            }

            setToken(authToken);
        }

        setIsLoading(false);
    }, [router]);

    return { token, isLoading };
}

/**
 * Hook to handle logout
 */
export function useAdminLogout() {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("authToken");
        router.push("/admin/login");
    };

    return logout;
}
