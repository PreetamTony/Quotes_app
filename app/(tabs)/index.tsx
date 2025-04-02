import { useFavorites } from '@/contexts/FavoritesContext';
import { useSettings } from '@/contexts/SettingsContext';
import { quotes } from '@/data/quotes';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { BookmarkPlus, Heart, RefreshCw, Share as ShareIcon, Volume2 } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Dimensions, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const backgrounds = [
  ['#4158D0', '#C850C0', '#FFCC70'],
  ['#0093E9', '#80D0C7'],
  ['#8EC5FC', '#E0C3FC'],
  ['#D9AFD9', '#97D9E1'],
  ['#FBAB7E', '#F7CE68'],
];

export default function QuoteScreen() {
  const [currentQuote, setCurrentQuote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });
  
  const [currentBg, setCurrentBg] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const bookmarkScale = useSharedValue(1);
  const speechScale = useSharedValue(1);
  
  const { ttsEnabled } = useSettings();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const bookmarkAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bookmarkScale.value }],
    };
  });

  const speechAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: speechScale.value }],
    };
  });

  const generateNewQuote = useCallback(() => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[newIndex].text === currentQuote.text);
    
    setCurrentQuote(quotes[newIndex]);
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    setIsBookmarked(false);
  }, [currentQuote]);

  const toggleFavorite = () => {
    heartScale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    if (isFavorite(currentQuote.id)) {
      removeFavorite(currentQuote.id);
    } else {
      addFavorite(currentQuote);
    }
  };

  const toggleBookmark = () => {
    bookmarkScale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    setIsBookmarked(!isBookmarked);
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${currentQuote.text}" - ${currentQuote.author}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const speakQuote = async () => {
    if (!ttsEnabled) return;
    
    speechScale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    
    try {
      if (Platform.OS === 'web') {
        // Web speech API fallback
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(
            `${currentQuote.text} by ${currentQuote.author}`
          );
          window.speechSynthesis.speak(utterance);
        } else {
          console.warn('Speech synthesis not supported on this browser');
        }
      } else {
        await Speech.speak(`${currentQuote.text} by ${currentQuote.author}`);
      }
    } catch (error) {
      console.error('Error speaking:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={backgrounds[currentBg] as [string, string, ...string[]]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Quote of the Day</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</Text>
      </View>

      <Animated.View 
        key={currentQuote.text}
        entering={SlideInRight}
        exiting={SlideOutLeft}
        style={[styles.quoteContainer, animatedStyle]}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"{currentQuote.text}"</Text>
          <Text style={styles.author}>― {currentQuote.author}</Text>
          
          <View style={styles.actionButtons}>
            <Animated.View style={speechAnimatedStyle}>
              <TouchableOpacity 
                onPress={speakQuote}
                style={styles.iconButton}
                disabled={!ttsEnabled}>
                <Volume2 
                  size={24} 
                  color={ttsEnabled ? '#4b5563' : '#cccccc'}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={heartAnimatedStyle}>
              <TouchableOpacity 
                onPress={toggleFavorite}
                style={styles.iconButton}>
                <Heart 
                  size={24} 
                  color={isFavorite(currentQuote.id) ? '#ff4b4b' : '#4b5563'} 
                  fill={isFavorite(currentQuote.id) ? '#ff4b4b' : 'transparent'}
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity 
              onPress={shareQuote}
              style={styles.iconButton}>
              <ShareIcon size={24} color="#4b5563" />
            </TouchableOpacity>

            <Animated.View style={bookmarkAnimatedStyle}>
              <TouchableOpacity 
                onPress={toggleBookmark}
                style={styles.iconButton}>
                <BookmarkPlus 
                  size={24} 
                  color={isBookmarked ? '#4b5563' : '#4b5563'} 
                  fill={isBookmarked ? '#4b5563' : 'transparent'}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <TouchableOpacity 
        style={styles.button}
        onPress={generateNewQuote}
        activeOpacity={0.8}>
        <RefreshCw size={24} color="#ffffff" />
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: width - 40,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
      },
    }),
  },
  quoteText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 24,
    lineHeight: 36,
    color: '#1a1a1a',
    marginBottom: 20,
  },
  author: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 40,
    backdropFilter: 'blur(10px)',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 8,
  },
});
