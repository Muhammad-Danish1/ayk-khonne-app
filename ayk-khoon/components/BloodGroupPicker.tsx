import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BLOOD_GROUPS, BloodGroup } from '../utils/constants';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES } from '../utils/theme';

interface BloodGroupPickerProps {
  value: BloodGroup | '';
  onSelect: (bloodGroup: BloodGroup) => void;
  label?: string;
  error?: string;
}

export const BloodGroupPicker: React.FC<BloodGroupPickerProps> = ({
  value,
  onSelect,
  label,
  error,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.grid}>
        {BLOOD_GROUPS.map((group) => (
          <TouchableOpacity
            key={group}
            style={[
              styles.option,
              value === group && styles.optionSelected,
              error && styles.optionError,
            ]}
            onPress={() => onSelect(group)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                value === group && styles.optionTextSelected,
              ]}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  option: {
    width: '22%',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionError: {
    borderColor: COLORS.error,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: COLORS.white,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
