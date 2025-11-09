import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { BloodGroupPicker } from '../../components/BloodGroupPicker';
import { AppModal } from '../../components/AppModal';
import { useAuth } from '../../context/AuthContext';
import { useMode } from '../../context/ModeContext';
import { useToast } from '../../hooks/useToast';
import { BloodGroup } from '../../utils/constants';
import { validateName, validatePhone } from '../../utils/validation';
import { SPACING, COLORS, FONT_SIZES, BORDER_RADIUS } from '../../utils/theme';

export default function ProfileSetup() {
  const router = useRouter();
  const { updateUser } = useAuth();
  const { setBloodbankStatus } = useMode();
  const { showSuccess } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'bloodbank'>('user');
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
      updateUser({ 
        name, 
        phone: `+92${phone}`, 
        bloodGroup: bloodGroup as BloodGroup,
        mode: selectedRole
      });
      
      if (selectedRole === 'bloodbank') {
        setBloodbankStatus('approved');
      }
      
      showSuccess('Profile saved!');
      setLoading(false);
      
      if (selectedRole === 'user') {
        router.replace('/(user)/home');
      } else {
        router.replace('/(bloodbank)/dashboard');
      }
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

        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>I am a</Text>
          
          <TouchableOpacity
            style={[styles.roleOption, selectedRole === 'user' && styles.roleOptionActive]}
            onPress={() => setSelectedRole('user')}
          >
            <Ionicons 
              name="person" 
              size={24} 
              color={selectedRole === 'user' ? COLORS.white : COLORS.primary} 
            />
            <Text style={[styles.roleText, selectedRole === 'user' && styles.roleTextActive]}>
              Regular User
            </Text>
            {selectedRole === 'user' && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.white} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleOption, selectedRole === 'bloodbank' && styles.roleOptionActive]}
            onPress={() => setSelectedRole('bloodbank')}
          >
            <Ionicons 
              name="business" 
              size={24} 
              color={selectedRole === 'bloodbank' ? COLORS.white : COLORS.primary} 
            />
            <Text style={[styles.roleText, selectedRole === 'bloodbank' && styles.roleTextActive]}>
              Blood Bank Owner
            </Text>
            {selectedRole === 'bloodbank' && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.white} />
            )}
          </TouchableOpacity>
        </View>

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
  roleContainer: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  roleLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  roleOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  roleTextActive: {
    color: COLORS.white,
  },
});
