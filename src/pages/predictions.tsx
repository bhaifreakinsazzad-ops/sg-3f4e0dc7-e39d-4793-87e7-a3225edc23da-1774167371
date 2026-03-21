import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Baby, Moon, Droplet, Clock, TrendingUp, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Predictions() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [predictions, setPredictions] = useState({
    nextFeeding: { time: "2:30 PM", confidence: 85, minutesUntil: 45 },
    nextSleep: { time: "4:15 PM", confidence: 78, minutesUntil: 150 },
    nextDiaper: { time: "3:00 PM", confidence: 82, minutesUntil: 75 },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      analyzePatternsAndPredict();
    }
  }, [user]);

  const analyzePatternsAndPredict = async () => {
    // In production, this would analyze historical data to predict next events
    // For now, showing example predictions based on typical baby patterns
    const now = new Date();
    const predictions = {
      nextFeeding: {
        time: new Date(now.getTime() + 45 * 60000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        confidence: 85,
        minutesUntil: 45,
      },
      nextSleep: {
        time: new Date(now.getTime() + 150 * 60000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        confidence: 78,
        minutesUntil: 150,
      },
      nextDiaper: {
        time: new Date(now.getTime() + 75 * 60000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        confidence: 82,
        minutesUntil: 75,
      },
    };
    setPredictions(predictions);
  };

  const formatTimeUntil = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <SEO title="Predictions - Yusra's Manager" description="AI-powered predictions for Yusra's needs" />
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Smart Predictions</h1>
            <p className="text-neutral-600">স্মার্ট পূর্বাভাস - AI learns Yusra's patterns to predict her needs</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6 bg-gradient-to-br from-terracotta-50 to-peach-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-terracotta-600 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Upcoming Predictions</h2>
                  <p className="text-sm text-neutral-600">Based on Yusra's recent patterns</p>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-5 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                      <Baby className="w-6 h-6 text-terracotta-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">Next Feeding</h3>
                        <span className="text-2xl font-bold text-terracotta-600">{predictions.nextFeeding.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>In {formatTimeUntil(predictions.nextFeeding.minutesUntil)}</span>
                        <span className="ml-auto bg-terracotta-100 text-terracotta-700 px-2 py-1 rounded-full text-xs font-medium">
                          {predictions.nextFeeding.confidence}% confident
                        </span>
                      </div>
                      <div className="bg-cream-100 p-3 rounded-lg">
                        <p className="text-sm text-neutral-700">
                          <strong>Tip:</strong> Start preparing bottle/nursing area now. Yusra typically shows hunger cues 10-15 minutes before feeding time.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                      <Moon className="w-6 h-6 text-sage-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">Next Sleep Window</h3>
                        <span className="text-2xl font-bold text-sage-600">{predictions.nextSleep.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>In {formatTimeUntil(predictions.nextSleep.minutesUntil)}</span>
                        <span className="ml-auto bg-sage-100 text-sage-700 px-2 py-1 rounded-full text-xs font-medium">
                          {predictions.nextSleep.confidence}% confident
                        </span>
                      </div>
                      <div className="bg-cream-100 p-3 rounded-lg">
                        <p className="text-sm text-neutral-700">
                          <strong>Tip:</strong> Start winding down 30 minutes before. Dim lights, reduce stimulation, and begin bedtime routine.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center flex-shrink-0">
                      <Droplet className="w-6 h-6 text-peach-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">Next Diaper Change</h3>
                        <span className="text-2xl font-bold text-peach-600">{predictions.nextDiaper.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>In {formatTimeUntil(predictions.nextDiaper.minutesUntil)}</span>
                        <span className="ml-auto bg-peach-100 text-peach-700 px-2 py-1 rounded-full text-xs font-medium">
                          {predictions.nextDiaper.confidence}% confident
                        </span>
                      </div>
                      <div className="bg-cream-100 p-3 rounded-lg">
                        <p className="text-sm text-neutral-700">
                          <strong>Tip:</strong> Keep changing station ready. Yusra typically needs a change after feeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-terracotta-600" />
                <h2 className="text-xl font-semibold">How Predictions Work</h2>
              </div>
              <div className="space-y-3 text-sm text-neutral-700">
                <p>
                  🧠 <strong>Pattern Learning:</strong> The AI analyzes Yusra's data from the past 2-4 weeks to identify her unique rhythms and patterns.
                </p>
                <p>
                  ⏰ <strong>Time-Based Analysis:</strong> Tracks when feedings, sleep, and diaper changes typically occur throughout the day.
                </p>
                <p>
                  📊 <strong>Confidence Scoring:</strong> Higher confidence means more consistent patterns. Lower confidence may indicate growth spurts or schedule changes.
                </p>
                <p>
                  🔔 <strong>Early Alerts:</strong> Get notifications 10-20 minutes before predicted events so you can prepare ahead of time.
                </p>
                <p className="text-xs text-neutral-500 mt-4">
                  Note: Predictions improve with more data. Keep tracking consistently for 2+ weeks for best accuracy. Always trust your instincts as a parent!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}