'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

type Step = 'email' | 'success'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<Step>('email')
  const [resendTimer, setResendTimer] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate email
    if (!email) {
      setError('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In production, this would send an actual reset email
      setStep('success')
      
      // Start resend timer (60 seconds)
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset timer
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError('Failed to resend email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo/iSpeak Logo.png"
              alt="iSPEAK Logo"
              width={120}
              height={40}
              className="mx-auto mb-4"
            />
          </Link>
          {step === 'email' ? (
            <>
              <h1 className="text-3xl font-heading font-bold text-primary">Forgot Your Password?</h1>
              <p className="text-gray-600 mt-2">
                No worries! Enter your email address and we'll send you instructions to reset your password.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-primary">Check Your Email</h1>
              <p className="text-gray-600 mt-2">
                We've sent password reset instructions to:
              </p>
              <p className="font-medium text-primary mt-1">{email}</p>
            </>
          )}
        </div>

        {/* Reset Card */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            {step === 'email' ? (
              <>
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        required
                        autoFocus
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Enter the email address associated with your iSPEAK account.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="secondary"
                    fullWidth
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-secondary hover:text-secondary/80 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Success Message */}
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900 mb-2">Email Sent Successfully!</h3>
                    <p className="text-sm text-green-700">
                      If an account exists with the email <span className="font-medium">{email}</span>, 
                      you will receive password reset instructions shortly.
                    </p>
                  </div>

                  {/* Instructions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">What to do next:</h4>
                    <ol className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="font-medium mr-2">1.</span>
                        Check your email inbox for a message from iSPEAK
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium mr-2">2.</span>
                        Click the reset link in the email (valid for 1 hour)
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium mr-2">3.</span>
                        Create a new secure password
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium mr-2">4.</span>
                        Sign in with your new password
                      </li>
                    </ol>
                  </div>

                  {/* Didn't receive email */}
                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600">
                      Didn't receive the email? Check your spam folder or
                    </p>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResend}
                      disabled={loading || resendTimer > 0}
                      className="mx-auto"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </div>
                      ) : resendTimer > 0 ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Resend in {resendTimer}s
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Resend Email
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Return to Login */}
                  <div className="pt-4 border-t">
                    <Button
                      href="/login"
                      variant="secondary"
                      fullWidth
                      size="lg"
                    >
                      Return to Login
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link href="/contact" className="text-secondary hover:text-secondary/80 transition-colors">
              Contact Support
            </Link>
          </p>
        </div>

        {/* Security Note */}
        {step === 'email' && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              <strong>Security Tip:</strong> We will never ask for your password via email. 
              Always reset your password through our secure website.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}