import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { BloodGroupPicker } from '../../../components/BloodGroupPicker';
import { AppModal } from '../../../components/AppModal';
import { useToast } from '../../../hooks/useToast';
import { BloodGroup, UNITS_OPTIONS } from '../../../utils/constants';
import { validateName } from '../../../utils/validation';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../utils/theme';
import { TouchableOpacity } from 'react-native';

export default function CreateRequest() {
  const router = useRouter();
  const { showSuccess } = useToast();
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [units, setUnits] = useState(1);
  const [hospital, setHospital] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [errors, setErrors] = useState({ patientName: '', bloodGroup: '', hospital: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = { patientName: '', bloodGroup: '', hospital: '' };

    if (!validateName(patientName)) {
      newErrors.patientName = 'Please enter patient name';
      hasErrors = true;
    }

    if (!bloodGroup) {
      newErrors.bloodGroup = 'Please select blood group';
      hasErrors = true;
    }

    if (!hospital.trim()) {
      newErrors.hospital = 'Please enter hospital name';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    setLoading(true);
    setTimeout(() => {
      showSuccess('Request Posted Successfully!');
      setLoading(false);
      router.back();
    }, 500);
  };

  return (
    <AppModal visible={true} onClose={() => router.back()} title="Post Blood Request">
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
                style={[styles.unitButton, units === unit && styles.unitButtonActive]}
                onPress={() => setUnits(unit)}
              >
                <Text style={[styles.unitText, units === unit && styles.unitTextActive]}>
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
              style={[styles.urgencyButton, urgency === 'normal' && styles.urgencyButtonActive]}
              onPress={() => setUrgency('normal')}
            >
              <Text style={[styles.urgencyText, urgency === 'normal' && styles.urgencyTextActive]}>
                Normal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.urgencyButton,
                urgency === 'urgent' && styles.urgencyButtonActiveUrgent,
              ]}
              onPress={() => setUrgency('urgent')}
            >
              <Text
                style={[styles.urgencyText, urgency === 'urgent' && styles.urgencyTextActive]}
              >
                Urgent
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>📍 Map Preview</Text>
          <Text style={styles.mapSubtext}>Hospital location will be shown here</Text>
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
    fontWeight: '500',
  },
  unitsContainer: {
    marginBottom: SPACING.md,
  },
  unitsButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  unitButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  unitText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  unitTextActive: {
    color: COLORS.white,
  },
  urgencyContainer: {
    marginBottom: SPACING.md,
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
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
    fontWeight: '600',
  },
  urgencyTextActive: {
    color: COLORS.white,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: COLORS.grayLight,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  mapText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  mapSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
  },
});
