import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

export default function CoursesScreen({ route, navigation }) {
  const { faculty } = route.params;
  const [ratings, setRatings] = useState({});

  const handleRate = (courseId) => {
    setRatings((prev) => {
      const current = prev[courseId] || 0;
      if (current >= 6) return prev;
      return { ...prev, [courseId]: current + 1 };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerShort}>{faculty.shortName}</Text>
        <Text style={styles.headerTitle}>{faculty.name}</Text>
        <Text style={styles.headerSub}>{faculty.courses.length} Programmes Available</Text>
      </View>

      <FlatList
        data={faculty.courses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const rating = ratings[item.id] || 0;
          return (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CourseDetail', { course: item, faculty })}
                activeOpacity={0.9}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.durationPill}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>

                <View style={styles.ratingBlock}>
                  <Text style={styles.ratingLabel}>Rate this programme</Text>
                  <View style={styles.ratingRow}>
                    <View style={styles.starsWrap}>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => handleRate(item.id)}
                          disabled={rating >= 6}
                          activeOpacity={0.7}
                        >
                          <Text style={[styles.star, { color: i <= rating ? '#000' : '#ddd' }]}>
                            ★
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <Text style={styles.ratingScore}>
                      {rating}/6{rating >= 6 ? ' Max' : ''}
                    </Text>
                  </View>
                  {rating > 0 && (
                    <View style={styles.progressBg}>
                      <View style={[styles.progressFill, { width: `${(rating / 6) * 100}%` }]} />
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.detailBtn}
                  onPress={() => navigation.navigate('CourseDetail', { course: item, faculty })}
                  activeOpacity={0.85}
                >
                  <Text style={styles.detailBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  backBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#555',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 16,
  },
  backText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  headerShort: { color: '#666', fontSize: 10, letterSpacing: 2, fontWeight: '700', marginBottom: 4 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', lineHeight: 26 },
  headerSub: { color: '#666', fontSize: 11, marginTop: 6 },

  list: { padding: 20, gap: 20 },

  card: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 180 },
  durationPill: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  cardBody: { padding: 16 },
  cardName: { fontSize: 14, fontWeight: '900', color: '#000', marginBottom: 6 },
  cardDesc: { fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 14 },

  ratingBlock: { marginBottom: 14 },
  ratingLabel: { fontSize: 10, color: '#888', fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  starsWrap: { flexDirection: 'row', gap: 4 },
  star: { fontSize: 24 },
  ratingScore: { fontSize: 12, fontWeight: '800', color: '#000' },
  progressBg: { backgroundColor: '#eee', borderRadius: 4, height: 4, marginTop: 8, overflow: 'hidden' },
  progressFill: { backgroundColor: '#000', height: '100%', borderRadius: 4 },

  detailBtn: {
    backgroundColor: '#000',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  detailBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
