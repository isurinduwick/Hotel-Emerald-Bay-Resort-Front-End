import type { MetadataRoute } from "next";

const defaultSiteUrl = "https://emeraldbayresorts.com";

function getSiteUrl() {
    const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!rawUrl) return defaultSiteUrl;
    return rawUrl.startsWith("http") ? rawUrl : defaultSiteUrl;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = getSiteUrl();
    const lastModified = new Date();

    const routes = ["", "/gallery", "/rooms-and-suites", "/tours"];

    return routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified,
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
    }));
}
