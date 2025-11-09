import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../utils/theme';
import { dummyAlerts } from '../../../utils/dummyData';
import { formatTimeAgo } from '../../../utils/validation';

export default function Alerts() {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent_request':
        return COLORS.error;
      case 'donor_accepted':
        return COLORS.success;
      case 'request_completed':
        return COLORS.secondary;
      case 'blood_bank_approved':
        return COLORS.primary;
      default:
        return COLORS.grayDark;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent_request':
        return 'alert-circle';
      case 'donor_accepted':
        return 'checkmark-circle';
      case 'request_completed':
        return 'checkmark-done-circle';
      case 'blood_bank_approved':
        return 'business';
      default:
        return 'notifications';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dummyAlerts.map((alert) => (
          <TouchableOpacity key={alert.id} activeOpacity={0.7}>
            <Card style={[styles.alertCard, !alert.read && styles.unreadCard]}>
              <View style={styles.alertRow}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: getAlertColor(alert.type) + '20' },
                  ]}
                >
                  <Ionicons
                    name={getAlertIcon(alert.type) as any}
                    size={24}
                    color={getAlertColor(alert.type)}
                  />
                </View>
                <View style={styles.alertInfo}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{formatTimeAgo(alert.createdAt)}</Text>
                </View>
                {!alert.read && <View style={styles.unreadDot} />}
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
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  alertCard: {
    marginBottom: SPACING.md,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginBottom: 4,
  },
  alertTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});
