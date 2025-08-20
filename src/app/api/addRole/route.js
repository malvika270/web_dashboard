import { clerkClient,auth } from "@clerk/nextjs/server";
export async function POST(req) {
    try{
        const {userId}= auth ()
        if (!userId) {
            return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        const currentUser = await clerkClient.users.getUser(userId);
        if (currentUser.publicMetadata.role !== "admin") {
            return Response.json({ success: false, error: "Permission denied" }, { status: 403 });
        }
        const { email, password, role } = await req.json();
        const newUser = await clerkClient.users.createUser({
            emailAddress: [email],
            password,
            publicMetadata: { role },
        });
        return Response.json({ success: true, userId: newUser.id }, { status: 201 });
    } catch (error) {
        
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
