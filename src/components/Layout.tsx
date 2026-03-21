import { ReactNode } from "react";
import { Navigation, Sidebar } from "./Navigation";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-cream-50">
      <Sidebar />
      
      <div className="lg:pl-64">
        <header className="bg-white border-b border-cream-200 px-4 py-3 lg:px-6 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <h1 className="text-xl font-bold text-terracotta-600 font-baloo">Yusra's Manager</h1>
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              {user && (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{user.email}</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => signOut()} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      <Navigation />
    </div>
  );
}