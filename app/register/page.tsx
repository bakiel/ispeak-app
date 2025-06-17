'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { User, Mail, Lock, Phone, Calendar, Eye, EyeOff, Globe, Check, ChevronRight, GraduationCap, Users } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<'parent' | 'educator'>('parent')
  
  const [formData, setFormData] = useState({
    // Parent/Guardian Info
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Child Info
    childFirstName: '',
    childLastName: '',
    childAge: '',
    languageInterest: '',
    currentLevel: '',
    
    // Additional Info
    timezone: '',
    preferredSchedule: '',
    goals: '',
    howHeard: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // TODO: Implement registration
      console.log('Registration:', { accountType, ...formData })
      router.push('/login')
    }
  }

  const goBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen hero-bg-secondary flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo/iSpeak Mascot.png"
              alt="iSPEAK Mascot"
              width={80}
              height={80}
            />
          </div>
          <CardTitle className="text-2xl font-heading">Create Your Account</CardTitle>
          <p className="text-gray-600 mt-2">
            Join thousands of families preserving their heritage through language
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                3
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Type & Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg mb-4">Step 1: Account Information</h3>
                
                {/* Account Type Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I am registering as a:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAccountType('parent')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        accountType === 'parent'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Parent/Guardian</span>
                      <p className="text-xs mt-1">Register a child for lessons</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType('educator')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        accountType === 'educator'
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <GraduationCap className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Educator</span>
                      <p className="text-xs mt-1">Apply to teach languages</p>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="parentFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="parentFirstName"
                        name="parentFirstName"
                        value={formData.parentFirstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="parentLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="parentLastName"
                        name="parentLastName"
                        value={formData.parentLastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Child Information (only for parents) */}
            {step === 2 && accountType === 'parent' && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg mb-4">Step 2: Child Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Child's First Name *
                    </label>
                    <input
                      type="text"
                      id="childFirstName"
                      name="childFirstName"
                      value={formData.childFirstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Child's Last Name *
                    </label>
                    <input
                      type="text"
                      id="childLastName"
                      name="childLastName"
                      value={formData.childLastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                      Child's Age *
                    </label>
                    <select
                      id="childAge"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select age</option>
                      {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(age => (
                        <option key={age} value={age}>{age} years old</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="languageInterest" className="block text-sm font-medium text-gray-700 mb-1">
                      Language of Interest *
                    </label>
                    <select
                      id="languageInterest"
                      name="languageInterest"
                      value={formData.languageInterest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select language</option>
                      <option value="yoruba">Yoruba</option>
                      <option value="kiswahili">Kiswahili</option>
                      <option value="twi">Twi</option>
                      <option value="amharic">Amharic (Coming Soon)</option>
                      <option value="undecided">Not sure yet</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currentLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Language Level *
                  </label>
                  <select
                    id="currentLevel"
                    name="currentLevel"
                    value={formData.currentLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="none">No prior knowledge</option>
                    <option value="basic">Basic (knows a few words/phrases)</option>
                    <option value="conversational">Conversational (can have simple conversations)</option>
                    <option value="intermediate">Intermediate (comfortable with most topics)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                    Learning Goals (Optional)
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="What would you like your child to achieve through these lessons?"
                  />
                </div>
              </div>
            )}
            
            {/* Step 2: Educator Information (only for educators) */}
            {step === 2 && accountType === 'educator' && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg mb-4">Step 2: Educator Application</h3>
                <div className="bg-accent/10 border-2 border-accent rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    Thank you for your interest in teaching with iSPEAK! We'll contact you within 48 hours 
                    to discuss the next steps in our educator onboarding process.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="languageInterest" className="block text-sm font-medium text-gray-700 mb-1">
                    Language(s) You Can Teach *
                  </label>
                  <select
                    id="languageInterest"
                    name="languageInterest"
                    value={formData.languageInterest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select language</option>
                    <option value="yoruba">Yoruba</option>
                    <option value="kiswahili">Kiswahili</option>
                    <option value="twi">Twi</option>
                    <option value="amharic">Amharic</option>
                    <option value="multiple">Multiple Languages</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Timezone *
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select timezone</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                    <option value="UTC+1">West Africa Time (UTC+1)</option>
                    <option value="UTC+3">East Africa Time (UTC+3)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Step 3: Additional Information */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg mb-4">Step 3: Final Details</h3>
                
                {accountType === 'parent' && (
                  <>
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Timezone *
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select timezone</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">West Africa Time (UTC+1)</option>
                        <option value="UTC+3">East Africa Time (UTC+3)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="preferredSchedule" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Lesson Schedule
                      </label>
                      <select
                        id="preferredSchedule"
                        name="preferredSchedule"
                        value={formData.preferredSchedule}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select preference</option>
                        <option value="weekday-morning">Weekday Mornings</option>
                        <option value="weekday-afternoon">Weekday Afternoons</option>
                        <option value="weekday-evening">Weekday Evenings</option>
                        <option value="weekend-morning">Weekend Mornings</option>
                        <option value="weekend-afternoon">Weekend Afternoons</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div>
                  <label htmlFor="howHeard" className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about iSPEAK?
                  </label>
                  <select
                    id="howHeard"
                    name="howHeard"
                    value={formData.howHeard}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select option</option>
                    <option value="google">Google Search</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="school">School/Organization</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-3 mt-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> *
                    </span>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Send me tips, updates, and special offers to help my child succeed
                    </span>
                  </label>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={goBack}>
                  Back
                </Button>
              ) : (
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800">
                  Already have an account?
                </Link>
              )}
              
              <Button type="submit" variant="primary">
                {step < 3 ? (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Complete Registration
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Free Trial Banner */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-medium">
          🎉 Get a FREE 15-minute trial lesson after registration!
        </div>
      </div>
    </div>
  )
}