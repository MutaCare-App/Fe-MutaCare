import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useSimulationStore, ChatMessage } from '@/store/useSimulationStore';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
import { MicrophoneIcon } from 'phosphor-react-native/src/icons/Microphone';
import { PaperPlaneRightIcon } from 'phosphor-react-native/src/icons/PaperPlaneRight';
import { SpeakerHighIcon } from 'phosphor-react-native/src/icons/SpeakerHigh';
import { SparkleIcon } from 'phosphor-react-native/src/icons/Sparkle';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CaretLeftIcon);
iconWithClassName(MicrophoneIcon);
iconWithClassName(PaperPlaneRightIcon);
iconWithClassName(SpeakerHighIcon);
iconWithClassName(SparkleIcon);

export default function SimulationSessionScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const {
    activeScenario,
    activeSimulationId,
    messages,
    sendAudioTurn,
    endSimulationSession,
    isSendingTurn,
    isEnding,
  } = useSimulationStore();

  const [textInput, setTextInput] = useState('');
  const [isRecordingMock, setIsRecordingMock] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    try {
      void setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: false,
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isSendingTurn]);

  useEffect(() => {
    if (!activeSimulationId) {
      router.replace('/simulation');
    }
  }, [activeSimulationId]);

  if (!activeSimulationId) {
    return null;
  }

  const handleSendAudioTurn = async () => {
    const demoAudioUri = 'file:///dummy_speech.m4a';
    const duration = Math.max(2, recordTimer);

    setIsRecordingMock(false);
    setRecordTimer(0);

    await sendAudioTurn(demoAudioUri, duration, token);
  };

  const handleToggleRecord = () => {
    if (!isRecordingMock) {
      setIsRecordingMock(true);
      setRecordTimer(1);
    } else {
      void handleSendAudioTurn();
    }
  };

  // Timer interval for recording
  useEffect(() => {
    if (!isRecordingMock) return;
    const interval = setInterval(() => {
      setRecordTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecordingMock]);

  const handleEndSimulation = async () => {
    const res = await endSimulationSession(3, token);
    if (res) {
      router.replace('/simulation/result');
    }
  };

  const latestFeedback = messages
    .slice()
    .reverse()
    .find((m) => m.supportiveFeedback)?.supportiveFeedback;

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        {/* Header */}
        <View className="h-14 flex-row items-center justify-between px-5 border-b border-neutral-100">
          <Pressable
            accessibilityLabel="Kembali"
            className="size-9 items-start justify-center active:opacity-60"
            hitSlop={12}
            onPress={() => router.back()}
          >
            <CaretLeftIcon className="text-neutral-700" size={26} />
          </Pressable>

          <View className="items-center flex-1 px-2">
            <Text className="font-poppins-bold text-sm text-neutral-800" numberOfLines={1}>
              {activeScenario?.title || 'Simulasi Roleplay'}
            </Text>

          </View>

          <Pressable
            accessibilityLabel="Selesai"
            className="px-3 py-1.5 rounded-full bg-red-50 border border-red-200 active:opacity-70"
            onPress={handleEndSimulation}
            disabled={isEnding}
          >
            {isEnding ? (
              <ActivityIndicator size="small" color="#DC2626" />
            ) : (
              <Text className="font-poppins-semibold text-xs text-red-600">Selesai</Text>
            )}
          </Pressable>
        </View>

        {/* Supportive Feedback Banner */}
        {latestFeedback ? (
          <View className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 flex-row items-center gap-2">
            <SparkleIcon className="text-emerald-600" size={18} weight="fill" />
            <Text className="font-poppins-medium text-xs text-emerald-800 flex-1 leading-4">
              {latestFeedback}
            </Text>
          </View>
        ) : null}

        {/* Messages List */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          contentContainerClassName="pb-6 gap-3"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isUser = msg.senderType === 'user';

            return (
              <View
                key={msg.id}
                className={`max-w-[82%] p-3.5 rounded-2xl ${
                  isUser
                    ? 'self-end bg-primary-300 rounded-br-none'
                    : 'self-start bg-neutral-100 border border-neutral-200 rounded-bl-none'
                }`}
              >
                <Text
                  className={`font-poppins text-xs leading-5 ${
                    isUser ? 'text-white' : 'text-neutral-800'
                  }`}
                >
                  {msg.text}
                </Text>
              </View>
            );
          })}

          {isSendingTurn && (
            <View className="self-start p-3 bg-neutral-100 rounded-2xl flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#3B82F6" />
              <Text className="font-poppins text-xs text-neutral-600">
                AI sedang mendengarkan & merespons...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Recording Controls */}
        <View className="p-4 bg-white border-t border-neutral-100 items-center">
          {isRecordingMock ? (
            <View className="w-full items-center mb-2">
              <Text className="font-poppins-semibold text-xs text-red-500 mb-2">
                🔴 Merekam Suara... ({recordTimer}s)
              </Text>
              <Pressable
                onPress={handleToggleRecord}
                className="size-16 rounded-full bg-red-500 items-center justify-center shadow-lg shadow-red-500/30 active:scale-95"
              >
                <MicrophoneIcon className="text-white" size={32} weight="fill" />
              </Pressable>
              <Text className="mt-2 font-poppins text-[11px] text-neutral-400">
                Ketuk lagi untuk mengirim respon suara
              </Text>
            </View>
          ) : (
            <View className="w-full flex-row items-center gap-3">
              <Pressable
                onPress={handleToggleRecord}
                disabled={isSendingTurn}
                className="size-12 rounded-full bg-primary-300 items-center justify-center active:bg-primary-400"
              >
                <MicrophoneIcon className="text-white" size={24} weight="fill" />
              </Pressable>
              <Text className="flex-1 font-poppins text-xs text-neutral-500">
                Tekan tombol mikrofon untuk mulai bicara ke AI
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
