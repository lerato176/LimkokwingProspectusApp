import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import FacultiesScreen from './screens/FacultiesScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import QuizScreen from './screens/QuizScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

function FacultyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Faculties" component={FacultiesScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

function QuizStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

function TabIcon({ label }) {
  const icons = {
    Home: (
      <View style={tabStyles.iconBox}>
        <View style={tabStyles.iconHouse} />
        <View style={tabStyles.iconDoor} />
      </View>
    ),
    Faculties: (
      <View style={tabStyles.iconBox}>
        <View style={tabStyles.iconPillarRow}>
          <View style={tabStyles.iconPillar} />
          <View style={tabStyles.iconPillar} />
          <View style={tabStyles.iconPillar} />
        </View>
        <View style={tabStyles.iconBase} />
      </View>
    ),
    Quiz: (
      <View style={tabStyles.iconBox}>
        <View style={tabStyles.iconCircle}>
          <Text style={tabStyles.iconQ}>?</Text>
        </View>
      </View>
    ),
  };

  return icons[label] || null;
}

const tabStyles = StyleSheet.create({
  iconBox: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  iconHouse: { width: 16, height: 12, backgroundColor: '#000', borderRadius: 2 },
  iconDoor: { width: 6, height: 6, backgroundColor: '#fff', borderRadius: 1, marginTop: -4 },
  iconPillarRow: { flexDirection: 'row', gap: 3, marginBottom: 2 },
  iconPillar: { width: 4, height: 12, backgroundColor: '#000', borderRadius: 1 },
  iconBase: { width: 20, height: 3, backgroundColor: '#000', borderRadius: 1 },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconQ: { fontSize: 12, fontWeight: '900', color: '#000' },
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1.5,
            borderTopColor: '#000',

           
            height: 95,
            paddingBottom: 30,
            paddingTop: 10,
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#bbb',
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.5,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <View style={{ opacity: focused ? 1 : 0.35 }}>
                <TabIcon label="Home" />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="FacultyTab"
          component={FacultyStack}
          options={{
            tabBarLabel: 'Faculties',
            tabBarIcon: ({ focused }) => (
              <View style={{ opacity: focused ? 1 : 0.35 }}>
                <TabIcon label="Faculties" />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="QuizTab"
          component={QuizStack}
          options={{
            tabBarLabel: 'Career Quiz',
            tabBarIcon: ({ focused }) => (
              <View style={{ opacity: focused ? 1 : 0.35 }}>
                <TabIcon label="Quiz" />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}