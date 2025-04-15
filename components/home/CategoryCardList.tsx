import { ScrollView, View, Text, Image, Pressable } from 'react-native';

export default function CategoryCardList({ cards, theme, textColor, buttonColor }: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 10 }}>
      {cards.map((card: any) => (
        <View key={card.id} style={{ width: 150, padding: 16, borderRadius: 20, marginRight: 16, backgroundColor: card[theme] }}>
          <Image source={{ uri: card.image }} style={{ width: '100%', height: 100, borderRadius: 12 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>{card.title}</Text>
          <Text style={{ color: textColor, marginTop:10, marginBottom:10 }}>{card.category}</Text>
          <Pressable style={{ backgroundColor: buttonColor, borderRadius: 20, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 6 }} onPress={() => console.log('Start Daily Dose')}>
            <Text style={{ color: '#3F414E', fontWeight: '600' }}>START</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
