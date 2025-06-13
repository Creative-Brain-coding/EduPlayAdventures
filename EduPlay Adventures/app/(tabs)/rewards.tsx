import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Star, Medal, Crown, Gift, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function RewardsScreen() {
  const [totalStars, setTotalStars] = useState(127);
  const [selectedCategory, setSelectedCategory] = useState('badges');

  const badges = [
    {
      id: 1,
      name: 'Letter Master',
      description: 'Completed all letter games',
      icon: '🔤',
      earned: true,
      color: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 2,
      name: 'Math Wizard',
      description: 'Solved 50 math problems',
      icon: '🧙‍♂️',
      earned: true,
      color: ['#4ECDC4', '#6ED5CE'],
    },
    {
      id: 3,
      name: 'Science Explorer',
      description: 'Completed 5 experiments',
      icon: '🔬',
      earned: false,
      color: ['#45B7D1', '#6BC5D8'],
    },
    {
      id: 4,
      name: 'Daily Champion',
      description: 'Played for 7 days straight',
      icon: '🏆',
      earned: true,
      color: ['#FFD700', '#FFA500'],
    },
    {
      id: 5,
      name: 'Speed Learner',
      description: 'Answered 10 questions in 1 minute',
      icon: '⚡',
      earned: false,
      color: ['#9B59B6', '#8E44AD'],
    },
    {
      id: 6,
      name: 'Perfect Score',
      description: 'Got 100% on any quiz',
      icon: '💯',
      earned: true,
      color: ['#E74C3C', '#C0392B'],
    },
  ];

  const characters = [
    {
      id: 1,
      name: 'Robo Buddy',
      description: 'Your learning companion',
      cost: 0,
      unlocked: true,
      emoji: '🤖',
    },
    {
      id: 2,
      name: 'Magic Unicorn',
      description: 'Sparkles with every answer',
      cost: 50,
      unlocked: true,
      emoji: '🦄',
    },
    {
      id: 3,
      name: 'Space Cat',
      description: 'Explores the galaxy of knowledge',
      cost: 75,
      unlocked: false,
      emoji: '🐱‍🚀',
    },
    {
      id: 4,
      name: 'Dragon Friend',
      description: 'Breathes fire of wisdom',
      cost: 100,
      unlocked: false,
      emoji: '🐉',
    },
    {
      id: 5,
      name: 'Superhero',
      description: 'Saves the day with learning',
      cost: 150,
      unlocked: false,
      emoji: '🦸‍♀️',
    },
    {
      id: 6,
      name: 'Wizard',
      description: 'Casts spells of knowledge',
      cost: 200,
      unlocked: false,
      emoji: '🧙‍♂️',
    },
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first lesson', progress: 100, total: 100 },
    { title: 'Letter Lover', description: 'Learn 10 letters', progress: 10, total: 10 },
    { title: 'Number Ninja', description: 'Solve 25 math problems', progress: 18, total: 25 },
    { title: 'Science Star', description: 'Complete 3 experiments', progress: 2, total: 3 },
    { title: 'Streak Master', description: 'Play for 14 days in a row', progress: 7, total: 14 },
    { title: 'Quiz Champion', description: 'Take 10 quizzes', progress: 4, total: 10 },
  ];

  const renderBadges = () => (
    <View style={styles.badgesGrid}>
      {badges.map((badge) => (
        <View key={badge.id} style={styles.badgeCard}>
          <LinearGradient
            colors={badge.earned ? badge.color : ['#E0E0E0', '#BDBDBD']}
            style={styles.badgeGradient}
          >
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={[styles.badgeName, !badge.earned && styles.lockedText]}>
              {badge.name}
            </Text>
            <Text style={[styles.badgeDescription, !badge.earned && styles.lockedText]}>
              {badge.description}
            </Text>
            {badge.earned && (
              <View style={styles.earnedBadge}>
                <Star size={12} color="#FFD700" />
              </View>
            )}
          </LinearGradient>
        </View>
      ))}
    </View>
  );

  const renderCharacters = () => (
    <View style={styles.charactersGrid}>
      {characters.map((character) => (
        <View key={character.id} style={styles.characterCard}>
          <View style={[styles.characterContainer, !character.unlocked && styles.lockedCharacter]}>
            <Text style={styles.characterEmoji}>{character.emoji}</Text>
            <Text style={[styles.characterName, !character.unlocked && styles.lockedText]}>
              {character.name}
            </Text>
            <Text style={[styles.characterDescription, !character.unlocked && styles.lockedText]}>
              {character.description}
            </Text>
            {character.unlocked ? (
              <View style={styles.unlockedBadge}>
                <Text style={styles.unlockedText}>Unlocked!</Text>
              </View>
            ) : (
              <View style={styles.costBadge}>
                <Star size={12} color="#FFD700" />
                <Text style={styles.costText}>{character.cost}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementCard}>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(achievement.progress / achievement.total) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {achievement.progress}/{achievement.total}
              </Text>
            </View>
          </View>
          {achievement.progress === achievement.total && (
            <View style={styles.completedBadge}>
              <Trophy size={20} color="#FFD700" />
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#98D8E8']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={styles.starsContainer}>
          <Star size={20} color="#FFD700" />
          <Text style={styles.starsText}>{totalStars} Stars</Text>
        </View>
      </LinearGradient>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedCategory === 'badges' && styles.activeTab]}
          onPress={() => setSelectedCategory('badges')}
        >
          <Medal size={20} color={selectedCategory === 'badges' ? '#FFFFFF' : '#7F8C8D'} />
          <Text style={[styles.tabText, selectedCategory === 'badges' && styles.activeTabText]}>
            Badges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedCategory === 'characters' && styles.activeTab]}
          onPress={() => setSelectedCategory('characters')}
        >
          <Crown size={20} color={selectedCategory === 'characters' ? '#FFFFFF' : '#7F8C8D'} />
          <Text style={[styles.tabText, selectedCategory === 'characters' && styles.activeTabText]}>
            Characters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedCategory === 'achievements' && styles.activeTab]}
          onPress={() => setSelectedCategory('achievements')}
        >
          <Trophy size={20} color={selectedCategory === 'achievements' ? '#FFFFFF' : '#7F8C8D'} />
          <Text style={[styles.tabText, selectedCategory === 'achievements' && styles.activeTabText]}>
            Progress
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'badges' && renderBadges()}
        {selectedCategory === 'characters' && renderCharacters()}
        {selectedCategory === 'achievements' && renderAchievements()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Fredoka-Bold',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  starsText: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka-Bold',
    fontSize: 16,
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Fredoka-SemiBold',
    color: '#7F8C8D',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  badgeCard: {
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
  badgeGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    position: 'relative',
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 11,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  lockedText: {
    color: '#9E9E9E',
  },
  earnedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    padding: 4,
  },
  charactersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  characterCard: {
    width: '48%',
    marginBottom: 16,
  },
  characterContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  lockedCharacter: {
    backgroundColor: '#F5F5F5',
  },
  characterEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 14,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  characterDescription: {
    fontSize: 11,
    fontFamily: 'Nunito-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
  },
  unlockedBadge: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unlockedText: {
    fontSize: 10,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  costBadge: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0B2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  costText: {
    fontSize: 10,
    fontFamily: 'Fredoka-Bold',
    color: '#FF8F00',
    marginLeft: 2,
  },
  achievementsContainer: {
    paddingBottom: 30,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#7F8C8D',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#7F8C8D',
  },
  completedBadge: {
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
    padding: 8,
  },
});