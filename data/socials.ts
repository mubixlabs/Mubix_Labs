export interface SocialLink {
  platform: "instagram" | "facebook" | "linkedin" | "x" | "gmail" | "github";
  url: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { platform: "instagram", url: "https://www.instagram.com/mubixlabs/?hl=en", label: "Instagram" },
  { platform: "facebook", url: "https://www.facebook.com/people/Mubix-Labs/61591561916346/", label: "Facebook" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/mubix-labs-80656141a/", label: "LinkedIn" },
  { platform: "x", url: "https://x.com/MubixLabs", label: "X (Twitter)" },
  { platform: "github", url: "https://github.com/Mubix-Labs", label: "Company GitHub" },
  { platform: "gmail", url: "mailto:contact@mubixlabs.studio?subject=Inquiry", label: "Email" },
];