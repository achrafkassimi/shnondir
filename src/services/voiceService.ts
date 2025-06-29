// Voice Service for ElevenLabs Integration
export interface VoiceSettings {
  stability?: number;
  similarity_boost?: number;
  style?: number;
}

export interface SpeechToTextResult {
  success: boolean;
  transcript: string;
  confidence?: number;
  language?: string;
  duration?: number;
  error?: string;
  fallback?: string;
}

export interface TextToSpeechResult {
  success: boolean;
  audioData: string | null;
  mimeType?: string;
  text?: string;
  voiceId?: string;
  error?: string;
  fallback?: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
}

const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

// Check if voice features are available
export const isVoiceEnabled = (): boolean => {
  // Check if we have the API key and the backend is available
  const hasApiKey = !!import.meta.env.VITE_ELEVENLABS_API_KEY;
  const hasSupabaseUrl = !!import.meta.env.VITE_SUPABASE_URL;
  return hasApiKey && hasSupabaseUrl;
};

// Check if voice features are properly configured
export const isVoiceConfigured = (): boolean => {
  return isVoiceEnabled();
};

// Convert speech to text
export const speechToText = async (audioBlob: Blob): Promise<SpeechToTextResult> => {
  try {
    if (!isVoiceEnabled()) {
      return {
        success: false,
        transcript: '',
        error: 'Voice features not configured',
        fallback: 'Please use text input instead.'
      };
    }

    // Convert blob to base64
    const base64Audio = await blobToBase64(audioBlob);
    
    const response = await fetch(`${API_BASE_URL}/voice-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'speech-to-text',
        audioData: base64Audio
      }),
    });

    if (!response.ok) {
      // Try to extract the specific error message from the backend response
      let errorMessage = 'Speech-to-text request failed';
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (parseError) {
        // If we can't parse the response, use the status text
        errorMessage = `Speech-to-text request failed: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Speech-to-text error:', error);
    return {
      success: false,
      transcript: '',
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: 'Could not process audio. Please try again or use text input.'
    };
  }
};

// Convert text to speech
export const textToSpeech = async (
  text: string, 
  voiceId?: string, 
  settings?: VoiceSettings
): Promise<TextToSpeechResult> => {
  try {
    if (!isVoiceEnabled()) {
      return {
        success: false,
        audioData: null,
        error: 'Voice features not configured',
        fallback: 'Please read the text response.'
      };
    }

    const response = await fetch(`${API_BASE_URL}/voice-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'text-to-speech',
        text,
        voiceId,
        settings
      }),
    });

    if (!response.ok) {
      // Try to extract the specific error message from the backend response
      let errorMessage = 'Text-to-speech request failed';
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (parseError) {
        // If we can't parse the response, use the status text
        errorMessage = `Text-to-speech request failed: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Text-to-speech error:', error);
    return {
      success: false,
      audioData: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: 'Could not generate audio. Please read the text response.'
    };
  }
};

// Get available voices
export const getAvailableVoices = async (): Promise<Voice[]> => {
  try {
    if (!isVoiceEnabled()) {
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/voice-processor/voices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }

    const data = await response.json();
    return data.voices || [];
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
};

// Audio recording utilities
export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<boolean> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      this.audioChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      
      this.mediaRecorder.start(100); // Collect data every 100ms
      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      return false;
    }
  }

  async stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

// Audio playback utilities
export const playAudio = (base64Audio: string, mimeType: string = 'audio/mpeg'): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const audio = new Audio(`data:${mimeType};base64,${base64Audio}`);
      
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error('Audio playback failed'));
      
      audio.play().catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

// Utility functions
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // Remove data:audio/webm;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Voice activity detection
export const detectVoiceActivity = (audioContext: AudioContext, stream: MediaStream): Promise<boolean> => {
  return new Promise((resolve) => {
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    source.connect(analyser);
    
    const checkAudio = () => {
      analyser.getByteFrequencyData(dataArray);
      
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      const threshold = 20; // Adjust based on environment
      
      resolve(average > threshold);
    };
    
    setTimeout(checkAudio, 100);
  });
};

// Preload common responses for faster playback
export const preloadCommonResponses = async (): Promise<void> => {
  const commonPhrases = [
    "Hello! I'm your AI career assistant.",
    "I'm here to help you with your career journey.",
    "Let me analyze your profile and provide recommendations.",
    "Great question! Let me help you with that.",
    "You're on the right track!"
  ];

  for (const phrase of commonPhrases) {
    try {
      await textToSpeech(phrase);
    } catch (error) {
      console.log('Preload failed for:', phrase);
    }
  }
};