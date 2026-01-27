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
import { useForm } from "@tanstack/react-form";
import {
  ApertureIcon,
  BarChart3Icon,
  BuildingIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  CodeIcon,
  CookieIcon,
  ExternalLinkIcon,
  EyeIcon,
  FileCheckCornerIcon,
  FileCheckIcon,
  GlobeIcon,
  ImageOffIcon,
  LayoutTemplateIcon,
  LoaderIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserRoundPenIcon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VisuallyHidden } from "radix-ui";
import { useCallback, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import {
  type PlaceResult,
  PlacesAutocomplete,
} from "../../prospects/_components/places-autocomplete";
import {
  PROSPECT_TYPES,
  type ProspectType,
} from "../../prospects/prospects-types";
import type { CrawlResult } from "../crawl-actions";
import { useCrawlContext } from "../crawl-context";
import {
  useAddProspectForCrawl,
  useAssignProspectToCrawl,
} from "../crawl-mutations";
import { useAvailableProspectsForCrawl } from "../crawl-queries";

export function ListCrawls() {
  return <div className="rounded-md bg-sidebar p-8">{<CrawlsCards />}</div>;
}

// -----------------------------------------------------------
function CrawlsCards() {
  const { crawls, crawlsAreLoading } = useCrawlContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProspectType | null>(null);

  const noCrawls = crawls && crawls.length === 0;
  if (noCrawls && !crawlsAreLoading) return <NoCrawlFound />;

  const filteredCrawls = crawls?.filter((crawl) => {
    // Filter by type
    if (typeFilter && crawl.prospectType !== typeFilter) return false;

    // Filter by search query
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      crawl.title?.toLowerCase().includes(query) ||
      crawl.prospectName?.toLowerCase().includes(query) ||
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
            aria-label="Effacer la recherche"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
            type="button"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>

      {/* 🏷️ Type filter badges */}
      <TypeFilterBadges
        onSelectType={setTypeFilter}
        selectedType={typeFilter}
      />

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
        <h3
          className="max-w-full truncate font-kanit text-xl"
          title={crawl.prospectName ?? crawl.title ?? undefined}
        >
          {crawl.prospectName ?? crawl.title}
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
        {/* 🏢 Prospect Selector */}
        <ProspectSelector crawl={crawl} />
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
      {/* 🌐 Languages */}
      <LanguageSection crawl={crawl} />
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

// ------------------------------------------------------------
// 🌐 Language Section
function LanguageSection({ crawl }: { crawl: CrawlResult }) {
  const hasLanguageInfo =
    crawl.primaryLanguage ||
    crawl.hasMultipleLanguages ||
    (crawl.availableLanguages && crawl.availableLanguages.length > 0);

  if (!hasLanguageInfo) return null;

  const languageNames: Record<string, string> = {
    ar: "Arabe",
    br: "Breton",
    ca: "Catalan",
    de: "Allemand",
    en: "Anglais",
    es: "Espagnol",
    eu: "Basque",
    fr: "Français",
    gl: "Galicien",
    it: "Italien",
    nl: "Néerlandais",
    oc: "Occitan",
    pl: "Polonais",
    pt: "Portugais",
    ru: "Russe",
    zh: "Chinois",
  };

  const getLanguageName = (code: string) =>
    languageNames[code] ?? code.toUpperCase();

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Langues
      </h4>
      <div className="space-y-1">
        {/* 🌐 Primary Language */}
        {crawl.primaryLanguage && (
          <div className="flex items-center gap-x-2 text-sm">
            <GlobeIcon className="shrink-0 text-muted-foreground" size={14} />
            <span className="text-muted-foreground">Langue principale:</span>
            <span>{getLanguageName(crawl.primaryLanguage)}</span>
          </div>
        )}
        {/* 🌍 Available Languages */}
        {crawl.availableLanguages && crawl.availableLanguages.length > 1 && (
          <div className="flex items-start gap-x-2 text-sm">
            <GlobeIcon
              className="mt-0.5 shrink-0 text-muted-foreground"
              size={14}
            />
            <span className="text-muted-foreground">Multilingue:</span>
            <span className="flex flex-wrap gap-1">
              {crawl.availableLanguages.map((lang) => (
                <span
                  className="rounded bg-muted px-1.5 py-0.5 text-xs"
                  key={lang}
                >
                  {getLanguageName(lang)}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 🏢 Prospect Selector
function ProspectSelector({ crawl }: { crawl: CrawlResult }) {
  const { availableProspects, availableProspectsAreLoading } =
    useAvailableProspectsForCrawl(crawl.id);
  const { mutate: assignProspect, isPending } = useAssignProspectToCrawl();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentProspectId = crawl.prospectId?.toString() ?? "";

  const filteredProspects = availableProspects?.filter((prospect) =>
    prospect.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleChange(value: string) {
    const prospectId = value === "" ? null : Number.parseInt(value, 10);
    assignProspect({ crawlId: crawl.id, prospectId });
  }

  function handleOpenChange(open: boolean) {
    setDropdownOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  }

  function handleProspectAdded() {
    setDropdownOpen(false);
  }

  return (
    <div className="mt-2 flex items-center gap-x-2">
      <BuildingIcon className="shrink-0 text-muted-foreground" size={14} />
      <DropdownMenu onOpenChange={handleOpenChange} open={dropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex cursor-pointer items-center gap-x-1 rounded-md px-2 py-1",
              "bg-muted/50 text-sm",
              "hover:bg-muted",
              "transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isPending || availableProspectsAreLoading}
            type="button"
          >
            {isPending ? <LoaderIcon className="size-3 animate-spin" /> : null}
            <span className="max-w-40 truncate">
              {crawl.prospectName ?? "Sélectionner un prospect"}
            </span>
            <ChevronDownIcon className="shrink-0" size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <div className="space-y-2 p-2">
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
                size={14}
              />
              <input
                className={cn(
                  "h-8 w-full rounded-md border border-input bg-background pr-2 pl-7",
                  "text-sm placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-1 focus:ring-ring"
                )}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Rechercher..."
                type="text"
                value={searchQuery}
              />
            </div>
            <AddProspectForCrawlButton
              crawlId={crawl.id}
              crawlUrl={crawl.url}
              onSuccess={handleProspectAdded}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            <DropdownMenuRadioGroup
              onValueChange={handleChange}
              value={currentProspectId}
            >
              <DropdownMenuRadioItem value="">
                <span className="text-muted-foreground">Aucun prospect</span>
              </DropdownMenuRadioItem>
              {filteredProspects?.map((prospect) => (
                <DropdownMenuRadioItem
                  key={prospect.id}
                  value={prospect.id.toString()}
                >
                  {prospect.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {crawl.prospectType && <ProspectTypeBadge type={crawl.prospectType} />}
    </div>
  );
}

// ------------------------------------------------------------
// 🟡 Prospect Type Badge
function ProspectTypeBadge({ type }: { type: Prospect["type"] }) {
  const labels: Record<Prospect["type"], string> = {
    administration: "Administration",
    city: "Ville",
    cultural_establishment: "Établissement culturel",
    epci: "EPCI",
    other: "Autre",
    sme: "PME/TPE",
    territorial_collectivity: "Collectivité territoriale",
  };

  const colors: Record<Prospect["type"], string> = {
    administration: "bg-purple-500/20 text-purple-400",
    city: "bg-blue-500/20 text-blue-400",
    cultural_establishment: "bg-pink-500/20 text-pink-400",
    epci: "bg-green-500/20 text-green-400",
    other: "bg-zinc-500/20 text-zinc-400",
    sme: "bg-red-500/20 text-red-400",
    territorial_collectivity: "bg-orange-500/20 text-orange-400",
  };

  return (
    <span
      className={cn(
        "rounded-full",
        "px-2 py-0.5",
        "font-medium text-xs",
        colors[type]
      )}
    >
      {labels[type]}
    </span>
  );
}

// ------------------------------------------------------------
// ➕ Add Prospect For Crawl Button & Dialog

function AddProspectForCrawlButton({
  crawlId,
  crawlUrl,
  onSuccess,
}: {
  crawlId: string;
  crawlUrl: string;
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const {
    mutate: addProspect,
    isPending,
    isSuccess,
  } = useAddProspectForCrawl();

  const form = useForm({
    defaultValues: {
      latitude: "",
      location: "",
      longitude: "",
      name: "",
      type: "city" as ProspectType,
    },
    onSubmit: ({ value }) => {
      addProspect({
        crawlId,
        latitude: value.latitude || undefined,
        location: value.location,
        longitude: value.longitude || undefined,
        name: value.name,
        type: value.type,
        website: crawlUrl,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      form.reset();
      setFormKey((prev) => prev + 1);
      onSuccess();
    }
  }, [isSuccess, form, onSuccess]);

  const handlePlaceSelect = useCallback(
    (place: PlaceResult) => {
      form.setFieldValue("name", place.name);
      form.setFieldValue(
        "type",
        inferProspectType(place.placeTypes, place.name)
      );
      form.setFieldValue("location", place.placeUrl);
      form.setFieldValue("latitude", place.latitude.toString());
      form.setFieldValue("longitude", place.longitude.toString());
    },
    [form]
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <VisuallyHidden.Root>
        <DialogTitle>Ajouter un prospect</DialogTitle>
      </VisuallyHidden.Root>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          onClick={(e) => e.stopPropagation()}
          size="sm"
          type="button"
          variant="default"
        >
          <PlusIcon size={16} />
          <span>Ajouter un prospect</span>
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <div className="space-y-4">
          <h3 className="text-center font-bold font-kanit text-3xl">
            Ajouter un prospect
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-4">
            {/* 📌 Location with Google Places Autocomplete */}
            <form.Field
              name="location"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "La localisation est requise";
                },
              }}
            >
              {(field) => (
                <div className="col-span-2">
                  <Label>Rechercher un lieu</Label>
                  <PlacesAutocomplete
                    key={formKey}
                    onPlaceSelect={handlePlaceSelect}
                    placeholder="Mairie, ville, administration..."
                  />
                  {!field.state.meta.isValid && (
                    <FormErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </FormErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
            {/* 🔠 Name */}
            <form.Field
              name="name"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "Le nom est requis";
                },
              }}
            >
              {(field) => (
                <div>
                  <Label>Nom</Label>
                  <Input
                    className="h-10"
                    name={field.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Auto-rempli"
                    value={field.state.value}
                  />
                  {!field.state.meta.isValid && (
                    <FormErrorMessage>
                      {field.state.meta.errors.join(", ")}
                    </FormErrorMessage>
                  )}
                </div>
              )}
            </form.Field>
            {/* 🟡 Type */}
            <form.Field name="type">
              {(field) => (
                <div>
                  <Label>Type</Label>
                  <Select
                    onValueChange={(newValue) =>
                      field.handleChange(newValue as ProspectType)
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Auto-détecté" />
                    </SelectTrigger>
                    <SelectContent align="start" className="max-h-64">
                      <SelectGroup>
                        {Object.entries(PROSPECT_TYPES).map(([type, label]) => (
                          <SelectItem key={type} value={type}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className="mx-auto flex items-center gap-x-2"
                disabled={isSubmitting || isPending}
                loading={isSubmitting || isPending}
                onClick={form.handleSubmit}
                size="lg"
              >
                <UserRoundPlusIcon className="shrink-0" size={22} />
                <span>Ajouter</span>
              </Button>
            )}
          </form.Subscribe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Infer prospect type from Google Places types
function inferProspectType(
  placeTypes: string[],
  placeName: string
): ProspectType {
  const name = placeName.toLowerCase();

  if (
    name.includes("communauté") ||
    name.includes("métropole") ||
    name.includes("agglomération") ||
    name.includes("intercommunal")
  ) {
    return "epci";
  }

  if (
    name.includes("conseil départemental") ||
    name.includes("conseil régional") ||
    name.includes("conseil général") ||
    name.includes("région ") ||
    name.includes("département ")
  ) {
    return "territorial_collectivity";
  }

  const adminTypes = [
    "local_government_office",
    "city_hall",
    "courthouse",
    "government",
    "town_hall",
  ];
  if (placeTypes.some((t) => adminTypes.includes(t))) {
    return "administration";
  }

  if (
    name.includes("mairie") ||
    name.includes("hôtel de ville") ||
    name.includes("préfecture") ||
    name.includes("sous-préfecture")
  ) {
    return "administration";
  }

  const cityTypes = [
    "locality",
    "sublocality",
    "administrative_area_level_2",
    "postal_town",
  ];
  if (placeTypes.some((t) => cityTypes.includes(t))) {
    return "city";
  }

  return "other";
}

function FormErrorMessage({ children }: { children: string }) {
  return (
    <div
      className="flex items-center gap-x-0.5 font-normal text-red-500 text-sm"
      role="alert"
    >
      <XIcon size={16} />
      {children}
    </div>
  );
}

// ------------------------------------------------------------
// 🏷️ Type filter badges

const TYPE_FILTER_COLORS: Record<
  ProspectType,
  { active: string; inactive: string }
> = {
  administration: {
    active: "bg-purple-500 text-white",
    inactive: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30",
  },
  city: {
    active: "bg-blue-500 text-white",
    inactive: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  },
  cultural_establishment: {
    active: "bg-pink-500 text-white",
    inactive: "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30",
  },
  epci: {
    active: "bg-green-500 text-white",
    inactive: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
  },
  other: {
    active: "bg-zinc-500 text-white",
    inactive: "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30",
  },
  sme: {
    active: "bg-red-500 text-white",
    inactive: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
  },
  territorial_collectivity: {
    active: "bg-orange-500 text-white",
    inactive: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30",
  },
};

function TypeFilterBadges({
  selectedType,
  onSelectType,
}: {
  selectedType: ProspectType | null;
  onSelectType: (type: ProspectType | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(Object.entries(PROSPECT_TYPES) as [ProspectType, string][]).map(
        ([type, label]) => {
          const isActive = selectedType === type;
          return (
            <button
              className={cn(
                "cursor-pointer rounded-full px-3 py-1",
                "font-medium text-xs",
                "transition-colors",
                isActive
                  ? TYPE_FILTER_COLORS[type].active
                  : TYPE_FILTER_COLORS[type].inactive
              )}
              key={type}
              onClick={() => onSelectType(isActive ? null : type)}
              type="button"
            >
              {label}
            </button>
          );
        }
      )}
    </div>
  );
}
