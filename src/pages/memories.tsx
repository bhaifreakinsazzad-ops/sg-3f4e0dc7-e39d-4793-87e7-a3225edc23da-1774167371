import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Image as ImageIcon, Video, Calendar, Download } from "lucide-react";
import Image from "next/image";

export default function Memories() {
  const memories = [
    {
      date: "2026-03-21",
      title: "Yusra's Adorable Shark Hat",
      description: "Looking cozy and cute in her shark hoodie",
      image: "/yusra-shark-hat.jpg",
      type: "photo",
    },
    {
      date: "2026-03-20",
      title: "Portrait Session",
      description: "Beautiful portraits of our little one",
      image: "/yusra-portraits.jpg",
      type: "photo",
    },
    {
      date: "2026-03-19",
      title: "Peaceful Sleep",
      description: "Sleeping peacefully in her green outfit",
      image: "/yusra-sleeping-green.jpg",
      type: "photo",
    },
    {
      date: "2026-03-18",
      title: "Big Smiles",
      description: "Her beautiful smile brightens our day",
      image: "/yusra-smiling.jpg",
      type: "photo",
    },
  ];

  return (
    <>
      <SEO title="Memory Vault - Yusra's Manager" description="Capture and preserve Yusra's precious moments" />
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Memory Vault</h1>
            <p className="text-neutral-600">স্মৃতি ভান্ডার - Preserve every precious moment of Yusra's journey</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Yusra's Timeline</h2>
                    <p className="text-sm text-neutral-600">Birth to adulthood - every moment preserved</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                  <Button className="gap-2">
                    <Video className="w-4 h-4" />
                    Add Video
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memories.map((memory, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-64">
                      <Image
                        src={memory.image}
                        alt={memory.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        Photo
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-neutral-600 mb-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(memory.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className="font-semibold mb-1">{memory.title}</h3>
                      <p className="text-sm text-neutral-600">{memory.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="font-semibold mb-2">Weekly Compilations</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Automatic weekly video summaries of Yusra's highlights and milestones
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View This Week
                </Button>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-peach-600" />
                </div>
                <h3 className="font-semibold mb-2">Year-One Film</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Beautiful video montage of Yusra's first year, auto-generated from your uploads
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Create Preview
                </Button>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-terracotta-600" />
                </div>
                <h3 className="font-semibold mb-2">Export Archive</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Download complete data archive - photos, videos, tracking data, milestones
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Export All Data
                </Button>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-cream-100 to-sage-50">
              <h3 className="text-lg font-semibold mb-4">Memory Vault Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-terracotta-600 mt-2"></div>
                  <div>
                    <strong>Auto-Capture:</strong> Link photos to milestones automatically (e.g., "First smile", "First solid food")
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-sage-600 mt-2"></div>
                  <div>
                    <strong>Smart Organization:</strong> Searchable by date, milestone, person, or event type
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-peach-600 mt-2"></div>
                  <div>
                    <strong>Family Sharing:</strong> Grandparents and family can view and contribute memories
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-terracotta-600 mt-2"></div>
                  <div>
                    <strong>18-Year Archive:</strong> Complete export available when Yusra turns 18 - her entire childhood preserved
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}