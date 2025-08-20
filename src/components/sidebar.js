// src/components/Sidebar.jsx  (no "use client")



import Link from "next/link";
// import { checkRole } from "../../utils/roles/roles";
// import { auth } from "@clerk/nextjs/server";

export default async function Sidebar() {
//   const { sessionClaims } = await auth()
// console.log("Role from JWT:", sessionClaims?.metadata?.role)

//   const isAdmin = await checkRole("admin");

  return (
    <aside className="sidebar p-4 bg-gray-900 text-white h-24">
      <ul className="space-y-2">
        <li><Link href="/">🏠 Home</Link></li>
       <li><Link href="/admin">🛠 Admin</Link></li>
      </ul>
    </aside>
  );
}