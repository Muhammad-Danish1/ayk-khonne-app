import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppModal } from "../../../../components/AppModal";
import { Button } from "../../../../components/Button";
import { useToast } from "../../../../hooks/useToast";
import { dummyRequests } from "../../../../utils/dummyData";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SPACING,
} from "../../../../utils/theme";
import { formatDistance, formatTimeAgo } from "../../../../utils/validation";

export default function RequestDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showSuccess } = useToast();

  const request = dummyRequests.find((r) => r.id === id) || dummyRequests[0];

  const handleHelp = () => {
    showSuccess("Chat Started!");
    router.back();
    setTimeout(() => {
      router.push("/(user)/chats");
    }, 300);
  };

  return (
    <AppModal
      visible={true}
      onClose={() => router.back()}
      title="Request Details"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View
            style={[
              styles.bloodBadge,
              request.urgency === "urgent" && styles.urgent,
            ]}
          >
            <Text style={styles.bloodGroup}>{request.bloodGroup}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.units}>
              {request.units} unit{request.units > 1 ? "s" : ""}
            </Text>
            {request.urgency === "urgent" && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Patient Name</Text>
          <Text style={styles.value}>{request.patientName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Hospital</Text>
          <View style={styles.row}>
            <Ionicons name="business" size={20} color={COLORS.secondary} />
            <Text style={styles.hospitalValue}>{request.hospital}</Text>
          </View>
          <Text style={styles.address}>{request.hospitalAddress}</Text>
        </View>

        {request.distance !== undefined && (
          <View style={styles.section}>
            <Text style={styles.label}>Distance</Text>
            <View style={styles.row}>
              <Ionicons name="navigate" size={20} color={COLORS.primary} />
              <Text style={styles.distanceValue}>
                {formatDistance(request.distance)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Requested</Text>
          <Text style={styles.value}>{formatTimeAgo(request.createdAt)}</Text>
        </View>

        <View style={styles.mapContainer}>
          <View style={styles.mapMock}>
            <View style={styles.mapGrid}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <View
                  key={`h-${i}`}
                  style={[styles.mapGridLine, { top: i * 33.33 }]}
                />
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <View
                  key={`v-${i}`}
                  style={[
                    styles.mapGridLineVertical,
                    { left: `${i * 16.67}%` },
                  ]}
                />
              ))}
            </View>
            <View style={styles.mapRoute}>
              <View style={styles.routeLine} />
            </View>
            <View style={styles.mapMarkerUser}>
              <Ionicons name="person" size={20} color={COLORS.white} />
            </View>
            <View style={styles.mapMarkerHospital}>
              <Ionicons name="location" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.mapOverlay}>
              <View style={styles.mapOverlayContent}>
                <Ionicons name="business" size={20} color={COLORS.secondary} />
                <Text style={styles.mapOverlayText}>{request.hospital}</Text>
              </View>
              {request.distance !== undefined && (
                <Text style={styles.mapDistanceText}>
                  {formatDistance(request.distance)} away
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.chatPreview}>
          <Text style={styles.chatTitle}>Recent Messages</Text>
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>
              Hi, I need {request.bloodGroup} blood urgently.
            </Text>
            <Text style={styles.chatTime}>10 min ago</Text>
          </View>
          <View style={[styles.chatBubble, styles.chatBubbleOwn]}>
            <Text style={[styles.chatText, styles.chatTextOwn]}>
              I can help! On my way.
            </Text>
            <Text style={styles.chatTime}>5 min ago</Text>
          </View>
        </View>

        <Button
          title="I Can Help"
          onPress={handleHelp}
          style={styles.helpButton}
        />
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  bloodBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  urgent: {
    backgroundColor: COLORS.error,
  },
  bloodGroup: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xxl,
    fontWeight: "700",
  },
  headerInfo: {
    flex: 1,
  },
  units: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  urgentBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: "flex-start",
  },
  urgentText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  hospitalValue: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.secondary,
    fontWeight: "600",
  },
  address: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: SPACING.xs,
  },
  distanceValue: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: "600",
  },
  mapContainer: {
    height: 200,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  mapMock: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  mapGrid: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  mapGridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.grayMedium + "60",
  },
  mapGridLineVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    top: 0,
    backgroundColor: COLORS.grayMedium + "60",
  },
  mapRoute: {
    position: "absolute",
    top: 60,
    left: 30,
    width: 120,
    height: 60,
  },
  routeLine: {
    width: "100%",
    height: "100%",
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.secondary,
    borderStyle: "dashed",
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  mapMarkerUser: {
    position: "absolute",
    bottom: 80,
    left: 30,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.white,
    zIndex: 10,
  },
  mapMarkerHospital: {
    position: "absolute",
    top: 60,
    right: 100,
    zIndex: 10,
  },
  mapOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white + "F5",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayMedium,
  },
  mapOverlayContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  mapOverlayText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.text,
    flex: 1,
  },
  mapDistanceText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
    marginTop: 2,
  },
  chatPreview: {
    backgroundColor: COLORS.grayLight,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  chatTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  chatBubble: {
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  chatBubbleOwn: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  chatText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  chatTextOwn: {
    color: COLORS.white,
  },
  chatTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
    marginTop: 4,
  },
  helpButton: {
    marginTop: SPACING.md,
  },
});
