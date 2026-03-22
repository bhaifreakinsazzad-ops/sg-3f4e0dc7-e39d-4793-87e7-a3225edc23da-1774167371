import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Activity, Calendar, MessageCircle, AlertCircle, Users, Camera, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "হোম", labelEn: "Home" },
  { href: "/tracker", icon: Activity, label: "ট্র্যাকার", labelEn: "Tracker" },
  { href: "/predictions", icon: Calendar, label: "পূর্বাভাস", labelEn: "Predictions" },
  { href: "/assistant", icon: MessageCircle, label: "সহায়ক", labelEn: "Assistant" },
  { href: "/emergency", icon: AlertCircle, label: "জরুরি", labelEn: "Emergency" },
  { href: "/family", icon: Users, label: "পরিবার", labelEn: "Family" },
  { href: "/memories", icon: Camera, label: "স্মৃতি", labelEn: "Memories" },
  { href: "/shopping", icon: ShoppingCart, label: "কেনাকাটা", labelEn: "Shopping" },
];

export function Navigation() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 z-50 lg:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive ? "text-terracotta-600" : "text-neutral-600 hover:text-terracotta-500"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.labelEn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const router = useRouter();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-cream-200 fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-cream-200">
        <h1 className="text-2xl font-bold text-terracotta-600 font-baloo">Yusra's Manager</h1>
        <p className="text-sm text-neutral-600 mt-1">যুসরার ম্যানেজার</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all",
                isActive
                  ? "bg-terracotta-50 text-terracotta-600 font-medium"
                  : "text-neutral-700 hover:bg-cream-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="text-sm">{item.labelEn}</div>
                <div className="text-xs opacity-70">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}