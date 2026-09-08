import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useCBTStore, CBTSimulationMessage } from '@/store/useCBTStore';
import {
  useAudioPlayer,
  useAudioRecorder,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CaretDownIcon } from 'phosphor-react-native/src/icons/CaretDown';
import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
import { CaretUpIcon } from 'phosphor-react-native/src/icons/CaretUp';
import { CheckCircleIcon } from 'phosphor-react-native/src/icons/CheckCircle';
import { CircleIcon } from 'phosphor-react-native/src/icons/Circle';
import { MicrophoneIcon } from 'phosphor-react-native/src/icons/Microphone';
import { PaperPlaneRightIcon } from 'phosphor-react-native/src/icons/PaperPlaneRight';
import { SparkleIcon } from 'phosphor-react-native/src/icons/Sparkle';
import { SpeakerHighIcon } from 'phosphor-react-native/src/icons/SpeakerHigh';
import { TargetIcon } from 'phosphor-react-native/src/icons/Target';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CaretDownIcon);
iconWithClassName(CaretLeftIcon);
iconWithClassName(CaretUpIcon);
iconWithClassName(CheckCircleIcon);
iconWithClassName(CircleIcon);
iconWithClassName(MicrophoneIcon);
iconWithClassName(PaperPlaneRightIcon);
iconWithClassName(SparkleIcon);
iconWithClassName(SpeakerHighIcon);
iconWithClassName(TargetIcon);

