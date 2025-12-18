export const prerender = false;
import type { APIRoute } from "astro";
import { db, Signee, eq, count } from "astro:db";

export const GET: APIRoute = async ({ url }) => {
  const pledgeId = parseInt(url.searchParams.get('pledgeId') ?? '1', 10);
  
  if (isNaN(pledgeId)) {
    return new Response(JSON.stringify({ error: 'Invalid pledgeId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const signeesResult = await db
      .select({ value: count() })
      .from(Signee)
      .where(eq(Signee.pledgeId, pledgeId));
    
    let signees = signeesResult[0]?.value ?? 0;
    // If signees is under 100, add 100 
    signees = signees < 100 ? signees + 100 : signees;

    return new Response(JSON.stringify({ count: signees }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching signee count:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch count' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
