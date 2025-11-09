import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { BloodGroupPicker } from '../../components/BloodGroupPicker';
import { AppModal } from '../../components/AppModal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { BloodGroup } from '../../utils/constants';
import { validateName, validatePhone } from '../../utils/validation';
import { SPACING } from '../../utils/theme';

export default function ProfileSetup() {
  const router = useRouter();
  const { updateUser } = useAuth();
  const { showSuccess } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [errors, setErrors] = useState({ name: '', phone: '', bloodGroup: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    let hasErrors = false;
    const newErrors = { name: '', phone: '', bloodGroup: '' };

    if (!validateName(name)) {
      newErrors.name = 'Please enter your full name';
      hasErrors = true;
    }

    if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      hasErrors = true;
    }

    if (!bloodGroup) {
      newErrors.bloodGroup = 'Please select your blood group';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    setLoading(true);
    setTimeout(() => {
      updateUser({ name, phone: `+92${phone}`, bloodGroup: bloodGroup as BloodGroup });
      showSuccess('Profile saved!');
      setLoading(false);
      router.replace('/(user)/home');
    }, 500);
  };

  return (
    <AppModal visible={true} onClose={() => {}} title="Complete Your Profile">
      <View>
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
          icon="person"
          error={errors.name}
        />

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
          placeholder="3001234567"
          keyboardType="phone-pad"
          icon="call"
          error={errors.phone}
          maxLength={10}
        />

        <BloodGroupPicker
          label="Blood Group"
          value={bloodGroup}
          onSelect={setBloodGroup}
          error={errors.bloodGroup}
        />

        <Button
          title="Save & Start"
          onPress={handleSave}
          loading={loading}
          style={styles.button}
        />
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: SPACING.lg,
  },
});
