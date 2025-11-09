import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { useAuth } from '../../../context/AuthContext';
import { useMode } from '../../../context/ModeContext';
import { useToast } from '../../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../utils/theme';

export default function Dashboard() {
  const router = useRouter();
  const { updateUser } = useAuth();
  const { switchMode } = useMode();
  const { showSuccess } = useToast();

  const handleSendAlert = () => {
    showSuccess('Alert sent to all donors!');
  };

  const handleSwitchToUser = () => {
    updateUser({ mode: 'user' });
    switchMode('user');
    router.replace('/(user)/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.subtitle}>Central Blood Bank</Text>
          </View>
          <TouchableOpacity onPress={handleSwitchToUser} style={styles.switchButton}>
            <Ionicons name="person" size={20} color={COLORS.secondary} />
            <Text style={styles.switchText}>User Mode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <Card style={[styles.statCard, styles.statGreen]}>
            <Ionicons name="water" size={32} color={COLORS.success} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Total Stock</Text>
          </Card>

          <Card style={[styles.statCard, styles.statRed]}>
            <Ionicons name="alert-circle" size={32} color={COLORS.error} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active Requests</Text>
          </Card>

          <Card style={[styles.statCard, styles.statBlue]}>
            <Ionicons name="people" size={32} color={COLORS.secondary} />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Donors Today</Text>
          </Card>

          <Card style={[styles.statCard, styles.statOrange]}>
            <Ionicons name="warning" size={32} color={COLORS.yellow} />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Low Stock</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Low Stock Alert</Text>
          <Card>
            <View style={styles.alertRow}>
              <View style={styles.bloodBadge}>
                <Text style={styles.bloodGroup}>O-</Text>
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertText}>Only 1 unit remaining</Text>
                <Text style={styles.alertSubtext}>Critical Level</Text>
              </View>
              <Ionicons name="warning" size={24} color={COLORS.error} />
            </View>

            <View style={[styles.alertRow, styles.alertRowMargin]}>
              <View style={styles.bloodBadge}>
                <Text style={styles.bloodGroup}>AB-</Text>
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertText}>Only 1 unit remaining</Text>
                <Text style={styles.alertSubtext}>Critical Level</Text>
              </View>
              <Ionicons name="warning" size={24} color={COLORS.error} />
            </View>
          </Card>
        </View>

        <Button
          title="Send Alert to All Donors"
          onPress={handleSendAlert}
          style={styles.alertButton}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: 4,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  switchText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statGreen: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  statRed: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  statBlue: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  statOrange: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.yellow,
  },
  statValue: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: 4,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  alertRowMargin: {
    marginTop: SPACING.md,
  },
  bloodBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 60,
    alignItems: 'center',
  },
  bloodGroup: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  alertInfo: {
    flex: 1,
  },
  alertText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  alertSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: 2,
  },
  alertButton: {
    marginTop: SPACING.md,
  },
});
