import { isAuthenticated, logout } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
export default async function BukolaLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  return (
    <div className="min-h-screen bg-sea-950">
      {authed ? (
        <AdminShell>{children}</AdminShell>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sea-950 via-sea-900 to-slate-950">
          {children}
        </div>
      )}
    </div>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminTopBar />
        <main className="p-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

function AdminSidebar() {
  const links = [
    { href: "/bukola/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/bukola/menu", label: "Menu Editor", icon: "🍽️" },
    { href: "/bukola/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-sea-950 border-r border-sea-800 flex flex-col z-50">
      <div className="p-6 border-b border-sea-800">
        <h1 className="text-xl font-serif font-bold text-white">TheSeaPride</h1>
        <p className="text-sea-400 text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sea-800/60 text-sea-300 hover:text-white transition-colors text-sm"
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-sea-800 space-y-2">
        <form action={async () => {
          "use server";
          await logout();
          redirect("/bukola");
        }}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sea-800/50 hover:bg-red-600/80 text-sea-400 hover:text-white transition-colors text-sm w-full"
          >
            <span>🚪</span>
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}

function AdminTopBar() {
  return (
    <header className="h-16 bg-sea-900 border-b border-sea-800 flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-lg font-semibold text-gray-200">Welcome, Bukola</h2>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          className="text-xs text-sea-400 hover:text-white underline"
        >
          View Site →
        </a>
      </div>
    </header>
  );
}
