import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { categories, quotes, type Category } from '@/data/quotes';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CategoriesScreen() {
  const router = useRouter();

  const getCategoryQuoteCount = (category: Category) => {
    return quotes.filter(quote => quote.category === category).length;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {(Object.keys(categories) as Category[]).map((category, index) => (
          <Animated.View
            key={category}
            entering={FadeInDown.delay(index * 100)}
            style={styles.categoryCard}>
            <TouchableOpacity
              onPress={() => router.push(`/category/${category}`)}
              style={styles.categoryButton}>
              <Text style={styles.categoryEmoji}>{categories[category].icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{categories[category].name}</Text>
                <Text style={styles.quoteCount}>
                  {getCategoryQuoteCount(category)} quotes
                </Text>
              </View>
            </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 20,
  },
  categoryCard: {
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
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  categoryEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  quoteCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
});