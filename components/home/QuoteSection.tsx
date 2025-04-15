import { View, Text } from 'react-native';

export default function QuoteSection({ quote, theme, textColor }: any) {
  if (!quote || quote.length === 0) return null;

  return (
    <View style={{ marginTop: 28 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>Quote of the day</Text>
      <View style={{ marginTop: 12, padding: 16, borderRadius: 16, backgroundColor: quote[0][theme] }}>
        <Text style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 8, color: textColor }}>
          “{quote[0].quote}”
        </Text>
        <Text style={{ textAlign: 'right', fontSize: 14, opacity: 0.8, color: textColor }}>
          — Peter Drucker
        </Text>
      </View>
    </View>
  );
}
