import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function isAdminRoute(req) {
  return req.nextUrl.pathname.startsWith("/admin");
}

export default clerkMiddleware(async (auth, req) => {
  try{
    const res= await fetch ("/api/debug")
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);}
    const data = await res.json();
    console.log("Data from /api/debug:", data);
    role = data.user?.publicMetadata?.role
    if (isAdminRoute(req) &&   role !== "admin") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
  }
  }
    catch (err) {
    console.error("Fetch error:", err);}


  
  // console.log("Session Claims:", sessionClaims);

  // const role = sessionClaims?.publicMetadata?.role;



  return NextResponse.next();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}