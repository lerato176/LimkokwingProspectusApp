import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { FACULTIES } from '../data/faculties';

const HERO_IMAGE = { uri: 'data:image/jpeg;base64,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' };

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <ImageBackground source={HERO_IMAGE} style={styles.hero} resizeMode="cover">
          <View style={styles.heroOverlay} />
          
          <View style={styles.heroContent}>
            <View style={styles.heroTopRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>LUCT</Text>
              </View>
              <Text style={styles.heroYear}>Maseru · Lesotho · 2026</Text>
            </View>

            <Text style={styles.heroTitle}>Limkokwing{'\n'}University</Text>
            <Text style={styles.heroSub}>of Creative Technology</Text>

            <View style={styles.heroDivider} />

            <Text style={styles.heroQuote}>
              Empowering the youth of Lesotho to shape{'\n'}the careers of tomorrow.
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.statsRow}>
          {[{ val: '5', label: 'Faculties' }, { val: '25+', label: 'Programmes' }, { val: '2026', label: 'Prospectus' }]
            .map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.btnBlack}
          onPress={() => navigation.navigate('Faculties')}
          activeOpacity={0.85}
        >
          <View>
            <Text style={styles.btnBlackTitle}>Browse All Programmes</Text>
            <Text style={styles.btnBlackSub}>Explore 5 faculties and 25+ courses</Text>
          </View>
          <Text style={styles.btnArrowWhite}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnWhite}
          onPress={() => navigation.navigate('QuizTab')}
          activeOpacity={0.85}
        >
          <View>
            <Text style={styles.btnWhiteTitle}>Career Path Quiz</Text>
            <Text style={styles.btnWhiteSub}>Find your ideal faculty in minutes</Text>
          </View>
          <Text style={styles.btnArrowBlack}>›</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Our Faculties</Text>
          <View style={styles.sectionDivider} />

          {FACULTIES.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={styles.facultyRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Courses', { faculty: f })}
            >
              <View style={styles.facultyDot} />
              <View style={styles.facultyMid}>
                <Text style={styles.facultyName}>{f.shortName}</Text>
                <Text style={styles.facultyFull} numberOfLines={1}>{f.name}</Text>
              </View>
              <Text style={styles.facultyCourseCount}>{f.courses.length} courses</Text>
              <Text style={styles.rowArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutHeading}>About LUCT Lesotho</Text>
          <Text style={styles.aboutText}>
            Limkokwing University of Creative Technology is a globally recognised
            institution committed to delivering world-class education to the
            Kingdom of Lesotho. Located in the heart of Maseru on Moshoeshoe Road,
            our campus offers innovative programmes designed to prepare Basotho
            students for leadership roles across industry, government, and the
            creative economy.
          </Text>
        </View>

        <View style={styles.whyCard}>
          <Text style={styles.whyHeading}>Why Choose LUCT Lesotho?</Text>
          {[
            'Industry-aligned programmes',
            'International faculty and lecturers',
            'Modern campus facilities in Maseru',
            'Strong ties to Lesotho government and industry',
            'Global alumni network across 50+ countries',
          ].map((item) => (
            <View key={item} style={styles.whyRow}>
              <View style={styles.whyDot} />
              <Text style={styles.whyText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerHeading}>Contact Us</Text>
          <Text style={styles.footerLine}>Moshoeshoe Road, Maseru Central</Text>
          <Text style={styles.footerLine}>PO Box 8971, Maseru 100, Lesotho</Text>
          <Text style={styles.footerLine}>Tel: 80022066 / 80022088</Text>
          <Text style={styles.footerLine}>www.limkokwing.net</Text>

          <View style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>Enrol Now</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 30 },

  hero: {
    width: '100%',
    height: 380,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: { color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 3 },
  heroYear: { color: '#888', fontSize: 11, letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: 40, fontWeight: '900', lineHeight: 46 },
  heroSub: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 4, marginBottom: 20 }, // Made bold
  heroDivider: { width: 48, height: 2, backgroundColor: '#fff', marginBottom: 16 },
  heroQuote: { color: '#fff', fontSize: 13, fontWeight: '700', lineHeight: 20, fontStyle: 'italic' }, // Made bolder

  statsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#000',
  },
  statCard: {
    flex: 1,
    paddingVertical: 18,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  statVal: { fontSize: 22, fontWeight: '900', color: '#000' },
  statLabel: { fontSize: 10, color: '#888', marginTop: 3 },

  btnBlack: {
    backgroundColor: '#000',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnBlackTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  btnBlackSub: { color: '#aaa', fontSize: 11, marginTop: 3 },
  btnArrowWhite: { color: '#fff', fontSize: 28 },

  btnWhite: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  btnWhiteTitle: { color: '#000', fontSize: 15, fontWeight: '800' },
  btnWhiteSub: { color: '#888', fontSize: 11, marginTop: 3 },
  btnArrowBlack: { color: '#000', fontSize: 28 },

  section: {
    marginHorizontal: 20,
    marginTop: 28,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '900',
    color: '#fff',
    backgroundColor: '#000',
    padding: 14,
  },
  sectionDivider: { height: 1, backgroundColor: '#000' },

  facultyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },
  facultyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#000' },
  facultyMid: { flex: 1 },
  facultyName: { fontSize: 13, fontWeight: '800', color: '#000' },
  facultyFull: { fontSize: 10, color: '#888', marginTop: 2 },
  facultyCourseCount: { fontSize: 10, color: '#000', fontWeight: '700' },
  rowArrow: { fontSize: 20, color: '#000' },

  aboutCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#000',
  },
  aboutHeading: { fontSize: 14, fontWeight: '900', color: '#000', marginBottom: 10 },
  aboutText: { fontSize: 12, color: '#555', lineHeight: 20 },

  whyCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  whyHeading: { fontSize: 14, fontWeight: '900', color: '#fff', marginBottom: 14 },
  whyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  whyDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  whyText: { color: '#ccc', fontSize: 13 },

  footer: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  footerHeading: { fontSize: 14, fontWeight: '900', color: '#000', marginBottom: 12 },
  footerLine: { fontSize: 12, color: '#555', marginBottom: 5 },

  footerBtn: {
    marginTop: 16,
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 6,
  },
  footerBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' },
});