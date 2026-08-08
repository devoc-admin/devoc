import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await params;

  // Validate path: expect [crawlJobId, filename.jpg]
  if (path.length !== 2) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const [crawlJobId, filename] = path;

  // Security: validate crawlJobId is a UUID
  if (!UUID_REGEX.test(crawlJobId)) {
    return NextResponse.json(
      { error: "Invalid crawl job ID" },
      { status: 400 }
    );
  }

  // Security: only allow .webp files
  if (!filename.endsWith(".webp")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Security: prevent path traversal
  if (filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  try {
    const screenshotsDir = join(process.cwd(), "screenshots", crawlJobId);
    const filePath = join(screenshotsDir, filename);

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/webp",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
