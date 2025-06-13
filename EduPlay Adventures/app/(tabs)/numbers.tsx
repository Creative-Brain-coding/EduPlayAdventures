import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Minus, X, Divide, Star, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NumbersScreen() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [currentProblem, setCurrentProblem] = useState({ num1: 5, num2: 3, operation: '+', answer: 8 });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  const games = [
    {
      id: 'counting',
      title: 'Count & Learn',
      description: 'Learn numbers 1-20',
      icon: '🔢',
      color: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 'addition',
      title: 'Addition Fun',
      description: 'Add numbers together',
      icon: '➕',
      color: ['#4ECDC4', '#6ED5CE'],
    },
    {
      id: 'subtraction',
      title: 'Subtraction',
      description: 'Take away numbers',
      icon: '➖',
      color: ['#45B7D1', '#6BC5D8'],
    },
    {
      id: 'shapes',
      title: 'Shape Counter',
      description: 'Count shapes & objects',
      icon: '🔺',
      color: ['#96CEB4', '#A8D5BA'],
    },
  ];

  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  const generateProblem = () => {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    if (operation === '+') {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    }

    setCurrentProblem({ num1, num2, operation, answer });
    setUserAnswer('');
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === currentProblem.answer) {
      setScore(score + 1);
      generateProblem();
    }
  };

  if (selectedGame === 'counting') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#87CEEB', '#98D8E8']}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedGame(null)}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Count & Learn</Text>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.numbersGrid}>
            {numbers.map((number) => (
              <TouchableOpacity key={number} style={styles.numberCard}>
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E8E']}
                  style={styles.numberGradient}
                >
                  <Text style={styles.numberText}>{number}</Text>
                  <Text style={styles.numberWord}>
                    {['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
                      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'][number - 1]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (selectedGame === 'addition' || selectedGame === 'subtraction') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#87CEEB', '#98D8E8']}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedGame(null)}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Math Practice</Text>
          <View style={styles.scoreContainer}>
            <Star size={16} color="#FFD700" />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </LinearGradient>

        <View style={styles.mathContent}>
          <View style={styles.problemCard}>
            <Text style={styles.problemText}>
              {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
            </Text>
          </View>

          <View style={styles.answerSection}>
            <Text style={styles.answerLabel}>Your Answer:</Text>
            <View style={styles.answerInputContainer}>
              <Text style={styles.answerInput}>{userAnswer || '?'}</Text>
            </View>
          </View>

          <View style={styles.numberPad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
              <TouchableOpacity
                key={digit}
                style={styles.numberButton}
                onPress={() => setUserAnswer(userAnswer + digit.toString())}
              >
                <Text style={styles.numberButtonText}>{digit}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setUserAnswer('')}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={checkAnswer}
            >
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#98D8E8']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Numbers & Math</Text>
        <Text style={styles.headerSubtitle}>Choose a game to play!</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gamesGrid}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.gameCard}
              onPress={() => {
                setSelectedGame(game.id);
                if (game.id === 'addition' || game.id === 'subtraction') {
                  generateProblem();
                }
              }}
            >
              <LinearGradient
                colors={game.color}
                style={styles.gameGradient}
              >
                <Text style={styles.gameIcon}>{game.icon}</Text>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickMathSection}>
          <Text style={styles.sectionTitle}>Quick Math Facts</Text>
          <View style={styles.mathFactsGrid}>
            <View style={styles.mathFactCard}>
              <Text style={styles.mathFactTitle}>2 + 2 = 4</Text>
              <Text style={styles.mathFactEmoji}>🍎🍎 + 🍎🍎</Text>
            </View>
            <View style={styles.mathFactCard}>
              <Text style={styles.mathFactTitle}>5 - 3 = 2</Text>
              <Text style={styles.mathFactEmoji}>⭐⭐⭐⭐⭐ - ⭐⭐⭐</Text>
            </View>
            <View style={styles.mathFactCard}>
              <Text style={styles.mathFactTitle}>3 + 1 = 4</Text>
              <Text style={styles.mathFactEmoji}>🐱🐱🐱 + 🐱</Text>
            </View>
            <View style={styles.mathFactCard}>
              <Text style={styles.mathFactTitle}>6 - 2 = 4</Text>
              <Text style={styles.mathFactEmoji}>🎈🎈🎈🎈🎈🎈 - 🎈🎈</Text>
            </View>
          </View>
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  scoreText: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka-Bold',
    fontSize: 16,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  gameCard: {
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
  gameGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
  },
  gameIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 30,
  },
  numberCard: {
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
  numberGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  numberWord: {
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  mathContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  problemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  problemText: {
    fontSize: 36,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
  },
  answerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  answerLabel: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  answerInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  answerInput: {
    fontSize: 32,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  numberButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  numberButtonText: {
    fontSize: 24,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 0.45,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  checkButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 0.45,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
  },
  quickMathSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  mathFactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mathFactCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mathFactTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  mathFactEmoji: {
    fontSize: 14,
  },
});