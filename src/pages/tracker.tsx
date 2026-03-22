import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, Moon, Package, TrendingUp, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VoiceQuickLog } from "@/components/VoiceQuickLog";

export default function Tracker() {
  const router = useRouter();
  const { toast } = useToast();
  const babyId = "yusra-default";
  const [activeTab, setActiveTab] = useState("feeding");

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab as string);
    }
  }, [router.query]);

  const [feedingForm, setFeedingForm] = useState({
    feeding_time: new Date().toISOString().slice(0, 16),
    feeding_type: "breast",
    breast_side: "left",
    duration_minutes: "",
    amount_ml: "",
    notes: "",
  });

  const [sleepForm, setSleepForm] = useState({
    start_time: new Date().toISOString().slice(0, 16),
    end_time: "",
    sleep_quality: "good",
    location: "crib",
    notes: "",
  });

  const [diaperForm, setDiaperForm] = useState({
    change_time: new Date().toISOString().slice(0, 16),
    change_type: "wet",
    has_rash: false,
    notes: "",
  });

  const [growthForm, setGrowthForm] = useState({
    measurement_date: new Date().toISOString().split("T")[0],
    weight_kg: "",
    height_cm: "",
    head_circumference_cm: "",
    notes: "",
  });

  const handleFeedingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("feedings").insert({
      baby_id: babyId,
      ...feedingForm,
      duration_minutes: feedingForm.duration_minutes ? parseInt(feedingForm.duration_minutes) : null,
      amount_ml: feedingForm.amount_ml ? parseFloat(feedingForm.amount_ml) : null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Feeding logged successfully" });
      setFeedingForm({
        feeding_time: new Date().toISOString().slice(0, 16),
        feeding_type: "breast",
        breast_side: "left",
        duration_minutes: "",
        amount_ml: "",
        notes: "",
      });
    }
  };

  const handleSleepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("sleep_sessions").insert({
      baby_id: babyId,
      ...sleepForm,
      end_time: sleepForm.end_time || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Sleep logged successfully" });
      setSleepForm({
        start_time: new Date().toISOString().slice(0, 16),
        end_time: "",
        sleep_quality: "good",
        location: "crib",
        notes: "",
      });
    }
  };

  const handleDiaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("diaper_changes").insert({
      baby_id: babyId,
      change_time: diaperForm.change_time,
      change_type: diaperForm.change_type,
      has_rash: diaperForm.has_rash,
      notes: diaperForm.notes,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Diaper change logged successfully" });
      setDiaperForm({
        change_time: new Date().toISOString().slice(0, 16),
        change_type: "wet",
        has_rash: false,
        notes: "",
      });
    }
  };

  const handleGrowthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("growth_records").insert({
      baby_id: babyId,
      ...growthForm,
      weight_kg: growthForm.weight_kg ? parseFloat(growthForm.weight_kg) : null,
      height_cm: growthForm.height_cm ? parseFloat(growthForm.height_cm) : null,
      head_circumference_cm: growthForm.head_circumference_cm ? parseFloat(growthForm.head_circumference_cm) : null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Growth measurement logged successfully" });
      setGrowthForm({
        measurement_date: new Date().toISOString().split("T")[0],
        weight_kg: "",
        height_cm: "",
        head_circumference_cm: "",
        notes: "",
      });
    }
  };

  return (
    <>
      <SEO title="Tracker - Yusra's Manager" description="Track Yusra's daily activities" />
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Tracker</h1>
            <p className="text-neutral-600">ট্র্যাকার - Log Yusra's Activities</p>
          </div>

          <div className="mb-6">
            <VoiceQuickLog babyId={babyId} onSuccess={() => {}} />
          </div>

          <Tabs defaultValue="feeding" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
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

            <TabsContent value="feeding">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-terracotta-600" />
                  Log Feeding / খাবার লগ করুন
                </h2>
                <form onSubmit={handleFeedingSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="feeding_time">Time / সময়</Label>
                    <Input
                      id="feeding_time"
                      type="datetime-local"
                      value={feedingForm.feeding_time}
                      onChange={(e) => setFeedingForm({ ...feedingForm, feeding_time: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="feeding_type">Type / ধরন</Label>
                    <Select
                      value={feedingForm.feeding_type}
                      onValueChange={(value) => setFeedingForm({ ...feedingForm, feeding_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breast">Breast / বুকের দুধ</SelectItem>
                        <SelectItem value="bottle">Bottle / বোতল</SelectItem>
                        <SelectItem value="solid">Solid / কঠিন খাবার</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {feedingForm.feeding_type === "breast" && (
                    <div>
                      <Label htmlFor="breast_side">Side / পাশ</Label>
                      <Select
                        value={feedingForm.breast_side || "left"}
                        onValueChange={(value) => setFeedingForm({ ...feedingForm, breast_side: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left / বাম</SelectItem>
                          <SelectItem value="right">Right / ডান</SelectItem>
                          <SelectItem value="both">Both / উভয়</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                      <Input
                        id="duration_minutes"
                        type="number"
                        value={feedingForm.duration_minutes}
                        onChange={(e) => setFeedingForm({ ...feedingForm, duration_minutes: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount_ml">Amount (ml)</Label>
                      <Input
                        id="amount_ml"
                        type="number"
                        step="0.1"
                        value={feedingForm.amount_ml}
                        onChange={(e) => setFeedingForm({ ...feedingForm, amount_ml: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="feeding_notes">Notes / নোট</Label>
                    <Textarea
                      id="feeding_notes"
                      value={feedingForm.notes}
                      onChange={(e) => setFeedingForm({ ...feedingForm, notes: e.target.value })}
                      placeholder="Any observations..."
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Feeding / খাবার সংরক্ষণ করুন
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="sleep">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-sage-600" />
                  Log Sleep / ঘুম লগ করুন
                </h2>
                <form onSubmit={handleSleepSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_time">Start Time / শুরুর সময়</Label>
                      <Input
                        id="start_time"
                        type="datetime-local"
                        value={sleepForm.start_time}
                        onChange={(e) => setSleepForm({ ...sleepForm, start_time: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_time">End Time / শেষ সময় (optional)</Label>
                      <Input
                        id="end_time"
                        type="datetime-local"
                        value={sleepForm.end_time}
                        onChange={(e) => setSleepForm({ ...sleepForm, end_time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sleep_quality">Quality / মান</Label>
                    <Select
                      value={sleepForm.sleep_quality}
                      onValueChange={(value) => setSleepForm({ ...sleepForm, sleep_quality: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent / চমৎকার</SelectItem>
                        <SelectItem value="good">Good / ভালো</SelectItem>
                        <SelectItem value="fair">Fair / মোটামুটি</SelectItem>
                        <SelectItem value="poor">Poor / খারাপ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location / স্থান</Label>
                    <Select
                      value={sleepForm.location}
                      onValueChange={(value) => setSleepForm({ ...sleepForm, location: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crib">Crib / খাট</SelectItem>
                        <SelectItem value="bed">Bed / বিছানা</SelectItem>
                        <SelectItem value="stroller">Stroller / গাড়ি</SelectItem>
                        <SelectItem value="carrier">Carrier / ক্যারিয়ার</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sleep_notes">Notes / নোট</Label>
                    <Textarea
                      id="sleep_notes"
                      value={sleepForm.notes}
                      onChange={(e) => setSleepForm({ ...sleepForm, notes: e.target.value })}
                      placeholder="Any observations..."
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Sleep / ঘুম সংরক্ষণ করুন
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="diaper">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-peach-600" />
                  Log Diaper Change / ডায়াপার পরিবর্তন লগ করুন
                </h2>
                <form onSubmit={handleDiaperSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="change_time">Time / সময়</Label>
                    <Input
                      id="change_time"
                      type="datetime-local"
                      value={diaperForm.change_time}
                      onChange={(e) => setDiaperForm({ ...diaperForm, change_time: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="change_type">Type / ধরন</Label>
                    <Select
                      value={diaperForm.change_type}
                      onValueChange={(value) => setDiaperForm({ ...diaperForm, change_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wet">Wet / ভেজা</SelectItem>
                        <SelectItem value="dirty">Dirty / নোংরা</SelectItem>
                        <SelectItem value="both">Both / উভয়</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="has_rash"
                      checked={diaperForm.has_rash}
                      onChange={(e) => setDiaperForm({ ...diaperForm, has_rash: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="has_rash">Has Rash / ফুসকুড়ি আছে</Label>
                  </div>

                  <div>
                    <Label htmlFor="diaper_notes">Notes / নোট</Label>
                    <Textarea
                      id="diaper_notes"
                      value={diaperForm.notes}
                      onChange={(e) => setDiaperForm({ ...diaperForm, notes: e.target.value })}
                      placeholder="Any observations..."
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Diaper Change / ডায়াপার সংরক্ষণ করুন
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="growth">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-terracotta-600" />
                  Log Growth / বৃদ্ধি লগ করুন
                </h2>
                <form onSubmit={handleGrowthSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="measurement_date">Date / তারিখ</Label>
                    <Input
                      id="measurement_date"
                      type="date"
                      value={growthForm.measurement_date}
                      onChange={(e) => setGrowthForm({ ...growthForm, measurement_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weight_kg">Weight (kg)</Label>
                      <Input
                        id="weight_kg"
                        type="number"
                        step="0.01"
                        value={growthForm.weight_kg}
                        onChange={(e) => setGrowthForm({ ...growthForm, weight_kg: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height_cm">Height (cm)</Label>
                      <Input
                        id="height_cm"
                        type="number"
                        step="0.1"
                        value={growthForm.height_cm}
                        onChange={(e) => setGrowthForm({ ...growthForm, height_cm: e.target.value })}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="head_circumference_cm">Head (cm)</Label>
                      <Input
                        id="head_circumference_cm"
                        type="number"
                        step="0.1"
                        value={growthForm.head_circumference_cm}
                        onChange={(e) => setGrowthForm({ ...growthForm, head_circumference_cm: e.target.value })}
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="growth_notes">Notes / নোট</Label>
                    <Textarea
                      id="growth_notes"
                      value={growthForm.notes}
                      onChange={(e) => setGrowthForm({ ...growthForm, notes: e.target.value })}
                      placeholder="Any observations..."
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Measurement / পরিমাপ সংরক্ষণ করুন
                  </Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}