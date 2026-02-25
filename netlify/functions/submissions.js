/**
 * Netlify Function: list "contact" form submissions from Netlify Forms API.
 *
 * Requirements (set in Netlify site environment variables):
 * - NETLIFY_ACCESS_TOKEN : Personal access token (forms read access)
 * - NETLIFY_SITE_ID      : Your Netlify site ID (Site settings -> Site information)
 * - ADMIN_USER           : Basic auth username for this endpoint
 * - ADMIN_PASS           : Basic auth password for this endpoint
 *
 * Optional:
 * - NETLIFY_FORM_NAME    : default "contact"
 */
const NETLIFY_API = "https://api.netlify.com/api/v1";

function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
    body: JSON.stringify(body),
  };
}

function unauthorized() {
  return {
    statusCode: 401,
    headers: { "www-authenticate": 'Basic realm="Admin"' },
    body: "Unauthorized",
  };
}

function parseBasicAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith("Basic ")) return null;
  const encoded = authHeader.slice("Basic ".length).trim();
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const idx = decoded.indexOf(":");
  if (idx < 0) return null;
  return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
}

async function netlifyFetch(path) {
  const token = process.env.NETLIFY_ACCESS_TOKEN;
  const res = await fetch(`${NETLIFY_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "user-agent": "gelgidek-admin/1.0",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Netlify API error ${res.status}: ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

exports.handler = async (event) => {
  // Basic Auth (very simple)
  const creds = parseBasicAuth(event.headers.authorization || event.headers.Authorization);
  const au = process.env.ADMIN_USER;
  const ap = process.env.ADMIN_PASS;

  if (!au || !ap) {
    // endpoint disabled by default (safer)
    return json(200, { enabled: false, message: "ADMIN_USER/ADMIN_PASS not set." });
  }
  if (!creds || creds.user !== au || creds.pass !== ap) return unauthorized();

  // Ensure required env is present
  const token = process.env.NETLIFY_ACCESS_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;
  if (!token || !siteId) {
    return json(500, { enabled: true, error: "NETLIFY_ACCESS_TOKEN or NETLIFY_SITE_ID is missing." });
  }

  const formName = process.env.NETLIFY_FORM_NAME || "contact";
  const limit = Math.min(Number(new URLSearchParams(event.queryStringParameters || {}).get("limit") || 25), 200);
  const q = (new URLSearchParams(event.queryStringParameters || {}).get("q") || "").toLowerCase().trim();

  try {
    const forms = await netlifyFetch(`/sites/${siteId}/forms`);
    const form = Array.isArray(forms) ? forms.find((f) => (f.name || "").toLowerCase() === formName.toLowerCase()) : null;

    if (!form) {
      return json(404, { enabled: true, error: `Form not found: ${formName}. Did you deploy once so Netlify detects the form?` });
    }

    const submissions = await netlifyFetch(`/forms/${form.id}/submissions?per_page=${limit}`);

    let items = Array.isArray(submissions) ? submissions : [];

    if (q) {
      items = items.filter((s) => {
        const d = s.data || {};
        const hay = [
          d.name, d.full_name, d.email, d.topic, d.message,
          s.created_at
        ].filter(Boolean).join(" ").toLowerCase();
        return hay.includes(q);
      });
    }

    // newest first
    items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return json(200, { enabled: true, form: { id: form.id, name: form.name }, items });
  } catch (err) {
    return json(500, { enabled: true, error: err.message || String(err) });
  }
};
