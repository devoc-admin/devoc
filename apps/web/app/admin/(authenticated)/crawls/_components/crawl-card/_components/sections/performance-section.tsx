"use client";
import {
  ActivityIcon,
  ClockIcon,
  FileIcon,
  GaugeIcon,
  ImageIcon,
  NetworkIcon,
  PaintbrushIcon,
  TypeIcon,
  ZapIcon,
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

export function PerformanceSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  return (
    <Section>
      <SectionTitle>Performance</SectionTitle>
      <SectionContent>
        {/* ⚡ TTFB */}
        <SectionInformation>
          <SectionInformationIcon Icon={ZapIcon} />
          <SectionInformationName>TTFB</SectionInformationName>
          <span>{crawl.perfTtfb ? formatMs(crawl.perfTtfb) : "—"}</span>
        </SectionInformation>
        {/* 🎨 FCP */}
        <SectionInformation>
          <SectionInformationIcon Icon={PaintbrushIcon} />
          <SectionInformationName>FCP</SectionInformationName>
          <span>{crawl.perfFcp ? formatMs(crawl.perfFcp) : "—"}</span>
        </SectionInformation>
        {/* 📐 LCP */}
        <SectionInformation>
          <SectionInformationIcon Icon={ImageIcon} />
          <SectionInformationName>LCP</SectionInformationName>
          <span>{crawl.perfLcp ? formatMs(crawl.perfLcp) : "—"}</span>
        </SectionInformation>
        {/* 📄 DOM Ready */}
        <SectionInformation>
          <SectionInformationIcon Icon={ActivityIcon} />
          <SectionInformationName>DOM prêt</SectionInformationName>
          <span>
            {crawl.perfDomContentLoaded
              ? formatMs(crawl.perfDomContentLoaded)
              : "—"}
          </span>
        </SectionInformation>
        {/* ⏱️ Page Load */}
        <SectionInformation>
          <SectionInformationIcon Icon={ClockIcon} />
          <SectionInformationName>Chargement</SectionInformationName>
          <span>
            {crawl.perfPageLoadTime ? formatMs(crawl.perfPageLoadTime) : "—"}
          </span>
        </SectionInformation>
        {/* 📦 Page Size */}
        <SectionInformation>
          <SectionInformationIcon Icon={FileIcon} />
          <SectionInformationName>Taille</SectionInformationName>
          <span>
            {crawl.perfPageSizeKb ? formatKb(crawl.perfPageSizeKb) : "—"}
          </span>
        </SectionInformation>
        {/* 🌐 Requests */}
        <SectionInformation>
          <SectionInformationIcon Icon={NetworkIcon} />
          <SectionInformationName>Requêtes</SectionInformationName>
          <span>{crawl.perfRequestCount ?? "—"}</span>
        </SectionInformation>
        {/* 📊 Breakdown */}
        <SectionInformation>
          <SectionInformationIcon Icon={GaugeIcon} />
          <SectionInformationName>Scripts</SectionInformationName>
          <span>
            {crawl?.perfResourceBreakdown?.scripts &&
            crawl.perfResourceBreakdown.scripts > 0
              ? formatKb(crawl.perfResourceBreakdown.scripts)
              : "—"}
          </span>
        </SectionInformation>
        <SectionInformation>
          <SectionInformationIcon Icon={PaintbrushIcon} />
          <SectionInformationName>Styles</SectionInformationName>
          <span>
            {crawl?.perfResourceBreakdown?.stylesheets &&
            crawl.perfResourceBreakdown.stylesheets > 0
              ? formatKb(crawl.perfResourceBreakdown.stylesheets)
              : "—"}
          </span>
        </SectionInformation>
        <SectionInformation>
          <SectionInformationIcon Icon={ImageIcon} />
          <SectionInformationName>Images</SectionInformationName>
          <span>
            {crawl?.perfResourceBreakdown?.images &&
            crawl.perfResourceBreakdown.images > 0
              ? formatKb(crawl.perfResourceBreakdown.images)
              : "—"}
          </span>
        </SectionInformation>
        <SectionInformation>
          <SectionInformationIcon Icon={TypeIcon} />
          <SectionInformationName>Fonts</SectionInformationName>
          <span>
            {crawl?.perfResourceBreakdown?.fonts &&
            crawl.perfResourceBreakdown.fonts > 0
              ? formatKb(crawl.perfResourceBreakdown.fonts)
              : "—"}
          </span>
        </SectionInformation>
      </SectionContent>
    </Section>
  );
}

function formatMs(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  if (value < 1000) return `${value} ms`;
  return `${(value / 1000).toFixed(2)} s`;
}

function formatKb(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  if (value < 1024) return `${value} Ko`;
  return `${(value / 1024).toFixed(2)} Mo`;
}
