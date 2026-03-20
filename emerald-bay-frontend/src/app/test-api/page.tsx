"use client";

import { useState } from "react";
import { AUTH_API, apiFetch } from "@/lib/api";

export default function TestAPIPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string>("");

    const testProxyLogin = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            console.log("Testing login via proxy...");

            const response = await apiFetch(AUTH_API.LOGIN, {
                method: "POST",
                data: {
                    email: "test@test.com",
                    password: "test",
                },
            });

            console.log("Response data:", response);
            setResult({ data: response });
        } catch (err) {
            console.error("Test error:", err);
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "monospace" }}>
            <h1>API Test Page</h1>
            <button onClick={testProxyLogin} disabled={loading}>
                {loading ? "Testing..." : "Test Proxy Login"}
            </button>

            {error && (
                <pre style={{ color: "red", background: "#f0f0f0", padding: "10px", marginTop: "20px" }}>
                    Error: {error}
                </pre>
            )}

            {result && (
                <pre style={{ color: "green", background: "#f0f0f0", padding: "10px", marginTop: "20px" }}>
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}
