import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddContentScreen() {
  const router = useRouter();
  const [chapter, setChapter] = useState("");
  
  // Заалтуудыг жагсаалт хэлбэрээр хадгалах state
  const [sections, setSections] = useState([
    { id: Date.now(), title: "", content: "" }
  ]);

  // Шинэ заалт нэмэх функц
  const addNewSection = () => {
    setSections([...sections, { id: Date.now(), title: "", content: "" }]);
  };

  // Заалтыг устгах функц
  const removeSection = (id: number) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  // Текст өөрчлөгдөх үед state-ийг шинэчлэх
  const updateSection = (id: number, field: 'title' | 'content', value: string) => {
    const newSections = sections.map(section => {
      if (section.id === id) {
        return { ...section, [field]: value };
      }
      return section;
    });
    setSections(newSections);
  };

  const handleSave = () => {
    if (!chapter || sections.some(s => !s.title || !s.content)) {
      Alert.alert("Алдаа", "Бүлэг болон бүх заалтын талбарыг бөглөнө үү!");
      return;
    }

    // Энд өгөгдлөө хадгалах логик (API дуудах гэх мэт)
    console.log({ chapter, sections });
    
    Alert.alert("Амжилттай", `${sections.length} заалт бүртгэгдлээ.`, [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F4F7FA" }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#1a4371" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Олон заалт нэмэх</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveHeaderBtn}>Хадгалах</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Бүлгийн мэдээлэл */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Бүлгийн дугаар / Нэр</Text>
          <TextInput
            style={styles.chapterInput}
            placeholder="Жишээ: 1-р бүлэг"
            value={chapter}
            onChangeText={setChapter}
          />
        </View>

        <Text style={styles.listHeader}>Заалтуудын жагсаалт</Text>

        {/* Нэмэгдсэн заалтууд */}
        {sections.map((item, index) => (
          <View key={item.id} style={styles.sectionCard}>
            <View style={styles.cardHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{index + 1}-р заалт</Text>
              </View>
              {sections.length > 1 && (
                <TouchableOpacity onPress={() => removeSection(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#E53E3E" />
                </TouchableOpacity>
              )}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Заалтын гарчиг..."
              value={item.title}
              onChangeText={(val) => updateSection(item.id, 'title', val)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Дэлгэрэнгүй агуулга..."
              multiline
              value={item.content}
              onChangeText={(val) => updateSection(item.id, 'content', val)}
            />
          </View>
        ))}

        {/* Заалт нэмэх товчлуур */}
        <TouchableOpacity style={styles.addButton} onPress={addNewSection}>
          <Ionicons name="add-circle" size={24} color="#1a4371" />
          <Text style={styles.addButtonText}>Дахиад заалт нэмэх</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1a4371" },
  saveHeaderBtn: { color: "#1a4371", fontWeight: "bold", fontSize: 15 },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  label: { fontSize: 13, fontWeight: "600", color: "#718096", marginBottom: 8 },
  chapterInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a4371",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  listHeader: { fontSize: 14, fontWeight: "700", color: "#4A5568", marginVertical: 10, marginLeft: 4 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  badge: { backgroundColor: "#EBF8FF", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, color: "#2C5282", fontWeight: "bold" },
  input: {
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EDF2F7",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: "#1a4371",
    borderStyle: "dashed",
    borderRadius: 15,
    marginTop: 10,
  },
  addButtonText: { marginLeft: 8, color: "#1a4371", fontWeight: "bold" },
});