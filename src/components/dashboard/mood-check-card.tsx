import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { MOODS, MoodItem, useMoodStore } from "@/store/useMoodStore";
import { SmileyIcon } from "phosphor-react-native/src/icons/Smiley";
import { Image, Pressable, View } from "react-native";

iconWithClassName(SmileyIcon);

export { MOODS, MoodItem };

export function MoodCheckCard({
  onSelectMood,
}: {
  onSelectMood?: (mood: MoodItem) => void;
}) {
  const { selectedMood, isEditing, setMood, setIsEditing } = useMoodStore();

  const handleSelectMood = (mood: MoodItem) => {
    setMood(mood);
    onSelectMood?.(mood);
  };

  // Tampilan Card Hasil jika mood sudah dipilih dan tidak sedang mode edit
  if (selectedMood && !isEditing) {
    return (
      <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
        {/* Header Card */}
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-white border-[0.5px] border-neutral-300 items-center justify-center">
            <SmileyIcon size={20} weight="fill" className="text-brand-accent" />
          </View>
          <Text className="font-poppins-semibold text-neutral-800 text-sm">
            Mood Check
          </Text>
        </View>

        <Text className="font-poppins text-neutral-700 text-xs mt-1.5">
          Hari Ini Kamu Merasa
        </Text>

        {/* Ilustrasi Mood & Label Terpilih */}
        <View className="items-center justify-center my-3">
          <Image
            source={selectedMood.image}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <Text className="font-poppins-semibold text-neutral-800 text-lg mt-2">
            {selectedMood.label}
          </Text>
        </View>

        {/* Footer Card */}
        <View className="flex flex-col items-center ">
          <Text className="font-poppins text-center text-neutral-700 text-xs">
            Terima Kasih Sudah Berbagi
          </Text>
          <Pressable
            onPress={() => setIsEditing(true)}
            hitSlop={8}
            className="w-full items-end mt-4"
          >
            <Text className="font-poppins-semibold text-brand-accent text-sm">
              Edit Mood
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Tampilan Card Pemilihan Mood (5 opsi)
  return (
    <View className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm shadow-black/5">
      {/* Header Card */}
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded-full bg-white border-[0.5px] border-neutral-300 items-center justify-center">
          <SmileyIcon size={20} weight="fill" className="text-brand-accent" />
        </View>
        <Text className="font-poppins-semibold text-neutral-800 text-sm">
          Mood Check
        </Text>
      </View>

      <Text className="font-poppins text-neutral-700 text-xs mt-1.5">
        Bagaimana Perasaanmu Hari Ini?
      </Text>

      {/* 5 Opsi Mood */}
      <View className="flex-row justify-between items-start mt-3">
        {MOODS.map((mood) => {
          const isSelected = selectedMood?.id === mood.id;
          return (
            <Pressable
              key={mood.id}
              onPress={() => handleSelectMood(mood)}
              className="items-center w-[18%]"
            >
              <View
                className={`p-1 rounded-2xl ${
                  isSelected
                    ? "bg-primary-100/40 border border-primary-300"
                    : ""
                }`}
              >
                <Image
                  source={mood.image}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
              <Text
                className={`text-[9.5px] text-center mt-1 leading-3 ${
                  isSelected
                    ? "font-poppins-semibold text-primary-300"
                    : "font-poppins text-neutral-600"
                }`}
              >
                {mood.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
