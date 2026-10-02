import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ARTICLES_DATA,
  ARTICLE_CATEGORIES,
  ArticleCategory,
  SUPPORT_SERVICES,
  Article,
} from "@/data/articles";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { ClockIcon } from "phosphor-react-native/src/icons/Clock";
import { HeartbeatIcon } from "phosphor-react-native/src/icons/Heartbeat";
import { GraduationCapIcon } from "phosphor-react-native/src/icons/GraduationCap";
import { SparkleIcon } from "phosphor-react-native/src/icons/Sparkle";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import { LinearGradient } from "expo-linear-gradient";

iconWithClassName(ClockIcon);
iconWithClassName(HeartbeatIcon);
iconWithClassName(GraduationCapIcon);
iconWithClassName(SparkleIcon);
iconWithClassName(CaretRightIcon);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.min(270, SCREEN_WIDTH * 0.72);

export function ArticlesSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory>("Semua");

  const filteredArticles =
    selectedCategory === "Semua"
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.category === selectedCategory);

  const handleOpenArticle = (articleId: string) => {
    router.push({
      pathname: "/articles/[id]" as any,
      params: { id: articleId },
    });
  };

  const handleOpenAllArticles = () => {
    router.push("/articles" as any);
  };

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Heartbeat":
        return <HeartbeatIcon size={24} weight="fill" color="#ffffff" />;
      case "GraduationCap":
        return <GraduationCapIcon size={24} weight="fill" color="#ffffff" />;
      case "Sparkle":
        return <SparkleIcon size={24} weight="fill" color="#ffffff" />;
      default:
        return <SparkleIcon size={24} weight="fill" color="#ffffff" />;
    }
  };

  return (
    <View className="mt-4 gap-6">
      {/* 1. Layanan & Pendampingan Terapi (Matches Top Carousel in Reference) */}
      <View>
        <View className="px-5 mb-3 flex-row justify-between items-center">
          <Text className="font-poppins-bold text-neutral-800 text-lg">
            Program Pendampingan
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="flex-row"
        >
          {SUPPORT_SERVICES.map((service, index) => (
            <Pressable
              key={service.id}
              onPress={() => {
                // Navigate to related article or general articles with filter
                if (service.id === "panduan-ortu") {
                  handleOpenArticle("kesalahan-umum-orang-tua");
                } else if (service.id === "modul-sekolah") {
                  handleOpenArticle("panduan-guru-di-sekolah");
                } else {
                  handleOpenArticle("stimulus-fading-dan-terapi");
                }
              }}
              className="mr-3 items-center"
              style={{ width: 110 }}
            >
              <LinearGradient
                colors={service.bgGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-full h-24 rounded-2xl p-2.5 items-center justify-center shadow-sm relative overflow-hidden"
              >
                <View className="bg-white/20 p-2.5 rounded-full mb-1">
                  {renderServiceIcon(service.icon)}
                </View>
                <View className="bg-white/90 px-1.5 py-0.5 rounded-full">
                  <Text className="font-poppins-semibold text-[9px] text-neutral-800">
                    {service.badge}
                  </Text>
                </View>
              </LinearGradient>
              <Text
                className="font-poppins-medium text-xs text-neutral-700 text-center mt-2 leading-tight"
                numberOfLines={2}
              >
                {service.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* 2. Artikel & Edukasi Selective Mutism (Matches Main Section in Reference) */}
      <View>
        {/* Section Header */}
        <View className="px-5 flex-row justify-between items-center mb-3">
          <Text className="font-poppins-bold text-neutral-800 text-lg">
            Baca 100+ Artikel Baru
          </Text>
          <Pressable
            onPress={handleOpenAllArticles}
            className="border border-[#E11462] px-3.5 py-1 rounded-full flex-row items-center"
            hitSlop={8}
          >
            <Text className="font-poppins-semibold text-xs text-[#E11462]">
              Lihat Semua
            </Text>
          </Pressable>
        </View>

        {/* Category Filter Chips Horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mb-4"
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

        {/* Horizontal Article Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 6 }}
        >
          {filteredArticles.map((article: Article) => (
            <ArticleHomeCard
              key={article.id}
              article={article}
              onPress={() => handleOpenArticle(article.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function ArticleHomeCard({
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
      style={{ width: CARD_WIDTH }}
      className="bg-white rounded-2xl mr-4 overflow-hidden border border-neutral-100 shadow-sm"
    >
      {/* Thumbnail Image */}
      <View className="w-full h-36 bg-neutral-100 relative">
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
            className="w-full h-full items-center justify-center p-4"
          >
            <SparkleIcon size={32} color="#ffffff" weight="fill" />
            <Text className="font-poppins-bold text-white text-xs text-center mt-1">
              MutaCare Edukasi
            </Text>
          </LinearGradient>
        )}
      </View>

      {/* Card Content */}
      <View className="p-3.5 justify-between flex-1">
        <Text
          numberOfLines={2}
          className="font-poppins-semibold text-neutral-800 text-[13px] leading-snug mb-2.5"
        >
          {article.title}
        </Text>

        <View className="flex-row items-center justify-between mt-auto">
          {/* Tag Badge */}
          <View className="bg-rose-50 px-2.5 py-1 rounded-md self-start border border-rose-100">
            <Text className="font-poppins-medium text-[11px] text-[#BE185D]">
              {article.category}
            </Text>
          </View>

          {/* Reading Time */}
          <View className="flex-row items-center gap-1">
            <ClockIcon size={12} className="text-neutral-400" />
            <Text className="font-poppins text-[11px] text-neutral-400">
              {article.readTime}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
