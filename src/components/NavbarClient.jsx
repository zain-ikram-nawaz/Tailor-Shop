"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Calculator, ImageIcon, Send, ShieldAlert, Scissors } from "lucide-react";

export default function NavbarClient() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = !!(session?.user?.role === "admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Price Calculator", path: "/calculator", icon: Calculator },
    { label: "Trending Designs", path: "/designs", icon: ImageIcon },
    { label: "Order Karein", path: "/lead-form", icon: Send },
  ];

  const handleLinkClick = (path) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick("/")}
            className="flex items-center space-x-3 cursor-pointer group text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
              <Scissors className="h-6 w-6" />
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight text-slate-900 block leading-none">
                Bisma <span className="text-emerald-600">Fashion</span>
              </span>
              <span className="font-mono text-[10px] tracking-wider text-slate-400 block mt-0.5 uppercase">
                Perfect Fit, Every Time
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path === "/designs" && pathname.startsWith("/designs/"));
              return (
                <button
                  id={`nav-link-${item.path.slice(1) || "home"}`}
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {isAdmin && (
              <button
                id="nav-link-admin"
                onClick={() => handleLinkClick("/admin")}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  pathname === "/admin"
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-600 hover:bg-rose-50/50 hover:text-rose-600"
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {isAdmin ? (
              <button
                id="nav-logout-btn"
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            ) : null}
            <button
              id="nav-cta-btn"
              onClick={() => handleLinkClick("/calculator")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
            >
              Price Janein
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              id="nav-mobile-calc"
              onClick={() => handleLinkClick("/calculator")}
              className="p-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
              title="Price Calculator"
            >
              <Calculator className="h-4 w-4" />
            </button>
            <button
              id="nav-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-inner">
          <div className="space-y-1">
            <button
              id="mobile-nav-home"
              onClick={() => handleLinkClick("/")}
              className={`flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname === "/" ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
              }`}
            >
              <span>Home</span>
            </button>
            {navItems.map((item) => (
              <button
                id={`mobile-nav-${item.path.slice(1)}`}
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname === item.path ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
            {isAdmin && (
              <button
                id="mobile-nav-admin"
                onClick={() => handleLinkClick("/admin")}
                className="flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-600"
              >
                <ShieldAlert className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </button>
            )}
          </div>
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            {isAdmin && (
              <button
                id="mobile-nav-logout"
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600"
              >
                Sign Out
              </button>
            )}
            <button
              id="mobile-nav-calc-cta"
              onClick={() => handleLinkClick("/calculator")}
              className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-colors"
            >
              Price Calculator
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
