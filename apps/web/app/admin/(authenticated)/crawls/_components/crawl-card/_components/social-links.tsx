"use client";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMastodon,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconRss,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCrawlCardContext } from "../crawl-card-context";

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  github: "GitHub",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  mastodon: "Mastodon",
  tiktok: "TikTok",
  twitter: "X (Twitter)",
  youtube: "YouTube",
};

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  facebook: IconBrandFacebook,
  github: IconBrandGithub,
  instagram: IconBrandInstagram,
  linkedin: IconBrandLinkedin,
  mastodon: IconBrandMastodon,
  tiktok: IconBrandTiktok,
  twitter: IconBrandX,
  youtube: IconBrandYoutube,
};

function SocialIcon({ platform }: { platform: string }) {
  const Icon = socialIcons[platform];
  if (!Icon) return null;
  return <Icon size={18} />;
}

export function SocialLinks() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;
  const socialLinks = crawl?.socialLinks;
  const hasRssFeed = crawl?.hasRssFeed;

  return (
    <div className="mt-2 flex h-4.5 flex-wrap items-center gap-2">
      {/* 👯 Social networks */}
      {socialLinks
        ? Object.entries(socialLinks).map(([platform, url]) => (
            <Tooltip key={platform}>
              <TooltipTrigger asChild>
                <a
                  className="text-foreground"
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialIcon platform={platform} />
                </a>
              </TooltipTrigger>
              <TooltipContent>{platformLabels[platform]}</TooltipContent>
            </Tooltip>
          ))
        : null}
      {/* 🔊 Flux RSS */}
      {hasRssFeed ? (
        <Tooltip key="rss">
          <TooltipTrigger asChild>
            <IconRss size={18} />
          </TooltipTrigger>
          <TooltipContent>Flux RSS</TooltipContent>
        </Tooltip>
      ) : null}
      {/* 🫙 Nothing */}
      {socialLinks || hasRssFeed ? null : (
        <span className="text-foreground">—</span>
      )}
    </div>
  );
}
