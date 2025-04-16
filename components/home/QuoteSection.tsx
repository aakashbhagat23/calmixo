import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';
import { useRef } from 'react';

export default function QuoteSection({ quote, theme, textColor }: any) {
  const quoteRef = useRef(null);

  if (!quote || quote.length === 0) return null;

  const handleShare = async () => {
    try {
      const uri = await captureRef(quoteRef, {
        format: 'png',
        quality: 1,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri);
      } else {
        alert('Sharing is not available on this device.');
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: textColor }]}>Quote of the day</Text>

      <View collapsable={false} ref={quoteRef}>
        <ImageBackground
          source={{ uri: quote[0].backgroundImage }}
          style={styles.quoteCard}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.overlay} />

          <Text style={[styles.quoteText, { color: '#fff' }]}>
            “{quote[0].quote}”
          </Text>
          <Text style={[styles.author, { color: '#fff' }]}>— Peter Drucker</Text>
        </ImageBackground>
      </View>

      <Pressable style={styles.shareButton} onPress={handleShare}>
        <MaterialIcons name="share" size={20} color={textColor} />
        <Text style={[styles.shareText, { color: textColor }]}>Share</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  quoteCard: {
    marginTop: 12,
    padding: 20,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#000',
    minHeight:200
  },
  backgroundImage: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  author: {
    textAlign: 'right',
    fontSize: 14,
    opacity: 0.8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  shareText: {
    marginLeft: 6,
    fontSize: 14,
  },
});
