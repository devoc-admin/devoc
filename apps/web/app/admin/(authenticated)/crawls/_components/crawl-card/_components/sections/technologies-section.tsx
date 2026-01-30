"use client";
import {
  BarChart3Icon,
  CodeIcon,
  CookieIcon,
  LayoutTemplateIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useCrawlCardContext } from "../../crawl-card-context";
import {
  Section,
  SectionContent,
  SectionInformation,
  SectionInformationIcon,
  SectionInformationName,
  SectionTitle,
} from "./section";

export function TechnologiesSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

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
    <Section>
      <SectionTitle>
        Technologies détectées ({crawl.detectedTechCount ?? 0})
      </SectionTitle>
      <SectionContent>
        {/* 🖥️ CMS */}
        <SectionInformation>
          <SectionInformationIcon Icon={LayoutTemplateIcon} />
          <SectionInformationName>CMS</SectionInformationName>
          <span>{crawl.primaryCms ?? "—"} </span>
        </SectionInformation>
        {/* 🧩 Framework */}
        <SectionInformation>
          <SectionInformationIcon Icon={CodeIcon} />
          <SectionInformationName>Framework</SectionInformationName>
          <span>{crawl.primaryFramework ?? "—"} </span>
        </SectionInformation>
        {/* 🏢 Hébergeur */}
        <SectionInformation>
          <SectionInformationIcon Icon={ServerIcon} />
          <SectionInformationName>Hébergeur</SectionInformationName>
          <span>{crawl.hostingProvider ?? "—"} </span>
        </SectionInformation>
        {/* 🍪 Gestionnaire de consentement */}
        <SectionInformation>
          <SectionInformationIcon Icon={CookieIcon} />
          <SectionInformationName>Consentement</SectionInformationName>
          <span>{crawl.consentManager ?? "—"} </span>
        </SectionInformation>
        {/* ♿ Outil d'accessibilité */}
        <SectionInformation>
          <SectionInformationIcon Icon={ShieldCheckIcon} />
          <SectionInformationName>Accessibilité</SectionInformationName>
          <span>{crawl.accessibilityTool ?? "—"} </span>
        </SectionInformation>
        {/* 📊 Analytics */}
        <SectionInformation>
          <SectionInformationIcon Icon={BarChart3Icon} />
          <SectionInformationName>Analytiques</SectionInformationName>
          <span>
            {crawl.analyticsTools && crawl.analyticsTools.length > 0
              ? crawl.analyticsTools.join(", ")
              : "—"}{" "}
          </span>
        </SectionInformation>
        {/* 🇫🇷 DSFR */}
        <SectionInformation>
          <SectionInformationIcon Icon={ShieldCheckIcon} />
          <SectionInformationName>DSFR</SectionInformationName>
          <span>{crawl.usesDsfr ? "Oui" : "Non"}</span>
        </SectionInformation>
      </SectionContent>
    </Section>
  );
}
