'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function GamesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedGame, setSelectedGame] = useState(null)

  const languages = [
    { 
      id: 'yoruba', 
      name: 'Yoruba', 
      code: 'YO',
      color: 'yellow',
      greeting: 'Ẹ káàbọ̀!',
      description: 'Learn Yoruba through fun games'
    },
    { 
      id: 'kiswahili', 
      name: 'Kiswahili', 
      code: 'KS',
      color: 'teal',
      greeting: 'Karibu!',
      description: 'Play and learn Kiswahili'
    },
    { 
      id: 'twi', 
      name: 'Twi', 
      code: 'TW',
      color: 'blue',
      greeting: 'Akwaaba!',
      description: 'Discover Twi through games'
    },
    { 
      id: 'amharic', 
      name: 'Amharic', 
      code: 'AM',
      color: 'purple',
      greeting: 'እንኳን ደህና መጡ!',
      description: 'Coming soon!'
    }
  ]

  const games = [
    {
      id: 'counting',
      name: 'Number Match',
      icon: '🔢',
      description: 'Match numbers with their pronunciations',
      available: true
    },
    {
      id: 'greetings',
      name: 'Greeting Game',
      icon: '👋',
      description: 'Learn how to greet in different situations',
      available: true
    },
    {
      id: 'colors',
      name: 'Color Quest',
      icon: '🎨',
      description: 'Identify colors in the language',
      available: true
    },
    {
      id: 'animals',
      name: 'Animal Safari',
      icon: '🦁',
      description: 'Learn animal names through matching',
      available: true
    }
  ]

  const resetToHome = () => {
    setSelectedLanguage(null)
    setSelectedGame(null)
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="hero-pattern relative">
          <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
          <div className="container mx-auto px-4 py-10 md:py-16 lg:py-20 relative z-10">
            <div className="text-center text-white">
              <h5 className="text-yellow-300 font-semibold tracking-wide mb-2 text-sm md:text-base">
                FUN LEARNING FOR AGES 3-14
              </h5>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                iSPEAK LANGUAGE GAMES
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto">
                Make language learning an adventure! Practice Yoruba, Kiswahili, and Twi through 
                interactive games designed to build vocabulary and confidence.
              </p>
              <div className="flex justify-center items-center space-x-8">
                <img 
                  src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png" 
                  alt="Paji mascot" 
                  className="w-20 h-20 md:w-24 md:h-24 float-animation"
                />
                <div className="space-y-2">
                  <div className="flex space-x-4 justify-center">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-medium">
                      <i className="fas fa-gamepad mr-2"></i>4 Game Types
                    </span>
                    <span className="bg-teal-400 text-gray-900 px-4 py-2 rounded-full font-medium">
                      <i className="fas fa-language mr-2"></i>3 Languages
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm">Free to play • No signup required</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Language Selection */}
        {!selectedLanguage && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-10">
                Choose Your Language Adventure
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => lang.id !== 'amharic' && setSelectedLanguage(lang)}
                    disabled={lang.id === 'amharic'}
                    className={`group transform transition-all duration-300 hover:-translate-y-2 ${
                      lang.id === 'amharic' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <div className="language-card bg-white rounded-xl shadow-md overflow-hidden h-full">
                      <div className={`bg-${lang.color}-${lang.color === 'yellow' ? '400' : '500'} p-6 text-${lang.color === 'yellow' ? 'gray-900' : 'white'} relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
                        <div className="relative z-10">
                          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold">{lang.code}</span>
                          </div>
                          <h3 className="text-xl font-bold mt-3">{lang.name}</h3>
                          <p className="text-base mt-1 opacity-90">{lang.greeting}</p>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 text-sm">{lang.description}</p>
                        {lang.id === 'amharic' ? (
                          <span className="inline-block mt-4 px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-medium">
                            Coming Soon
                          </span>
                        ) : (
                          <div className="mt-4 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            <span>Start Playing</span>
                            <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Game Selection */}
        {selectedLanguage && !selectedGame && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <button
                onClick={resetToHome}
                className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Languages
              </button>
              
              <h2 className="text-3xl font-bold text-center mb-4">
                {selectedLanguage.name} Games
              </h2>
              <p className="text-center text-gray-600 mb-10">
                Select a game to start learning!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="value-card bg-white rounded-xl shadow-md p-6 group"
                  >
                    <div className="flex items-start">
                      <div className={`w-16 h-16 bg-${selectedLanguage.color}-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                        <span className="text-3xl">{game.icon}</span>
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold mb-1">{game.name}</h3>
                        <p className="text-gray-600 text-sm">{game.description}</p>
                        <div className="mt-3 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          <span>Play Now</span>
                          <i className="fas fa-play-circle ml-2 transition-transform group-hover:translate-x-1"></i>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Game Area */}
        {selectedGame && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <button
                onClick={() => setSelectedGame(null)}
                className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Games
              </button>
              
              <div className="bg-white rounded-lg shadow-xl p-8">
                <GameComponent 
                  language={selectedLanguage} 
                  gameType={selectedGame.id} 
                />
              </div>
            </div>
          </section>
        )}

        {/* Paji Mascot */}
        <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
          <img 
            src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png" 
            alt="Paji mascot" 
            className="w-24 h-24 float-animation"
          />
        </div>
      </main>
      
      <Footer />
    </>
  )
}

// Game Component
function GameComponent({ language, gameType }) {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const gameData = {
    yoruba: {
      counting: [
        { number: 1, word: 'ọ̀kan', audio: 'one' },
        { number: 2, word: 'èjì', audio: 'two' },
        { number: 3, word: 'ẹ̀ta', audio: 'three' },
        { number: 4, word: 'ẹ̀rin', audio: 'four' },
        { number: 5, word: 'àrùn', audio: 'five' }
      ],
      greetings: [
        { english: 'Good morning', word: 'Ẹ káàárọ̀', context: 'Morning greeting' },
        { english: 'Good afternoon', word: 'Ẹ káàsán', context: 'Afternoon greeting' },
        { english: 'Good evening', word: 'Ẹ káalẹ́', context: 'Evening greeting' },
        { english: 'Welcome', word: 'Ẹ káàbọ̀', context: 'Welcoming someone' }
      ],
      colors: [
        { color: '#FF0000', word: 'pupa', english: 'red' },
        { color: '#0000FF', word: 'búlúù', english: 'blue' },
        { color: '#FFFF00', word: 'àwo òfèèfèé', english: 'yellow' },
        { color: '#00FF00', word: 'àwo ewé', english: 'green' }
      ],
      animals: [
        { icon: 'fa-lion', word: 'kìnìún', english: 'lion', color: '#FFA500' },
        { icon: 'fa-elephant', word: 'erin', english: 'elephant', color: '#808080' },
        { icon: 'fa-snake', word: 'ejò', english: 'snake', color: '#228B22' },
        { icon: 'fa-dove', word: 'ẹyẹ', english: 'bird', color: '#87CEEB' }
      ]
    },
    kiswahili: {
      counting: [
        { number: 1, word: 'moja', audio: 'one' },
        { number: 2, word: 'mbili', audio: 'two' },
        { number: 3, word: 'tatu', audio: 'three' },
        { number: 4, word: 'nne', audio: 'four' },
        { number: 5, word: 'tano', audio: 'five' }
      ],
      greetings: [
        { english: 'Hello', word: 'Jambo', context: 'General greeting' },
        { english: 'Good morning', word: 'Habari ya asubuhi', context: 'Morning greeting' },
        { english: 'Welcome', word: 'Karibu', context: 'Welcoming someone' },
        { english: 'How are you?', word: 'Habari yako?', context: 'Asking wellbeing' }
      ],
      colors: [
        { color: '#FF0000', word: 'nyekundu', english: 'red' },
        { color: '#0000FF', word: 'buluu', english: 'blue' },
        { color: '#FFFF00', word: 'manjano', english: 'yellow' },
        { color: '#00FF00', word: 'kijani', english: 'green' }
      ],
      animals: [
        { icon: 'fa-lion', word: 'simba', english: 'lion', color: '#FFA500' },
        { icon: 'fa-elephant', word: 'tembo', english: 'elephant', color: '#808080' },
        { icon: 'fa-horse', word: 'twiga', english: 'giraffe', color: '#D2691E' },
        { icon: 'fa-horse-head', word: 'punda milia', english: 'zebra', color: '#000000' }
      ]
    },
    twi: {
      counting: [
        { number: 1, word: 'baako', audio: 'one' },
        { number: 2, word: 'mmienu', audio: 'two' },
        { number: 3, word: 'mmiɛnsa', audio: 'three' },
        { number: 4, word: 'nnan', audio: 'four' },
        { number: 5, word: 'nnum', audio: 'five' }
      ],
      greetings: [
        { english: 'Good morning', word: 'Mema wo akye', context: 'Morning greeting' },
        { english: 'Good afternoon', word: 'Mema wo aha', context: 'Afternoon greeting' },
        { english: 'Welcome', word: 'Akwaaba', context: 'Welcoming someone' },
        { english: 'How are you?', word: 'Wo ho te sɛn?', context: 'Asking wellbeing' }
      ],
      colors: [
        { color: '#FF0000', word: 'kɔkɔɔ', english: 'red' },
        { color: '#000000', word: 'tuntum', english: 'black' },
        { color: '#FFFFFF', word: 'fitaa', english: 'white' },
        { color: '#00FF00', word: 'ahabammono', english: 'green' }
      ],
      animals: [
        { icon: 'fa-lion', word: 'gyata', english: 'lion', color: '#FFA500' },
        { icon: 'fa-elephant', word: 'ɔsono', english: 'elephant', color: '#808080' },
        { icon: 'fa-otter', word: 'kwadu', english: 'monkey', color: '#8B4513' },
        { icon: 'fa-snake', word: 'ɔwɔ', english: 'snake', color: '#228B22' }
      ]
    }
  }

  const currentData = gameData[language.id]?.[gameType] || []
  const question = currentData[currentQuestion]

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    if (answer === question.word) {
      setScore(score + 1)
    }
    setShowResult(true)
    
    setTimeout(() => {
      if (currentQuestion < currentData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setShowResult(false)
        setSelectedAnswer(null)
      } else {
        // Game complete
        alert(`Game Complete! Your score: ${score + (answer === question.word ? 1 : 0)}/${currentData.length}`)
      }
    }, 1500)
  }

  const renderGame = () => {
    if (!question) return <div>Loading...</div>

    switch (gameType) {
      case 'counting':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">Match the Number</h3>
            <div className="text-8xl mb-8">{question.number}</div>
            <div className="grid grid-cols-2 gap-4">
              {currentData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(item.word)}
                  disabled={showResult}
                  className={`p-4 rounded-lg text-xl font-bold transition-all ${
                    showResult && item.word === question.word
                      ? 'bg-green-500 text-white'
                      : showResult && selectedAnswer === item.word
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        )

      case 'greetings':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">How do you say:</h3>
            <p className="text-3xl mb-2">"{question.english}"</p>
            <p className="text-gray-600 mb-8">({question.context})</p>
            <div className="space-y-4">
              {currentData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(item.word)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-xl transition-all ${
                    showResult && item.word === question.word
                      ? 'bg-green-500 text-white'
                      : showResult && selectedAnswer === item.word
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        )

      case 'colors':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">What color is this?</h3>
            <div 
              className="w-32 h-32 mx-auto mb-8 rounded-lg shadow-lg"
              style={{ backgroundColor: question.color }}
            ></div>
            <div className="grid grid-cols-2 gap-4">
              {currentData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(item.word)}
                  disabled={showResult}
                  className={`p-4 rounded-lg text-xl font-bold transition-all ${
                    showResult && item.word === question.word
                      ? 'bg-green-500 text-white'
                      : showResult && selectedAnswer === item.word
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        )

      case 'animals':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">What animal is this?</h3>
            <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: question.color + '20' }}>
              <i className={`fas ${question.icon} text-6xl`} style={{ color: question.color }}></i>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(item.word)}
                  disabled={showResult}
                  className={`p-4 rounded-lg text-xl font-bold transition-all ${
                    showResult && item.word === question.word
                      ? 'bg-green-500 text-white'
                      : showResult && selectedAnswer === item.word
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Game not found</div>
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          {language.name} - {gameType.charAt(0).toUpperCase() + gameType.slice(1)} Game
        </h2>
        <div className="text-xl font-bold">
          Score: {score}/{currentData.length}
        </div>
      </div>
      
      {renderGame()}
      
      <div className="mt-8 text-center">
        <div className="text-gray-600">
          Question {currentQuestion + 1} of {currentData.length}
        </div>
      </div>
    </div>
  )
}