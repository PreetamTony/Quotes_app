export interface Quote {
  id: string;
  text: string;
  author: string;
  category: Category;
}

export type Category = 'motivation' | 'success' | 'wisdom' | 'leadership' | 'life';

export const categories: Record<Category, { name: string; icon: string }> = {
  motivation: { name: 'Motivation', icon: '🔥' },
  success: { name: 'Success', icon: '🏆' },
  wisdom: { name: 'Wisdom', icon: '🧠' },
  leadership: { name: 'Leadership', icon: '👑' },
  life: { name: 'Life', icon: '🌱' },
};

export const quotes: Quote[] = [
  {
    id: '1',
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: 'motivation'
  },
  {
    id: '2',
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: 'life'
  },
  {
    id: '3',
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: 'motivation'
  },
  {
    id: '4',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: 'success'
  },
  {
    id: '5',
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: 'wisdom'
  },
  {
    id: '6',
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: 'leadership'
  },
  {
    id: '7',
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: 'motivation'
  },
  {
    id: '8',
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: 'motivation'
  },
  {
    id: '9',
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
    category: 'success'
  },
  {
    id: '10',
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: 'wisdom'
  },
  {
    id: '11',
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: 'life'
  },
  {
    id: '12',
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: 'leadership'
  },
  {
    id: '13',
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: 'motivation'
  },
  {
    id: '14',
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: 'success'
  },
  {
    id: '15',
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: 'wisdom'
  },
  {
    id: '16',
    text: "Do not watch the clock. Do what it does. Keep going.",
    author: "Sam Levenson",
    category: 'motivation'
  },
  {
    id: '17',
    text: "The best revenge is massive success.",
    author: "Frank Sinatra",
    category: 'success'
  },
  {
    id: '18',
    text: "Leadership is the capacity to translate vision into reality.",
    author: "Warren Bennis",
    category: 'leadership'
  },
  {
    id: '19',
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
    category: 'life'
  },
  {
    id: '20',
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: 'motivation'
  }
];
