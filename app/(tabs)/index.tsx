import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import { mockData } from "../../constants/mockData";

export default function HomeScreen() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // Шинэ мэдэгдэл байгаа эсэх

  // Жишээ мэдэгдлүүд
  const notifications = [
    { id: '1', title: 'Шинэ зааварчилгаа', desc: 'ХАБЭА-н 4-р бүлэгт өөрчлөлт орлоо.', time: '10 минутын өмнө' },
    { id: '2', title: 'Амжилт', desc: 'Та сүүлийн тестийн 90%-ийг гүйцэтгэсэн байна.', time: '1 цагийн өмнө' },
    { id: '3', title: 'Сануулга', desc: 'Өвлийн бэлтгэл ажлын сургалт маргааш эхэлнэ.', time: '3 цагийн өмнө' },
  ];

  const getStatIcon = (label: string) => {
    switch (label) {
      case "Бүлэг": return { name: "book", color: "#4A90E2" };
      case "Зүйл": return { name: "document-text", color: "#50E3C2" };
      case "Заалт": return { name: "list", color: "#F5A623" };
      default: return { name: "git-branch", color: "#B8E986" };
    }
  };

  const openNotifications = () => {
    setShowNotifications(true);
    setHasUnread(false); // Дарахад улаан цэг алга болно
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Улаанбаатар Технологи Горим</Text>
              <View style={styles.row}>
                <Text style={styles.headerYear}>2026</Text>
                {/* Мэдэгдлийн товчлуур */}
                <TouchableOpacity 
                  style={styles.notifButton} 
                  onPress={openNotifications}
                >
                  <Ionicons name="notifications-outline" size={26} color="#1a4371" />
                  {hasUnread && <View style={styles.notifBadge} />}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.logoCircle}>
              <Ionicons name="train" size={30} color="#fff" />
            </View>
          </View>
          
          <Text style={styles.headerSub}>
            Станцын технологийн горимын цахим систем
          </Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>🕒 2026.04.18</Text>
          </View>
        </View>

        {/* Статистик */}
        <View style={styles.statsGrid}>
          {mockData.stats.map((item) => {
            const icon = getStatIcon(item.label);
            return (
              <View key={item.id} style={styles.statBox}>
                <View style={[styles.statIconCircle, { backgroundColor: icon.color + "15" }]}>
                  <Ionicons name={icon.name as any} size={18} color={icon.color} />
                </View>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Түргэн хандалт</Text>
          <TouchableOpacity onPress={() => router.push("/chapters")}>
            <Text style={styles.seeAll}>Бүгдийг харах →</Text>
          </TouchableOpacity>
        </View>

        {mockData.chapters.slice(0, 4).map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/chapter/${item.id}`)}
          >
            <View style={[styles.iconPlaceholder, { backgroundColor: index % 2 === 0 ? "#E3F2FD" : "#F3E5F5" }]}>
              <Ionicons name="layers-outline" size={22} color="#1a4371" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardSmallTitle}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.cardMainTitle}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Мэдэгдлийн Modal цонх */}
      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Мэдэгдлүүд</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Ionicons name="close-circle" size={30} color="#ccc" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notifItem}>
                  <View style={styles.notifCircle}>
                    <Ionicons name="information-blue" size={20} color="#1a4371" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifDesc}>{item.desc}</Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9ff", padding: 16 },
  headerCard: { backgroundColor: "#fff", padding: 24, borderRadius: 30, marginBottom: 24, elevation: 4 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  row: { flexDirection: 'row', alignItems: 'center' },
  notifButton: { marginLeft: 15, position: 'relative', top: 5 },
  notifBadge: { position: 'absolute', top: 2, right: 2, width: 10, height: 10, backgroundColor: 'red', borderRadius: 5, borderWidth: 2, borderColor: '#fff' },
  logoCircle: { width: 50, height: 50, backgroundColor: "#1a4371", borderRadius: 25, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#1a4371" },
  headerYear: { fontSize: 38, fontWeight: "900", color: "#1a4371" },
  headerSub: { color: "#555", fontSize: 13, marginTop: 8 },
  dateBadge: { backgroundColor: "#f0f0f0", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, alignSelf: "flex-start", marginTop: 15 },
  dateText: { fontSize: 11, color: "#777" },
  statsGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
  statBox: { backgroundColor: "#fff", width: "23%", paddingVertical: 15, borderRadius: 20, alignItems: "center", elevation: 2 },
  statIconCircle: { width: 34, height: 34, borderRadius: 17, justifyContent: "center", alignItems: "center", marginBottom: 5 },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#1a4371" },
  statLabel: { fontSize: 10, color: "#999" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#222" },
  seeAll: { color: "#1a4371", fontSize: 13, fontWeight: "600" },
  card: { backgroundColor: "#fff", flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 20, marginBottom: 12, elevation: 1 },
  iconPlaceholder: { width: 45, height: 45, borderRadius: 14, justifyContent: "center", alignItems: "center", marginRight: 15 },
  cardSmallTitle: { fontSize: 10, color: "#1a4371", fontWeight: "bold" },
  cardMainTitle: { fontSize: 14, color: "#333", marginTop: 2 },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a4371' },
  notifItem: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  notifCircle: { width: 40, height: 40, backgroundColor: '#f0f4f8', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  notifTitle: { fontWeight: 'bold', color: '#333' },
  notifDesc: { color: '#666', fontSize: 13, marginTop: 2 },
  notifTime: { color: '#bbb', fontSize: 11, marginTop: 5 },
});