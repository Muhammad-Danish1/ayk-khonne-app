import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { useToast } from '../../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES } from '../../../utils/theme';
import { dummyHistory } from '../../../utils/dummyData';

export default function History() {
  const { showSuccess } = useToast();

  const handleGetCertificate = () => {
    showSuccess('Certificate downloaded!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Your donation journey</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dummyHistory.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.timeline}>
              <View
                style={[
                  styles.timelineDot,
                  { backgroundColor: item.type === 'donated' ? COLORS.success : COLORS.secondary },
                ]}
              />
              {index < dummyHistory.length - 1 && <View style={styles.timelineLine} />}
            </View>

            <Card style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor:
                        (item.type === 'donated' ? COLORS.success : COLORS.secondary) + '20',
                    },
                  ]}
                >
                  <Ionicons
                    name={item.type === 'donated' ? 'water' : 'medical'}
                    size={24}
                    color={item.type === 'donated' ? COLORS.success : COLORS.secondary}
                  />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyType}>
                    {item.type === 'donated' ? 'Donated Blood' : 'Requested Blood'}
                  </Text>
                  <Text style={styles.historyDate}>
                    {item.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.historyDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Blood Group:</Text>
                  <Text style={styles.detailValue}>{item.bloodGroup}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Units:</Text>
                  <Text style={styles.detailValue}>{item.units}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Hospital:</Text>
                  <Text style={styles.detailValue}>{item.hospital}</Text>
                </View>
              </View>

              {item.type === 'donated' && item.status === 'completed' && (
                <Button
                  title="Get Certificate"
                  onPress={handleGetCertificate}
                  variant="outline"
                  size="small"
                  style={styles.certificateButton}
                />
              )}
            </Card>
          </View>
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
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  timeline: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.grayMedium,
    marginTop: 4,
  },
  historyCard: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyType: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  historyDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: 2,
  },
  historyDetails: {
    gap: SPACING.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
  },
  detailValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  certificateButton: {
    marginTop: SPACING.md,
  },
});
