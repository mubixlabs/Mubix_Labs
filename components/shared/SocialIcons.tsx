import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter, FaEnvelope, FaGithub } from "react-icons/fa6";
import { socialLinks as defaultSocialLinks, type SocialLink } from "@/data/socials";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<SocialLink["platform"], IconComponent> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  github: FaGithub,
  gmail: FaEnvelope,
};

export default function SocialIcons({
  className,
  links = defaultSocialLinks,
}: {
  className?: string;
  links?: SocialLink[];
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      {links.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <Link
            key={link.platform}
            href={link.url}
            target={link.platform === "gmail" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all duration-200 hover:scale-110 hover:border-brand-500 hover:text-brand-600"
          >
            <Icon size={14} className="transition-transform duration-200 group-hover:scale-110" />
          </Link>
        );
      })}
    </div>
  );
}