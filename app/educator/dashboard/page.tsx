'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  DollarSign, 
  BookOpen, 
  Users, 
  Star, 
  Clock,
  Award,
  Video,
  ChevronRight,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  BarChart3,
  Download,
  Search,
  Filter,
  Eye,
  Send,
  CheckCircle,
  AlertCircle,
  Plus,
  Gamepad2,
  FileImage,
  ClipboardList
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function EducatorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedWeek, setSelectedWeek] = useState('current')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [feedbackTemplates, setFeedbackTemplates] = useState([
    { id: 1, name: 'Weekly Progress Report', type: 'progress' },
    { id: 2, name: 'Milestone Achievement', type: 'achievement' },
    { id: 3, name: 'Areas for Improvement', type: 'improvement' },
  ])
  
  // Mock data - in production this would come from API
  const educatorData = {
    name: 'Adunni Oyeleke',
    title: 'Certified Yoruba Educator',
    avatar: '/images/square/Grandmother_storytelling_to_children.png',
    rating: 4.9,
    totalStudents: 47,
    activeStudents: 12,
    totalLessons: 856,
    joinDate: 'January 2023',
    monthlyEarnings: 2450,
    pendingPayment: 350,
  }

  const todaySchedule = [
    {
      id: 1,
      time: '10:00 AM',
      student: 'Amara Johnson',
      age: 9,
      level: 'Intermediate',
      topic: 'Yoruba Greetings & Daily Expressions',
      duration: '30 minutes',
      status: 'completed',
    },
    {
      id: 2,
      time: '2:00 PM',
      student: 'Kofi Mensah',
      age: 7,
      level: 'Beginner',
      topic: 'Introduction to Yoruba Sounds',
      duration: '30 minutes',
      status: 'completed',
    },
    {
      id: 3,
      time: '4:00 PM',
      student: 'Zara Williams',
      age: 11,
      level: 'Advanced',
      topic: 'Yoruba Proverbs and Stories',
      duration: '30 minutes',
      status: 'upcoming',
    },
    {
      id: 4,
      time: '5:00 PM',
      student: 'David Chen',
      age: 6,
      level: 'Beginner',
      topic: 'Colors and Shapes in Yoruba',
      duration: '30 minutes',
      status: 'upcoming',
    },
  ]

  const weeklyStats = {
    lessonsCompleted: 18,
    lessonsScheduled: 24,
    newStudents: 2,
    totalHours: 12,
    earnings: 450,
    rating: 4.9,
  }

  const studentProgress = [
    {
      name: 'Amara Johnson',
      level: 'Intermediate',
      lessonsCompleted: 24,
      progress: 65,
      nextMilestone: 'Semi-Fluent',
    },
    {
      name: 'Kofi Mensah',
      level: 'Beginner',
      lessonsCompleted: 8,
      progress: 30,
      nextMilestone: 'New Speaker',
    },
    {
      name: 'Zara Williams',
      level: 'Advanced',
      lessonsCompleted: 48,
      progress: 85,
      nextMilestone: 'Fluent Speaker',
    },
  ]

  const recentReviews = [
    {
      student: 'Sarah J.',
      parent: 'Parent',
      rating: 5,
      comment: 'Teacher Adunni is amazing! My daughter looks forward to every lesson.',
      date: '3 days ago',
    },
    {
      student: 'Michael T.',
      parent: 'Parent',
      rating: 5,
      comment: 'Very patient with my son during his silent period. Excellent educator!',
      date: '1 week ago',
    },
  ]

  const weeklySchedule = [
    {
      day: 'Monday',
      lessons: [
        { time: '10:00 AM', student: 'Amara Johnson', level: 'Intermediate' },
        { time: '3:00 PM', student: 'David Chen', level: 'Beginner' },
      ],
    },
    {
      day: 'Tuesday',
      lessons: [
        { time: '11:00 AM', student: 'Kofi Mensah', level: 'Beginner' },
        { time: '4:00 PM', student: 'Zara Williams', level: 'Advanced' },
      ],
    },
    {
      day: 'Wednesday',
      lessons: [
        { time: '10:00 AM', student: 'Amara Johnson', level: 'Intermediate' },
        { time: '2:00 PM', student: 'Michael Thompson', level: 'Intermediate' },
      ],
    },
    {
      day: 'Thursday',
      lessons: [
        { time: '3:00 PM', student: 'Sarah Williams', level: 'Beginner' },
      ],
    },
    {
      day: 'Friday',
      lessons: [
        { time: '10:00 AM', student: 'Amara Johnson', level: 'Intermediate' },
        { time: '4:00 PM', student: 'Zara Williams', level: 'Advanced' },
      ],
    },
    {
      day: 'Saturday',
      lessons: [
        { time: '9:00 AM', student: 'David Chen', level: 'Beginner' },
        { time: '11:00 AM', student: 'Kofi Mensah', level: 'Beginner' },
      ],
    },
    {
      day: 'Sunday',
      lessons: [],
    },
  ]

  const allStudents = [
    {
      id: 1,
      name: 'Amara Johnson',
      age: 9,
      language: 'Yoruba',
      level: 'Intermediate',
      progress: 65,
      lessons: 24,
      nextLesson: 'Jan 16, 4:00 PM',
      status: 'Active',
      avatar: '/images/square/Child_happily_reading_book.png',
    },
    {
      id: 2,
      name: 'Kofi Mensah',
      age: 7,
      language: 'Yoruba',
      level: 'Beginner',
      progress: 30,
      lessons: 8,
      nextLesson: 'Jan 17, 11:00 AM',
      status: 'Active',
      avatar: '/images/square/Child_learning_online_with_headphones.png',
    },
    {
      id: 3,
      name: 'Zara Williams',
      age: 11,
      language: 'Yoruba',
      level: 'Advanced',
      progress: 85,
      lessons: 48,
      nextLesson: 'Jan 16, 5:00 PM',
      status: 'Active',
      avatar: '/images/square/Child_holding_a_Well_done_certificate.png',
    },
    {
      id: 4,
      name: 'David Chen',
      age: 6,
      language: 'Yoruba',
      level: 'Beginner',
      progress: 15,
      lessons: 5,
      nextLesson: 'Jan 18, 3:00 PM',
      status: 'New',
      avatar: null,
    },
    {
      id: 5,
      name: 'Sarah Williams',
      age: 8,
      language: 'Yoruba',
      level: 'Beginner',
      progress: 25,
      lessons: 10,
      nextLesson: 'Jan 18, 3:00 PM',
      status: 'Active',
      avatar: '/images/square/Children_learning_languages_together.png',
    },
  ]

  const teachingMaterials = [
    {
      id: 1,
      title: 'Lesson 1: Yoruba Greetings',
      type: 'lesson',
      unit: 'Unit 1: Introduction',
      language: 'Yoruba',
      level: 'Beginner',
      image: '/images/landscape/Elderly_woman_storytelling_to_children.jpg',
    },
    {
      id: 2,
      title: 'Numbers Worksheet 1-20',
      type: 'worksheet',
      unit: 'Unit 2: Numbers & Counting',
      language: 'Yoruba',
      level: 'Beginner',
      image: '/images/landscape/Kid_learning_Kiswahili_numbers.jpg',
    },
    {
      id: 3,
      title: 'Family Vocabulary Flashcards',
      type: 'flashcard',
      unit: 'Unit 3: Family & Friends',
      language: 'Yoruba',
      level: 'Intermediate',
      image: '/images/landscape/Family_celebrating_Kwanzaa_Umoja.jpg',
    },
    {
      id: 4,
      title: 'Traditional Foods Memory Game',
      type: 'game',
      unit: 'Unit 4: Food & Culture',
      language: 'Yoruba',
      level: 'All Levels',
      image: '/images/landscape/Children_s_language_learning_materials.jpg',
    },
  ]

  const sidebarItems = [
    { icon: Calendar, label: 'Schedule', href: '/educator/dashboard', active: true },
    { icon: Users, label: 'My Students', href: '/educator/students' },
    { icon: BookOpen, label: 'Lesson Plans', href: '/educator/lessons' },
    { icon: DollarSign, label: 'Earnings', href: '/educator/earnings' },
    { icon: FileText, label: 'Resources', href: '/educator/resources' },
    { icon: MessageCircle, label: 'Messages', href: '/educator/messages' },
    { icon: Settings, label: 'Settings', href: '/educator/settings' },
  ]

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
            {/* Educator Profile */}
            <div className="text-center mb-8">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={educatorData.avatar}
                  alt="Educator Avatar"
                  fill
                  className="rounded-full object-cover border-4 border-primary"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" fill="currentColor" />
                </div>
              </div>
              <h2 className="font-heading font-bold text-lg">{educatorData.name}</h2>
              <p className="text-sm text-gray-600">{educatorData.title}</p>
              <div className="flex items-center justify-center mt-2">
                <Star className="w-4 h-4 text-accent mr-1" fill="currentColor" />
                <span className="text-sm font-medium">{educatorData.rating} Rating</span>
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
                      ? 'bg-primary text-white'
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
          <div className="mb-6">
            <h1 className="font-heading text-3xl font-bold mb-2">
              Welcome back, {educatorData.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-600">
              You have {todaySchedule.filter(l => l.status === 'upcoming').length} lessons remaining today
            </p>
          </div>

          {/* Section Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSection('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'overview'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveSection('schedule')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'schedule'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Class Schedule
              </button>
              <button
                onClick={() => setActiveSection('students')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'students'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Student Management
              </button>
              <button
                onClick={() => setActiveSection('materials')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'materials'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Teaching Materials
              </button>
              <button
                onClick={() => setActiveSection('feedback')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'feedback'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Feedback Tools
              </button>
              <button
                onClick={() => setActiveSection('resources')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'resources'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Resource Library
              </button>
              <button
                onClick={() => setActiveSection('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'analytics'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Performance Analytics
              </button>
              <button
                onClick={() => setActiveSection('settings')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'settings'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Account Settings
              </button>
            </div>
          </div>

          {/* Conditional Content Based on Active Section */}
          {activeSection === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold">{educatorData.activeStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold">{weeklyStats.lessonsCompleted}/{weeklyStats.lessonsScheduled}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Earnings</p>
                    <p className="text-2xl font-bold">${educatorData.monthlyEarnings}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-coral" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Your Rating</p>
                    <p className="text-2xl font-bold">{educatorData.rating}/5.0</p>
                  </div>
                  <Star className="w-8 h-8 text-primary" fill="currentColor" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Schedule & Students */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Today's Schedule</span>
                    <Link href="/educator/schedule" className="text-sm text-primary hover:text-primary/80">
                      View Full Calendar
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaySchedule.map((lesson) => (
                      <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-lg ${
                        lesson.status === 'completed' ? 'bg-gray-100' : 'bg-secondary/10'
                      }`}>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <Clock className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium">{lesson.time}</span>
                            {lesson.status === 'completed' && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Completed
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium">{lesson.student} ({lesson.age} years)</h4>
                          <p className="text-sm text-gray-600">{lesson.topic} • {lesson.level}</p>
                        </div>
                        {lesson.status === 'upcoming' && (
                          <Button
                            href={`/educator/lesson/${lesson.id}`}
                            variant="primary"
                            size="sm"
                            className="ml-4"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Student Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Student Progress</span>
                    <Link href="/educator/students" className="text-sm text-primary hover:text-primary/80">
                      View All Students
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studentProgress.map((student, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-gray-600">
                              {student.level} • {student.lessonsCompleted} lessons • Next: {student.nextMilestone}
                            </p>
                          </div>
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                        <ProgressBar value={student.progress} variant="secondary" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <div className="flex space-x-2 mt-2">
                    {['week', 'month', 'year'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          selectedPeriod === period
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        This {period}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <BarChart3 className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <p className="text-2xl font-bold">{weeklyStats.lessonsCompleted}</p>
                      <p className="text-sm text-gray-600">Lessons Taught</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold">{weeklyStats.totalHours}h</p>
                      <p className="text-sm text-gray-600">Teaching Hours</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-coral mx-auto mb-2" />
                      <p className="text-2xl font-bold">+{weeklyStats.newStudents}</p>
                      <p className="text-sm text-gray-600">New Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Reviews & Resources */}
            <div className="space-y-8">
              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Reviews</span>
                    <Link href="/educator/reviews" className="text-sm text-primary hover:text-primary/80">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-accent fill-accent' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 italic">"{review.comment}"</p>
                        <p className="text-xs text-gray-600 mt-1">— {review.student} ({review.parent})</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link
                      href="/educator/schedule/add"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-secondary mr-3" />
                        <span className="font-medium">Update Availability</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    <Link
                      href="/educator/resources/upload"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-coral mr-3" />
                        <span className="font-medium">Upload Resources</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    <Link
                      href="/educator/students/reports"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Download className="w-5 h-5 text-primary mr-3" />
                        <span className="font-medium">Student Reports</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    <Link
                      href="/educator/earnings"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-accent mr-3" />
                        <span className="font-medium">View Earnings</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Earnings Summary */}
              <Card variant="gradient" className="text-white">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold mb-4">Earnings Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold">${educatorData.monthlyEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Payment</span>
                      <span className="font-bold">${educatorData.pendingPayment}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span>Next Payout</span>
                        <span className="font-bold">Feb 1, 2025</span>
                      </div>
                    </div>
                  </div>
                  <Button href="/educator/earnings" variant="accent" size="sm" fullWidth className="mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Access teaching resources, get technical support, or connect with other educators.
                  </p>
                  <Button href="/educator/support" variant="secondary" size="sm" fullWidth>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
            </>
          )}

          {/* Class Schedule Section */}
          {activeSection === 'schedule' && (
            <div className="space-y-8">
              {/* Today's Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Time</th>
                          <th className="text-left py-3 px-4">Student</th>
                          <th className="text-left py-3 px-4">Level</th>
                          <th className="text-left py-3 px-4">Topic</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todaySchedule.map((lesson) => (
                          <tr key={lesson.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{lesson.time}</td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{lesson.student}</p>
                                <p className="text-sm text-gray-600">Age {lesson.age}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                lesson.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                                lesson.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {lesson.level}
                              </span>
                            </td>
                            <td className="py-3 px-4">{lesson.topic}</td>
                            <td className="py-3 px-4">
                              {lesson.status === 'completed' ? (
                                <span className="flex items-center text-green-600">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Completed
                                </span>
                              ) : (
                                <span className="flex items-center text-blue-600">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Upcoming
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {lesson.status === 'upcoming' ? (
                                <Button variant="primary" size="sm">
                                  <Video className="w-4 h-4 mr-1" />
                                  Start
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Review
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Schedule */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Previous Week</Button>
                      <Button variant="outline" size="sm">Next Week</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weeklySchedule.map((day) => (
                      <div key={day.day} className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium mb-2">{day.day}</h4>
                        {day.lessons.length === 0 ? (
                          <p className="text-sm text-gray-500 italic">No lessons</p>
                        ) : (
                          <div className="space-y-2">
                            {day.lessons.map((lesson, index) => (
                              <div key={index} className="bg-white rounded p-2 text-xs">
                                <p className="font-medium">{lesson.time}</p>
                                <p className="text-gray-600">{lesson.student}</p>
                                <p className="text-gray-500">{lesson.level}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Class Preparation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Preparation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Next Class: Amara Johnson</h4>
                        <p className="text-sm text-gray-600 mb-3">Intermediate • Yoruba Greetings & Daily Expressions</p>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm">Review previous lesson notes</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm">Prepare greeting flashcards</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Set up role-play scenarios</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Test audio/video equipment</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Teaching Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">For Beginners</h4>
                        <p className="text-sm text-blue-800">Use lots of visual aids and repetition. Keep lessons fun with songs and games.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">For Intermediate</h4>
                        <p className="text-sm text-green-800">Encourage conversation practice. Introduce more complex sentence structures.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">For Advanced</h4>
                        <p className="text-sm text-purple-800">Focus on cultural nuances and idiomatic expressions. Use authentic materials.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Student Management Section */}
          {activeSection === 'students' && (
            <div className="space-y-8">
              {/* Students Table */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle>All Students</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search students..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Student</th>
                          <th className="text-left py-3 px-4">Language</th>
                          <th className="text-left py-3 px-4">Level</th>
                          <th className="text-left py-3 px-4">Progress</th>
                          <th className="text-left py-3 px-4">Lessons</th>
                          <th className="text-left py-3 px-4">Next Lesson</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allStudents.map((student) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                  {student.avatar ? (
                                    <Image
                                      src={student.avatar}
                                      alt={student.name}
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-gray-600">
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-sm text-gray-600">Age {student.age}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-medium">
                                {student.language}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                student.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                                student.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {student.level}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-secondary h-2 rounded-full"
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{student.lessons}</td>
                            <td className="py-3 px-4">{student.nextLesson}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {student.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button className="text-gray-600 hover:text-primary">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-secondary">
                                  <FileText className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-coral">
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Student Report */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Focus: Amara Johnson</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Current Focus Areas</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Vocabulary</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <ProgressBar value={75} variant="primary" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Pronunciation</span>
                            <span className="text-sm font-medium">60%</span>
                          </div>
                          <ProgressBar value={60} variant="secondary" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Grammar</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <ProgressBar value={65} variant="accent" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Cultural Knowledge</span>
                            <span className="text-sm font-medium">80%</span>
                          </div>
                          <ProgressBar value={80} variant="accent" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4">Recent Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">Attendance</span>
                          <span className="text-sm font-medium text-green-600">100%</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">Homework Completion</span>
                          <span className="text-sm font-medium text-green-600">95%</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">Participation</span>
                          <span className="text-sm font-medium text-blue-600">High</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">Improvement Rate</span>
                          <span className="text-sm font-medium text-green-600">+15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Teaching Materials Section */}
          {activeSection === 'materials' && (
            <div className="space-y-8">
              {/* Curriculum Browser */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle>Teaching Materials</CardTitle>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>All Languages</option>
                        <option>Yoruba</option>
                        <option>Kiswahili</option>
                        <option>Twi</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>All Levels</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {teachingMaterials.map((material) => (
                      <div key={material.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 relative bg-gray-200">
                          <Image
                            src={material.image}
                            alt={material.title}
                            fill
                            className="object-cover"
                          />
                          <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
                            material.type === 'lesson' ? 'bg-blue-100 text-blue-700' :
                            material.type === 'worksheet' ? 'bg-green-100 text-green-700' :
                            material.type === 'game' ? 'bg-purple-100 text-purple-700' :
                            material.type === 'flashcard' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {
                              material.type === 'lesson' ? <><ClipboardList className="w-3 h-3 inline mr-1" />Lesson</> :
                              material.type === 'worksheet' ? <><FileText className="w-3 h-3 inline mr-1" />Worksheet</> :
                              material.type === 'game' ? <><Gamepad2 className="w-3 h-3 inline mr-1" />Game</> :
                              material.type === 'flashcard' ? <><FileImage className="w-3 h-3 inline mr-1" />Flashcards</> :
                              material.type
                            }
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-gray-500 mb-1">{material.unit}</p>
                          <h4 className="text-sm font-medium mb-2">{material.title}</h4>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">
                                {material.language}
                              </span>
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                {material.level}
                              </span>
                            </div>
                            <button className="text-primary hover:text-primary/80">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline">
                      Load More Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Curriculum Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Plus className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">New Intermediate Lesson Pack Added</p>
                        <p className="text-sm text-gray-600">15 new lessons covering daily conversations and cultural topics</p>
                        <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Updated Beginner Worksheets</p>
                        <p className="text-sm text-gray-600">Improved exercises for numbers and basic greetings</p>
                        <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Gamepad2 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">New Interactive Games</p>
                        <p className="text-sm text-gray-600">5 new vocabulary games for all levels</p>
                        <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Feedback Tools Section */}
          {activeSection === 'feedback' && (
            <div className="space-y-8">
              {/* Quick Feedback Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Student Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Student</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Choose a student...</option>
                        {allStudents.map(student => (
                          <option key={student.id} value={student.id}>{student.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Feedback Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select type...</option>
                        <option value="lesson">Lesson Feedback</option>
                        <option value="progress">Progress Update</option>
                        <option value="achievement">Achievement</option>
                        <option value="concern">Area of Concern</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Feedback Message</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      placeholder="Enter your feedback here..."
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="primary">
                      <Send className="w-4 h-4 mr-2" />
                      Send Feedback
                    </Button>
                    <Button variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Templates */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Feedback Templates</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feedbackTemplates.map((template) => (
                      <div key={template.id} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-medium mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">Type: {template.type}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Use
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Feedback History */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Amara Johnson - Weekly Progress</h4>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-600">Great progress this week! Completed all exercises...</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Kofi Mensah - Achievement</h4>
                          <span className="text-sm text-gray-500">Yesterday</span>
                        </div>
                        <p className="text-sm text-gray-600">Completed beginner level! Ready for intermediate...</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Resource Library Section */}
          {activeSection === 'resources' && (
            <div className="space-y-8">
              {/* Resource Search */}
              <Card>
                <CardHeader>
                  <CardTitle>Browse Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search resources..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>All Types</option>
                      <option>Videos</option>
                      <option>Worksheets</option>
                      <option>Games</option>
                      <option>Audio</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>All Languages</option>
                      <option>Yoruba</option>
                      <option>Kiswahili</option>
                      <option>Twi</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <Video className="w-8 h-8 text-red-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Introduction to Yoruba Tones</h4>
                          <p className="text-sm text-gray-600">Video • 15 mins</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Perfect for beginners learning tonal pronunciation</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">Beginner</span>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <FileText className="w-8 h-8 text-green-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Family Vocabulary Worksheet</h4>
                          <p className="text-sm text-gray-600">PDF • 5 pages</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Practice family member names with exercises</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">All Levels</span>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <Gamepad2 className="w-8 h-8 text-purple-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Number Match Game</h4>
                          <p className="text-sm text-gray-600">Interactive • Online</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Fun way to practice numbers 1-100</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">Intermediate</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My Saved Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>My Saved Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-medium">12</p>
                      <p className="text-sm text-gray-600">Lesson Plans</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <FileText className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <p className="font-medium">24</p>
                      <p className="text-sm text-gray-600">Worksheets</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Video className="w-8 h-8 text-coral mx-auto mb-2" />
                      <p className="font-medium">8</p>
                      <p className="text-sm text-gray-600">Videos</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Gamepad2 className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="font-medium">15</p>
                      <p className="text-sm text-gray-600">Games</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Performance Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="space-y-8">
              {/* Teaching Statistics */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Teaching Statistics</CardTitle>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                      <option>This Year</option>
                      <option>All Time</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-blue-600">856</p>
                      <p className="text-sm text-gray-600">Total Lessons</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-green-600">98%</p>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-purple-600">4.9</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-orange-600">47</p>
                      <p className="text-sm text-gray-600">Total Students</p>
                    </div>
                  </div>

                  {/* Performance Chart Placeholder */}
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Performance charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Student Progress Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Student</th>
                          <th className="text-left py-3 px-4">Lessons</th>
                          <th className="text-left py-3 px-4">Progress</th>
                          <th className="text-left py-3 px-4">Improvement</th>
                          <th className="text-left py-3 px-4">Engagement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allStudents.slice(0, 3).map((student) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                  <span className="text-xs font-medium">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="font-medium">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{student.lessons}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-secondary h-2 rounded-full"
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-green-600">+15%</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">High</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Account Settings Section */}
          {activeSection === 'settings' && (
            <div className="space-y-8">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={educatorData.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue="adunni@ispeaklanguage.org"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={educatorData.title}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      placeholder="Tell students about yourself..."
                    />
                  </div>
                  <div className="mt-6">
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Time Zone</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Pacific Time (PT)</option>
                      </select>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Regular Weekly Schedule</h4>
                      <div className="space-y-2">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">{day}</span>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked={day !== 'Sunday'} className="mr-2" />
                              <input type="time" defaultValue="09:00" className="px-2 py-1 border rounded" />
                              <span>to</span>
                              <input type="time" defaultValue="17:00" className="px-2 py-1 border rounded" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications about lessons and updates</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">SMS Reminders</p>
                        <p className="text-sm text-gray-600">Get text reminders 15 minutes before lessons</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">New Student Alerts</p>
                        <p className="text-sm text-gray-600">Be notified when new students book lessons</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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