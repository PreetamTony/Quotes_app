import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as Speech from 'expo-speech';
import { Bell, Moon, Palette, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { ttsEnabled, toggleTts } = useSettings();
  const [notifications, setNotifications] = useState(true);
  const [dynamicThemes, setDynamicThemes] = useState(true);

  const styles = getStyles(theme as 'light' | 'dark');

  const testTTS = () => {
    if (Platform.OS === 'web') {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          'This is a test of the text-to-speech feature.'
        );
        window.speechSynthesis.speak(utterance);
      } else {
        alert('Text-to-speech not supported in this browser');
      }
    } else {
      Speech.speak('This is a test of the text-to-speech feature.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Bell size={24} color="#4b5563" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Daily Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive daily quote notifications
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Moon size={24} color="#4b5563" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  Switch to dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
            />
          </View>

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Volume2 size={24} color="#4b5563" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Text-to-Speech</Text>
                <Text style={styles.settingDescription}>
                  Enable quote reading
                </Text>
              </View>
            </View>
            <Switch
              value={ttsEnabled}
              onValueChange={toggleTts}
            />
          </View>

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Palette size={24} color="#4b5563" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Dynamic Themes</Text>
                <Text style={styles.settingDescription}>
                  Change colors based on time
                </Text>
              </View>
            </View>
            <Switch
              value={dynamicThemes}
              onValueChange={setDynamicThemes}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={testTTS}>
            <Text style={styles.buttonText}>Test Text-to-Speech</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
    marginTop: 60,
    marginBottom: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme === 'dark' ? '#94a3b8' : '#6b7280',
  },
  button: {
    backgroundColor: theme === 'dark' ? '#334155' : '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
});
