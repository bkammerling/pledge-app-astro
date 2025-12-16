export const prerender = false; 
import type { APIRoute } from "astro";
import { db, Signee } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name')?.toString() ?? '';
  const email = data.get("email")?.toString() ?? '';
  const pledgeId = parseInt(data.get("pledgeid")?.toString() ?? '', 10);

  // Basic validation
  if (!name || !email || !pledgeId) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  await db.insert(Signee).values({
    name,
    email,
    pledgeId: pledgeId,
    dateSigned: new Date()
  });

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
