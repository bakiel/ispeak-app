'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Trophy, 
  Star, 
  Gift, 
  Target,
  TrendingUp,
  Award,
  Users,
  Heart,
  BookOpen,
  DollarSign,
  Zap,
  Crown,
  ChevronRight,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'

export default function LoyaltyProgramPage() {
  const [selectedTier, setSelectedTier] = useState(1)

  const tiers = [
    {
      id: 0,
      name: 'Starter',
      pointsRequired: 0,
      color: 'bg-gray-500',
      benefits: [
        'Earn 5 points per lesson',
        'Access to basic rewards',
        'Birthday bonus points',
        'Monthly newsletter with tips',
      ],
    },
    {
      id: 1,
      name: 'Explorer',
      pointsRequired: 100,
      color: 'bg-secondary',
      benefits: [
        'Earn 7 points per lesson',
        'Access to Explorer rewards',
        '5% off Paji Shop purchases',
        'Priority customer support',
        'Quarterly cultural activity pack',
      ],
    },
    {
      id: 2,
      name: 'Champion',
      pointsRequired: 500,
      color: 'bg-accent',
      benefits: [
        'Earn 10 points per lesson',
        'Access to all rewards',
        '10% off Paji Shop purchases',
        'Free monthly bonus lesson',
        'Exclusive cultural events access',
        'Champion certificate',
      ],
    },
    {
      id: 3,
      name: 'Ambassador',
      pointsRequired: 1000,
      color: 'bg-primary',
      benefits: [
        'Earn 15 points per lesson',
        'VIP rewards access',
        '15% off Paji Shop purchases',
        'Two free monthly bonus lessons',
        'Personal learning coordinator',
        'Ambassador welcome package',
        'Refer-a-friend super bonus',
      ],
    },
  ]

  const rewards = [
    {
      category: 'Lessons & Learning',
      items: [
        { name: 'Extra 15-minute lesson extension', points: 50, tier: 0 },
        { name: 'One free bonus lesson', points: 150, tier: 1 },
        { name: 'Choose your educator for next lesson', points: 100, tier: 1 },
        { name: 'Private group lesson (up to 3 friends)', points: 300, tier: 2 },
        { name: 'Full month subscription upgrade', points: 500, tier: 2 },
      ],
    },
    {
      category: 'Paji Shop Discounts',
      items: [
        { name: '10% off any Paji Shop purchase', points: 75, tier: 0 },
        { name: '25% off any Paji Shop purchase', points: 150, tier: 1 },
        { name: 'Free shipping on Paji Shop order', points: 100, tier: 1 },
        { name: '$10 Paji Shop gift card', points: 200, tier: 2 },
        { name: '$25 Paji Shop gift card', points: 400, tier: 2 },
      ],
    },
    {
      category: 'Special Experiences',
      items: [
        { name: 'Virtual cultural cooking class', points: 250, tier: 1 },
        { name: 'Personalized progress certificate', points: 100, tier: 0 },
        { name: 'Name pronunciation recording by educator', points: 150, tier: 1 },
        { name: 'Virtual tour of African landmark', points: 300, tier: 2 },
        { name: 'Guest spot in iSPEAK success story', points: 500, tier: 3 },
      ],
    },
    {
      category: 'Digital Rewards',
      items: [
        { name: 'Exclusive wallpaper pack', points: 25, tier: 0 },
        { name: 'Digital achievement badges', points: 50, tier: 0 },
        { name: 'Custom Zoom background', points: 75, tier: 1 },
        { name: 'Printable certificate templates', points: 100, tier: 1 },
        { name: 'Access to premium learning games', points: 200, tier: 2 },
      ],
    },
  ]

  const earnMethods = [
    { action: 'Complete a lesson', points: '5-15', description: 'Points vary by loyalty tier' },
    { action: 'Perfect attendance (week)', points: '25', description: 'Attend all scheduled lessons' },
    { action: 'Perfect attendance (month)', points: '100', description: 'Don\'t miss a single lesson' },
    { action: 'Refer a friend who enrolls', points: '200', description: 'When they complete first month' },
    { action: 'Leave a review', points: '50', description: 'Share your experience' },
    { action: 'Social media share', points: '25', description: 'Share your progress' },
    { action: 'Complete proficiency milestone', points: '150', description: 'Advance to next level' },
    { action: 'Birthday bonus', points: '100', description: 'Celebrate with us!' },
  ]

  const faqs: AccordionItem[] = [
    {
      id: '1',
      title: 'How do I join the Loyalty Program?',
      content: 'Every iSPEAK student is automatically enrolled in our Loyalty Program! You start earning points from your very first lesson. There\'s no additional sign-up required - just attend your lessons and watch your points grow.',
    },
    {
      id: '2',
      title: 'Do my points expire?',
      content: 'Points remain active as long as you have at least one lesson every 90 days. If you need to take a break, just let us know and we can pause your account to preserve your points. Points earned never expire for active Ambassador tier members.',
    },
    {
      id: '3',
      title: 'Can I share points with family members?',
      content: 'Yes! Families with multiple students can pool their points together. This means siblings can combine their points to redeem bigger rewards faster. Contact our support team to link family accounts.',
    },
    {
      id: '4',
      title: 'How do loyalty tiers work?',
      content: 'You automatically advance to higher tiers as you accumulate lifetime points. Each tier unlocks better earning rates and exclusive rewards. Once you reach a tier, you keep it for 12 months even if you redeem points. After 12 months, your tier is reviewed based on points earned in the past year.',
    },
    {
      id: '5',
      title: 'What happens to my points if I change my subscription?',
      content: 'Your points stay with you regardless of subscription changes! Whether you upgrade, downgrade, or even pause your subscription, your points balance and tier status remain intact.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-secondary py-16 md:py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              iSPEAK Loyalty Program
            </h1>
            <p className="text-lg md:text-xl text-white">
              Every lesson brings rewards! Earn points, unlock exclusive benefits, and celebrate 
              your language learning journey with special perks designed just for our dedicated learners.
            </p>
          </div>
          {/* Paji Mascot */}
          <div className="absolute bottom-0 right-0 hidden lg:block">
            <Image
              src="/images/logo/iSpeak Mascot.png"
              alt="Paji Mascot"
              width={150}
              height={150}
              className="opacity-20 transform translate-x-1/4 translate-y-1/4"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">1. Learn & Earn</h3>
              <p className="text-gray-600">
                Attend lessons, complete milestones, and engage with our community to earn points automatically
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">2. Level Up</h3>
              <p className="text-gray-600">
                Progress through tiers to unlock better rewards and earn points faster with each lesson
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-coral" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">3. Redeem Rewards</h3>
              <p className="text-gray-600">
                Exchange your points for free lessons, Paji Shop discounts, exclusive experiences, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Loyalty Tiers
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Advance through tiers to unlock better rewards and earning rates
            </p>

            {/* Tier Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedTier === tier.id
                      ? `${tier.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {tier.id === 3 && <Crown className="w-5 h-5 mr-2" />}
                    {tier.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Tier Details */}
            <Card className="mb-8">
              <CardHeader className={`${tiers[selectedTier].color} text-white`}>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    {selectedTier === 3 && <Crown className="w-6 h-6 mr-2" />}
                    {tiers[selectedTier].name} Tier
                  </span>
                  <span className="text-sm font-normal">
                    {tiers[selectedTier].pointsRequired > 0 && 
                      `${tiers[selectedTier].pointsRequired}+ lifetime points`
                    }
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <h4 className="font-bold mb-4">Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tiers[selectedTier].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Example */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold mb-4">Your Progress</h4>
              <div className="space-y-4">
                {tiers.map((tier, index) => (
                  <div key={tier.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{tier.name}</span>
                      <span className="text-sm text-gray-600">
                        {tier.pointsRequired} points
                      </span>
                    </div>
                    <ProgressBar 
                      value={index <= 1 ? 100 : index === 2 ? 45 : 0} 
                      variant="primary"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-gray-600">
                <Link href="/student/dashboard" className="text-primary hover:text-primary/80">
                  Log in to see your actual progress →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Earn Points */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
              Ways to Earn Points
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earnMethods.map((method, index) => (
                <Card key={index} hover="lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold mb-2">{method.action}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <span className="text-2xl font-bold text-secondary">{method.points}</span>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Catalog */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Rewards Catalog
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Redeem your hard-earned points for these exciting rewards
          </p>

          {rewards.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="font-heading text-2xl font-bold mb-6">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <Card 
                    key={itemIndex} 
                    className={item.tier > selectedTier ? 'opacity-60' : ''}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{item.name}</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${tiers[item.tier].color}`} />
                            {tiers[item.tier].name} tier+
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <span className="text-xl font-bold text-primary">{item.points}</span>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            Special Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card hover="lift">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl mb-3">Family Points Pooling</h3>
                <p className="text-gray-600 mb-4">
                  Combine points across all family members to redeem bigger rewards faster
                </p>
                <Button href="/contact" variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card hover="lift">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl mb-3">Double Points Days</h3>
                <p className="text-gray-600 mb-4">
                  Special days throughout the year where you earn double points on all activities
                </p>
                <Button href="/contact" variant="outline" size="sm">
                  View Calendar
                </Button>
              </CardContent>
            </Card>

            <Card hover="lift">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-coral mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl mb-3">Charity Points</h3>
                <p className="text-gray-600 mb-4">
                  Donate your points to provide free lessons for underprivileged children
                </p>
                <Button href="/contact" variant="outline" size="sm">
                  Donate Points
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Start Earning Rewards Today!
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join iSPEAK and automatically start earning points from your very first lesson. 
            The more you learn, the more you earn!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/register" variant="accent" size="lg">
              Start Your Journey
            </Button>
            <Button href="/pricing" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              View Plans
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}