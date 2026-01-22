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
} from "@tabler/icons-react";
import {
  ApertureIcon,
  BarChart3Icon,
  CalendarIcon,
  ClockIcon,
  CodeIcon,
  CookieIcon,
  ExternalLinkIcon,
  EyeIcon,
  FileCheckCornerIcon,
  FileCheckIcon,
  ImageOffIcon,
  LayoutTemplateIcon,
  LoaderIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RotateCcwIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserRoundPenIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { CrawlResult } from "../crawl-actions";
import { useCrawlContext } from "../crawl-context";

export function ListCrawls() {
  return <div className="rounded-md bg-sidebar p-8">{<CrawlsCards />}</div>;
}

// -----------------------------------------------------------
function CrawlsCards() {
  const { crawls, crawlsAreLoading } = useCrawlContext();
  const [searchQuery, setSearchQuery] = useState("");

  const noCrawls = crawls && crawls.length === 0;
  if (noCrawls && !crawlsAreLoading) return <NoCrawlFound />;

  const filteredCrawls = crawls?.filter((crawl) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      crawl.title?.toLowerCase().includes(query) ||
      crawl.url?.toLowerCase().includes(query) ||
      crawl.author?.toLowerCase().includes(query)
    );
  });

  const NoResults =
    filteredCrawls && filteredCrawls.length === 0 ? (
      <p className="text-center text-muted-foreground">
        Aucun crawl ne correspond à votre recherche
      </p>
    ) : (
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
        {filteredCrawls?.map(CrawlCard)}
      </ul>
    );

  return (
    <div className="space-y-6">
      {/* 🔍 Search bar */}
      <div className="relative max-w-[500px]">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          className="h-10 w-full rounded-md border border-input bg-sidebar-strong pr-10 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par titre, URL ou prestataire..."
          type="text"
          value={searchQuery}
        />
        {searchQuery && (
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
            type="button"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>

      {/* 📝 Results */}
      {crawlsAreLoading ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
        </ul>
      ) : (
        NoResults
      )}
    </div>
  );
}

