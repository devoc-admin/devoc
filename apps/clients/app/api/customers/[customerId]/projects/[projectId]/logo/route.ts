import {
  getCustomerProjectById,
  getProjectLogoById,
} from "@dev-oc/data/projects";
import { auth } from "@/lib/auth/auth";

// Private blobs have no public URL, so <img> tags load them through this route
export async function GET(
  request: Request,
  { params }: { params: Promise<{ customerId: string; projectId: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { customerId, projectId } = await params;
  const customerIdNumber = Number(customerId);
  const projectIdNumber = Number(projectId);

  if (
    !(
      Number.isInteger(customerIdNumber) &&
      customerIdNumber > 0 &&
      Number.isInteger(projectIdNumber) &&
      projectIdNumber > 0
    )
  ) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  const project = await getCustomerProjectById(
    customerIdNumber,
    projectIdNumber
  );

  if (!project) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  const logo = await getProjectLogoById(project.id, {
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  });

  if (!logo) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  const headers = {
    "Cache-Control": "private, max-age=3600",
    ETag: logo.blob.etag,
  };

  if (logo.statusCode === 304) {
    return new Response(null, { headers, status: 304 });
  }

  return new Response(logo.stream, {
    headers: { ...headers, "Content-Type": logo.blob.contentType },
  });
}
