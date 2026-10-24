import {
  getCustomerProjectById,
  getProjectLogoById,
} from "@dev-oc/data/projects";
import { ALLOWED_CONTENT_TYPES } from "@/lib/api/logo-allowed-types";
import {
  INVALID_RESPONSE,
  NOT_FOUND_RESPONSE,
  NOT_MODIFIED_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  UNSUPPORTED_TYPE_RESPONSE,
} from "@/lib/api/responses";
import { areCustomerAndProjectIdValid } from "@/lib/api/utils";
import { auth } from "@/lib/auth/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ customerId: string; projectId: string }> }
) {
  // CHECK SESSION ================================================

  // 🔑
  const session = await auth.api.getSession({ headers: request.headers });

  // ✋
  if (!session) return UNAUTHORIZED_RESPONSE;

  // ================================================
  // 👥 📦

  const { customerId, projectId } = await params;

  const customerIdNumber = Number(customerId);
  const projectIdNumber = Number(projectId);

  const idsOk = areCustomerAndProjectIdValid(customerIdNumber, projectIdNumber);

  // 🚫
  if (!idsOk) return INVALID_RESPONSE;

  // 🐝📦
  const project = await getCustomerProjectById(
    customerIdNumber,
    projectIdNumber
  );

  // 🚫
  if (!project) return NOT_FOUND_RESPONSE;

  // 🐝🖼️
  const projectLogo = await getProjectLogoById(project.id, {
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  });

  // 🚫
  if (!projectLogo) return NOT_FOUND_RESPONSE;
  if (projectLogo.statusCode === 304) return NOT_MODIFIED_RESPONSE;
  const notRightType = !ALLOWED_CONTENT_TYPES.has(projectLogo.blob.contentType);
  if (notRightType) {
    await projectLogo.stream.cancel();
    return UNSUPPORTED_TYPE_RESPONSE;
  }

  // ⬆️✅
  return new Response(projectLogo.stream, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Content-Type": projectLogo.blob.contentType,
      ETag: projectLogo.blob.etag,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