function CrawlCard(crawl: CrawlResult) {
  return (
    <li
      className="flex max-w-115 flex-col gap-y-6 self-start rounded-md border border-border bg-sidebar-strong p-4"
      key={crawl.id}
    >
      <div>
        <h3 className="max-w-full truncate font-kanit text-xl">
          {crawl.title}
        </h3>
        {/* 🌐 Website */}
        <a
          className="flex items-center gap-x-2 text-muted-foreground hover:underline"
          href={crawl.url}
          target="_blank"
        >
          <span className="truncate">{crawl.url}</span>
          <ExternalLinkIcon className="shrink-0" size={16} />
        </a>
        {/* 🔗 Social Links */}
        <div className="mt-2 flex min-h-4.5 flex-wrap items-center gap-2">
          {crawl?.socialLinks &&
            Object.entries(crawl.socialLinks).map(([platform, url]) => (
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
            ))}
        </div>
        {/* Details */}
        <div className="mt-4 grid grid-cols-2 space-y-1">
          {/* 🗓️ Started */}
          <div className="flex items-center gap-x-1 text-sm">
            <CalendarIcon size={14} />
            <span>{formatDate(crawl.createdAt)}</span>
          </div>
          {/* 🔢 Crawled */}
          <div className="flex items-center gap-x-1 text-sm">
            <FileCheckCornerIcon size={14} />
            <span>{crawl.pagesCrawled} pages analysées</span>
          </div>
          {/* ⏳ Duration */}
          <div className="flex items-center gap-x-1 text-sm">
            <ClockIcon size={14} />
            <span>
              {formatDurationInMinutesAndSeconds(
                crawl.startedAt,
                crawl.completedAt
              )}
            </span>
          </div>
          {/*🙋 Author */}
          {
            <div className="flex items-center gap-x-1 text-sm">
              <UserRoundPenIcon className="shrink-0" size={14} />
              <div className="max-w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                {crawl.author || crawl.authorUrl ? (
                  // biome-ignore lint/style/noNestedTernary: exception
                  crawl.authorUrl ? (
                    <a
                      className=""
                      href={crawl.authorUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      title={crawl.author ?? ""}
                    >
                      {crawl.author}
                    </a>
                  ) : (
                    crawl.author
                  )
                ) : (
                  "—"
                )}
              </div>
            </div>
          }
          {/* 📸 Skip screenshots ? */}
          <div className="flex items-center gap-x-1 text-sm">
            {crawl.skipScreenshots ? (
              <XIcon className="text-red-500 dark:text-red-500" size={16} />
            ) : (
              <ApertureIcon size={15} />
            )}
            <span>
              {crawl.skipScreenshots
                ? "Pas de captures écran"
                : `Captures écran (${crawl.useLocalScreenshots ? "local" : "distant"})`}
            </span>
          </div>
          {/* 🖼️ Skip resources ? */}
          <div className="flex items-center gap-x-1 text-sm">
            {crawl.skipResources ? (
              <XIcon className="text-red-500 dark:text-red-500" size={16} />
            ) : (
              <FileCheckIcon size={16} />
            )}
            <span>
              {crawl.skipResources
                ? "Ressources ignorées"
                : "Ressources chargées"}
            </span>
          </div>
        </div>
      </div>
      {/* 🖼️ Cover */}
      <div className="group relative mx-auto w-fit">
        {crawl.screenshotUrl ? (
          <Image
            alt="Screenshot"
            className="rounded-md shadow-md"
            height={225}
            src={crawl.screenshotUrl}
            width={400}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      {/* 🆕 Buttons */}
      <div className="flex w-full gap-x-2">
        <SeeCrawlButton crawlId={crawl.id} />
        <RetryCrawlButton crawlId={crawl.id} />
        <DeleteCrawlButton crawlId={crawl.id} />
      </div>
      {/* 📞 Contact Info */}
      <ContactInfoSection crawl={crawl} />
      {/* 🤖 Technologies */}
      <TechnologiesSection crawl={crawl} />
    </li>
  );
}

function CrawlCardSkeleton() {
  return <Skeleton className="h-84.5 w-119 rounded-md" />;
}

function NoCrawlFound() {
  return (
    <p className="text-center text-muted-foreground">Aucun crawl trouvé</p>
  );
}

function ImagePlaceholder() {
  return (
    <div className="flex h-56.25 w-100 items-center justify-center rounded-md bg-muted shadow-md">
      <ImageOffIcon
        className="size-12 text-muted-foreground"
        strokeWidth={1.5}
      />
    </div>
  );
}

// ------------------------------------------------------------
//👁️ See crawl
function SeeCrawlButton({ crawlId }: { crawlId: string }) {
  return (
    <Link
      className={cn(
        "rounded-md bg-primary",
        "py-3",
        "h-11",
        "text-center font-semibold text-primary-foreground text-sm transition-colors hover:bg-primary/90",
        "flex items-center justify-center gap-x-2",
        "basis-1/3"
      )}
      href={`/admin/crawl/${crawlId}`}
    >
      <EyeIcon size={17} strokeWidth={2} />
      <span>Détail</span>
    </Link>
  );
}

// ------------------------------------------------------------
// 🔄 Retry crawl
function RetryCrawlButton({ crawlId }: { crawlId: string }) {
  const {
    retryCrawlIsPending,
    retryCrawlMutate,
    retryingCrawlId,
    upsertCrawlIsPending,
    crawl,
  } = useCrawlContext();

  const isPending = retryCrawlIsPending && retryingCrawlId === crawlId;
  const otherCrawlRetryIsPending =
    retryCrawlIsPending && retryingCrawlId !== crawlId;

  const isCrawlRunning =
    crawl?.status === "running" || crawl?.status === "pending";
  const isCrawlOngoing =
    upsertCrawlIsPending || isCrawlRunning || otherCrawlRetryIsPending;

  const button = (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-center gap-x-2",
        "rounded-md",
        "h-11",
        "bg-slate-600 dark:bg-slate-600/60",
        "hover:bg-slate-500",
        "text-primary-foreground dark:text-white",
        "transition-colors",
        "py-3",
        "text-center font-semibold text-sm",
        "basis-1/3",
        isCrawlOngoing && "cursor-not-allowed opacity-50"
      )}
      disabled={isPending || isCrawlOngoing}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        retryCrawlMutate(crawlId);
      }}
      type="button"
    >
      {isPending ? (
        <LoaderIcon className="animate-spin" size={16} strokeWidth={2} />
      ) : (
        <RotateCcwIcon size={16} strokeWidth={2} />
      )}
      <span>Relancer</span>
    </button>
  );

  if (isCrawlOngoing && !isPending) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          Un crawl est déjà en cours. Veuillez patienter avant de relancer.
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

