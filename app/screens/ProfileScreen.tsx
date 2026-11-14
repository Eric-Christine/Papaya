// app/screens/ProfileScreen.tsx
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../contexts/UserContext';

const ProfileScreen: React.FC = () => {
  // Read user data from the context
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <MaterialCommunityIcons name="sprout" size={64} color="#2E7D32" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
        </View>

        {/* User Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.lessonsCompleted}</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.seeds} 🌱</Text>
            <Text style={styles.statLabel}>Seeds</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.streak} 🔥</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  avatarPlaceholder: {
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 30,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProfileScreen;
