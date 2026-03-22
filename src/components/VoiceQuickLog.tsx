import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Loader2, Check } from "lucide-react";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useToast } from "@/hooks/use-toast";
import { trackerService } from "@/services/trackerService";

interface VoiceQuickLogProps {
  babyId: string;
  onSuccess?: () => void;
}

export function VoiceQuickLog({ babyId, onSuccess }: VoiceQuickLogProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedAction, setDetectedAction] = useState<string | null>(null);

  const handleVoiceResult = async (result: { transcript: string; confidence: number }) => {
    setIsProcessing(true);
    const text = result.transcript.toLowerCase();

    try {
      // Feeding keywords (Bangla + English)
      if (
        text.includes("fed") ||
        text.includes("feeding") ||
        text.includes("খাওয়ালাম") ||
        text.includes("দুধ") ||
        text.includes("bottle") ||
        text.includes("breast")
      ) {
        setDetectedAction("Feeding");

        // Extract details
        const isBangla = text.includes("দুধ") || text.includes("খাওয়ালাম");
        let feedingType: "breast" | "bottle" | "solid" = "breast";
        let amount = null;

        if (text.includes("bottle") || text.includes("বোতল")) {
          feedingType = "bottle";
          // Try to extract amount (e.g., "100ml", "৫০ ml")
          const mlMatch = text.match(/(\d+)\s*ml/i);
          if (mlMatch) amount = parseInt(mlMatch[1]);
        } else if (text.includes("solid") || text.includes("খাবার")) {
          feedingType = "solid";
        }

        await trackerService.addFeeding({
          baby_id: babyId,
          feeding_time: new Date().toISOString(),
          feeding_type: feedingType,
          amount_ml: amount,
          duration_minutes: feedingType === "breast" ? 15 : null,
          notes: isBangla ? "ভয়েস দ্বারা যোগ করা হয়েছে" : "Added by voice",
        });

        toast({
          title: "✅ Feeding Logged",
          description: `${feedingType} feeding recorded${amount ? ` - ${amount}ml` : ""}`,
        });
      }
      // Sleep keywords
      else if (
        text.includes("sleep") ||
        text.includes("sleeping") ||
        text.includes("ঘুম") ||
        text.includes("ঘুমাচ্ছে") ||
        text.includes("nap")
      ) {
        setDetectedAction("Sleep");

        await trackerService.addSleep({
          baby_id: babyId,
          start_time: new Date().toISOString(),
          sleep_quality: "good",
          location: "crib",
          notes: text.includes("ঘুম") ? "ভয়েস দ্বারা যোগ করা হয়েছে" : "Added by voice",
        });

        toast({
          title: "✅ Sleep Started",
          description: "Sleep session recorded. Remember to log when Yusra wakes up!",
        });
      }
      // Diaper keywords
      else if (
        text.includes("diaper") ||
        text.includes("ডায়াপার") ||
        text.includes("changed") ||
        text.includes("বদলানো") ||
        text.includes("wet") ||
        text.includes("dirty") ||
        text.includes("poop")
      ) {
        setDetectedAction("Diaper");

        let changeType: "wet" | "dirty" | "both" = "wet";
        if (text.includes("dirty") || text.includes("poop") || text.includes("মল")) {
          changeType = "dirty";
        }
        if (text.includes("both") || text.includes("উভয়")) {
          changeType = "both";
        }

        const hasRash = text.includes("rash") || text.includes("র‍্যাশ");

        await trackerService.addDiaper({
          baby_id: babyId,
          change_time: new Date().toISOString(),
          change_type: changeType,
          has_rash: hasRash,
          notes: text.includes("ডায়াপার") ? "ভয়েস দ্বারা যোগ করা হয়েছে" : "Added by voice",
        });

        toast({
          title: "✅ Diaper Changed",
          description: `${changeType} diaper logged${hasRash ? " (rash noted)" : ""}`,
        });
      } else {
        toast({
          title: "❓ Not Recognized",
          description: `Couldn't understand: "${result.transcript}". Try saying "fed Yusra" or "ডায়াপার বদলানো"`,
          variant: "destructive",
        });
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => setDetectedAction(null), 2000);
    }
  };

  const { isListening, transcript, error, isSupported, startListening, stopListening } =
    useVoiceRecognition({
      language: "auto",
      continuous: false,
      onResult: handleVoiceResult,
    });

  if (!isSupported) {
    return (
      <Card className="p-4 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-800">
          ⚠️ Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-terracotta-50 to-peach-50">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-red-500 animate-pulse"
                : detectedAction
                ? "bg-green-500"
                : "bg-terracotta-100"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : detectedAction ? (
              <Check className="w-8 h-8 text-white" />
            ) : isListening ? (
              <Mic className="w-8 h-8 text-white" />
            ) : (
              <MicOff className="w-8 h-8 text-terracotta-600" />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold font-baloo text-terracotta-700">
            Voice Quick Log
          </h3>
          <p className="text-sm text-neutral-600">ভয়েস কুইক লগ</p>
        </div>

        {isListening && (
          <div className="p-4 bg-white rounded-lg border-2 border-red-500">
            <p className="text-sm text-neutral-500 mb-2">Listening... / শুনছি...</p>
            <p className="font-medium text-neutral-800">{transcript || "Say something..."}</p>
          </div>
        )}

        {detectedAction && (
          <div className="p-3 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">✅ {detectedAction} logged!</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={isListening ? stopListening : startListening}
          className={`w-full gap-2 ${
            isListening ? "bg-red-600 hover:bg-red-700" : "bg-terracotta-600 hover:bg-terracotta-700"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Voice Log
            </>
          )}
        </Button>

        <div className="text-xs text-neutral-600 space-y-1 pt-2">
          <p className="font-medium">Examples / উদাহরণ:</p>
          <p>🗣️ "Fed Yusra 100ml bottle"</p>
          <p>🗣️ "Yusra is sleeping"</p>
          <p>🗣️ "Changed diaper - dirty"</p>
          <p>🗣️ "যুসরাকে দুধ খাওয়ালাম"</p>
          <p>🗣️ "ডায়াপার বদলানো হয়েছে"</p>
          <p>🗣️ "যুসরা ঘুমাচ্ছে"</p>
        </div>
      </div>
    </Card>
  );
}