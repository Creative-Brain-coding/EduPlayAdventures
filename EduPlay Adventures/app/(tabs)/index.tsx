import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Calculator, FlaskConical, Star, Play } from 'lucide-react-native';

export default function HomeScreen() {
  const activities = [
    {
      id: 1,
      title: 'Learn Letters',
      description: 'Fun alphabet games',
      icon: BookOpen,
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 2,
      title: 'Count Numbers',
      description: 'Math made easy',
      icon: Calculator,
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#6ED5CE'],
    },
    {
      id: 3,
      title: 'Science Lab',
      description: 'Cool experiments',
      icon: FlaskConical,
      color: '#45B7D1',
      gradient: ['#45B7D1', '#6BC5D8'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#98D8E8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.nameText}>Little Explorer</Text>
          </View>
          <View style={styles.mascotContainer}>
            <Image 
              source={{ uri: '/assets/images/VBIQxBIr.jpg' }}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Star size={24} color="#FFD700" />
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Stars Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Play size={24} color="#FF6B6B" />
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Games Played</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Let's Learn & Play!</Text>
        
        <View style={styles.activitiesGrid}>
          {activities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <LinearGradient
                colors={activity.gradient}
                style={styles.activityGradient}
              >
                <View style={styles.activityIcon}>
                  <activity.icon size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dailyChallenge}>
          <LinearGradient
            colors={['#FFB347', '#FFCC70']}
            style={styles.challengeGradient}
          >
            <Text style={styles.challengeTitle}>🎯 Daily Challenge</Text>
            <Text style={styles.challengeText}>Complete 3 letter games to earn a special badge!</Text>
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Start Challenge</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    opacity: 0.9,
  },
  nameText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Fredoka-Bold',
    marginTop: 4,
  },
  mascotContainer: {
    width: 80,
    height: 80,
  },
  mascot: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#7F8C8D',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  activityCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  activityGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
  },
  activityIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  dailyChallenge: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  challengeGradient: {
    padding: 24,
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  challengeText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  challengeButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  challengeButtonText: {
    fontSize: 14,
    fontFamily: 'Fredoka-SemiBold',
    color: '#FF8C42',
  },
});