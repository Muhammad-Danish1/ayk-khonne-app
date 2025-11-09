import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { useAuth } from '../../../context/AuthContext';
import { useMode } from '../../../context/ModeContext';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../utils/theme';

export default function Profile() {
  const { user, logout } = useAuth();
  const { bloodbankStatus, switchMode } = useMode();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const handleBecomeBloodBank = () => {
    router.push('/(user)/profile/setup-bloodbank');
  };

  const handleSwitchToBloodBank = () => {
    updateUser({ mode: 'bloodbank' });
    switchMode('bloodbank');
    router.replace('/(bloodbank)/dashboard');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={COLORS.white} />
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <View style={styles.bloodBadge}>
            <Text style={styles.bloodGroupText}>{user?.bloodGroup || 'O+'}</Text>
          </View>
        </View>

        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail" size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, styles.infoRowMargin]}>
            <View style={styles.infoIcon}>
              <Ionicons name="call" size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user?.phone || 'Not set'}</Text>
            </View>
          </View>
        </Card>

        {bloodbankStatus === 'none' && (
          <Button
            title="Become a Blood Bank"
            onPress={handleBecomeBloodBank}
            style={styles.actionButton}
          />
        )}

        {bloodbankStatus === 'pending' && (
          <Card style={styles.statusCard}>
            <Ionicons name="time" size={24} color={COLORS.yellow} />
            <Text style={styles.statusText}>Blood Bank Application Pending</Text>
          </Card>
        )}

        {bloodbankStatus === 'approved' && (
          <Button
            title="Switch to Blood Bank Mode"
            onPress={handleSwitchToBloodBank}
            variant="secondary"
            style={styles.actionButton}
          />
        )}

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
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
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  bloodBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  bloodGroupText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  infoCard: {
    marginBottom: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  infoRowMargin: {
    marginTop: SPACING.md,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.yellow + '20',
  },
  statusText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
  logoutButton: {
    marginTop: SPACING.lg,
  },
});
