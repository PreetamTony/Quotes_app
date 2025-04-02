import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { quotes } from '@/data/quotes';
import { Heart, Share as ShareIcon } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HistoryScreen() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Quotes</Text>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {quotes.map((quote, index) => (
          <Animated.View 
            key={index}
            entering={FadeIn.delay(index * 100)}
            style={styles.quoteCard}>
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.author}>― {quote.author}</Text>
            </View>
            
            <View style={styles.cardActions}>
              <TouchableOpacity 
                onPress={() => toggleFavorite(index)}
                style={styles.actionButton}>
                <Heart 
                  size={20} 
                  color={favorites.has(index) ? '#ff4b4b' : '#6b7280'}
                  fill={favorites.has(index) ? '#ff4b4b' : 'transparent'}
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <ShareIcon size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#1a1a1a',
    marginTop: 60,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  quoteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  quoteContent: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  quoteText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 18,
    lineHeight: 28,
    color: '#1a1a1a',
    marginBottom: 12,
  },
  author: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4b5563',
  },
  cardActions: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
    }),
  },
});