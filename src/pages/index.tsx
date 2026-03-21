import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Baby, Brain, MessageCircle, Users, Camera, Shield, Heart, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          const { error: profileError } = await supabase.from("profiles").insert({
            id: authData.user.id,
            email,
            full_name: fullName,
          });

          if (profileError) throw profileError;

          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Yusra's Manager - AI-Powered Baby Care for Bangladesh"
        description="Complete baby care tracking, AI predictions, emergency guide, and family sharing - built for Bangladesh"
      />
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-peach-50">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/yusra-sleeping-green.jpg')] bg-cover bg-center opacity-5"></div>
          
          <div className="relative">
            <header className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <Baby className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-terracotta-600 font-baloo">Yusra's Manager</h1>
                    <p className="text-sm text-neutral-600">যুসরার ম্যানেজার</p>
                  </div>
                </div>
              </div>
            </header>

            <section className="container mx-auto px-4 py-12 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-terracotta-50 text-terracotta-600 px-4 py-2 rounded-full text-sm font-medium">
                    <Heart className="w-4 h-4" />
                    <span>Built with Love for Yusra</span>
                  </div>
                  
                  <h2 className="text-5xl lg:text-6xl font-bold text-neutral-900 font-baloo leading-tight">
                    Your AI-Powered
                    <span className="text-terracotta-600"> Baby Care</span> Companion
                  </h2>
                  
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Track, predict, and care for Yusra with intelligent insights, emergency guidance, and family connection - all designed for Bangladesh.
                  </p>
                  
                  <p className="text-lg font-baloo text-sage-600">
                    ট্র্যাক করুন, পূর্বাভাস দিন এবং যুসরার যত্ন নিন বুদ্ধিমান অন্তর্দৃষ্টি, জরুরি নির্দেশনা এবং পারিবারিক সংযোগ সহ।
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="text-lg px-8 gap-2" onClick={() => document.getElementById("auth-form")?.scrollIntoView({ behavior: "smooth" })}>
                      <Baby className="w-5 h-5" />
                      Get Started Free
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      Watch Demo
                    </Button>
                  </div>
                </div>

                <div className="relative h-[400px] lg:h-[600px] animate-fade-in-delayed">
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta-200 to-sage-200 rounded-3xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-1">
                    <Image
                      src="/yusra-portraits.jpg"
                      alt="Yusra"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold font-baloo mb-4">
                  Everything You Need in One Place
                </h3>
                <p className="text-lg text-neutral-600">
                  Comprehensive tools built specifically for Yusra's journey
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mb-4">
                    <Baby className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Smart Tracker</h4>
                  <p className="text-sm text-neutral-600 mb-2">Track feeding, sleep, diapers, growth with voice input in Bangla & English</p>
                  <p className="text-xs font-baloo text-sage-600">ভয়েস ইনপুট সহ খাওয়ানো, ঘুম, ডায়াপার ট্র্যাক করুন</p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-sage-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">AI Predictions</h4>
                  <p className="text-sm text-neutral-600 mb-2">Get 10-20 min early alerts for feeding, sleep, and care needs</p>
                  <p className="text-xs font-baloo text-sage-600">খাবার ও ঘুমের জন্য আগাম সতর্কতা পান</p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-peach-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">AI Assistant</h4>
                  <p className="text-sm text-neutral-600 mb-2">24/7 parenting advice, product recommendations, emergency guide</p>
                  <p className="text-xs font-baloo text-sage-600">২৪/৭ পরামর্শ ও জরুরি নির্দেশনা</p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Family Portal</h4>
                  <p className="text-sm text-neutral-600 mb-2">Share with grandparents, aunts, uncles - everyone stays connected</p>
                  <p className="text-xs font-baloo text-sage-600">পরিবারের সবাই সংযুক্ত থাকুন</p>
                </Card>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-terracotta-50 to-sage-50 rounded-3xl my-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold font-baloo mb-4">
                  Built for Bangladesh Families
                </h3>
                <p className="text-lg text-neutral-600">
                  Every feature designed with local context
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-terracotta-600" />
                  </div>
                  <h4 className="font-semibold mb-2">EPI Bangladesh Schedule</h4>
                  <p className="text-sm text-neutral-600">Automated vaccination reminders with local hospital integration</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-sage-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Local Shopping Assistant</h4>
                  <p className="text-sm text-neutral-600">Chaldal, Daraz integration with Bangladesh product recommendations</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-peach-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Emergency Hospitals</h4>
                  <p className="text-sm text-neutral-600">Apollo, Square, DMC, BIRDEM - one-tap access with GPS</p>
                </div>
              </div>
            </section>

            <section id="auth-form" className="container mx-auto px-4 py-16">
              <div className="max-w-md mx-auto">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-6 font-baloo">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h3>
                  
                  <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required={!isLogin}
                          placeholder="Enter your name"
                        />
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                    </Button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-terracotta-600 hover:underline"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>
                </Card>
              </div>
            </section>

            <footer className="container mx-auto px-4 py-12 border-t border-cream-200">
              <div className="text-center text-neutral-600">
                <p className="mb-2">© 2026 Yusra's Manager. Built with love for Yusra and her family.</p>
                <p className="text-sm font-baloo">যুসরা এবং তার পরিবারের জন্য ভালোবাসা দিয়ে তৈরি।</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}