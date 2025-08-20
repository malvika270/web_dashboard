// src/components/Sidebar.jsx  (no "use client")
import Link from "next/link";
import { checkRole } from "../../utils/roles/roles";

export default async function Sidebar() {
  const isAdmin = await checkRole("admin");

  return (
    <aside className="sidebar p-4 bg-gray-900 text-white h-16">
      <ul className="space-y-2">
        <li><Link href="/">🏠 Home</Link></li>
        {isAdmin && <li><Link href="/admin">🛠 Admin</Link></li>}
      </ul>
    </aside>
  );
}
