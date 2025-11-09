import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { useToast } from '../../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES } from '../../../utils/theme';

export default function Reports() {
  const { showSuccess } = useToast();

  const handleExportPDF = () => {
    showSuccess('Report exported successfully!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>Blood bank statistics</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Donations This Week</Text>
          <View style={styles.chartPlaceholder}>
            <Ionicons name="trending-up" size={48} color={COLORS.success} />
            <Text style={styles.chartValue}>23 Donations</Text>
            <Text style={styles.chartSubtext}>+15% from last week</Text>
          </View>
        </Card>

        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Blood Group Distribution</Text>
          <View style={styles.distributionGrid}>
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((group, index) => (
              <View key={group} style={styles.distributionItem}>
                <View style={styles.distributionBar}>
                  <View
                    style={[
                      styles.distributionFill,
                      { width: `${Math.random() * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.distributionLabel}>{group}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Donations</Text>
            <Text style={styles.summaryValue}>87</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Requests</Text>
            <Text style={styles.summaryValue}>65</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Units Distributed</Text>
            <Text style={styles.summaryValue}>142</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Active Donors</Text>
            <Text style={styles.summaryValue}>234</Text>
          </View>
        </Card>

        <Button
          title="Export PDF Report"
          onPress={handleExportPDF}
          variant="secondary"
          style={styles.exportButton}
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
  chartCard: {
    marginBottom: SPACING.lg,
  },
  chartTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  chartValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  chartSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginTop: SPACING.xs,
  },
  distributionGrid: {
    gap: SPACING.md,
  },
  distributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  distributionBar: {
    flex: 1,
    height: 24,
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  distributionLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.grayDark,
  },
  summaryValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  exportButton: {
    marginTop: SPACING.md,
  },
});
