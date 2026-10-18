import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getArticleById,
  ARTICLES_DATA,
  Article,
} from "@/data/articles";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { ArrowLeftIcon } from "phosphor-react-native/src/icons/ArrowLeft";
import { ShareNetworkIcon } from "phosphor-react-native/src/icons/ShareNetwork";
import { ClockIcon } from "phosphor-react-native/src/icons/Clock";
import { CheckCircleIcon } from "phosphor-react-native/src/icons/CheckCircle";
import { SparkleIcon } from "phosphor-react-native/src/icons/Sparkle";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import { LinearGradient } from "expo-linear-gradient";

iconWithClassName(ArrowLeftIcon);
iconWithClassName(ShareNetworkIcon);
iconWithClassName(ClockIcon);
iconWithClassName(CheckCircleIcon);
iconWithClassName(SparkleIcon);
iconWithClassName(CaretRightIcon);

export default function ArticleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [imageError, setImageError] = useState(false);

  const article = id ? getArticleById(id) : undefined;
  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== id).slice(0, 3);

  const handleShare = async () => {
    if (!article) return;
    try {
      await Share.share({
        message: `${article.title}\n\nBaca artikel edukasi selective mutism ini di aplikasi MutaCare:\n${article.summary}`,
        title: article.title,
      });
    } catch {
      // Ignore dismiss
    }
  };

  if (!article) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Text className="font-poppins-bold text-lg text-neutral-800 mb-2">
          Artikel Tidak Ditemukan
        </Text>
        <Text className="font-poppins text-xs text-neutral-500 text-center mb-5">
          Artikel yang Anda tuju mungkin sudah dipindahkan atau tidak tersedia.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-[#609966] px-5 py-2.5 rounded-full"
        >
          <Text className="font-poppins-bold text-white text-xs">
            Kembali ke Beranda
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Top Header matching Image 3 */}
      <SafeAreaView edges={["top"]} className="bg-white border-b border-neutral-100">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center gap-3 flex-1">
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              className="p-1 rounded-full active:bg-neutral-100"
            >
              <ArrowLeftIcon size={24} className="text-neutral-800" />
            </Pressable>
            <Text
              numberOfLines={1}
              className="font-poppins-bold text-neutral-800 text-base flex-1"
            >
              {article.category}
            </Text>
          </View>

          <Pressable
            onPress={handleShare}
            hitSlop={8}
            className="p-1.5 rounded-full active:bg-neutral-100"
            accessibilityLabel="Bagikan Artikel"
          >
            <ShareNetworkIcon size={22} className="text-neutral-700" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Main Content Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
        className="flex-1"
      >
        {/* Banner Tag */}
        <View className="bg-neutral-100 py-1.5 px-3 rounded-lg mb-4 self-start">
          <Text className="font-poppins-medium text-[10px] text-neutral-500 uppercase tracking-wider">
            Edukasi Kesehatan Mental • MutaCare
          </Text>
        </View>

        {/* Article Title */}
        <Text className="font-poppins-bold text-neutral-900 text-2xl leading-tight mb-3">
          {article.title}
        </Text>

        {/* Category & Read Time Row */}
        <View className="flex-row items-center gap-2.5 mb-2">
          <View className="bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
            <Text className="font-poppins-semibold text-xs text-[#BE185D]">
              {article.category}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <ClockIcon size={13} className="text-neutral-400" />
            <Text className="font-poppins text-xs text-neutral-500">
              {article.readTime}
            </Text>
          </View>
        </View>

        {/* Reviewer & Date */}
        <Text className="font-poppins text-xs text-neutral-500 mb-4">
          Ditinjau oleh{" "}
          <Text className="font-poppins-semibold text-neutral-700">
            {article.reviewer}
          </Text>{" "}
          • {article.date}
        </Text>

        {/* Lead Summary Callout (Italic Bold block as in Image 3) */}
        <View className="bg-neutral-50 p-4 rounded-2xl border-l-4 border-[#E11462] mb-5">
          <Text className="font-poppins-semibold-italic text-neutral-800 text-sm leading-6">
            "{article.summary}"
          </Text>
        </View>

        {/* Featured Image */}
        <View className="w-full h-52 rounded-2xl overflow-hidden bg-neutral-100 mb-6 shadow-sm border border-neutral-100">
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
              className="w-full h-full items-center justify-center p-6"
            >
              <SparkleIcon size={44} color="#ffffff" weight="fill" />
              <Text className="font-poppins-bold text-white text-sm text-center mt-2">
                MutaCare Edukasi Klinis
              </Text>
            </LinearGradient>
          )}
        </View>

        {/* Article Content Sections */}
        <View className="gap-5">
          {article.content.map((sec, idx) => (
            <View key={idx} className="gap-2">
              {sec.heading && (
                <Text className="font-poppins-bold text-neutral-900 text-base leading-snug">
                  {sec.heading}
                </Text>
              )}
              <Text className="font-poppins text-neutral-700 text-sm leading-6">
                {sec.body}
              </Text>

              {/* Bullet points if any */}
              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <View className="gap-2 mt-1 pl-1">
                  {sec.bulletPoints.map((bp, bpIdx) => (
                    <View key={bpIdx} className="flex-row items-start gap-2.5">
                      <View className="mt-1">
                        <CheckCircleIcon
                          size={16}
                          weight="fill"
                          className="text-[#609966]"
                        />
                      </View>
                      <Text className="flex-1 font-poppins text-neutral-700 text-xs leading-5">
                        {bp}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Callout box if any */}
              {sec.callout && (
                <View className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-150 mt-2">
                  <Text className="font-poppins-medium text-emerald-800 text-xs leading-5">
                    💡 <Text className="font-poppins-bold">Catatan Penting:</Text>{" "}
                    {sec.callout}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mt-6 pt-4 border-t border-neutral-100">
          {article.tags.map((tag) => (
            <View
              key={tag}
              className="bg-neutral-100 px-3 py-1 rounded-full"
            >
              <Text className="font-poppins text-xs text-neutral-600">
                #{tag}
              </Text>
            </View>
          ))}
        </View>

        {/* Disclaimer Card */}
        <View className="bg-amber-50 p-4 rounded-2xl border border-amber-200/60 mt-6">
          <Text className="font-poppins-semibold text-amber-800 text-xs mb-1">
            ⚠️ Disclaimer Medis
          </Text>
          <Text className="font-poppins text-[11px] text-amber-700 leading-4">
            Informasi dalam artikel ini dirancang sebagai sarana edukasi dan panduan awal. Kondisi selective mutism memerlukan evaluasi menyeluruh oleh psikolog anak, psikiater, atau terapis wicara profesional.
          </Text>
        </View>

        {/* Related Articles ("Artikel Terkait") */}
        {relatedArticles.length > 0 && (
          <View className="mt-8 pt-6 border-t border-neutral-200">
            <Text className="font-poppins-bold text-neutral-800 text-base mb-3">
              Artikel Terkait
            </Text>
            <View className="gap-3">
              {relatedArticles.map((rel) => (
                <Pressable
                  key={rel.id}
                  onPress={() => {
                    router.push({
                      pathname: "/articles/[id]" as any,
                      params: { id: rel.id },
                    });
                  }}
                  className="flex-row items-center bg-neutral-50 p-3 rounded-2xl border border-neutral-100"
                >
                  <View className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 mr-3">
                    <Image
                      source={{ uri: rel.imageUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-poppins-medium text-[10px] text-[#BE185D] mb-0.5">
                      {rel.category}
                    </Text>
                    <Text
                      numberOfLines={2}
                      className="font-poppins-semibold text-neutral-800 text-xs leading-snug"
                    >
                      {rel.title}
                    </Text>
                    <Text className="font-poppins text-[10px] text-neutral-400 mt-1">
                      {rel.readTime}
                    </Text>
                  </View>
                  <CaretRightIcon size={16} className="text-neutral-400 ml-1" />
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
