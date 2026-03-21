import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Baby, Pill, ShoppingCart, Heart } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Assistant() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "নমস্কার! আমি যুসরার সহায়ক। আপনার কোন প্রশ্ন আছে? Hello! I'm Yusra's Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const quickQuestions = [
    { icon: Baby, text: "When to start solid foods?", bangla: "কখন কঠিন খাবার শুরু করবো?" },
    { icon: Pill, text: "Teething remedies?", bangla: "দাঁত ওঠার সমাধান?" },
    { icon: ShoppingCart, text: "Best diaper brands in Bangladesh?", bangla: "বাংলাদেশে সেরা ডায়াপার?" },
    { icon: Heart, text: "Sleep training tips?", bangla: "ঘুমের প্রশিক্ষণ টিপস?" },
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: `I understand you're asking about: "${input}". Based on Yusra's age and development, here's my advice...\n\nFor personalized medical advice, always consult your pediatrician. Would you like me to help you find nearby pediatric clinics in Dhaka?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
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
      <SEO title="AI Assistant - Yusra's Manager" description="Get instant parenting advice for Yusra" />
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Yusra's Assistant</h1>
            <p className="text-neutral-600">যুসরার সহায়ক - Ask anything about Yusra's care in Bangla or English</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-terracotta-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Chat with AI Assistant</h2>
                  <p className="text-sm text-neutral-600">Available 24/7 in Bangla & English</p>
                </div>
              </div>

              <ScrollArea className="h-[400px] border rounded-lg p-4 mb-4 bg-cream-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-terracotta-600 text-white"
                            : "bg-white border border-cream-200"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-cream-200 rounded-2xl p-4">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-terracotta-600 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-terracotta-600 animate-bounce delay-100"></div>
                          <div className="w-2 h-2 rounded-full bg-terracotta-600 animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything about Yusra... প্রশ্ন করুন..."
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Questions / দ্রুত প্রশ্ন</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {quickQuestions.map((question, index) => {
                  const Icon = question.icon;
                  return (
                    <Card
                      key={index}
                      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleQuickQuestion(question.text)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-sage-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{question.text}</p>
                          <p className="text-xs text-neutral-600 font-baloo">{question.bangla}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}