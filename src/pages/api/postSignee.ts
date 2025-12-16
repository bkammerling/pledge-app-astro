export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name')?.toString() ?? '';
  const email = data.get("email")?.toString() ?? '';

  // 1) Do your DB / action logic here
  // await saveSignee(name);

  // 2) Redirect to donate page (optionally with name)
  const url = new URL('/donate', request.url);
  if (name) {
    // Extract first name
    const firstName = name.split(' ')[0];
    url.searchParams.set('name', firstName);
  }

  return new Response(null, {
    status: 303,
    headers: { Location: url.toString() },
  });
}
