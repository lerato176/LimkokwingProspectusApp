import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FACULTIES, QUIZ_QUESTIONS } from '../data/faculties';

export default function QuizScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (faculties) => {
    const newAnswers = [...answers, faculties];
    if (step + 1 >= QUIZ_QUESTIONS.length) {
      const tally = {};
      newAnswers.forEach((fa) =>
        fa.forEach((f) => (tally[f] = (tally[f] || 0) + 1))
      );
      const best = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0];
      setResult(FACULTIES.find((f) => f.id === parseInt(best)) || FACULTIES[0]);
      setAnswers([]);
      setStep(0);
    } else {
      setAnswers(newAnswers);
      setStep((s) => s + 1);
    }
  };

  const handleRetake = () => {
    setResult(null);
    setAnswers([]);
    setStep(0);
  };

  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultHero}>
          <Text style={styles.resultLabel}>YOUR IDEAL FACULTY</Text>
          <Text style={styles.resultName}>{result.name}</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.resultSub}>{result.description}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.resultCard}>
            <Text style={styles.resultCardLabel}>Recommended Programmes</Text>
            <View style={styles.divider} />
            {result.courses.map((c, i) => (
              <TouchableOpacity
                key={c.id}
                style={styles.courseRow}
                activeOpacity={0.7}
                onPress={() => {
                  setResult(null);
                  navigation.navigate('CourseDetail', { course: c, faculty: result });
                }}
              >
                <Text style={styles.courseNum}>{i + 1}</Text>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseName}>{c.name}</Text>
                  <Text style={styles.courseDuration}>{c.duration}</Text>
                </View>
                <Text style={styles.courseArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.btnBlack} onPress={handleRetake} activeOpacity={0.85}>
            <Text style={styles.btnBlackText}>Retake the Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnWhite}
            activeOpacity={0.85}
            onPress={() => {
              setResult(null);
              navigation.navigate('Courses', { faculty: result });
            }}
          >
            <Text style={styles.btnWhiteText}>Browse Faculty Courses</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const q = QUIZ_QUESTIONS[step];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LUCT</Text>
          </View>
          <Text style={styles.headerSub}>Career Path Finder</Text>
        </View>
        <Text style={styles.stepLabel}>
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </Text>
        <View style={styles.dotsRow}>
          {QUIZ_QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < step && styles.dotDone,
                i === step && styles.dotActive,
              ]}
            />
          ))}
        </View>
        <Text style={styles.question}>{q.question}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {q.options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={styles.option}
            activeOpacity={0.75}
            onPress={() => handleAnswer(opt.faculties)}
          >
            <View style={styles.optionLetter}>
              <Text style={styles.optionLetterText}>{['A', 'B', 'C', 'D'][i]}</Text>
            </View>
            <Text style={styles.optionText}>{opt.text}</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.hintBox}>
          <Text style={styles.hintText}>
            Answer all {QUIZ_QUESTIONS.length} questions to discover which faculty in
            Lesotho's top university is the right fit for you.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 30,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  badge: {
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  headerSub: { color: '#888', fontSize: 11 },
  stepLabel: { color: '#666', fontSize: 11, marginBottom: 12 },
  dotsRow: { flexDirection: 'row', gap: 6, marginBottom: 18 },
  dot: { width: 8, height: 4, borderRadius: 2, backgroundColor: '#333' },
  dotDone: { backgroundColor: '#888' },
  dotActive: { width: 24, backgroundColor: '#fff' },
  question: { color: '#fff', fontSize: 20, fontWeight: '900', lineHeight: 28 },

  scroll: { padding: 20, gap: 12 },

  option: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLetter: {
    width: 34,
    height: 34,
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: { color: '#fff', fontSize: 13, fontWeight: '900' },
  optionText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#000' },
  optionArrow: { fontSize: 20, color: '#000' },

  hintBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  hintText: { fontSize: 12, color: '#888', lineHeight: 18, textAlign: 'center' },

  resultHero: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 32,
  },
  resultLabel: { color: '#666', fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 10 },
  resultName: { color: '#fff', fontSize: 22, fontWeight: '900', lineHeight: 28 },
  heroDivider: { width: 40, height: 2, backgroundColor: '#fff', marginVertical: 14 },
  resultSub: { color: '#888', fontSize: 12, lineHeight: 19 },

  resultCard: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 16,
    marginBottom: 4,
  },
  resultCardLabel: { fontSize: 11, fontWeight: '900', color: '#000', letterSpacing: 1 },
  divider: { height: 1.5, backgroundColor: '#000', marginVertical: 10 },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  courseNum: { fontSize: 12, fontWeight: '900', color: '#000', width: 20 },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 13, fontWeight: '700', color: '#000' },
  courseDuration: { fontSize: 11, color: '#888', marginTop: 2 },
  courseArrow: { fontSize: 20, color: '#000' },

  btnBlack: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  btnBlackText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  btnWhite: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  btnWhiteText: { color: '#000', fontSize: 14, fontWeight: '800' },
});
