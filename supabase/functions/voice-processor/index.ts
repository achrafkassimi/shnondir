import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface VoiceRequest {
  action: 'speech-to-text' | 'text-to-speech';
  audioData?: string; // Base64 encoded audio for STT
  text?: string; // Text for TTS
  voiceId?: string; // ElevenLabs voice ID
  settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    if (!elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    const { action, audioData, text, voiceId, settings }: VoiceRequest = await req.json()

    let result

    if (action === 'speech-to-text') {
      result = await processSpeechToText(audioData!, elevenLabsApiKey)
    } else if (action === 'text-to-speech') {
      result = await processTextToSpeech(text!, voiceId, settings, elevenLabsApiKey)
    } else {
      throw new Error('Invalid action specified')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Voice processing error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        fallback: 'Voice processing is temporarily unavailable. Please use text input.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function processSpeechToText(audioData: string, apiKey: string) {
  try {
    // Convert base64 to blob
    const audioBlob = base64ToBlob(audioData, 'audio/webm')
    
    // Create form data
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')
    formData.append('model', 'whisper-1') // Using OpenAI Whisper via ElevenLabs
    
    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Speech-to-text failed: ${response.statusText}`)
    }

    const result = await response.json()
    
    return {
      success: true,
      transcript: result.text,
      confidence: result.confidence || 0.9,
      language: result.language || 'en',
      duration: result.duration
    }
  } catch (error) {
    console.error('Speech-to-text error:', error)
    return {
      success: false,
      error: error.message,
      transcript: '',
      fallback: 'Could not process audio. Please try speaking clearly or use text input.'
    }
  }
}

async function processTextToSpeech(
  text: string, 
  voiceId: string = 'pNInz6obpgDQGcFmaJgB', // Default voice
  settings: any = {},
  apiKey: string
) {
  try {
    const defaultSettings = {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.0,
      use_speaker_boost: true
    }

    const voiceSettings = { ...defaultSettings, ...settings }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: voiceSettings
      }),
    })

    if (!response.ok) {
      throw new Error(`Text-to-speech failed: ${response.statusText}`)
    }

    const audioBuffer = await response.arrayBuffer()
    const base64Audio = arrayBufferToBase64(audioBuffer)
    
    return {
      success: true,
      audioData: base64Audio,
      mimeType: 'audio/mpeg',
      text: text,
      voiceId: voiceId
    }
  } catch (error) {
    console.error('Text-to-speech error:', error)
    return {
      success: false,
      error: error.message,
      audioData: null,
      fallback: 'Could not generate audio. Please read the text response.'
    }
  }
}

// Utility functions
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64.split(',')[1] || base64)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  
  return btoa(binary)
}

// Get available voices
export async function getAvailableVoices(apiKey: string) {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch voices')
    }

    const data = await response.json()
    return data.voices
  } catch (error) {
    console.error('Error fetching voices:', error)
    return []
  }
}