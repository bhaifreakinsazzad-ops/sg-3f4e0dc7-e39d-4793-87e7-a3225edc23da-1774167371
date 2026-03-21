import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Clock, MessageCircle, AlertCircle, Users, Camera, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Baby,
      title: "Smart Tracker",
      titleBn: "স্মার্ট ট্র্যাকার",
      description: "Feed, sleep, diaper, growth, health, vaccinations — voice quick-log in Bangla/English",
      descBn: "খাওয়া, ঘুম, ডায়াপার, বৃদ্ধি, স্বাস্থ্য, টিকা — ভয়েস কুইক-লগ বাংলা/ইংরেজিতে",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Clock,
      title: "Predictor",
      titleBn: "প্রেডিক্টর",
      description: "Alerts 10-20 min early: 'Hungry in 15 min,' 'Sleep now' — learns her patterns",
      descBn: "১০-২০ মিনিট আগে সতর্কতা: 'খাবার দিতে হবে ১৫ মিনিটে'",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: MessageCircle,
      title: "AI Assistant",
      titleBn: "এআই সহায়ক",
      description: "Chat: 'When to start solids?' 'Best diaper?' — Bangla + English, emergency mode instant",
      descBn: "চ্যাট করুন: 'কখন শক্ত খাবার শুরু করব?' 'সেরা ডায়াপার কোনটা?'",
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      icon: AlertCircle,
      title: "Emergency Guide",
      titleBn: "জরুরি গাইড",
      description: "Choking, fever, fall, breathing — step-by-step, 999, hospital GPS (Apollo/Square/DMC)",
      descBn: "শ্বাসরোধ, জ্বর, পড়ে যাওয়া — ধাপে ধাপে, ৯৯৯, হাসপাতাল জিপিএস",
      color: "bg-destructive/10 text-destructive",
    },
    {
      icon: Users,
      title: "Family Portal",
      titleBn: "পরিবার পোর্টাল",
      description: "Parents control. Aunt/uncle view: live status, weekly report, voice messages",
      descBn: "বাবা-মা নিয়ন্ত্রণ করেন। খালা/চাচা দেখতে পারেন: লাইভ স্ট্যাটাস, সাপ্তাহিক রিপোর্ট",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Camera,
      title: "Memory Vault",
      titleBn: "মেমরি ভল্ট",
      description: "Auto-capture moments, weekly video, year-one film, export at age 18",
      descBn: "স্বয়ংক্রিয় মুহূর্ত ধরা, সাপ্তাহিক ভিডিও, এক বছরের ফিল্ম",
      color: "bg-secondary/10 text-secondary",
    },
  ];

  return (
    <>
      <SEO
        title="Yusra's Manager — Your Personal Baby Care Assistant"
        description="Complete baby care app for Bangladeshi families. Track, predict, and manage your baby's health with AI-powered assistance in Bangla and English."
        image="/og-image.png"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-semibold text-foreground">Yusra&apos;s Manager</h1>
                <p className="text-xs text-muted-foreground bangla-text">ইউসরা'স ম্যানেজার</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Family Login
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-6 animate-fade-in">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Made with Love for Yusra
              </Badge>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Your Baby&apos;s Personal
                <br />
                <span className="bg-gradient-hero bg-clip-text text-transparent">Care Assistant</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto bangla-text">
                ইউসরার জন্য বিশেষভাবে তৈরি — ট্র্যাক করুন, পূর্বাভাস পান এবং আপনার শিশুর যত্ন নিন AI-এর সাহায্যে
              </p>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Track, predict, and manage your baby&apos;s health with AI-powered assistance in Bangla and English
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-elevated">
                  <Baby className="w-5 h-5 mr-2" />
                  Start Tracking
                </Button>
                <Button size="lg" variant="outline" className="shadow-soft">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Assistant
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Everything You Need
              </h3>
              <p className="text-muted-foreground bangla-text text-lg">
                আপনার প্রয়োজনীয় সব কিছু
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 card-soft hover:shadow-elevated transition-all duration-300 border-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-xl font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground bangla-text mb-3">
                      {feature.titleBn}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {feature.description}
                    </p>
                    <p className="text-xs text-muted-foreground bangla-text leading-relaxed">
                      {feature.descBn}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Offline Core Features</p>
                <p className="text-sm text-muted-foreground bangla-text">অফলাইনে কাজ করে</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2">&lt;10s</div>
                <p className="text-muted-foreground">Emergency Response Time</p>
                <p className="text-sm text-muted-foreground bangla-text">জরুরি প্রতিক্রিয়া সময়</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="text-4xl md:text-5xl font-heading font-bold text-accent-foreground mb-2">75%+</div>
                <p className="text-muted-foreground">Prediction Accuracy</p>
                <p className="text-sm text-muted-foreground bangla-text">পূর্বাভাস নির্ভুলতা</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-white/90 text-lg mb-3 bangla-text">
              আজই শুরু করুন ইউসরার যত্নের যাত্রা
            </p>
            <p className="text-white/80 mb-8">
              Join families across Bangladesh trusting AI-powered care for their little ones
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="shadow-elevated">
                <Baby className="w-5 h-5 mr-2" />
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p className="bangla-text">
                © 2026 Yusra&apos;s Manager — ভালোবাসার সাথে তৈরি
              </p>
              <p>
                Made with love in Bangladesh
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}