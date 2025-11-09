import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/Button';
import { RequestCard } from '../../../components/RequestCard';
import { COLORS, SPACING, FONT_SIZES } from '../../../utils/theme';
import { dummyRequests } from '../../../utils/dummyData';
import { useToast } from '../../../hooks/useToast';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'need' | 'donate'>('need');
  const { showSuccess } = useToast();

  const handleHelp = () => {
    showSuccess('Chat started!');
  };

  const handlePostRequest = () => {
    showSuccess('Post request modal will open here');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayk Khoon</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'need' && styles.activeTab]}
          onPress={() => setActiveTab('need')}
        >
          <Text style={[styles.tabText, activeTab === 'need' && styles.activeTabText]}>
            Need Blood
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'donate' && styles.activeTab]}
          onPress={() => setActiveTab('donate')}
        >
          <Text style={[styles.tabText, activeTab === 'donate' && styles.activeTabText]}>
            Donate
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'need' ? (
          <View>
            <Button
              title="Post Blood Request"
              onPress={handlePostRequest}
              style={styles.postButton}
            />
            <Text style={styles.sectionTitle}>Your Requests</Text>
            {dummyRequests.slice(0, 1).map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Nearby Urgent Requests</Text>
            {dummyRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                showHelpButton
                onHelp={handleHelp}
              />
            ))}
          </View>
        )}
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
    color: COLORS.secondary,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grayMedium,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.grayDark,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  postButton: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
});
