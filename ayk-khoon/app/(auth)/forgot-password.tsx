import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useToast } from '../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES } from '../../utils/theme';
import { validateEmail } from '../../utils/validation';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPassword() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      showError('Invalid email address');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      showSuccess('Reset link sent to your email!');
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password
        </Text>

        <Input
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
          error={error}
        />

        <Button
          title="Send Reset Link"
          onPress={handleResetPassword}
          loading={loading}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginTop: 50,
    marginLeft: SPACING.lg,
    padding: SPACING.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.grayDark,
    marginBottom: SPACING.xl,
    lineHeight: 24,
  },
  button: {
    marginTop: SPACING.md,
  },
});
