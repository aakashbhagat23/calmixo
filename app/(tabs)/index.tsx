import { ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchAppConfig } from '@/lib/configService';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import LoadingScreen from '@/components/ui/LoadingScreen';

import HeaderSection from '../../components/home/HeaderSection';
import CategoryCardList from '../../components/home/CategoryCardList';
import DailyDoseList from '../../components/home/DailyDoseList';
import QuoteSection from '../../components/home/QuoteSection';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const [config, setConfig] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [dailyDose, setDailyDose] = useState<any[]>([]);
  const [quote, setQuote] = useState<any[]>([]);
  const theme = useColorScheme() || 'light';
  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].text;
  const buttonColor = Colors[theme].primary;
  const displayName = auth.currentUser?.displayName || auth.currentUser?.email;

  useEffect(() => {
    const load = async () => {
      setConfig(await fetchAppConfig());
      fetchCards();
      fetchDose();
      fetchQuote();
    };
    load();
  }, []);

  const fetchCards = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'main_cards'));
      setCards(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch {
      Alert.alert('Error', 'Unable to load cards.');
    }
  };

  const fetchDose = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'daily_dose'));
      setDailyDose(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch {
      Alert.alert('Error', 'Unable to load daily dose.');
    }
  };

  const fetchQuote = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'quote'));
      setQuote(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch {
      Alert.alert('Error', 'Unable to load quote.');
    }
  };

  if (!config) return <LoadingScreen />;

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} contentContainerStyle={{ paddingBottom: 120 }}>
      <HeaderSection config={config} displayName={displayName} textColor={textColor} />
      <CategoryCardList cards={cards} theme={theme} textColor={textColor} buttonColor={buttonColor} />
      <Text style={[styles.recommend, { color: textColor }]}>Daily Dose</Text>
      <DailyDoseList doses={dailyDose} theme={theme} textColor={textColor} buttonColor={buttonColor} />
      <QuoteSection quote={quote} theme={theme} textColor={textColor} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  recommend: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 28,
  },
});
