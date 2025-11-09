import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppModal } from "../../../../components/AppModal";
import { BloodGroupPicker } from "../../../../components/BloodGroupPicker";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { useToast } from "../../../../hooks/useToast";
import { BloodGroup, UNITS_OPTIONS } from "../../../../utils/constants";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SPACING,
} from "../../../../utils/theme";
import { validateName } from "../../../../utils/validation";

export default function CreateRequest() {
  const router = useRouter();
  const { showSuccess } = useToast();
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | "">("");
  const [units, setUnits] = useState(1);
  const [hospital, setHospital] = useState("");
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
  const [errors, setErrors] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = { patientName: "", bloodGroup: "", hospital: "" };

    if (!validateName(patientName)) {
      newErrors.patientName = "Please enter patient name";
      hasErrors = true;
    }

    if (!bloodGroup) {
      newErrors.bloodGroup = "Please select blood group";
      hasErrors = true;
    }

    if (!hospital.trim()) {
      newErrors.hospital = "Please enter hospital name";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    setLoading(true);
    setTimeout(() => {
      showSuccess("Request Posted Successfully!");
      setLoading(false);
      router.back();
    }, 500);
  };

  return (
    <AppModal
      visible={true}
      onClose={() => router.back()}
      title="Post Blood Request"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Patient Name"
          value={patientName}
          onChangeText={setPatientName}
          placeholder="Enter patient name"
          icon="person"
          error={errors.patientName}
        />

        <BloodGroupPicker
          label="Blood Group Needed"
          value={bloodGroup}
          onSelect={setBloodGroup}
          error={errors.bloodGroup}
        />

        <View style={styles.unitsContainer}>
          <Text style={styles.label}>Units Needed</Text>
          <View style={styles.unitsButtons}>
            {UNITS_OPTIONS.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  units === unit && styles.unitButtonActive,
                ]}
                onPress={() => setUnits(unit)}
              >
                <Text
                  style={[
                    styles.unitText,
                    units === unit && styles.unitTextActive,
                  ]}
                >
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Input
          label="Hospital"
          value={hospital}
          onChangeText={setHospital}
          placeholder="Enter hospital name"
          icon="business"
          error={errors.hospital}
        />

        <View style={styles.urgencyContainer}>
          <Text style={styles.label}>Urgency Level</Text>
          <View style={styles.urgencyButtons}>
            <TouchableOpacity
              style={[
                styles.urgencyButton,
                urgency === "normal" && styles.urgencyButtonActive,
              ]}
              onPress={() => setUrgency("normal")}
            >
              <Text
                style={[
                  styles.urgencyText,
                  urgency === "normal" && styles.urgencyTextActive,
                ]}
              >
                Normal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.urgencyButton,
                urgency === "urgent" && styles.urgencyButtonActiveUrgent,
              ]}
              onPress={() => setUrgency("urgent")}
            >
              <Text
                style={[
                  styles.urgencyText,
                  urgency === "urgent" && styles.urgencyTextActive,
                ]}
              >
                Urgent
              </Text>
            </TouchableOpacity>
          </View>
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
            <View style={styles.mapMarker}>
              <Ionicons name="location" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.mapOverlay}>
              <Text style={styles.mapOverlayText}>
                📍 {hospital || "Hospital Location"}
              </Text>
            </View>
          </View>
        </View>

        <Button title="Post Request" onPress={handleSubmit} loading={loading} />
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    fontWeight: "500",
  },
  unitsContainer: {
    marginBottom: SPACING.md,
  },
  unitsButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  unitButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
  },
  unitButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  unitText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: "600",
  },
  unitTextActive: {
    color: COLORS.white,
  },
  urgencyContainer: {
    marginBottom: SPACING.md,
  },
  urgencyButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
  },
  urgencyButtonActive: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  urgencyButtonActiveUrgent: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  urgencyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: "600",
  },
  urgencyTextActive: {
    color: COLORS.white,
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
    backgroundColor: COLORS.grayMedium,
  },
  mapGridLineVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    top: 0,
    backgroundColor: COLORS.grayMedium,
  },
  mapMarker: {
    position: "absolute",
    top: 84,
    left: "50%",
    transform: [{ translateX: -16 }],
    zIndex: 10,
  },
  mapOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white + "F0",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  mapOverlayText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.text,
  },
});
