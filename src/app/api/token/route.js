import { getToken } from "@clerk/nextjs/server";

export async function GET(req) {
  const token = await getToken({ template: "myTemplate" }); // use your template name or "default"
  console.log("JWT token:", token);

  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" },
  });
}
