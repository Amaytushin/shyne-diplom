import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { mockData } from "../../constants/mockData";

const { width, height } = Dimensions.get("window");

export default function AccidentScreen() {
  const [activeTab, setActiveTab] = useState<"nearMiss" | "accidents">(
    "nearMiss",
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Графикт зориулсан дата бэлтгэл
  const chartData = mockData.accidents.map((item) => ({
    name: item.title,
    count: item.count,
    color: item.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  const displayData =
    activeTab === "nearMiss"
      ? mockData.incidentReports.nearMiss
      : mockData.incidentReports.accidents;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Аюулгүй ажиллагааны тайлан</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. График болон Товчоо хэсэг */}
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Статистик тойм</Text>
          <PieChart
            data={chartData}
            width={width - 40}
            height={180}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"count"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />

          <View style={styles.statsRow}>
            {mockData.accidents.map((stat) => (
              <View key={stat.id} style={styles.statBox}>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.count}
                </Text>
                <Text style={styles.statLabel}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 2. Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "nearMiss" && styles.activeTab]}
            onPress={() => setActiveTab("nearMiss")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "nearMiss" && styles.activeTabText,
              ]}
            >
              Осол дөхсөн ({mockData.incidentReports.nearMiss.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "accidents" && styles.activeTab]}
            onPress={() => setActiveTab("accidents")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "accidents" && styles.activeTabText,
              ]}
            >
              Осол гарсан ({mockData.incidentReports.accidents.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. Жагсаалтын хэсэг */}
        <View style={styles.list}>
          {displayData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => setSelectedItem(item)}
            >
              <View
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      activeTab === "nearMiss" ? "#FF9500" : "#FF3B30",
                  },
                ]}
              />
              <View style={styles.cardBody}>
                <Text style={styles.locationText}>{item.location}</Text>
                <Text style={styles.summaryText} numberOfLines={2}>
                  {item.summary}
                </Text>
                <View style={styles.dateContainer}>
                  <Ionicons name="time-outline" size={12} color="#999" />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* --- Detail Modal --- */}
      <Modal
        visible={!!selectedItem}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Дэлгэрэнгүй мэдээлэл</Text>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Ionicons name="close-circle" size={30} color="#1a4371" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Байршил ба Хугацаа</Text>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    📍 {selectedItem?.location}
                  </Text>
                  <Text style={styles.infoText}>🗓️ {selectedItem?.date}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  Тогтоогдсон нөхцөл байдал
                </Text>
                <Text style={styles.descriptionText}>
                  {selectedItem?.details}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Зөрчигдсөн заалтууд</Text>
                {selectedItem?.rules.map((rule: string, index: number) => (
                  <View key={index} style={styles.ruleItem}>
                    <View style={styles.ruleBullet}>
                      <Text style={styles.ruleBulletText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.ruleText}>{rule}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  header: {
    paddingVertical: 20,
    backgroundColor: "#1a4371",
    alignItems: "center",
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },

  // Chart Section
  chartCard: {
    backgroundColor: "#FFF",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1a4371",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 15,
  },
  statBox: { width: "23%", alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "bold" },
  statLabel: { fontSize: 9, color: "#666", textAlign: "center", marginTop: 4 },

  // Tab Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: { backgroundColor: "#1a4371" },
  tabText: { color: "#999", fontWeight: "600", fontSize: 13 },
  activeTabText: { color: "#FFF" },

  // List Styles
  list: { padding: 16 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
  },
  indicator: { width: 4, height: "100%", borderRadius: 2, marginRight: 15 },
  cardBody: { flex: 1 },
  locationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1a4371",
    marginBottom: 4,
  },
  summaryText: { fontSize: 14, color: "#333", marginBottom: 6, lineHeight: 18 },
  dateContainer: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 11, color: "#999", marginLeft: 4 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height * 0.85,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#1a4371" },
  section: { marginBottom: 25 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoBox: { backgroundColor: "#F0F4F8", padding: 12, borderRadius: 10 },
  infoText: {
    fontSize: 14,
    color: "#1a4371",
    fontWeight: "600",
    marginBottom: 4,
  },
  descriptionText: { fontSize: 15, color: "#444", lineHeight: 22 },
  ruleItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  ruleBullet: {
    backgroundColor: "#E8EDF3",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },
  ruleBulletText: { fontSize: 12, fontWeight: "bold", color: "#1a4371" },
  ruleText: { flex: 1, fontSize: 14, color: "#333", lineHeight: 20 },
});
