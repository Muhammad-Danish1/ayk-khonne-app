import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BloodRequest } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../utils/theme';
import { formatDistance, formatTimeAgo } from '../utils/validation';

interface RequestCardProps {
  request: BloodRequest;
  onPress?: () => void;
  onHelp?: () => void;
  showHelpButton?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onPress,
  onHelp,
  showHelpButton = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.bloodBadge, request.urgency === 'urgent' && styles.urgent]}>
            <Text style={styles.bloodGroup}>{request.bloodGroup}</Text>
          </View>
          {request.urgency === 'urgent' && (
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentText}>URGENT</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.patientName}>{request.patientName}</Text>
        <Text style={styles.units}>{request.units} unit{request.units > 1 ? 's' : ''} needed</Text>
        
        <View style={styles.row}>
          <Ionicons name="location" size={16} color={COLORS.secondary} />
          <Text style={styles.hospital}>{request.hospital}</Text>
        </View>
        
        {request.distance !== undefined && (
          <View style={styles.row}>
            <Ionicons name="navigate" size={16} color={COLORS.grayDark} />
            <Text style={styles.distance}>{formatDistance(request.distance)}</Text>
          </View>
        )}
        
        <Text style={styles.time}>{formatTimeAgo(request.createdAt)}</Text>
        
        {showHelpButton && onHelp && (
          <Button
            title="I Can Help"
            onPress={onHelp}
            style={styles.helpButton}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  bloodBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  urgent: {
    backgroundColor: COLORS.error,
  },
  bloodGroup: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  urgentBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  urgentText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  patientName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  units: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: SPACING.xs,
  },
  hospital: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  distance: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
  },
  time: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
    marginTop: SPACING.xs,
  },
  helpButton: {
    marginTop: SPACING.md,
  },
});
