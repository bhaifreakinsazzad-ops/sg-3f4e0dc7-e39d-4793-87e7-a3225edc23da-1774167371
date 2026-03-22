import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, Moon, Package, TrendingUp } from "lucide-react";

interface TrendChartsProps {
  feedingData: Array<{
    date: string;
    count: number;
    totalAmount: number;
  }>;
  sleepData: Array<{
    date: string;
    hours: number;
    quality: string;
  }>;
  diaperData: Array<{
    type: string;
    count: number;
  }>;
  growthData: Array<{
    date: string;
    weight: number;
    height: number;
    headCircumference: number;
  }>;
}

export function TrendCharts({
  feedingData,
  sleepData,
  diaperData,
  growthData,
}: TrendChartsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold font-baloo text-terracotta-600 mb-6">
        Trends & Analytics / প্রবণতা এবং বিশ্লেষণ
      </h2>

      <Tabs defaultValue="feeding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feeding" className="gap-2">
            <Utensils className="w-4 h-4" />
            <span className="hidden sm:inline">Feeding</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="gap-2">
            <Moon className="w-4 h-4" />
            <span className="hidden sm:inline">Sleep</span>
          </TabsTrigger>
          <TabsTrigger value="diaper" className="gap-2">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Diaper</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Growth</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feeding" className="space-y-6">
          <div className="h-[300px] flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 rounded-lg">
            <TrendingUp className="w-12 h-12 mb-4 text-neutral-300" />
            <p className="font-medium">Charts coming soon!</p>
            <p className="text-sm">Track data to see feeding trends</p>
          </div>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <div className="h-[300px] flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 rounded-lg">
            <Moon className="w-12 h-12 mb-4 text-neutral-300" />
            <p className="font-medium">Charts coming soon!</p>
            <p className="text-sm">Track data to see sleep patterns</p>
          </div>
        </TabsContent>

        <TabsContent value="diaper" className="space-y-6">
          <div className="h-[300px] flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 rounded-lg">
            <Package className="w-12 h-12 mb-4 text-neutral-300" />
            <p className="font-medium">Charts coming soon!</p>
            <p className="text-sm">Track data to see diaper distribution</p>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="h-[300px] flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 rounded-lg">
            <TrendingUp className="w-12 h-12 mb-4 text-neutral-300" />
            <p className="font-medium">Charts coming soon!</p>
            <p className="text-sm">Track data to see growth progression</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}