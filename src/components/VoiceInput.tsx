import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Settings,
  ExternalLink
} from 'lucide-react';
import { 
  AudioRecorder, 
  speechToText, 
  textToSpeech, 
  playAudio, 
  isVoiceEnabled,
  detectVoiceActivity 
} from '../services/voiceService';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onSpeechResponse?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoSpeak?: boolean;
  className?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  onSpeechResponse,
  placeholder = "Click to speak...",
  disabled = false,
  autoSpeak = false,
  className = ""
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [voiceActivity, setVoiceActivity] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showSetupHelp, setShowSetupHelp] = useState(false);
  
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number>();

  const voiceAvailable = isVoiceEnabled();

  useEffect(() => {
    if (!recorderRef.current) {
      recorderRef.current = new AudioRecorder();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    if (!voiceAvailable) {
      setError('Voice features require ElevenLabs API configuration.');
      setShowSetupHelp(true);
      return;
    }

    setError(null);
    setTranscript('');
    
    try {
      const success = await recorderRef.current?.startRecording();
      if (success) {
        setIsRecording(true);
        startAudioLevelMonitoring();
      } else {
        setError('Could not access microphone. Please check permissions.');
      }
    } catch (error) {
      setError('Failed to start recording. Please try again.');
      console.error('Recording error:', error);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    setIsRecording(false);
    setIsProcessing(true);
    stopAudioLevelMonitoring();

    try {
      const audioBlob = await recorderRef.current.stopRecording();
      if (audioBlob) {
        const result = await speechToText(audioBlob);
        
        if (result.success && result.transcript) {
          setTranscript(result.transcript);
          onTranscript(result.transcript);
          
          if (autoSpeak && onSpeechResponse) {
            await speakResponse(result.transcript);
          }
        } else {
          const errorMsg = result.error || 'Could not understand speech. Please try again.';
          setError(errorMsg);
          
          // Show setup help if it's an API configuration issue
          if (errorMsg.toLowerCase().includes('api') || errorMsg.toLowerCase().includes('key') || errorMsg.toLowerCase().includes('configured')) {
            setShowSetupHelp(true);
          }
        }
      }
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to process speech. Please try again.';
      setError(errorMsg);
      
      // Show setup help if it's an API configuration issue
      if (errorMsg.toLowerCase().includes('api') || errorMsg.toLowerCase().includes('key') || errorMsg.toLowerCase().includes('configured')) {
        setShowSetupHelp(true);
      }
      
      console.error('Speech processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakResponse = async (text: string) => {
    if (!onSpeechResponse) return;

    setIsPlaying(true);
    try {
      const result = await textToSpeech(text);
      if (result.success && result.audioData) {
        await playAudio(result.audioData, result.mimeType);
        onSpeechResponse(text);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const startAudioLevelMonitoring = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const analyser = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      source.connect(analyser);

      const updateAudioLevel = () => {
        if (!isRecording) return;

        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        
        setAudioLevel(average);
        setVoiceActivity(average > 20);
        
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };

      updateAudioLevel();
    } catch (error) {
      console.error('Audio monitoring error:', error);
    }
  };

  const stopAudioLevelMonitoring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const getButtonColor = () => {
    if (!voiceAvailable) {
      return 'from-gray-400 to-gray-500';
    }
    if (isRecording) {
      return voiceActivity 
        ? 'from-green-500 to-green-600' 
        : 'from-red-500 to-red-600';
    }
    return 'from-primary-500 to-secondary-500';
  };

  const getButtonIcon = () => {
    if (isProcessing) return <Loader2 className="h-6 w-6 animate-spin" />;
    if (isPlaying) return <Volume2 className="h-6 w-6" />;
    if (isRecording) return <MicOff className="h-6 w-6" />;
    return <Mic className="h-6 w-6" />;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Voice Button */}
      <div className="flex items-center justify-center">
        <motion.button
          whileHover={{ scale: voiceAvailable ? 1.05 : 1 }}
          whileTap={{ scale: voiceAvailable ? 0.95 : 1 }}
          onClick={voiceAvailable ? toggleRecording : () => setShowSetupHelp(true)}
          disabled={disabled || isProcessing}
          className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${getButtonColor()} text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {getButtonIcon()}
          
          {/* Audio level indicator */}
          {isRecording && voiceAvailable && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{
                scale: [1, 1 + (audioLevel / 100), 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
          )}

          {/* Setup indicator */}
          {!voiceAvailable && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <Settings className="h-3 w-3 text-white" />
            </div>
          )}
        </motion.button>

        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Status Text */}
      <div className="text-center mt-4">
        <AnimatePresence mode="wait">
          {!voiceAvailable && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm"
            >
              <div className="font-medium text-orange-600">
                🔧 Setup Required
              </div>
              <button
                onClick={() => setShowSetupHelp(true)}
                className="text-orange-500 hover:text-orange-600 text-xs mt-1 underline"
              >
                Click for setup instructions
              </button>
            </motion.div>
          )}

          {voiceAvailable && isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm"
            >
              <div className={`font-medium ${voiceActivity ? 'text-green-600' : 'text-red-600'}`}>
                {voiceActivity ? '🎤 Listening...' : '🔇 Speak now'}
              </div>
              <div className="text-gray-500 text-xs mt-1">
                Click again to stop recording
              </div>
            </motion.div>
          )}
          
          {voiceAvailable && isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-blue-600 font-medium"
            >
              🧠 Processing speech...
            </motion.div>
          )}
          
          {voiceAvailable && isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-purple-600 font-medium"
            >
              🔊 Playing response...
            </motion.div>
          )}
          
          {voiceAvailable && !isRecording && !isProcessing && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-600"
            >
              {placeholder}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Setup Help Modal */}
      <AnimatePresence>
        {showSetupHelp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-20 w-96 max-w-[90vw]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Voice Setup Required</h3>
              </div>
              <button
                onClick={() => setShowSetupHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 text-sm">
              <p className="text-gray-600">
                To enable voice features, you need to configure your ElevenLabs API key:
              </p>
              
              <ol className="text-gray-700 space-y-2 ml-4 list-decimal">
                <li>
                  Get your API key from{' '}
                  <a 
                    href="https://elevenlabs.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline inline-flex items-center space-x-1"
                  >
                    <span>ElevenLabs.io</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>Add this to your <code className="bg-gray-100 px-1 rounded">.env</code> file:</li>
              </ol>
              
              <div className="bg-gray-50 p-3 rounded-lg border">
                <code className="text-xs text-gray-800">
                  VITE_ELEVENLABS_API_KEY=your_api_key_here
                </code>
              </div>
              
              <ol start={3} className="text-gray-700 space-y-2 ml-4 list-decimal">
                <li>Restart your development server</li>
                <li>Refresh this page</li>
              </ol>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs">
                  <strong>Note:</strong> Voice features are optional. You can use text input without any setup.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript Display */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium text-sm">Transcript:</p>
              <p className="text-green-700 mt-1">{transcript}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium text-sm">Error:</p>
              <p className="text-red-700 mt-1">{error}</p>
              {!voiceAvailable && (
                <button
                  onClick={() => setShowSetupHelp(true)}
                  className="text-red-600 hover:text-red-700 text-xs mt-2 underline"
                >
                  View setup instructions
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10"
          >
            <h3 className="font-medium text-gray-800 mb-3">Voice Settings</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Voice Features</span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  voiceAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {voiceAvailable ? 'Enabled' : 'Setup Required'}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Auto-speak responses</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSpeak}
                    onChange={(e) => {
                      // This would be passed as a prop or managed by parent
                    }}
                    className="sr-only peer"
                    disabled={!voiceAvailable}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-disabled:opacity-50"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Voice Quality</label>
                <select 
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                  disabled={!voiceAvailable}
                >
                  <option value="standard">Standard</option>
                  <option value="high">High Quality</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Language</label>
                <select 
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                  disabled={!voiceAvailable}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              {!voiceAvailable && (
                <button
                  onClick={() => {
                    setShowSettings(false);
                    setShowSetupHelp(true);
                  }}
                  className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg transition-colors"
                >
                  Setup Voice Features
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;