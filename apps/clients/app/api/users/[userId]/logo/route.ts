import { getUserProfilePictureById } from "@dev-oc/data/users";
import { ALLOWED_CONTENT_TYPES } from "@/lib/api/logo-allowed-types";
import {
  notAllowedResponse,
  notFoundResponse,
  notModifiedResponse,
  unauthorizedResponse,
  unsupportedTypeResponse,
} from "@/lib/api/responses";
import { auth } from "@/lib/auth/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  // CHECK SESSION =====================================

  // 🔑
  const session = await auth.api.getSession({ headers: request.headers });

  // ✋
  if (!session) return unauthorizedResponse();

  // ================================================
  // 🧔
  const { userId } = await params;

  // ✋
  const isAuthorizedUser = session.user.id === userId;
  if (!isAuthorizedUser) return notAllowedResponse();

  const profilePicture = await getUserProfilePictureById(userId, {
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  });

  if (!profilePicture) return notFoundResponse();
  if (profilePicture.statusCode === 304) return notModifiedResponse();

  const notRightType = !ALLOWED_CONTENT_TYPES.has(
    profilePicture.blob.contentType
  );

  if (notRightType) {
    await profilePicture.stream.cancel();
    return unsupportedTypeResponse();
  }

  // ⬆️✅
  return new Response(profilePicture.stream, {
    headers: {
      "Cache-Control": "private, max-age=3600, stale-while-revalidate=86400",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Content-Type": profilePicture.blob.contentType,
      ETag: profilePicture.blob.etag,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
