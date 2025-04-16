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
import { clearCachedData, getCachedData, setCachedData } from '@/utils/cache';

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
			const cacheKey = 'main_cards';
			const expiryTime = config?.refresh_time || 60 * 60 * 1000; // Default to 1 hour if not set in config
			const cached = await getCachedData(cacheKey, expiryTime);
			if(cached){
				console.log('Using cached data for cards:', cached);
				setCards(cached);
			}else{
				const snapshot = await getDocs(collection(db, cacheKey));
				const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				setCards(data);
				setCachedData(cacheKey, data);
				console.log('Fetched and cached new data for cards:', data);
			}
      
    } catch {
      Alert.alert('Error', 'Unable to load cards.');
    }
  };

  const fetchDose = async () => {
    try {
			const key = 'daily_dose';
			const expiryTime = config?.refresh_time || 60 * 60 * 1000;
			const cached = await getCachedData(key, expiryTime);
			if(cached){
				console.log('Using cached data for daily_dose:', cached);
				setDailyDose(cached);
			}else{
				const snapshot = await getDocs(collection(db, key));
      	const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				setDailyDose(data);
				setCachedData(key, data);
				console.log('Fetched and cached new data for daily_dose:', data);
			}
    } catch {
      Alert.alert('Error', 'Unable to load daily dose.');
    }
  };

  const fetchQuote = async () => {
    try {
			const key = 'quote';
			const expiryTime = config?.refresh_time || 60 * 60 * 1000;
			const cached = await getCachedData(key, expiryTime);
			if(cached){
				console.log('Using cached data for quote:', cached);
				setQuote(cached);
			}else{
				const snapshot = await getDocs(collection(db, key));
      	const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				setQuote(data);
				setCachedData(key, data);
				console.log('Fetched and cached new data for quote:', data);
			}
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
