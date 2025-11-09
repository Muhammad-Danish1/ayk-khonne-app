import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { useToast } from '../../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../utils/theme';
import { dummyBloodStock } from '../../../utils/dummyData';
import { BloodStock } from '../../../types';

export default function Stock() {
  const { showSuccess } = useToast();
  const [stock, setStock] = useState<BloodStock[]>(dummyBloodStock);

  const updateStock = (bloodGroup: string, delta: number) => {
    setStock((prev) =>
      prev.map((item) =>
        item.bloodGroup === bloodGroup
          ? { ...item, units: Math.max(0, item.units + delta) }
          : item
      )
    );
  };

  const handleUpdate = () => {
    showSuccess('Stock updated successfully!');
  };

  const getStockStatus = (units: number, threshold: number) => {
    if (units === 0) return { text: 'Out of Stock', color: COLORS.error };
    if (units <= threshold) return { text: 'Low Stock', color: COLORS.yellow };
    return { text: 'Available', color: COLORS.success };
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blood Stock</Text>
        <Text style={styles.subtitle}>Manage inventory</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {stock.map((item) => {
          const status = getStockStatus(item.units, item.lowStockThreshold);
          return (
            <Card key={item.bloodGroup} style={styles.stockCard}>
              <View style={styles.stockHeader}>
                <View style={styles.bloodBadge}>
                  <Text style={styles.bloodGroup}>{item.bloodGroup}</Text>
                </View>
                <View style={styles.stockInfo}>
                  <Text style={styles.unitsValue}>{item.units} units</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>
                      {status.text}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStock(item.bloodGroup, -1)}
                >
                  <Ionicons name="remove-circle" size={32} color={COLORS.error} />
                </TouchableOpacity>

                <Text style={styles.controlValue}>{item.units}</Text>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStock(item.bloodGroup, 1)}
                >
                  <Ionicons name="add-circle" size={32} color={COLORS.success} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}

        <Button title="Update Stock" onPress={handleUpdate} style={styles.updateButton} />
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
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  stockCard: {
    marginBottom: SPACING.md,
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  bloodBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 70,
    alignItems: 'center',
  },
  bloodGroup: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  stockInfo: {
    flex: 1,
  },
  unitsValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayMedium,
  },
  controlButton: {
    padding: SPACING.xs,
  },
  controlValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  updateButton: {
    marginTop: SPACING.md,
  },
});
