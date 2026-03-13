import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FACULTIES } from '../data/faculties';

export default function FacultiesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LUCT</Text>
          </View>
          <Text style={styles.headerLocation}>Maseru, Lesotho</Text>
        </View>
        <Text style={styles.headerTitle}>Faculties</Text>
        <Text style={styles.headerSub}>Select a faculty to explore available programmes</Text>
      </View>

      <FlatList
        data={FACULTIES}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Courses', { faculty: item })}
          >
            <View style={styles.cardNumber}>
              <Text style={styles.cardNumberText}>0{index + 1}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardShort}>{item.shortName}</Text>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardCount}>{item.courses.length} Programmes</Text>
                <Text style={styles.cardArrow}>View All ›</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  headerLocation: { color: '#888', fontSize: 11 },
  headerTitle: { color: '#fff', fontSize: 32, fontWeight: '900' },
  headerSub: { color: '#888', fontSize: 12, marginTop: 4 },

  list: { padding: 20, gap: 16 },

  card: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardNumber: {
    backgroundColor: '#000',
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  cardNumberText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cardBody: { flex: 1, padding: 14 },
  cardShort: {
    fontSize: 10,
    fontWeight: '900',
    color: '#888',
    letterSpacing: 2,
    marginBottom: 4,
  },
  cardName: { fontSize: 13, fontWeight: '800', color: '#000', marginBottom: 6 },
  cardDesc: { fontSize: 11, color: '#666', lineHeight: 17, marginBottom: 12 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCount: { fontSize: 11, color: '#000', fontWeight: '700' },
  cardArrow: { fontSize: 12, color: '#000', fontWeight: '800' },
});
