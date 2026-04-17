import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { mockData } from "../../constants/mockData";

export default function ChapterDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // mockData-аас тухайн ID-тай бүлгийг хайж олох
  const chapter = mockData.chapters.find((c) => c.id === id);

  // Хэрэв бүлэг олдохгүй бол алдаа заана
  if (!chapter) {
    return (
      <View style={styles.errorContainer}>
        <Text>Уучлаарай, мэдээлэл олдсонгүй.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ color: "#1a4371" }}>Буцах</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 1. Header хэсэг */}
      <View style={styles.header}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerTextContent}>
            <Text style={styles.chapterTag}>{chapter.title}</Text>
            <Text style={styles.mainTitle}>{chapter.desc}</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* 2. Агуулгын хэсэг */}
      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionLabel}>БҮЛГИЙН ЗҮЙЛ, ЗААЛТУУД</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{chapter.sections.length} зүйл</Text>
          </View>
        </View>

        {chapter.sections.map((sectionText, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sectionCard}
            activeOpacity={0.6}
          >
            <View style={styles.cardMain}>
              <View style={styles.iconCircle}>
                <Ionicons name="document-text" size={18} color="#1a4371" />
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.sectionText}>{sectionText}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D1D1D6" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#1a4371",
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  headerTextContent: {
    paddingLeft: 5,
  },
  chapterTag: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  mainTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    lineHeight: 28,
  },
  contentScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8E8E93",
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: "#E1E8F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  countText: {
    fontSize: 10,
    color: "#1a4371",
    fontWeight: "bold",
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardMain: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#3A3A3C",
    fontWeight: "500",
    lineHeight: 20,
  },
  backBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E1E8F0",
    borderRadius: 10,
  },
});
