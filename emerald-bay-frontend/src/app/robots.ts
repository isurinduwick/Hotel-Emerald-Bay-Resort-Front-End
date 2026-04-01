import type { MetadataRoute } from "next";

const defaultSiteUrl = "https://emeraldbayresorts.com";

function getSiteUrl() {
    const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!rawUrl) return defaultSiteUrl;
    return rawUrl.startsWith("http") ? rawUrl : defaultSiteUrl;
}

export default function robots(): MetadataRoute.Robots {
    const siteUrl = getSiteUrl();

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/test-api", "/api"],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    };
}
