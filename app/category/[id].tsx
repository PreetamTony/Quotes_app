import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { categories, quotes, type Category } from '@/data/quotes';
import { Heart, Share as ShareIcon } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useState } from 'react';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: Category }>();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const categoryQuotes = quotes.filter(quote => quote.category === id);

  const toggleFavorite = (quoteId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(quoteId)) {
        newSet.delete(quoteId);
      } else {
        newSet.add(quoteId);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{categories[id].icon}</Text>
        <Text style={styles.title}>{categories[id].name}</Text>
        <Text style={styles.subtitle}>{categoryQuotes.length} quotes</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {categoryQuotes.map((quote, index) => (
          <Animated.View 
            key={quote.id}
            entering={FadeIn.delay(index * 100)}
            style={styles.quoteCard}>
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.author}>― {quote.author}</Text>
            </View>
            
            <View style={styles.cardActions}>
              <TouchableOpacity 
                onPress={() => toggleFavorite(quote.id)}
                style={styles.actionButton}>
                <Heart 
                  size={20} 
                  color={favorites.has(quote.id) ? '#ff4b4b' : '#6b7280'}
                  fill={favorites.has(quote.id) ? '#ff4b4b' : 'transparent'}
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
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6b7280',
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