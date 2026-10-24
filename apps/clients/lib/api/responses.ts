export const UNAUTHORIZED_RESPONSE = Response.json(
  { error: "unauthorized" },
  { status: 401 }
);
export const INVALID_RESPONSE = Response.json(
  { error: "invalid_id" },
  { status: 400 }
);
export const NOT_FOUND_RESPONSE = Response.json(
  { error: "not_found" },
  { status: 404 }
);
export const NOT_MODIFIED_RESPONSE = new Response(null, { status: 304 });
export const UNSUPPORTED_TYPE_RESPONSE = Response.json(
  { error: "unsupported_type" },
  { status: 415 }
);
