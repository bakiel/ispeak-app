'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  Trophy, 
  BookOpen, 
  Clock, 
  Star, 
  Target, 
  Award,
  Video,
  ChevronRight,
  Download,
  Users,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Gamepad2,
  Headphones,
  Activity,
  TrendingUp,
  BarChart3,
  Gift,
  Lightbulb,
  Puzzle,
  Book as BookIcon
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('90days')
  
  // Mock data - in production this would come from API
  const studentData = {
    name: 'Amara Johnson',
    age: 9,
    language: 'Yoruba',
    level: 'Intermediate',
    avatar: '/images/square/Child_happily_reading_book.png',
    joinDate: 'September 2024',
    totalLessons: 24,
    streakDays: 12,
    points: 450,
    badges: 6,
  }

  const upcomingLessons = [
    {
      id: 1,
      date: 'Today',
      time: '4:00 PM',
      teacher: 'Teacher Adunni',
      topic: 'Yoruba Greetings & Daily Expressions',
      duration: '30 minutes',
    },
    {
      id: 2,
      date: 'Thursday, Jan 18',
      time: '4:00 PM',
      teacher: 'Teacher Adunni',
      topic: 'Numbers and Counting 1-20',
      duration: '30 minutes',
    },
    {
      id: 3,
      date: 'Saturday, Jan 20',
      time: '10:00 AM',
      teacher: 'Teacher Adunni',
      topic: 'Family Members Vocabulary',
      duration: '30 minutes',
    },
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Lesson Complete',
      description: 'Completed your first iSPEAK lesson',
      icon: '🎯',
      earned: true,
      date: 'Sep 15, 2024',
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Attended all scheduled lessons for a week',
      icon: '💪',
      earned: true,
      date: 'Oct 1, 2024',
    },
    {
      id: 3,
      title: 'Greeting Master',
      description: 'Mastered all basic greetings',
      icon: '👋',
      earned: true,
      date: 'Oct 15, 2024',
    },
    {
      id: 4,
      title: 'Number Ninja',
      description: 'Count to 100 in your target language',
      icon: '🔢',
      earned: false,
      progress: 60,
    },
    {
      id: 5,
      title: 'Story Listener',
      description: 'Listen to 10 cultural stories',
      icon: '📖',
      earned: false,
      progress: 40,
    },
    {
      id: 6,
      title: 'Conversation Champion',
      description: 'Hold a 5-minute conversation',
      icon: '💬',
      earned: false,
      progress: 20,
    },
  ]

  const learningProgress = {
    listening: 75,
    speaking: 60,
    reading: 45,
    cultural: 80,
  }

  const recentActivities = [
    {
      type: 'lesson',
      title: 'Completed lesson: Colors and Shapes',
      date: '2 days ago',
      points: 20,
    },
    {
      type: 'achievement',
      title: 'Earned badge: Greeting Master',
      date: '5 days ago',
      points: 50,
    },
    {
      type: 'practice',
      title: 'Practiced vocabulary flashcards',
      date: '1 week ago',
      points: 10,
    },
  ]

  const learningResources = [
    {
      id: 1,
      type: 'worksheet',
      title: 'Numbers 1-100 Practice Sheet',
      language: 'Yoruba',
      level: 'Beginner',
      date: 'June 15, 2023',
      image: '/images/landscape/Children_s_language_learning_materials.jpg',
    },
    {
      id: 2,
      type: 'flashcard',
      title: 'Market Items & Shopping Phrases',
      language: 'Yoruba',
      level: 'Intermediate',
      date: 'June 8, 2023',
      image: '/images/landscape/Child_learning_languages_online.jpg',
    },
    {
      id: 3,
      type: 'game',
      title: 'Vocabulary Matching Game',
      language: 'Yoruba',
      level: 'All Levels',
      date: 'May 25, 2023',
      image: '/images/landscape/Birds_on_trees_listening_speaking_reading.jpg',
    },
    {
      id: 4,
      type: 'cultural',
      title: 'Traditional Yoruba Celebrations',
      language: 'Yoruba',
      level: 'All Levels',
      date: 'May 18, 2023',
      image: '/images/landscape/Family_celebrating_Kwanzaa_Umoja.jpg',
    },
  ]

  const downloadedResources = [
    {
      id: 1,
      title: 'Yoruba Numbers 1-100',
      type: 'pdf',
      date: 'June 10, 2023',
    },
    {
      id: 2,
      title: 'Family Vocabulary Practice',
      type: 'word',
      date: 'June 5, 2023',
    },
    {
      id: 3,
      title: 'Colors and Shapes Flashcards',
      type: 'image',
      date: 'May 28, 2023',
    },
    {
      id: 4,
      title: 'Common Phrases Pronunciation',
      type: 'audio',
      date: 'May 20, 2023',
    },
  ]

  const recommendedResources = [
    {
      id: 1,
      title: 'Yoruba Conversation Guide',
      description: 'Perfect for practicing the dialogue skills you\'re working on in your current lessons.',
      icon: '💡',
      color: 'yellow',
    },
    {
      id: 2,
      title: 'Market Shopping Game',
      description: 'Interactive game to practice food vocabulary and market conversations.',
      icon: '🧩',
      color: 'green',
    },
    {
      id: 3,
      title: 'Traditional Yoruba Recipes',
      description: 'Authentic recipes with Yoruba terms for ingredients and cooking methods.',
      icon: '📚',
      color: 'purple',
    },
  ]

  const vocabularySet = {
    title: 'Essential Food & Cooking Terms',
    language: 'Yoruba',
    count: 30,
    terms: [
      { word: 'Oúnjẹ', meaning: 'Food', pronunciation: 'oo-n-jeh' },
      { word: 'Sísè', meaning: 'Cooking', pronunciation: 'see-sheh' },
      { word: 'Dídùn', meaning: 'Delicious', pronunciation: 'dee-doon' },
      { word: 'Iṣu', meaning: 'Yam', pronunciation: 'ee-shoo' },
      { word: 'Ọbẹ̀', meaning: 'Soup/Stew', pronunciation: 'oh-beh' },
      { word: 'Irú', meaning: 'Locust Bean', pronunciation: 'ee-roo' },
    ],
  }

  const sidebarItems = [
    { icon: Calendar, label: 'My Schedule', href: '/student/dashboard', active: true },
    { icon: Trophy, label: 'Achievements', href: '/student/achievements' },
    { icon: BookOpen, label: 'Resources', href: '/student/resources' },
    { icon: Target, label: 'Progress', href: '/student/progress' },
    { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    { icon: Settings, label: 'Settings', href: '/student/settings' },
  ]

  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <Image
          src="/images/logo/iSPEAK-Favicon.png"
          alt="iSPEAK Logo"
          width={40}
          height={40}
        />
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300`}>
          <div className="p-6">
            {/* Student Profile */}
            <div className="text-center mb-8">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={studentData.avatar}
                  alt="Student Avatar"
                  fill
                  className="rounded-full object-cover border-4 border-secondary"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{studentData.level[0]}</span>
                </div>
              </div>
              <h2 className="font-heading font-bold text-lg">{studentData.name}</h2>
              <p className="text-sm text-gray-600">{studentData.language} Student</p>
              <div className="flex items-center justify-center mt-2">
                <Trophy className="w-4 h-4 text-accent mr-1" />
                <span className="text-sm font-medium">{studentData.points} Points</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-secondary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-8 pt-8 border-t">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">
              Welcome back, {studentData.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600">
              You're on a {studentData.streakDays}-day learning streak! Keep it up!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Lessons</p>
                    <p className="text-2xl font-bold">{studentData.totalLessons}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Learning Streak</p>
                    <p className="text-2xl font-bold">{studentData.streakDays} days</p>
                  </div>
                  <Clock className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Points</p>
                    <p className="text-2xl font-bold">{studentData.points}</p>
                  </div>
                  <Star className="w-8 h-8 text-coral" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Badges Earned</p>
                    <p className="text-2xl font-bold">{studentData.badges}</p>
                  </div>
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Lessons & Progress */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Lessons</span>
                    <Link href="/student/schedule" className="text-sm text-secondary hover:text-secondary/80">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingLessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">{lesson.date} at {lesson.time}</span>
                          </div>
                          <h4 className="font-medium">{lesson.topic}</h4>
                          <p className="text-sm text-gray-600">with {lesson.teacher} • {lesson.duration}</p>
                        </div>
                        <Button
                          href={`/student/lesson/${lesson.id}`}
                          variant="primary"
                          size="sm"
                          className="ml-4"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>My Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(learningProgress).map(([skill, progress]) => (
                      <div key={skill}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{skill} Skills</span>
                          <span className="text-sm text-gray-600">{progress}%</span>
                        </div>
                        <ProgressBar value={progress} variant="primary" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Teacher's Note:</strong> You're making excellent progress! Keep practicing 
                      your speaking skills to move to the next level.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          activity.type === 'lesson' ? 'bg-secondary/20' :
                          activity.type === 'achievement' ? 'bg-accent/20' :
                          'bg-primary/20'
                        }`}>
                          {activity.type === 'lesson' ? <BookOpen className="w-5 h-5 text-secondary" /> :
                           activity.type === 'achievement' ? <Trophy className="w-5 h-5 text-accent" /> :
                           <Target className="w-5 h-5 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                        <span className="text-sm font-medium text-secondary">+{activity.points} pts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Achievements & Resources */}
            <div className="space-y-8">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>My Achievements</span>
                    <Link href="/student/achievements" className="text-sm text-secondary hover:text-secondary/80">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {achievements.slice(0, 6).map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`relative text-center p-3 rounded-lg ${
                          achievement.earned ? 'bg-gray-50' : 'bg-gray-100 opacity-60'
                        }`}
                      >
                        <div className="text-3xl mb-1">{achievement.icon}</div>
                        <p className="text-xs font-medium">{achievement.title.split(' ')[0]}</p>
                        {!achievement.earned && achievement.progress && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
                            <div
                              className="h-full bg-secondary transition-all"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link
                      href="/student/vocabulary"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-secondary mr-3" />
                        <span className="font-medium">Vocabulary Practice</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    <Link
                      href="/student/stories"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-coral mr-3" />
                        <span className="font-medium">Cultural Stories</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    <Link
                      href="/student/games"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Trophy className="w-5 h-5 text-accent mr-3" />
                        <span className="font-medium">Language Games</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    <Link
                      href="/resources/printables"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Download className="w-5 h-5 text-primary mr-3" />
                        <span className="font-medium">Printable Worksheets</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Parent Connection */}
              <Card variant="accent">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold mb-3">Parent Connection</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Share your progress with your parents! They can see your achievements 
                    and celebrate your language learning journey.
                  </p>
                  <Button variant="primary" size="sm" fullWidth>
                    <Users className="w-4 h-4 mr-2" />
                    Invite Parents
                  </Button>
                </CardContent>
              </Card>

              {/* Community & Loyalty Points */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold">Community</h3>
                    <Gift className="w-5 h-5 text-coral" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-coral/20 to-accent/20 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Loyalty Points</span>
                        <span className="text-2xl font-bold text-coral">{studentData.points}</span>
                      </div>
                      <ProgressBar value={65} variant="accent" className="mb-2" />
                      <p className="text-xs text-gray-600">350 points to next reward!</p>
                    </div>
                    <Button href="/loyalty" variant="outline" size="sm" fullWidth>
                      View Rewards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Learning Resources Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Learning Resources</span>
                  <Link href="/student/resources" className="text-sm text-secondary hover:text-secondary/80">
                    Browse All Resources
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {learningResources.map((resource) => (
                    <div key={resource.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-32 relative bg-gray-200">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          className="object-cover"
                        />
                        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
                          resource.type === 'worksheet' ? 'bg-blue-100 text-blue-700' :
                          resource.type === 'flashcard' ? 'bg-green-100 text-green-700' :
                          resource.type === 'game' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {resource.type}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">
                            {resource.language}
                          </span>
                          <span className="text-xs text-gray-500">{resource.level}</span>
                        </div>
                        <h4 className="text-sm font-medium mb-2">{resource.title}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{resource.date}</span>
                          <button className="text-secondary hover:text-secondary/80">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vocabulary Practice Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Featured Vocabulary Set</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-sm font-medium mr-2">
                          {vocabularySet.language}
                        </span>
                        <h3 className="font-bold">{vocabularySet.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {vocabularySet.count} essential terms for your upcoming food vocabulary lesson
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {vocabularySet.terms.map((term, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="font-semibold text-lg">{term.word}</p>
                        <p className="text-gray-600">{term.meaning}</p>
                        <span className="text-xs text-gray-500 italic">{term.pronunciation}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">
                      Practice Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Set
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downloads & Recommendations */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {downloadedResources.map((download) => (
                      <div key={download.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                            download.type === 'pdf' ? 'bg-red-100 text-red-600' :
                            download.type === 'word' ? 'bg-blue-100 text-blue-600' :
                            download.type === 'image' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {
                              download.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                              download.type === 'word' ? <FileText className="w-5 h-5" /> :
                              download.type === 'image' ? <FileText className="w-5 h-5" /> :
                              <Headphones className="w-5 h-5" />
                            }
                          </div>
                          <div>
                            <p className="font-medium text-sm">{download.title}</p>
                            <p className="text-xs text-gray-500">Downloaded {download.date}</p>
                          </div>
                        </div>
                        <button className="text-secondary hover:text-secondary/80">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/student/downloads" className="text-sm text-secondary hover:text-secondary/80">
                      View All Downloads
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendedResources.map((resource) => (
                      <div key={resource.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                          resource.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                          resource.color === 'green' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {
                            resource.icon === '💡' ? <Lightbulb className="w-6 h-6" /> :
                            resource.icon === '🧩' ? <Puzzle className="w-6 h-6" /> :
                            <BookIcon className="w-6 h-6" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <button className={`text-xs font-medium ${
                            resource.color === 'yellow' ? 'text-yellow-600 hover:text-yellow-700' :
                            resource.color === 'green' ? 'text-green-600 hover:text-green-700' :
                            'text-purple-600 hover:text-purple-700'
                          }`}>
                            {resource.icon === '🧩' ? 'Play Game' : 'View Resource'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Progress Tracking Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Progress Tracking</CardTitle>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="mt-2 sm:mt-0 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="year">This Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Proficiency Level */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Proficiency Level</h3>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                        <span className="text-sm text-gray-600">Current Level: {studentData.level}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Beginner</span>
                          <span>Intermediate</span>
                          <span>Advanced</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-secondary to-accent" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        You're 40% away from advancing to the Advanced level. Keep practicing!
                      </p>
                    </div>
                  </div>

                  {/* Activity Chart */}
                  <div>
                    <h3 className="font-medium mb-4">Learning Activity</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-end justify-between space-x-2" style={{ height: '120px' }}>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '80%' }}></div>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '60%' }}></div>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '90%' }}></div>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '70%' }}></div>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '85%' }}></div>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '95%' }}></div>
                        <div className="flex-1 bg-secondary rounded-t" style={{ height: '100%' }}></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Breakdown */}
                  <div>
                    <h3 className="font-medium mb-4">Skills Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">Vocabulary</div>
                        <div className="flex-1 mx-3">
                          <ProgressBar value={85} variant="primary" />
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">Grammar</div>
                        <div className="flex-1 mx-3">
                          <ProgressBar value={70} variant="secondary" />
                        </div>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">Pronunciation</div>
                        <div className="flex-1 mx-3">
                          <ProgressBar value={60} variant="accent" />
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">Culture</div>
                        <div className="flex-1 mx-3">
                          <ProgressBar value={90} variant="accent" />
                        </div>
                        <span className="text-sm font-medium">90%</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Spent */}
                  <div>
                    <h3 className="font-medium mb-4">Time Investment</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <Activity className="w-8 h-8 text-secondary mx-auto mb-2" />
                        <p className="text-2xl font-bold">12.5</p>
                        <p className="text-sm text-gray-600">Hours This Month</p>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg text-center">
                        <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                        <p className="text-2xl font-bold">45</p>
                        <p className="text-sm text-gray-600">Total Hours</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Goal:</strong> 15 hours per month
                      </p>
                      <ProgressBar value={83} variant="secondary" className="mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}