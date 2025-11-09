import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES } from '../../../utils/theme';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || 'Not set'}</Text>
        
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
        
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user?.phone || 'Not set'}</Text>
        
        <Text style={styles.label}>Blood Group</Text>
        <Text style={styles.value}>{user?.bloodGroup || 'Not set'}</Text>

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>
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
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.grayDark,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: SPACING.xl,
  },
});
