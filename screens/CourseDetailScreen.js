import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';

export default function CourseDetailScreen({ route, navigation }) {
  const { course, faculty } = route.params;
  const [rating, setRating] = useState(0);

  const handleRate = () => {
    setRating((prev) => (prev >= 6 ? prev : prev + 1));
  };

  const getVideoId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = getVideoId(course.video);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const openVideo = () => {
    if (videoId) {
      Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.heroContainer}>
          <Image source={{ uri: course.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.heroBottom}>
            <Text style={styles.heroFaculty}>{faculty.shortName} — {faculty.name}</Text>
            <Text style={styles.heroTitle}>{course.name}</Text>
          </View>
        </View>

        <View style={styles.body}>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{course.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={[styles.statBox, styles.statBoxMid]}>
              <Text style={styles.statVal}>{rating}/6</Text>
              <Text style={styles.statLabel}>Your Rating</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>LUCT</Text>
              <Text style={styles.statLabel}>Institution</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>About This Programme</Text>
            <View style={styles.infoDivider} />
            <Text style={styles.infoText}>{course.description}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Admission Requirements</Text>
            <View style={styles.infoDivider} />
            <Text style={styles.infoText}>{course.entry}</Text>
          </View>

          <View style={styles.ratingCard}>
            <Text style={styles.ratingCardLabel}>Rate This Programme</Text>
            <View style={styles.infoDivider} />
            <Text style={styles.ratingHint}>
              {rating === 0
                ? 'Tap a star to submit your rating'
                : rating >= 6
                ? 'You have given the maximum rating'
                : `You rated ${rating} out of 6 — tap to increase`}
            </Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <TouchableOpacity
                  key={i}
                  onPress={handleRate}
                  disabled={rating >= 6}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.bigStar, { color: i <= rating ? '#000' : '#e0e0e0' }]}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${(rating / 6) * 100}%` }]} />
              </View>
            )}
          </View>

          <View style={styles.videoCard}>
            <Text style={styles.infoLabel}>Course Video</Text>
            <View style={styles.infoDivider} />
            <Text style={styles.videoTitle}>{course.videoTitle}</Text>
            {videoId ? (
              <TouchableOpacity
                onPress={openVideo}
                style={styles.thumbContainer}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: thumbnailUrl }}
                  style={styles.thumbImage}
                  resizeMode="cover"
                />
                <View style={styles.thumbOverlay} />
                <View style={styles.playBtn}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
                <View style={styles.ytPill}>
                  <Text style={styles.ytPillText}>Open in YouTube</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.noVideo}>
                <Text style={styles.noVideoText}>Video unavailable</Text>
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  heroContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 260 },
  heroOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  backBtn: {
    position: 'absolute', top: 16, left: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 4,
  },
  backText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  heroBottom: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  heroFaculty: { color: '#aaa', fontSize: 11, marginBottom: 6, letterSpacing: 0.5 },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: '900', lineHeight: 26 },

  body: { padding: 20, gap: 16 },

  statsRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  statBox: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  statBoxMid: { borderLeftWidth: 1.5, borderRightWidth: 1.5, borderColor: '#000' },
  statVal: { fontSize: 14, fontWeight: '900', color: '#000' },
  statLabel: { fontSize: 10, color: '#888', marginTop: 3 },

  infoCard: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 16,
  },
  infoLabel: { fontSize: 11, fontWeight: '900', color: '#000', letterSpacing: 1 },
  infoDivider: { height: 1.5, backgroundColor: '#000', marginVertical: 10 },
  infoText: { fontSize: 13, color: '#444', lineHeight: 21 },

  ratingCard: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 16,
  },
  ratingCardLabel: { fontSize: 11, fontWeight: '900', color: '#000', letterSpacing: 1 },
  ratingHint: { fontSize: 12, color: '#888', marginBottom: 14, marginTop: 4 },
  starsRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },
  bigStar: { fontSize: 34 },
  progressBg: { backgroundColor: '#eee', borderRadius: 4, height: 4, overflow: 'hidden' },
  progressFill: { backgroundColor: '#000', height: '100%', borderRadius: 4 },

  videoCard: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 16,
  },
  videoTitle: { fontSize: 12, color: '#666', marginBottom: 12 },
  thumbContainer: {
    height: 210,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImage: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
  },
  thumbOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  playBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  playIcon: { fontSize: 24, color: '#000', marginLeft: 4 },
  ytPill: {
    position: 'absolute', bottom: 12, right: 12,
    backgroundColor: '#000',
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 4,
  },
  ytPillText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  noVideo: {
    height: 100, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f5f5f5', borderRadius: 8,
  },
  noVideoText: { color: '#aaa', fontSize: 12 },
});
