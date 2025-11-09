import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RequestCard } from '../../../components/RequestCard';
import { useToast } from '../../../hooks/useToast';
import { COLORS, SPACING, FONT_SIZES } from '../../../utils/theme';
import { dummyRequests } from '../../../utils/dummyData';

export default function Requests() {
  const { showSuccess } = useToast();

  const handleSendAlert = (bloodGroup: string) => {
    showSuccess(`Alert sent to all ${bloodGroup} donors!`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Requests</Text>
        <Text style={styles.subtitle}>Help people in need</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Active Blood Requests</Text>
        {dummyRequests.map((request) => (
          <View key={request.id}>
            <RequestCard request={request} />
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
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
});
