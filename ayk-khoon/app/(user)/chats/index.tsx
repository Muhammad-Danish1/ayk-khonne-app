import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../../components/Card";
import { dummyChats } from "../../../utils/dummyData";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SPACING,
} from "../../../utils/theme";
import { formatTimeAgo } from "../../../utils/validation";

export default function Chats() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dummyChats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() => router.push(`/common/${chat.id}`)}
            activeOpacity={0.7}
          >
            <Card style={styles.chatCard}>
              <View style={styles.chatRow}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={24} color={COLORS.white} />
                </View>
                <View style={styles.chatInfo}>
                  <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>
                      {chat.participants.find((p) => p.id !== "user-1")?.name ||
                        "User"}
                    </Text>
                    <Text style={styles.chatTime}>
                      {chat.lastMessage &&
                        formatTimeAgo(chat.lastMessage.createdAt)}
                    </Text>
                  </View>
                  {chat.lastMessage && (
                    <Text style={styles.chatMessage} numberOfLines={1}>
                      {chat.lastMessage.text}
                    </Text>
                  )}
                </View>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "700",
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  chatCard: {
    marginBottom: SPACING.md,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  chatName: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
  },
  chatTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
  },
  chatMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  unreadText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
  },
});
