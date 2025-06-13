import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlaskConical, Droplets, Sun, Leaf, ArrowLeft, Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ScienceScreen() {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const [experimentStep, setExperimentStep] = useState(0);

  const experiments = [
    {
      id: 'colors',
      title: 'Color Mixing',
      description: 'Mix colors and see magic!',
      icon: Droplets,
      color: ['#FF6B6B', '#FF8E8E'],
      emoji: '🎨',
      steps: [
        'Get red and blue paint',
        'Mix them together',
        'Watch them turn purple!',
        'Try mixing other colors'
      ]
    },
    {
      id: 'plants',
      title: 'Plant Growth',
      description: 'Learn how plants grow',
      icon: Leaf,
      color: ['#96CEB4', '#A8D5BA'],
      emoji: '🌱',
      steps: [
        'Plant a seed in soil',
        'Add water every day',
        'Put it in sunlight',
        'Watch it grow tall!'
      ]
    },
    {
      id: 'weather',
      title: 'Weather Lab',
      description: 'Explore weather patterns',
      icon: Sun,
      color: ['#FFEAA7', '#FDCB6E'],
      emoji: '🌤️',
      steps: [
        'Look at the clouds',
        'Feel the temperature',
        'Check if it\'s windy',
        'Predict tomorrow\'s weather'
      ]
    },
    {
      id: 'water',
      title: 'Water Cycle',
      description: 'See how water moves',
      icon: Droplets,
      color: ['#45B7D1', '#6BC5D8'],
      emoji: '💧',
      steps: [
        'Water evaporates from oceans',
        'It forms clouds in the sky',
        'Clouds make rain',
        'Rain fills rivers and oceans'
      ]
    },
  ];

  const scienceFacts = [
    { fact: 'The sun is a star!', emoji: '⭐' },
    { fact: 'Plants make their own food!', emoji: '🌿' },
    { fact: 'Water can be ice, liquid, or steam!', emoji: '💧' },
    { fact: 'Butterflies taste with their feet!', emoji: '🦋' },
    { fact: 'A group of flamingos is called a flamboyance!', emoji: '🦩' },
    { fact: 'Octopuses have three hearts!', emoji: '🐙' },
  ];

  if (selectedExperiment) {
    const experiment = experiments.find(exp => exp.id === selectedExperiment);
    if (!experiment) return null;

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#87CEEB', '#98D8E8']}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              setSelectedExperiment(null);
              setExperimentStep(0);
            }}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{experiment.title}</Text>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.experimentHeader}>
            <LinearGradient
              colors={experiment.color}
              style={styles.experimentIcon}
            >
              <Text style={styles.experimentEmoji}>{experiment.emoji}</Text>
            </LinearGradient>
            <Text style={styles.experimentTitle}>{experiment.title}</Text>
            <Text style={styles.experimentDescription}>{experiment.description}</Text>
          </View>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Experiment Steps:</Text>
            {experiment.steps.map((step, index) => (
              <View key={index} style={[
                styles.stepCard,
                index <= experimentStep && styles.completedStep
              ]}>
                <View style={[
                  styles.stepNumber,
                  index <= experimentStep && styles.completedStepNumber
                ]}>
                  <Text style={[
                    styles.stepNumberText,
                    index <= experimentStep && styles.completedStepNumberText
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={[
                  styles.stepText,
                  index <= experimentStep && styles.completedStepText
                ]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.actionButtons}>
            {experimentStep < experiment.steps.length - 1 ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => setExperimentStep(experimentStep + 1)}
              >
                <LinearGradient
                  colors={experiment.color}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Next Step</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => {
                  setSelectedExperiment(null);
                  setExperimentStep(0);
                }}
              >
                <LinearGradient
                  colors={['#4ECDC4', '#6ED5CE']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Experiment Complete! 🎉</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#98D8E8']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Science Lab</Text>
        <Text style={styles.headerSubtitle}>Discover amazing experiments!</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Virtual Experiments</Text>
        
        <View style={styles.experimentsGrid}>
          {experiments.map((experiment) => (
            <TouchableOpacity
              key={experiment.id}
              style={styles.experimentCard}
              onPress={() => setSelectedExperiment(experiment.id)}
            >
              <LinearGradient
                colors={experiment.color}
                style={styles.experimentGradient}
              >
                <Text style={styles.cardEmoji}>{experiment.emoji}</Text>
                <Text style={styles.cardTitle}>{experiment.title}</Text>
                <Text style={styles.cardDescription}>{experiment.description}</Text>
                <View style={styles.playButton}>
                  <Play size={16} color="#FFFFFF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Fun Science Facts</Text>
        
        <View style={styles.factsContainer}>
          {scienceFacts.map((item, index) => (
            <View key={index} style={styles.factCard}>
              <Text style={styles.factEmoji}>{item.emoji}</Text>
              <Text style={styles.factText}>{item.fact}</Text>
            </View>
          ))}
        </View>

        <View style={styles.scienceQuiz}>
          <LinearGradient
            colors={['#DDA0DD', '#E6B3E6']}
            style={styles.quizGradient}
          >
            <Text style={styles.quizTitle}>🧪 Science Quiz</Text>
            <Text style={styles.quizText}>Test your science knowledge with fun questions!</Text>
            <TouchableOpacity style={styles.quizButton}>
              <Text style={styles.quizButtonText}>Start Quiz</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Fredoka-Bold',
    textAlign: 'center',
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    opacity: 0.9,
    position: 'absolute',
    bottom: 8,
    left: 20,
    right: 20,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 16,
  },
  experimentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  experimentCard: {
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
  experimentGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 160,
    position: 'relative',
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  playButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    padding: 8,
  },
  experimentHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  experimentIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  experimentEmoji: {
    fontSize: 36,
  },
  experimentTitle: {
    fontSize: 24,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  experimentDescription: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepsTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  stepCard: {
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
  completedStep: {
    backgroundColor: '#E8F5E8',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedStepNumber: {
    backgroundColor: '#4ECDC4',
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Fredoka-Bold',
    color: '#7F8C8D',
  },
  completedStepNumberText: {
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#2C3E50',
    flex: 1,
  },
  completedStepText: {
    color: '#27AE60',
  },
  actionButtons: {
    marginBottom: 30,
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  factsContainer: {
    marginBottom: 30,
  },
  factCard: {
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
  factEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  factText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#2C3E50',
    flex: 1,
  },
  scienceQuiz: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  quizGradient: {
    padding: 24,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  quizText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  quizButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  quizButtonText: {
    fontSize: 14,
    fontFamily: 'Fredoka-SemiBold',
    color: '#9B59B6',
  },
});