import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, TrendingUp, ExternalLink, AlertCircle } from "lucide-react";

export default function Shopping() {
  const shoppingLists = {
    urgent: [
      { item: "Diapers (Huggies Newborn)", quantity: "1 pack (28 pcs)", reason: "Predicted to run out in 2 days" },
      { item: "Baby Wipes (Johnson's)", quantity: "2 packs", reason: "Low stock alert" },
    ],
    weekly: [
      { item: "Formula Milk (Aptamil)", quantity: "2 tins", reason: "Regular weekly consumption" },
      { item: "Baby Soap (Dove)", quantity: "1 bar", reason: "Routine restock" },
    ],
    monthly: [
      { item: "Diapers (Size 1)", quantity: "4 packs", reason: "Monthly estimate based on usage" },
      { item: "Cotton Buds", quantity: "1 box", reason: "Monthly routine item" },
    ],
  };

  const recommendations = [
    {
      category: "Diapers",
      brands: [
        { name: "Huggies", price: "৳850/pack", rating: "4.5/5", available: "Chaldal, Daraz" },
        { name: "Pampers", price: "৳920/pack", rating: "4.7/5", available: "Chaldal, Shwapno" },
        { name: "MamyPoko", price: "৳780/pack", rating: "4.3/5", available: "Daraz, Pickaboo" },
      ],
    },
    {
      category: "Baby Food",
      brands: [
        { name: "Cerelac (Nestle)", price: "৳340/box", rating: "4.6/5", available: "All stores" },
        { name: "Aptamil", price: "৳2,800/tin", rating: "4.8/5", available: "Chaldal, Lazz Pharma" },
        { name: "Kazi Farms Baby Food", price: "৳180/jar", rating: "4.4/5", available: "Chaldal, Agora" },
      ],
    },
  ];

  return (
    <>
      <SEO title="Shopping Assistant - Yusra's Manager" description="Smart shopping lists and recommendations for Bangladesh" />
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Shopping Assistant</h1>
            <p className="text-neutral-600">কেনাকাটা সহায়ক - Smart lists based on Yusra's usage patterns</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-red-700">Urgent - Buy Today</h2>
                  <p className="text-sm text-neutral-600">জরুরি - আজই কিনুন</p>
                </div>
              </div>
              <div className="space-y-3">
                {shoppingLists.urgent.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.item}</h3>
                      <p className="text-sm text-neutral-600">{item.quantity}</p>
                      <p className="text-xs text-red-600 mt-1">{item.reason}</p>
                    </div>
                    <Button size="sm" className="gap-2" asChild>
                      <a href="https://chaldal.com" target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="w-4 h-4" />
                        Buy on Chaldal
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-sage-600" />
                <h2 className="text-xl font-semibold">This Week's Shopping List</h2>
              </div>
              <div className="space-y-3">
                {shoppingLists.weekly.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{item.item}</h3>
                      <p className="text-sm text-neutral-600">{item.quantity}</p>
                    </div>
                    <Button size="sm" variant="outline">Add to Cart</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-terracotta-600" />
                <h2 className="text-xl font-semibold">Product Recommendations</h2>
              </div>
              <div className="space-y-6">
                {recommendations.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-3">{category.category}</h3>
                    <div className="grid md:grid-cols-3 gap-3">
                      {category.brands.map((brand, brandIndex) => (
                        <Card key={brandIndex} className="p-4 hover:shadow-lg transition-shadow">
                          <h4 className="font-semibold mb-2">{brand.name}</h4>
                          <div className="space-y-1 text-sm text-neutral-600 mb-3">
                            <p>Price: {brand.price}</p>
                            <p>Rating: {brand.rating}</p>
                            <p className="text-xs">Available: {brand.available}</p>
                          </div>
                          <Button size="sm" variant="outline" className="w-full gap-2">
                            <ExternalLink className="w-3 h-3" />
                            Compare Prices
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-sage-50 to-cream-50">
              <h3 className="text-lg font-semibold mb-4">Shopping Assistant Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-700">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-terracotta-600 mt-2"></div>
                  <div>
                    <strong>Usage Tracking:</strong> Monitors diaper, formula, and product consumption patterns
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-sage-600 mt-2"></div>
                  <div>
                    <strong>Smart Predictions:</strong> Alerts you 2-3 days before running out of essentials
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-peach-600 mt-2"></div>
                  <div>
                    <strong>Bangladesh Pricing:</strong> Real prices from Chaldal, Daraz, Shwapno, Agora
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-terracotta-600 mt-2"></div>
                  <div>
                    <strong>Budget Tracking:</strong> Monthly baby expense reports and savings tips
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