export default function CBTSimulationScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const {
    personaRole,
    purpose,
    instructions,
    simulationMessages,
    allInstructionsCompleted,
    isSendingTurn,
    sendTurn,
  } = useCBTStore();

  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [activePlayingAudio, setActivePlayingAudio] = useState<string | null>(null);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);

  const toggleInstructions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsInstructionsExpanded((prev) => !prev);
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const player = useAudioPlayer(null);
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // Set audio mode on mount
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

  // Play audio helper
  const playAudio = (url: string) => {
    try {
      if (player && url) {
        player.replace({ uri: url });
        player.play();
        setActivePlayingAudio(url);
      }
    } catch (e) {
      console.warn('Playback error:', e);
    }
  };

  // Auto scroll on new messages
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [simulationMessages, isSendingTurn]);

  // Auto scroll when keyboard opens
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    });
    return () => {
      showSub.remove();
    };
  }, []);

  // Audio recording timer
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setRecordTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecord = async () => {
    if (!isRecording) {
      try {
        const permission = await requestRecordingPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            'Izin Mikrofon Diperlukan',
            'Harap izinkan akses mikrofon di pengaturan perangkat agar kamu dapat mempraktikkan respon suaramu.'
          );
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });

        await recorder.prepareToRecordAsync();
        recorder.record();
        setIsRecording(true);
        setRecordTimer(1);
      } catch (err) {
        console.error('Failed to start recording:', err);
        Alert.alert('Gagal Memulai Rekaman', 'Terjadi kendala saat mengakses mikrofon.');
      }
    } else {
      setIsRecording(false);
      setRecordTimer(0);

      try {
        await recorder.stop();
        void setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
        });

        const recordedUri = recorder.uri;
        console.log('Finished voice recording, URI:', recordedUri);

        if (!recordedUri) {
          Alert.alert('Rekaman Kosong', 'Tidak ada rekaman suara yang terdeteksi. Silakan coba berbicara lagi.');
          return;
        }

        const success = await sendTurn(recordedUri, token);
        if (!success) {
          const storeError = useCBTStore.getState().error;
          Alert.alert(
            'Gagal Mengirim Respon Suara',
            storeError || 'Terjadi kendala saat memproses rekaman suaramu. Silakan coba lagi.'
          );
        }
      } catch (err) {
        console.error('Failed to stop/send recording:', err);
        Alert.alert('Gagal Memproses Rekaman', 'Terjadi kendala saat menyimpan rekaman suaramu.');
      }
    }
  };

  const handleSendText = async () => {
    if (!textInput.trim() || isSendingTurn) return;
    const text = textInput.trim();
    setTextInput('');
    await sendTurn({ text }, token);
  };

  const handleProceedToEvaluation = () => {
    router.replace('/cbt/complete');
  };

  const latestFeedback = simulationMessages
    .slice()
    .reverse()
    .find((m) => m.naturalFeedback)?.naturalFeedback;

  const completedCount = instructions.filter((i) => i.isCompleted).length;
  const totalInstructions = instructions.length;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
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
              Simulasi Bicara: {personaRole}
            </Text>
            <Text className="font-poppins text-[10px] text-primary-300">
              {completedCount}/{totalInstructions} Instruksi Selesai
            </Text>
          </View>

          <Pressable
            accessibilityLabel="Lewati"
            className="px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 active:opacity-70"
            onPress={handleProceedToEvaluation}
          >
            <Text className="font-poppins-medium text-xs text-neutral-600">Selesai</Text>
          </Pressable>
        </View>

        {/* Collapsible Instruction & Purpose Guidance */}
        <View className="border-b border-neutral-200 bg-neutral-50/90">
          <Pressable
            accessibilityLabel="Instruksi dan Tujuan Latihan"
            accessibilityRole="button"
            onPress={toggleInstructions}
            className="flex-row items-center justify-between px-5 py-2.5 active:bg-neutral-100"
          >
            <View className="flex-row items-center gap-2 flex-1 pr-2">
              <TargetIcon className="text-primary-300" size={16} weight="bold" />
              <Text className="font-poppins-semibold text-xs text-neutral-800" numberOfLines={1}>
                Instruksi & Tujuan ({completedCount}/{totalInstructions} Selesai)
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200 shadow-sm shadow-neutral-100">
              <Text className="font-poppins-medium text-[11px] text-neutral-600">
                {isInstructionsExpanded ? 'Tutup' : 'Buka'}
              </Text>
              {isInstructionsExpanded ? (
                <CaretUpIcon className="text-neutral-500" size={12} weight="bold" />
              ) : (
                <CaretDownIcon className="text-neutral-500" size={12} weight="bold" />
              )}
            </View>
          </Pressable>

          {isInstructionsExpanded && (
            <View className="px-5 pb-3.5 pt-1 border-t border-neutral-200/60 gap-3 bg-white">
              {/* Purpose */}
              <View className="p-2.5 bg-primary-100/30 rounded-xl border border-primary-200/50">
                <Text className="font-poppins-bold text-[10px] text-primary-300 uppercase tracking-wider mb-0.5">
                  Tujuan Sesi Latihan:
                </Text>
                <Text className="font-poppins text-xs text-neutral-700 leading-4">
                  {purpose || 'Latih pikiran rasional barumu dalam percakapan nyata yang santai.'}
                </Text>
              </View>

              {/* Progressive Checklist */}
              <View className="gap-2">
                <Text className="font-poppins-bold text-[11px] text-neutral-700">
                  Instruksi Percakapan Bertahap:
                </Text>
                {instructions.map((inst) => (
                  <View key={inst.id} className="flex-row items-center gap-2">
                    {inst.isCompleted ? (
                      <CheckCircleIcon className="text-emerald-600" size={16} weight="fill" />
                    ) : (
                      <CircleIcon className="text-neutral-300" size={16} weight="bold" />
                    )}
                    <Text
                      className={`flex-1 font-poppins text-xs leading-4 ${
                        inst.isCompleted
                          ? 'text-emerald-800 line-through'
                          : 'text-neutral-700'
                      }`}
                    >
                      {inst.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Natural Feedback Banner */}
        {latestFeedback ? (
          <View className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 flex-row items-center gap-2">
            <SparkleIcon className="text-emerald-600" size={18} weight="fill" />
            <View className="flex-1">
              <Text className="font-poppins-bold text-[10px] text-emerald-800 uppercase tracking-wider">
                Umpan Balik AI
              </Text>
              <Text className="font-poppins text-xs text-emerald-900 leading-4">
                {latestFeedback}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Dialogue Scroll Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          contentContainerClassName="pb-6 gap-3"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {simulationMessages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <View
                key={msg.id}
                className={`max-w-[85%] p-3.5 rounded-2xl ${
                  isUser
                    ? 'self-end bg-primary-300 rounded-br-none'
                    : 'self-start bg-neutral-100 border border-neutral-200 rounded-bl-none'
                }`}
              >
                <View className="flex-row items-center justify-between gap-2 mb-1">
                  <Text
                    className={`font-poppins-medium text-[10px] ${
                      isUser ? 'text-primary-100' : 'text-neutral-500'
                    }`}
                  >
                    {isUser ? 'Kamu' : personaRole}
                  </Text>
                  {!isUser && msg.audioUrl ? (
                    <Pressable
                      onPress={() => playAudio(msg.audioUrl!)}
                      className="p-1 rounded-full bg-white border border-neutral-200 active:opacity-70"
                    >
                      <SpeakerHighIcon
                        size={12}
                        className={
                          activePlayingAudio === msg.audioUrl
                            ? 'text-primary-300'
                            : 'text-neutral-600'
                        }
                      />
                    </Pressable>
                  ) : null}
                </View>
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
            <View className="self-start p-3 bg-neutral-100 rounded-2xl flex-row items-center gap-2 border border-neutral-200">
              <ActivityIndicator size="small" color="#3B82F6" />
              <Text className="font-poppins text-xs text-neutral-600">
                AI sedang mendengarkan & mengevaluasi kemajuanmu...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Completed All Instructions Banner */}
        {allInstructionsCompleted && (
          <View className="p-4 bg-emerald-100 border-t border-emerald-300 items-center">
            <Text className="font-poppins-bold text-xs text-emerald-900 mb-2 text-center">
              🎉 Hebat! Semua instruksi percakapan telah berhasil kamu selesaikan!
            </Text>
            <Button
              className="h-11 w-full rounded-xl bg-emerald-600 active:bg-emerald-700 justify-center items-center"
              onPress={handleProceedToEvaluation}
            >
              <Text className="font-poppins-semibold text-sm text-white tracking-[0.6px]">
                Lanjut ke Evaluasi & Refleksi ➔
              </Text>
            </Button>
          </View>
        )}

        {/* Speak / Recording Controls & Text Input (when not completed yet) */}
        {!allInstructionsCompleted && (
          <View className="p-3.5 bg-white border-t border-neutral-100">
            {isRecording ? (
              <View className="w-full items-center py-2">
                <Text className="font-poppins-semibold text-xs text-red-500 mb-2">
                  🔴 Merekam Suaramu... ({recordTimer} detik)
                </Text>
                <Pressable
                  onPress={handleToggleRecord}
                  className="size-16 rounded-full bg-red-500 items-center justify-center shadow-lg shadow-red-500/30 active:scale-95"
                >
                  <MicrophoneIcon className="text-white" size={32} weight="fill" />
                </Pressable>
                <Text className="mt-2 font-poppins text-[11px] text-neutral-400">
                  Ketuk lagi untuk mengirim respon suara ke AI
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                <View className="flex-row items-center gap-2">
                  <TextInput
                    value={textInput}
                    onChangeText={setTextInput}
                    placeholder="Ketik respon atau tekan mic untuk bicara..."
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 min-h-[42px] max-h-24 px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-poppins text-xs text-neutral-800"
                    multiline
                    editable={!isSendingTurn}
                    onFocus={() => {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                      }, 100);
                    }}
                  />
                  {textInput.trim().length > 0 ? (
                    <Pressable
                      onPress={handleSendText}
                      disabled={isSendingTurn}
                      className="size-10 rounded-xl bg-primary-300 items-center justify-center active:bg-primary-400"
                    >
                      <PaperPlaneRightIcon className="text-white" size={20} weight="fill" />
                    </Pressable>
                  ) : null}
                  <Pressable
                    onPress={handleToggleRecord}
                    disabled={isSendingTurn}
                    className="size-10 rounded-xl bg-primary-300 items-center justify-center active:bg-primary-400"
                  >
                    <MicrophoneIcon className="text-white" size={20} weight="fill" />
                  </Pressable>
                </View>
                <Text className="text-center font-poppins text-[10px] text-neutral-400">
                  Kamu bisa berbicara dengan mikrofon atau mengetik responmu
                </Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
