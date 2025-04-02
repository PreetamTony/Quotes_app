import { useFavorites } from '@/contexts/FavoritesContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { theme } = useTheme();
  const styles = getStyles(theme as 'light' | 'dark');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme === 'dark' ? ['#0f172a', '#1e293b'] : ['#f8fafc', '#e2e8f0']}
        style={StyleSheet.absoluteFill}
      />
      
      <Text style={styles.title}>Favorite Quotes</Text>
      
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite quotes yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.quoteCard}>
              <Text style={styles.quoteText}>"{item.text}"</Text>
              <Text style={styles.author}>― {item.author}</Text>
              <Heart 
                size={20} 
                color="#ff4b4b" 
                fill="#ff4b4b"
                style={styles.heartIcon}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const getStyles = (theme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
    marginBottom: 20,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme === 'dark' ? '#94a3b8' : '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
  list: {
    paddingBottom: 40,
  },
  quoteCard: {
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  quoteText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 18,
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
    marginBottom: 8,
  },
  author: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme === 'dark' ? '#94a3b8' : '#4b5563',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
