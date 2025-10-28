import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import type { Metadata } from "next";

import config from "@/payload/payload.config";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) => (
  <RootPage
    config={config}
    importMap={{}}
    params={params}
    searchParams={searchParams}
  />
);

export default Page;
