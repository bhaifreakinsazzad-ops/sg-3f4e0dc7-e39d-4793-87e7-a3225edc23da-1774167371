import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Moon, Package, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import { VoiceQuickLog } from "@/components/VoiceQuickLog";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [babyId, setBabyId] = useState<string>("yusra-default");

  return (
    <>
      <SEO title="Dashboard - Yusra's Manager" description="Track Yusra's daily activities" />
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Dashboard</h1>
            <p className="text-neutral-600">ড্যাশবোর্ড - Today's Summary</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <VoiceQuickLog babyId={babyId} onSuccess={() => {}} />
            </div>

            <Card className="p-6 bg-gradient-to-br from-sage-50 to-cream-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-md overflow-hidden">
                  <Image
                    src="/yusra-smiling.jpg"
                    alt="Yusra"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Yusra</h2>
                  <p className="text-sm text-neutral-600">6 months old</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-neutral-600">Weight:</span>
                  <span className="font-medium">7.2 kg</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-neutral-600">Height:</span>
                  <span className="font-medium">65 cm</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-neutral-600">Next checkup:</span>
                  <span className="font-medium">5 days</span>
                </p>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/tracker?tab=feeding")}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-terracotta-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Today's Feeds</p>
                  <p className="text-2xl font-bold text-terracotta-600">-</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/tracker?tab=sleep")}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Sleep Hours</p>
                  <p className="text-2xl font-bold text-sage-600">-</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/tracker?tab=diaper")}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-peach-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Diaper Changes</p>
                  <p className="text-2xl font-bold text-peach-600">-</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/tracker?tab=growth")}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cream-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-terracotta-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Latest Weight</p>
                  <p className="text-2xl font-bold text-terracotta-600">-</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-terracotta-600" />
                Recent Activities
              </h2>
              <div className="space-y-3">
                <p className="text-center text-neutral-400 py-8">
                  Start logging activities to see them here
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                  onClick={() => router.push("/tracker?tab=feeding")}
                >
                  <Utensils className="w-5 h-5" />
                  <span className="text-xs">Log Feeding</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                  onClick={() => router.push("/tracker?tab=sleep")}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-xs">Log Sleep</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                  onClick={() => router.push("/tracker?tab=diaper")}
                >
                  <Package className="w-5 h-5" />
                  <span className="text-xs">Log Diaper</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                  onClick={() => router.push("/predictions")}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs">Predictions</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}