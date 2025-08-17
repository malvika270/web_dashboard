// utils/roles/roles.js
import { currentUser } from "@clerk/nextjs/server";

export const checkRole = async (role) => {
  const user = await currentUser();
  if (!user) {
    console.log("❌ No user signed in");
    return false;
  }

  console.log("✅ User metadata:", user.publicMetadata, user.privateMetadata);

  const userRole =
    user.publicMetadata?.role ?? user.privateMetadata?.role ?? null;

  console.log("➡️ User role:", userRole, " | Needed role:", role);

  return userRole === role;
};
