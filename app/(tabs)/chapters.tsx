import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Гэрэлтсэн фон өгөхөд ашиглана
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { mockData } from "../../constants/mockData";

const { width } = Dimensions.get("window");

export default function ChaptersScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = mockData.chapters.filter(
    (c) =>
      c.title.includes(search) ||
      c.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Дээд хэсэг - Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>УБТЗ - ХАБЭА</Text>
        <Text style={styles.headerTitle}>Бүлэг, Сэдвүүд</Text>
      </View>

      {/* Хайлтын хэсэг - Modern Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#1a4371" />
          <TextInput
            style={styles.input}
            placeholder="Сэдэв, агуулга хайх..."
            placeholderTextColor="#99a"
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Жагсаалт */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => router.push(`/chapter/${item.id}`)}
          >
            <LinearGradient
              colors={
                index % 2 === 0
                  ? ["#1a4371", "#2a5a8f"]
                  : ["#4A90E2", "#5ca8ff"]
              }
              style={styles.cardIndex}
            >
              <Text style={styles.idxText}>{item.id}</Text>
            </LinearGradient>

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.desc}
              </Text>
            </View>

            <View style={styles.arrowIcon}>
              <Ionicons name="chevron-forward" size={18} color="#1a4371" />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color="#ddd" />
            <Text style={styles.emptyText}>Ийм сэдэв олдсонгүй</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4A90E2",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a4371",
    marginTop: 4,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    // Shadow
    shadowColor: "#1a4371",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: "#333" },
  listContent: { padding: 20, paddingBottom: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIndex: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  idxText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  cardBody: { flex: 1, marginLeft: 15, marginRight: 10 },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a4371",
    marginBottom: 4,
    lineHeight: 18,
  },
  cardDesc: { fontSize: 13, color: "#667", lineHeight: 18 },
  arrowIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    marginTop: 10,
    color: "#99a",
    fontSize: 16,
  },
});
