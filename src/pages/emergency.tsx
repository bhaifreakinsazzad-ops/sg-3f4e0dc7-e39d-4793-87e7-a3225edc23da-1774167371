import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Phone, MapPin, Activity, Thermometer, Wind, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Emergency() {
  const hospitals = [
    {
      name: "Apollo Hospitals Dhaka",
      bangla: "অ্যাপোলো হাসপাতাল ঢাকা",
      address: "Plot 81, Block E, Bashundhara R/A",
      phone: "+880 2 8401661",
      emergency: "10678",
      distance: "2.5 km",
    },
    {
      name: "Square Hospitals Ltd.",
      bangla: "স্কয়ার হাসপাতাল লিমিটেড",
      address: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath",
      phone: "+880 2 8159457",
      emergency: "10616",
      distance: "3.8 km",
    },
    {
      name: "United Hospital Limited",
      bangla: "ইউনাইটেড হাসপাতাল লিমিটেড",
      address: "Plot 15, Road 71, Gulshan",
      phone: "+880 2 8836000",
      emergency: "10666",
      distance: "4.2 km",
    },
    {
      name: "Lab Aid Hospital",
      bangla: "ল্যাব এইড হাসপাতাল",
      address: "House 1, Road 4, Dhanmondi",
      phone: "+880 2 8616830",
      emergency: "10606",
      distance: "5.1 km",
    },
  ];

  const emergencyProtocols = [
    {
      icon: AlertCircle,
      title: "Choking / দম বন্ধ",
      color: "bg-red-100 text-red-600",
      steps: [
        "১. শিশুকে কোলে নিন, মুখ নিচে করে রাখুন",
        "২. পিঠে ৫ বার হালকা চাপড় দিন",
        "৩. বুকে ৫ বার চাপ দিন",
        "৪. জরুরি নম্বরে কল করুন: 999",
        "5. Repeat back blows & chest thrusts until object comes out",
      ],
    },
    {
      icon: Thermometer,
      title: "High Fever / উচ্চ জ্বর",
      color: "bg-orange-100 text-orange-600",
      steps: [
        "১. তাপমাত্রা মাপুন (>100.4°F = জরুরি)",
        "২. হালকা কাপড় পরান",
        "৩. কুসুম গরম পানিতে স্পঞ্জ করুন",
        "৪. বুকের দুধ/পানি দিন",
        "5. If fever >103°F or baby under 3 months - call doctor immediately",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Falls / পড়ে যাওয়া",
      color: "bg-yellow-100 text-yellow-600",
      steps: [
        "১. শিশুকে নাড়াবেন না, স্থির রাখুন",
        "২. মাথায় আঘাতের চিহ্ন দেখুন",
        "৩. বমি/অজ্ঞান হলে সাথে সাথে ডাক্তার",
        "৪. ২৪ ঘন্টা পর্যবেক্ষণে রাখুন",
        "5. Watch for: unusual crying, sleepiness, vomiting, seizures",
      ],
    },
    {
      icon: Wind,
      title: "Breathing Issues / শ্বাসকষ্ট",
      color: "bg-blue-100 text-blue-600",
      steps: [
        "১. শিশুকে সোজা করে ধরুন",
        "২. জামা ঢিলা করুন",
        "৩. নাক পরিষ্কার করুন",
        "৪. সাথে সাথে 999 কল করুন",
        "5. Signs: fast breathing, chest pulling in, blue lips - EMERGENCY!",
      ],
    },
  ];

  return (
    <>
      <SEO title="Emergency Guide - Yusra's Manager" description="Quick emergency protocols and hospital contacts" />
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-red-600 mb-2">Emergency Guide</h1>
            <p className="text-neutral-600">জরুরি নির্দেশিকা - Quick access when every second counts</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-red-600">Emergency Contacts</h2>
                  <p className="text-sm text-neutral-600">জরুরি যোগাযোগ - Tap to call immediately</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <Button variant="destructive" size="lg" className="h-auto py-4 flex-col gap-2" asChild>
                  <a href="tel:999">
                    <Phone className="w-6 h-6" />
                    <span className="text-lg font-bold">999</span>
                    <span className="text-xs">National Emergency</span>
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2 border-red-300" asChild>
                  <a href="tel:10678">
                    <Phone className="w-6 h-6" />
                    <span className="text-lg font-bold">10678</span>
                    <span className="text-xs">Apollo Emergency</span>
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2 border-red-300" asChild>
                  <a href="tel:10616">
                    <Phone className="w-6 h-6" />
                    <span className="text-lg font-bold">10616</span>
                    <span className="text-xs">Square Emergency</span>
                  </a>
                </Button>
              </div>
            </Card>

            <Tabs defaultValue="protocols">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="protocols">Emergency Protocols</TabsTrigger>
                <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
              </TabsList>

              <TabsContent value="protocols" className="space-y-4">
                {emergencyProtocols.map((protocol, index) => {
                  const Icon = protocol.icon;
                  return (
                    <Card key={index} className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full ${protocol.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold">{protocol.title}</h3>
                      </div>
                      <ol className="space-y-3">
                        {protocol.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex gap-3">
                            <span className="font-bold text-terracotta-600 min-w-[24px]">
                              {stepIndex < 4 ? `${stepIndex + 1}.` : "⚠️"}
                            </span>
                            <span className="text-neutral-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="hospitals" className="space-y-4">
                {hospitals.map((hospital, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{hospital.name}</h3>
                        <p className="text-sm text-neutral-600 font-baloo">{hospital.bangla}</p>
                        <p className="text-sm text-neutral-500 mt-1">{hospital.address}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-terracotta-600">
                        <MapPin className="w-4 h-4" />
                        {hospital.distance}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${hospital.phone}`} className="gap-2">
                          <Phone className="w-4 h-4" />
                          Main: {hospital.phone}
                        </a>
                      </Button>
                      <Button variant="destructive" size="sm" asChild>
                        <a href={`tel:${hospital.emergency}`} className="gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Emergency: {hospital.emergency}
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + " " + hospital.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </>
  );
}