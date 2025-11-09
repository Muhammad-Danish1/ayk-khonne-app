import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AppModal } from '../../../components/AppModal';
import { useToast } from '../../../hooks/useToast';
import { useMode } from '../../../context/ModeContext';
import { validateName, validateLicenseNumber } from '../../../utils/validation';
import { COLORS, SPACING, FONT_SIZES } from '../../../utils/theme';
import { Text } from 'react-native';

export default function SetupBloodBank() {
  const router = useRouter();
  const { showSuccess } = useToast();
  const { setBloodbankStatus } = useMode();
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({ name: '', licenseNumber: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = { name: '', licenseNumber: '', address: '' };

    if (!validateName(name)) {
      newErrors.name = 'Please enter blood bank name';
      hasErrors = true;
    }

    if (!validateLicenseNumber(licenseNumber)) {
      newErrors.licenseNumber = 'License number must be at least 5 characters';
      hasErrors = true;
    }

    if (!address.trim()) {
      newErrors.address = 'Please enter complete address';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    setLoading(true);
    setTimeout(() => {
      setBloodbankStatus('pending');
      showSuccess('Submitted! Awaiting Admin Approval');
      setLoading(false);
      router.back();
    }, 500);
  };

  return (
    <AppModal visible={true} onClose={() => router.back()} title="Register Your Blood Bank">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Blood Bank Name"
          value={name}
          onChangeText={setName}
          placeholder="Central Blood Bank"
          icon="business"
          error={errors.name}
        />

        <Input
          label="License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          placeholder="BB-LHR-12345"
          icon="document-text"
          error={errors.licenseNumber}
        />

        <Input
          label="Full Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Street, Area, City"
          icon="location"
          error={errors.address}
          multiline
          numberOfLines={3}
        />

        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>📍 Pin Location</Text>
          <Text style={styles.mapSubtext}>Tap to select your blood bank location on map</Text>
        </View>

        <Button
          title="Submit for Approval"
          onPress={handleSubmit}
          loading={loading}
        />
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  mapPlaceholder: {
    height: 120,
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    borderStyle: 'dashed',
  },
  mapText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  mapSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
});
