import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // replace with the actual user ID you want to promote
    const userId = "user_31ELIZoMfdkyuyiFYmuB6QELhIw";

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "admin",
      },
    });

    return Response.json({ success: true, message: "Role set to admin ✅" });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
