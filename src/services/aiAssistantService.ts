// AI Assistant Service for Yusra's Manager
// Uses OpenAI API for bilingual (Bangla + English) parenting assistance

export const aiAssistantService = {
  async sendMessage(message: string, context?: {
    babyAge?: number;
    recentFeedings?: number;
    recentSleep?: number;
    language?: "bengali" | "english" | "mixed";
  }) {
    // This would connect to OpenAI API in production
    // For now, return mock responses based on common queries
    
    const lowerMessage = message.toLowerCase();
    
    // Emergency keywords
    if (lowerMessage.includes("emergency") || lowerMessage.includes("জরুরি") || 
        lowerMessage.includes("choking") || lowerMessage.includes("fever") || 
        lowerMessage.includes("জ্বর")) {
      return {
        message: "🚨 EMERGENCY DETECTED\n\nI'm switching you to emergency mode. Please go to the Emergency tab for immediate step-by-step guidance.\n\n🚨 জরুরি পরিস্থিতি শনাক্ত হয়েছে\n\nতাৎক্ষণিক নির্দেশনার জন্য Emergency ট্যাবে যান।",
        isEmergency: true,
      };
    }

    // Solid foods
    if (lowerMessage.includes("solid") || lowerMessage.includes("খাবার") || lowerMessage.includes("rice")) {
      return {
        message: "Starting Solids / কঠিন খাবার শুরু করা:\n\nFor Yusra (4-6 months):\n✅ Start at 6 months (WHO recommendation)\n✅ Begin with rice cereal or mashed banana\n✅ One new food every 3-4 days\n✅ Watch for allergies\n\nবাংলাদেশি খাবার:\n- সুজি (Suji porridge)\n- চালের গুঁড়া (Rice powder)\n- কলা (Mashed banana)\n- মিষ্টি কুমড়া (Sweet pumpkin)\n\nAvoid: Honey (before 1 year), salt, sugar, cow's milk (before 1 year)",
        isEmergency: false,
      };
    }

    // Diaper recommendations
    if (lowerMessage.includes("diaper") || lowerMessage.includes("ডায়াপার")) {
      return {
        message: "Bangladesh Diaper Recommendations:\n\n🏆 Top Choices:\n1. **Pampers** - Best absorption, available at Chaldal\n2. **Huggies** - Good quality, widely available\n3. **MamyPoko** - Value for money\n4. **Molfix** - Budget option\n\nRash Prevention:\n✅ Change every 2-3 hours\n✅ Use Sudocrem or Bepanthen\n✅ Air dry time 10 min/day\n✅ Check for allergies\n\n📦 Where to buy:\n- Chaldal.com (home delivery)\n- Shwapno, Agora, Meena Bazar\n- Pharmacy: Lazz Pharma, Healthcare",
        isEmergency: false,
      };
    }

    // Sleep training
    if (lowerMessage.includes("sleep") || lowerMessage.includes("ঘুম")) {
      return {
        message: "Sleep Tips for Yusra:\n\n🌙 Newborn (0-3 months):\n- Total: 14-17 hours/day\n- Naps: 4-5 times\n- Night: 8-9 hours (with feeds)\n\n🌟 Sleep Training (4+ months):\n✅ Bedtime routine (bath, massage, lullaby)\n✅ Same time every night\n✅ Dark, cool room (25-27°C)\n✅ White noise or fan\n\nঘুমের সমস্যা?\n- Overtiredness: Watch for yawns, fussy\n- Undertiredness: Longer wake windows\n- Check diaper, temperature, hunger\n\nDhaka tip: AC/fan at 27°C, not too cold!",
        isEmergency: false,
      };
    }

    // Default response
    return {
      message: "I'm Yusra's AI Assistant! 👶\n\nআমি যুসরার AI সহকারী!\n\nI can help with:\n✅ Feeding & nutrition (খাওয়ানো)\n✅ Sleep tips (ঘুম)\n✅ Diaper recommendations (ডায়াপার)\n✅ Health concerns (স্বাস্থ্য)\n✅ Product advice (পণ্য পরামর্শ)\n✅ Emergency guidance (জরুরি)\n\nAsk me anything in Bangla or English!",
      isEmergency: false,
    };
  },

  async getProductRecommendations(category: "diapers" | "formula" | "toys" | "clothing") {
    const recommendations: Record<string, any> = {
      diapers: {
        title: "Best Diapers in Bangladesh",
        products: [
          { name: "Pampers Premium Care", price: "৳1,200-1,500/pack", where: "Chaldal, Shwapno", rating: 4.8 },
          { name: "Huggies Dry", price: "৳900-1,200/pack", where: "Agora, Meena Bazar", rating: 4.6 },
          { name: "MamyPoko Pants", price: "৳700-900/pack", where: "Everywhere", rating: 4.4 },
        ],
      },
      formula: {
        title: "Baby Formula (If Needed)",
        products: [
          { name: "Similac Advance", price: "৳1,800-2,200/tin", where: "Pharmacy", rating: 4.7 },
          { name: "Enfamil A+", price: "৳1,600-2,000/tin", where: "Lazz Pharma", rating: 4.6 },
          { name: "Lactogen", price: "৳1,200-1,500/tin", where: "Most pharmacies", rating: 4.3 },
        ],
      },
      toys: {
        title: "Age-Appropriate Toys",
        products: [
          { name: "Soft rattles", price: "৳200-500", where: "Aarong, Babies World", rating: 4.5 },
          { name: "Play gym", price: "৳2,500-4,000", where: "Chaldal, Baby Shop", rating: 4.7 },
          { name: "Teething toys", price: "৳300-800", where: "Pharmacy, Chaldal", rating: 4.6 },
        ],
      },
      clothing: {
        title: "Baby Clothing",
        products: [
          { name: "Cotton bodysuits", price: "৳300-600", where: "Aarong, Babies World", rating: 4.5 },
          { name: "Sleep suits", price: "৳400-800", where: "Yellow, Hallmark", rating: 4.4 },
          { name: "Soft blankets", price: "৳500-1,200", where: "Aarong", rating: 4.7 },
        ],
      },
    };

    return recommendations[category];
  },
};