// ------------------------------------------------------------
// 🚮 Delete crawl
function DeleteCrawlButton({ crawlId }: { crawlId: string }) {
  const { crawlDeletionIsPending, deleteCrawlMutate, deletingCrawlId } =
    useCrawlContext();
  const [open, setOpen] = useState(false);

  const isPending = crawlDeletionIsPending && deletingCrawlId === crawlId;
  const otherCrawlDeletionIsPending =
    crawlDeletionIsPending && deletingCrawlId !== crawlId;

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            "flex cursor-pointer items-center justify-center gap-x-2",
            "rounded-md",
            "h-11",
            "bg-destructive dark:bg-destructive/60",
            "hover:bg-red-500",
            "text-primary-foreground dark:text-white",
            "transition-colors",
            "py-3",
            "text-center font-semibold text-sm",
            "basis-1/3",
            (otherCrawlDeletionIsPending || open) && "opacity-50"
          )}
          disabled={isPending || open}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
          type="button"
        >
          {isPending ? (
            <LoaderIcon className="animate-spin" size={16} strokeWidth={2} />
          ) : (
            <Trash2Icon size={16} strokeWidth={2} />
          )}
          <span>Supprimer</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer ce crawl ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le crawl et toutes ses données seront
            supprimés définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              deleteCrawlMutate(crawlId);
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ------------------------------------------------------------
function formatDate(date: string | null) {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} à ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
}

// ------------------------------------------------------------
function formatDurationInMinutesAndSeconds(
  startedAtString: string | null,
  completedAtString: string | null
) {
  if (!(startedAtString && completedAtString)) return "N/A";

  const startedAt = new Date(startedAtString);
  const completedAt = new Date(completedAtString);

  const duration = completedAt.getTime() - startedAt.getTime();
  const minutes = Math.floor(duration / (60 * 1000));
  const seconds = Math.floor((duration % (60 * 1000)) / 1000);

  let minutesPart = `${minutes}m`;
  if (minutes === 0) minutesPart = "";

  let secondsPart = `${seconds}s`;
  if (seconds === 0 && minutes >= 1) secondsPart = "";

  if (minutesPart && secondsPart) return minutesPart + secondsPart;
  if (minutesPart && !secondsPart) return minutesPart;
  if (!minutesPart && secondsPart) return secondsPart;
}

// ------------------------------------------------------------
// 🔗 Social Icons
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

