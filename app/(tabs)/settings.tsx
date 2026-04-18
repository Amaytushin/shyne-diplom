import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Router-г import хийв
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Тохиргооны Item Компонент ---
interface SettingItemProps {
  icon: any;
  title: string;
  subTitle?: string;
  rightText?: string;
  color?: string;
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  fontSizeMultiplier: number;
}

const SettingItem = ({
  icon,
  title,
  subTitle,
  rightText,
  color = "#1a4371",
  onPress,
  isSwitch,
  switchValue,
  onSwitchChange,
  fontSizeMultiplier,
}: SettingItemProps) => (
  <TouchableOpacity
    style={styles.item}
    activeOpacity={0.6}
    onPress={onPress}
    disabled={isSwitch}
  >
    <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={[styles.itemTitle, { fontSize: 15 * fontSizeMultiplier }]}>
        {title}
      </Text>
      {subTitle && (
        <Text style={[styles.itemSub, { fontSize: 12 * fontSizeMultiplier }]}>
          {subTitle}
        </Text>
      )}
    </View>

    {isSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: "#eee", true: "#1a4371" }}
      />
    ) : (
      <View style={styles.rightContent}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        <Ionicons name="chevron-forward" size={16} color="#ccc" />
      </View>
    )}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const router = useRouter(); // Router-г энд зарлав
  const [fontSizeMode, setFontSizeMode] = useState<"Jijig" | "Dund" | "Tom">("Dund");
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const multiplier =
    fontSizeMode === "Jijig" ? 0.8 : fontSizeMode === "Tom" ? 1.2 : 1;

  const makeCall = () => {
    const url = "tel:86688170";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Алдаа", "Утас залгах боломжгүй төхөөрөмж байна.");
      }
    });
  };

  const toggleFontSize = () => {
    if (fontSizeMode === "Jijig") setFontSizeMode("Dund");
    else if (fontSizeMode === "Dund") setFontSizeMode("Tom");
    else setFontSizeMode("Jijig");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* БАРИМТ БИЧИГ */}
      <Text style={[styles.sectionHeader, { fontSize: 12 * multiplier }]}>БАРИМТ БИЧИГ</Text>
      <View style={styles.section}>
        <SettingItem
          icon="cloud-download-outline"
          title="PDF татах"
          subTitle="Бүлэг, зүйлийг PDF-ээр татах"
          fontSizeMultiplier={multiplier}
        />
        <SettingItem
          icon="print-outline"
          title="Хэвлэх зохион байгуулалт"
          color="#2ecc71"
          fontSizeMultiplier={multiplier}
        />
      </View>

      {/* УДИРДЛАГА */}
      <Text style={[styles.sectionHeader, { fontSize: 12 * multiplier }]}>УДИРДЛАГА</Text>
      <View style={styles.section}>
        <SettingItem
          icon="add-circle-outline"
          title="Шинэ заалт нэмэх"
          subTitle="Бүлэг болон заалт шинээр бүртгэх"
          color="#FF9F43"
          onPress={() => router.push("/add-content")} // Одоо алдаа заахгүй
          fontSizeMultiplier={multiplier}
        />
      </View>

      {/* ЕРӨНХИЙ */}
      <Text style={[styles.sectionHeader, { fontSize: 12 * multiplier }]}>ЕРӨНХИЙ</Text>
      <View style={styles.section}>
        <SettingItem
          icon="text-outline"
          title="Үсгийн хэмжээ"
          rightText={fontSizeMode === "Jijig" ? "Жижиг" : fontSizeMode === "Tom" ? "Том" : "Дунд"}
          color="#6c5ce7"
          onPress={toggleFontSize}
          fontSizeMultiplier={multiplier}
        />
        <SettingItem
          icon="notifications-outline"
          title="Мэдэгдэл"
          color="#e74c3c"
          isSwitch={true}
          switchValue={isNotificationEnabled}
          onSwitchChange={setIsNotificationEnabled}
          fontSizeMultiplier={multiplier}
        />
      </View>

      {/* ТУХАЙ */}
      <Text style={[styles.sectionHeader, { fontSize: 12 * multiplier }]}>ТУХАЙ</Text>
      <View style={styles.section}>
        <SettingItem
          icon="information-circle-outline" // Icon-ийн нэрийг засав
          title="Апп-н мэдээлэл"
          subTitle="v2026.2.0"
          fontSizeMultiplier={multiplier}
          onPress={() =>
            Alert.alert("Мэдээлэл", "Төмөр замын ХАБЭА-н зааварчилгааны систем.")
          }
        />
        <SettingItem
          icon="call-outline"
          title="Холбоо барих"
          subTitle="86688170"
          fontSizeMultiplier={multiplier}
          onPress={makeCall}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { fontSize: 14 * multiplier }]}>Улаанбаатар Технологи Горим</Text>
        <Text style={[styles.versionText, { fontSize: 12 * multiplier }]}>Хувилбар 2026.2.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7fa", padding: 15 },
  sectionHeader: { fontWeight: "bold", color: "#999", marginBottom: 10, marginLeft: 10, marginTop: 25 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingHorizontal: 5,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 15 },
  itemTitle: { fontWeight: "600", color: "#333" },
  itemSub: { color: "#999", marginTop: 2 },
  rightContent: { flexDirection: 'row', alignItems: 'center' },
  rightText: { fontSize: 13, color: "#1a4371", fontWeight: "bold", marginRight: 8 },
  footer: { alignItems: "center", marginTop: 50, marginBottom: 60 },
  footerText: { color: "#aaa", fontWeight: "bold" },
  versionText: { color: "#ccc", marginTop: 5 },
});