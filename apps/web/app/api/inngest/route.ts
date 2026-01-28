import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { crawlWebsite } from "@/lib/inngest/functions";

const handler = serve({
  client: inngest,
  functions: [crawlWebsite],
});

export const GET = handler.GET as (req: Request) => Promise<Response>;
export const POST = handler.POST as (req: Request) => Promise<Response>;
export const PUT = handler.PUT as (req: Request) => Promise<Response>;