// ------------------------------------------------------------
// 📞 Contact Info Section
function ContactInfoSection({ crawl }: { crawl: CrawlResult }) {
  const hasPhones = crawl.contactPhones && crawl.contactPhones.length > 0;
  const hasEmails = crawl.contactEmails && crawl.contactEmails.length > 0;
  const hasAddresses =
    crawl.contactAddresses && crawl.contactAddresses.length > 0;

  if (!(hasPhones || hasEmails || hasAddresses)) return null;

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Coordonnées
      </h4>
      <div className="space-y-1">
        {/* 📞 Phones */}
        {hasPhones && (
          <div className="flex items-start gap-x-2 text-sm">
            <PhoneIcon className="mt-0.5 shrink-0" size={14} />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {crawl.contactPhones?.map((phone) => (
                <Tooltip key={phone.number}>
                  <TooltipTrigger asChild>
                    <a
                      className="hover:underline"
                      href={`tel:${phone.number.replace(/[\s.-]/g, "")}`}
                    >
                      {phone.number}
                      {phone.type === "mobile" && (
                        <span className="ml-1 text-muted-foreground text-xs">
                          (mobile)
                        </span>
                      )}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    {getPhoneTypeLabel(phone.type)}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
        {/* 📧 Emails */}
        {hasEmails && (
          <div className="flex items-start gap-x-2 text-sm">
            <MailIcon className="mt-0.5 shrink-0" size={14} />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {crawl.contactEmails?.map((email) => (
                <Tooltip key={email.email}>
                  <TooltipTrigger asChild>
                    <a
                      className="hover:underline"
                      href={`mailto:${email.email}`}
                    >
                      {email.email}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    {email.isGeneric ? "Email générique" : "Email"}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
        {/* 📍 Addresses */}
        {hasAddresses && (
          <div className="flex items-start gap-x-2 text-sm">
            <MapPinIcon className="mt-0.5 shrink-0" size={14} />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {crawl.contactAddresses?.map((address) => (
                <span key={address.postalCode}>
                  {address.postalCode} {address.city}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getPhoneTypeLabel(
  type: "mobile" | "landline" | "fax" | "unknown" | undefined
): string {
  if (type === "mobile") return "Mobile";
  if (type === "landline") return "Fixe";
  if (type === "fax") return "Fax";
  return "Téléphone";
}

// ------------------------------------------------------------
// 🤖 Technologies Section
function TechnologiesSection({ crawl }: { crawl: CrawlResult }) {
  const hasTech =
    crawl.primaryCms ||
    crawl.primaryFramework ||
    crawl.hostingProvider ||
    crawl.consentManager ||
    crawl.accessibilityTool ||
    crawl.usesDsfr ||
    (crawl.analyticsTools && crawl.analyticsTools.length > 0);

  if (!hasTech) return null;

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Technologies ({crawl.detectedTechCount ?? 0})
      </h4>
      <div className="space-y-1">
        {/* 🖥️ CMS */}
        {crawl.primaryCms && (
          <TechItem
            icon={LayoutTemplateIcon}
            label="CMS"
            value={crawl.primaryCms}
          />
        )}
        {/* 🧩 Framework */}
        {crawl.primaryFramework && (
          <TechItem
            icon={CodeIcon}
            label="Framework"
            value={crawl.primaryFramework}
          />
        )}
        {/* 🏢 Hébergeur */}
        {crawl.hostingProvider && (
          <TechItem
            icon={ServerIcon}
            label="Hébergeur"
            value={crawl.hostingProvider}
          />
        )}
        {/* 🍪 Gestionnaire de consentement */}
        {crawl.consentManager && (
          <TechItem
            icon={CookieIcon}
            label="Consentement"
            value={crawl.consentManager}
          />
        )}
        {/* ♿ Outil d'accessibilité */}
        {crawl.accessibilityTool && (
          <TechItem
            icon={ShieldCheckIcon}
            label="Accessibilité"
            value={crawl.accessibilityTool}
          />
        )}
        {/* 📊 Analytics */}
        {crawl.analyticsTools && crawl.analyticsTools.length > 0 && (
          <TechItem
            icon={BarChart3Icon}
            label="Analytics"
            value={crawl.analyticsTools.join(", ")}
          />
        )}
        {/* 🇫🇷 DSFR */}
        {crawl.usesDsfr && (
          <TechItem icon={ShieldCheckIcon} label="DSFR" value="Oui" />
        )}
      </div>
    </div>
  );
}

function TechItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-x-2 text-sm">
      <Icon className="shrink-0 text-muted-foreground" size={14} />
      <span className="text-muted-foreground">{label}:</span>
      <span className="truncate">{value}</span>
    </div>
  );
}
