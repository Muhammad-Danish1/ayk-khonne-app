import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/Button';
import { AppModal } from '../../../components/AppModal';
import { useToast } from '../../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../utils/theme';
import { dummyRequests } from '../../../utils/dummyData';
import { formatDistance, formatTimeAgo } from '../../../utils/validation';

export default function RequestDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showSuccess } = useToast();

  const request = dummyRequests.find((r) => r.id === id) || dummyRequests[0];

  const handleHelp = () => {
    showSuccess('Chat Started!');
    router.back();
    setTimeout(() => {
      router.push('/(user)/chats');
    }, 300);
  };

  return (
    <AppModal visible={true} onClose={() => router.back()} title="Request Details">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.bloodBadge, request.urgency === 'urgent' && styles.urgent]}>
            <Text style={styles.bloodGroup}>{request.bloodGroup}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.units}>{request.units} unit{request.units > 1 ? 's' : ''}</Text>
            {request.urgency === 'urgent' && (
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
              <Text style={styles.distanceValue}>{formatDistance(request.distance)}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Requested</Text>
          <Text style={styles.value}>{formatTimeAgo(request.createdAt)}</Text>
        </View>

        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={COLORS.primary} />
          <Text style={styles.mapText}>Hospital Location</Text>
          <Text style={styles.mapSubtext}>{request.hospital}</Text>
        </View>

        <View style={styles.chatPreview}>
          <Text style={styles.chatTitle}>Recent Messages</Text>
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>Hi, I need {request.bloodGroup} blood urgently.</Text>
            <Text style={styles.chatTime}>10 min ago</Text>
          </View>
          <View style={[styles.chatBubble, styles.chatBubbleOwn]}>
            <Text style={[styles.chatText, styles.chatTextOwn]}>I can help! On my way.</Text>
            <Text style={styles.chatTime}>5 min ago</Text>
          </View>
        </View>

        <Button title="I Can Help" onPress={handleHelp} style={styles.helpButton} />
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  units: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  urgentBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  urgentText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
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
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  hospitalValue: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  address: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: SPACING.xs,
  },
  distanceValue: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: '600',
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
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: SPACING.sm,
  },
  mapSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
  },
  chatPreview: {
    backgroundColor: COLORS.grayLight,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  chatTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
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
    alignSelf: 'flex-end',
    maxWidth: '80%',
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
