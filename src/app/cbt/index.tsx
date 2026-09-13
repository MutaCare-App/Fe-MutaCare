import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iconWithClassName } from '@/lib/iconWithClassName';
import { useAuthStore } from '@/store/useAuthStore';
import { useCBTStore } from '@/store/useCBTStore';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
import { BrainIcon } from 'phosphor-react-native/src/icons/Brain';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

iconWithClassName(CaretLeftIcon);
iconWithClassName(BrainIcon);

export default function CBTIntroScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const {
    situationDescription,
    automaticThought,
    initialAnxietyLevel,
    setSituation,
    setThought,
    setInitialAnxiety,
    analyzeThought,
    isLoading,
    error,
  } = useCBTStore();

  const handleAnalyze = async () => {
    if (!automaticThought || automaticThought.trim().length === 0) return;
    const result = await analyzeThought(token);
    if (result) {
      router.push('/cbt/analysis');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          className="flex-1 px-5 pt-3"
          contentContainerClassName="pb-36"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="h-12 justify-center">
            <Pressable
              accessibilityLabel="Kembali"
              className="size-9 items-start justify-center active:opacity-60"
              hitSlop={12}
              onPress={() => router.back()}
            >
              <CaretLeftIcon className="text-neutral-700" size={26} />
            </Pressable>
          </View>

          <View className="mt-2 items-center">
            <View className="size-16 items-center justify-center rounded-full bg-primary-100/50 mb-3">
              <BrainIcon className="text-primary-300" size={36} weight="duotone" />
            </View>
            <Text className="text-center font-feather-bold text-2xl text-primary-300 tracking-[0.6px]">
              Restrukturisasi Kognitif CBT
            </Text>
            <Text className="mt-1 text-center font-poppins text-xs text-neutral-600 leading-5">
              Mengenali pikiran takut yang muncul dan mengubahnya menjadi sudut pandang positif & rasional.
            </Text>
          </View>

          {error && (
            <View className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <Text className="font-poppins-medium text-xs text-red-600 text-center">{error}</Text>
            </View>
          )}

          <View className="mt-6 gap-4">
            <View>
              <Text className="mb-1.5 font-poppins-semibold text-xs text-neutral-700">
                1. Situasi Bicara Yang Kamu Hadapi (Opsional)
              </Text>
              <TextInput
                value={situationDescription}
                onChangeText={setSituation}
                placeholder="Contoh: Saat disapa dosen / kasir di minimarket"
                placeholderTextColor="#A3A3A3"
                className="w-full rounded-xl border border-neutral-300 p-3 font-poppins text-xs text-neutral-800"
              />
            </View>

            <View>
              <Text className="mb-1.5 font-poppins-semibold text-xs text-neutral-700">
                2. Apa Pikiran Negatif / Takut Yang Muncul? *
              </Text>
              <TextInput
                value={automaticThought}
                onChangeText={setThought}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholder="Contoh: Saya takut dipandang bodoh jika salah bicara atau jeda terlalu lama."
                placeholderTextColor="#A3A3A3"
                className="h-28 w-full rounded-xl border border-neutral-300 p-3 font-poppins text-xs text-neutral-800 leading-5"
              />
            </View>

            <View>
              <Text className="mb-2 font-poppins-semibold text-xs text-neutral-700">
                3. Tingkat Cemas Saat Ini (Skala 1 - 10): {initialAnxietyLevel}
              </Text>
              <View className="flex-row justify-between gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const isSelected = initialAnxietyLevel === num;
                  return (
                    <Pressable
                      key={num}
                      onPress={() => setInitialAnxiety(num)}
                      className={`flex-1 h-9 rounded-lg items-center justify-center border ${
                        isSelected
                          ? 'bg-primary-300 border-primary-300'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <Text
                        className={`font-poppins-semibold text-xs ${
                          isSelected ? 'text-white' : 'text-neutral-700'
                        }`}
                      >
                        {num}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          <Button
            className="mt-8 h-12 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center"
            disabled={isLoading || !automaticThought.trim()}
            onPress={handleAnalyze}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="font-poppins-semibold text-base text-white tracking-[0.7px]">
                Analisis & Temukan Pikiran Rasional
              </Text>
            )}
          </Button>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
