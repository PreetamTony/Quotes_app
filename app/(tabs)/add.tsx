import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { categories, type Category } from '@/data/quotes';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function AddQuoteScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSubmit = () => {
    // TODO: Implement quote submission
    console.log({ quote, author, category: selectedCategory });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Quote</Text>
      
      <ScrollView style={styles.form}>
        <Animated.View entering={FadeIn} style={styles.inputGroup}>
          <Text style={styles.label}>Quote</Text>
          <TextInput
            style={styles.textArea}
            value={quote}
            onChangeText={setQuote}
            placeholder="Enter your quote..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(100)}
          style={styles.inputGroup}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Who said this?"
          />
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(200)}
          style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {(Object.keys(categories) as Category[]).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text style={styles.categoryEmoji}>{categories[category].icon}</Text>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}>
                  {categories[category].name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <TouchableOpacity 
        style={[
          styles.submitButton,
          (!quote || !author || !selectedCategory) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!quote || !author || !selectedCategory}>
        <Text style={styles.submitButtonText}>Add Quote</Text>
      </TouchableOpacity>
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
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1a1a1a',
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
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    height: 120,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1a1a1a',
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
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
  selectedCategory: {
    backgroundColor: '#1a1a1a',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#4b5563',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
});