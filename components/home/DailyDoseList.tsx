import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DailyDoseList({ doses, theme, textColor, buttonColor }: any) {
  return doses.map((dose: any) => (
    <View key={dose.id} style={{ backgroundColor: dose[theme], borderRadius: 20, padding: 20, marginTop: 24, position: 'relative' }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>{dose.title}</Text>
      <Text style={{ color: textColor, marginVertical: 8 }}>{dose.category} • {dose.duration}</Text>
      <Pressable
        style={{
          position: 'absolute',
          right: 20,
          top: '50%',
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: buttonColor
        }}
        onPress={() => console.log('Play Daily Dose')}
      >
        <Ionicons name="play" size={24} color={textColor} />
      </Pressable>
    </View>
  ));
}
