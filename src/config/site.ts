export const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000";

export const siteConfig = (locale: string = "en") => ({
    name: "Free Lance",
    url: siteUrl + "/" + locale,
    ogImage: `${siteUrl}/${locale}/opengraph-image`,
    description: "Freelance projects and jobs platform",
    links: {
        twitter: "https://twitter.com/",
        github: "https://github.com/moinulmoin/chadnext",
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
        linkedin: "https://www.linkedin.com/",
    },
});

export type SiteConfig = typeof siteConfig;