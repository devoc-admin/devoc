import { getCustomerLogoById } from "@dev-oc/data/customers";
import { ALLOWED_CONTENT_TYPES } from "@/lib/api/logo-allowed-types";
import {
  INVALID_RESPONSE,
  NOT_FOUND_RESPONSE,
  NOT_MODIFIED_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  UNSUPPORTED_TYPE_RESPONSE,
} from "@/lib/api/responses";
import { isCustomerIdValid } from "@/lib/api/utils";
import { auth } from "@/lib/auth/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ customerId: string }> }
) {
  // CHECK SESSION ================================================

  // 🔑
  const session = await auth.api.getSession({ headers: request.headers });

  // ✋
  if (!session) return UNAUTHORIZED_RESPONSE;

  // ================================================
  // 👥

  const { customerId } = await params;
  const customerIdNumber = Number(customerId);

  const idOk = isCustomerIdValid(customerIdNumber);

  if (!idOk) return INVALID_RESPONSE;

  // 🖼️
  const customerLogo = await getCustomerLogoById(customerIdNumber, {
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  });
  if (!customerLogo) return NOT_FOUND_RESPONSE;
  if (customerLogo.statusCode === 304) return NOT_MODIFIED_RESPONSE;

  // 🚫
  const notRightType = !ALLOWED_CONTENT_TYPES.has(
    customerLogo.blob.contentType
  );
  if (notRightType) {
    await customerLogo.stream.cancel();
    return UNSUPPORTED_TYPE_RESPONSE;
  }

  // ⬆️✅
  return new Response(customerLogo.stream, {
    headers: {
      "Cache-Control": "private, max-age=3600, stale-while-revalidate=86400",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Content-Type": customerLogo.blob.contentType,
      ETag: customerLogo.blob.etag,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
