// A Response body can only be read once, so each call builds a fresh one.

// 3️⃣0️⃣0️⃣
export const notModifiedResponse = () => new Response(null, { status: 304 });

// 4️⃣0️⃣0️⃣
export const invalidResponse = () =>
  Response.json({ error: "invalid_id" }, { status: 400 });

export const unauthorizedResponse = () =>
  Response.json({ error: "unauthorized" }, { status: 401 });

export const notAllowedResponse = () =>
  Response.json({ error: "not_allowed" }, { status: 403 });

export const notFoundResponse = () =>
  Response.json({ error: "not_found" }, { status: 404 });

export const unsupportedTypeResponse = () =>
  Response.json({ error: "unsupported_type" }, { status: 415 });
