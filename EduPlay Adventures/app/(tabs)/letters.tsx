import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Volume2, Star, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LettersScreen() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [completedLetters, setCompletedLetters] = useState<string[]>(['A', 'B', 'C']);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const letterWords = {
    A: ['Apple', 'Ant', 'Airplane'],
    B: ['Ball', 'Bear', 'Butterfly'],
    C: ['Cat', 'Car', 'Cookie'],
    D: ['Dog', 'Duck', 'Dinosaur'],
    E: ['Elephant', 'Egg', 'Eagle'],
    F: ['Fish', 'Frog', 'Flower'],
    G: ['Giraffe', 'Grapes', 'Guitar'],
    H: ['House', 'Horse', 'Hat'],
    I: ['Ice cream', 'Igloo', 'Island'],
    J: ['Juice', 'Jellyfish', 'Jacket'],
    K: ['Kite', 'Kangaroo', 'Key'],
    L: ['Lion', 'Leaf', 'Lamp'],
    M: ['Mouse', 'Moon', 'Monkey'],
    N: ['Nest', 'Nose', 'Notebook'],
    O: ['Orange', 'Owl', 'Ocean'],
    P: ['Penguin', 'Pizza', 'Plane'],
    Q: ['Queen', 'Quilt', 'Question'],
    R: ['Rainbow', 'Rabbit', 'Robot'],
    S: ['Sun', 'Snake', 'Star'],
    T: ['Tiger', 'Tree', 'Turtle'],
    U: ['Umbrella', 'Unicorn', 'Universe'],
    V: ['Violin', 'Volcano', 'Vegetable'],
    W: ['Whale', 'Water', 'Window'],
    X: ['Xylophone', 'X-ray', 'Xbox'],
    Y: ['Yellow', 'Yacht', 'Yogurt'],
    Z: ['Zebra', 'Zoo', 'Zipper'],
  };

  const getLetterColor = (letter: string) => {
    const colors = [
      ['#FF6B6B', '#FF8E8E'],
      ['#4ECDC4', '#6ED5CE'],
      ['#45B7D1', '#6BC5D8'],
      ['#96CEB4', '#A8D5BA'],
      ['#FFEAA7', '#FDCB6E'],
      ['#DDA0DD', '#E6B3E6'],
    ];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (selectedLetter) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#87CEEB', '#98D8E8']}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedLetter(null)}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Letter {selectedLetter}</Text>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.letterDetailCard}>
            <LinearGradient
              colors={getLetterColor(selectedLetter)}
              style={styles.bigLetterContainer}
            >
              <Text style={styles.bigLetter}>{selectedLetter}</Text>
              <TouchableOpacity style={styles.soundButton}>
                <Volume2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <Text style={styles.sectionTitle}>Words that start with {selectedLetter}</Text>
          
          <View style={styles.wordsGrid}>
            {letterWords[selectedLetter as keyof typeof letterWords]?.map((word, index) => (
              <TouchableOpacity key={index} style={styles.wordCard}>
                <Text style={styles.wordText}>{word}</Text>
                <TouchableOpacity style={styles.wordSoundButton}>
                  <Volume2 size={16} color="#4A90E2" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.practiceButton}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.practiceGradient}
            >
              <Text style={styles.practiceButtonText}>Practice Writing {selectedLetter}</Text>
            </LinearGradient>
          </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Learn Letters</Text>
        <Text style={styles.headerSubtitle}>Tap a letter to explore!</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progress: {completedLetters.length}/26 letters</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(completedLetters.length / 26) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.alphabetGrid}>
          {alphabet.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={styles.letterCard}
              onPress={() => setSelectedLetter(letter)}
            >
              <LinearGradient
                colors={getLetterColor(letter)}
                style={styles.letterGradient}
              >
                <Text style={styles.letterText}>{letter}</Text>
                {completedLetters.includes(letter) && (
                  <View style={styles.completedBadge}>
                    <Star size={12} color="#FFD700" />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
  progressContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  letterCard: {
    width: (width - 60) / 4,
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  letterGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  letterText: {
    fontSize: 28,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  completedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 4,
  },
  letterDetailCard: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  bigLetterContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  bigLetter: {
    fontSize: 48,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  soundButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  wordsGrid: {
    marginBottom: 30,
  },
  wordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  wordText: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#2C3E50',
  },
  wordSoundButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    padding: 8,
  },
  practiceButton: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  practiceGradient: {
    padding: 16,
    alignItems: 'center',
  },
  practiceButtonText: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
});