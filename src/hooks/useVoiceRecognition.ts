import { useState, useEffect, useCallback } from "react";

interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface UseVoiceRecognitionProps {
  language?: "bn-BD" | "en-US" | "auto";
  continuous?: boolean;
  onResult?: (result: VoiceRecognitionResult) => void;
  onEnd?: () => void;
}

export function useVoiceRecognition({
  language = "auto",
  continuous = false,
  onResult,
  onEnd,
}: UseVoiceRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Voice recognition is not supported in this browser");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition
    recognition.continuous = continuous;
    recognition.interimResults = true;

    // Set language based on preference
    if (language === "auto") {
      // Try Bangla first, fallback to English
      recognition.lang = "bn-BD";
    } else {
      recognition.lang = language;
    }

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript("");
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptPart = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);

      if (onResult && finalTranscript) {
        onResult({
          transcript: finalTranscript,
          confidence: event.results[event.results.length - 1][0].confidence,
          isFinal: true,
        });
      }
    };

    recognition.onerror = (event: any) => {
      setError(`Voice recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (onEnd) onEnd();
    };

    recognition.start();
  }, [isSupported, language, continuous, onResult, onEnd]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
  };
}