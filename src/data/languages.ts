export interface Language {
  name: string;
  description: string;
  color: string;
  origin: string;
  speakers: string;
  difficulty: string;
}

export const languages: Language[] = [
  {
    name: 'Yoruba',
    description: 'Learn Yoruba, a tonal language spoken by over 20 million people primarily in Nigeria, Benin, and Togo.',
    color: 'green',
    origin: 'Nigeria, Benin, Togo',
    speakers: '20+ million',
    difficulty: 'Beginner-friendly'
  },
  {
    name: 'Kiswahili',
    description: 'Discover Kiswahili, the lingua franca of East Africa spoken by over 100 million people.',
    color: 'blue',
    origin: 'East Africa',
    speakers: '100+ million',
    difficulty: 'Beginner-friendly'
  },
  {
    name: 'Twi',
    description: 'Explore Twi, a dialect of Akan spoken by over 9 million people primarily in Ghana.',
    color: 'yellow',
    origin: 'Ghana',
    speakers: '9+ million',
    difficulty: 'Intermediate'
  },
  {
    name: 'Amharic',
    description: 'Study Amharic, the official language of Ethiopia spoken by over 25 million people.',
    color: 'red',
    origin: 'Ethiopia',
    speakers: '25+ million',
    difficulty: 'Advanced'
  }
];