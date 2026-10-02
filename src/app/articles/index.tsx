import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ARTICLE_CATEGORIES,
  ArticleCategory,
  Article,
  searchArticles,
} from "@/data/articles";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { ArrowLeftIcon } from "phosphor-react-native/src/icons/ArrowLeft";
import { MagnifyingGlassIcon } from "phosphor-react-native/src/icons/MagnifyingGlass";
import { XIcon } from "phosphor-react-native/src/icons/X";
import { ClockIcon } from "phosphor-react-native/src/icons/Clock";
import { SparkleIcon } from "phosphor-react-native/src/icons/Sparkle";
import { LinearGradient } from "expo-linear-gradient";

iconWithClassName(ArrowLeftIcon);
iconWithClassName(MagnifyingGlassIcon);
iconWithClassName(XIcon);
iconWithClassName(ClockIcon);
iconWithClassName(SparkleIcon);

export default function ArticlesListScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const displayedArticles = searchArticles(searchQuery, selectedCategory);

  const handleOpenDetail = (articleId: string) => {
    router.push({
      pathname: "/articles/[id]" as any,
      params: { id: articleId },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={["top"]} className="bg-white border-b border-neutral-100">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center gap-3 flex-1">
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              className="p-1 rounded-full active:bg-neutral-100"
            >
              <ArrowLeftIcon size={24} className="text-neutral-800" />
            </Pressable>
            {!isSearchOpen ? (
              <Text className="font-poppins-bold text-neutral-800 text-lg">
                Artikel
              </Text>
            ) : (
              <View className="flex-1 flex-row items-center bg-neutral-100 rounded-full px-3 py-1 mr-2">
                <MagnifyingGlassIcon size={16} className="text-neutral-500 mr-2" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Cari topik atau gejala..."
                  placeholderTextColor="#9CA3AF"
                  autoFocus
                  className="flex-1 font-poppins text-xs text-neutral-800 py-1"
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={() => setSearchQuery("")} hitSlop={8}>
                    <XIcon size={16} className="text-neutral-400" />
                  </Pressable>
                )}
              </View>
            )}
          </View>

          <Pressable
            onPress={() => {
              setIsSearchOpen((prev) => !prev);
              if (isSearchOpen) setSearchQuery("");
            }}
            hitSlop={8}
            className="p-1.5 rounded-full active:bg-neutral-100"
          >
            {isSearchOpen ? (
              <Text className="font-poppins-semibold text-xs text-[#E11462]">
                Tutup
              </Text>
            ) : (
              <MagnifyingGlassIcon size={22} className="text-neutral-800" />
            )}
          </Pressable>
        </View>

        {/* Category Pills Horizontal Scroll */}
        <View className="pb-3 pt-1">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {ARTICLE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full mr-2.5 ${
                    isActive
                      ? "bg-[#E11462]"
                      : "bg-white border border-[#E11462]/30"
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      isActive
                        ? "font-poppins-bold text-white"
                        : "font-poppins-medium text-neutral-700"
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Vertical Articles List matching Image 2 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        className="flex-1"
      >
        {displayedArticles.length === 0 ? (
          <View className="py-16 items-center justify-center">
            <SparkleIcon size={40} className="text-neutral-300 mb-2" />
            <Text className="font-poppins-semibold text-neutral-600 text-sm">
              Tidak ada artikel ditemukan
            </Text>
            <Text className="font-poppins text-xs text-neutral-400 mt-1 text-center">
              Coba kata kunci lain atau pilih kategori Semua.
            </Text>
          </View>
        ) : (
          displayedArticles.map((article: Article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              onPress={() => handleOpenDetail(article.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

function ArticleListItem({
  article,
  onPress,
}: {
  article: Article;
  onPress: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-white rounded-2xl p-3 mb-3 border border-neutral-100 shadow-sm active:bg-neutral-50"
    >
      {/* Square Thumbnail */}
      <View className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 mr-3.5">
        {!imageError ? (
          <Image
            source={{ uri: article.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <LinearGradient
            colors={["#9EDF9C", "#609966"]}
            className="w-full h-full items-center justify-center"
          >
            <SparkleIcon size={24} color="#ffffff" weight="fill" />
          </LinearGradient>
        )}
      </View>

      {/* Content Details */}
      <View className="flex-1 justify-center">
        {/* Category Badge */}
        <View className="bg-indigo-50 px-2 py-0.5 rounded self-start mb-1.5 border border-indigo-100">
          <Text className="font-poppins-medium text-[10px] text-indigo-700">
            {article.category}
          </Text>
        </View>

        {/* Title */}
        <Text
          numberOfLines={2}
          className="font-poppins-semibold text-neutral-800 text-[13px] leading-snug mb-1"
        >
          {article.title}
        </Text>

        {/* Reading Time and Date */}
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-1">
            <ClockIcon size={12} className="text-neutral-400" />
            <Text className="font-poppins text-[11px] text-neutral-400">
              {article.readTime}
            </Text>
          </View>
          <Text className="text-[11px] text-neutral-300">•</Text>
          <Text className="font-poppins text-[11px] text-neutral-400">
            {article.date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
