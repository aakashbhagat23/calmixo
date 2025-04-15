import { View, Text } from 'react-native';

export default function HeaderSection({ config, displayName, textColor }: any) {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: '700', color: textColor }}>
        {config.welcome_text}{displayName?.substring(0, 10)}
      </Text>
      <Text style={{ marginTop: 4, marginBottom: 24, color: textColor }}>
        {config.dailyThoughtText}
      </Text>
    </View>
  );
}
