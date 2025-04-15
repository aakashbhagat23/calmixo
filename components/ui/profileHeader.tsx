import { View, Text, Image, StyleSheet } from 'react-native';
import { auth } from '@/lib/firebase';

interface ProfileHeaderProps {
  width: number;
  height: number;
  editable?: boolean;
  onPress?: () => void;
}
export default function ProfileHeader({ width = 24, height = 24, editable = false, onPress }: ProfileHeaderProps) {
  const user = auth.currentUser;

  const displayName = user?.displayName || user?.email || 'Guest';
  const profileImage = user?.photoURL || 'https://www.shutterstock.com/shutterstock/photos/2558760599/display_1500/stock-vector-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-default-avatar-2558760599.jpg';

  return (
    <View style={styles.container} onTouchEnd={editable && onPress ? onPress : undefined}>
      <Image source={{ uri: profileImage }} style={[styles.avatar, {width:24, height:24}]} />
      <Text style={styles.name}>{displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});
