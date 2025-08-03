'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  aadhaarNumber: z.string().regex(/^\d{12}$/, 'Aadhaar number must be exactly 12 digits'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Please select your gender'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  state: z.string().min(1, 'Please select your state'),
  constituency: z.string().min(1, 'Please select your constituency'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
})

type FormData = z.infer<typeof formSchema>

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
]

const constituencies = [
  'Lok Sabha Constituency 1', 'Lok Sabha Constituency 2', 'Lok Sabha Constituency 3',
  'Lok Sabha Constituency 4', 'Lok Sabha Constituency 5', 'Assembly Constituency A',
  'Assembly Constituency B', 'Assembly Constituency C'
]

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      aadhaarNumber: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      state: '',
      constituency: '',
      agreeToTerms: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setAlert(null)

    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Store registration data in localStorage (in real app, this would be sent to backend)
      const registrationData = {
        ...data,
        registrationId: `REG${Date.now()}`,
        registrationDate: new Date().toISOString(),
        status: 'verified'
      }

      localStorage.setItem('voterRegistration', JSON.stringify(registrationData))
      
      setIsRegistered(true)
      setAlert({ 
        type: 'success', 
        message: 'Registration successful! You are now eligible to vote.' 
      })
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: 'Registration failed. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Blockchain Voting System
              </h1>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-24 w-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-white border-l-0 border-t-0 rotate-45 transform origin-bottom-left"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your voter registration has been completed and verified. You can now participate in elections using our secure blockchain voting system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vote">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Cast Your Vote
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Blockchain Voting System
            </h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Voter Registration
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Register to participate in secure blockchain-based elections
            </p>
          </div>

          {alert && (
            <Alert className={`mb-6 ${
              alert.type === 'success' 
                ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                : 'border-red-200 bg-red-50 dark:bg-red-900/20'
            }`}>
              <AlertDescription className={
                alert.type === 'success' 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide accurate information for voter verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aadhaarNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhaar Number</FormLabel>
                          <FormControl>
                            <Input placeholder="12-digit Aadhaar number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your complete address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {indianStates.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="constituency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Constituency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your constituency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {constituencies.map((constituency) => (
                                <SelectItem key={constituency} value={constituency}>
                                  {constituency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions
                          </FormLabel>
                          <FormDescription>
                            By registering, you agree to our privacy policy and terms of service for the blockchain voting system.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Registering...</span>
                        </div>
                      ) : (
                        'Register to Vote'
                      )}
                    </Button>
                    <Link href="/">
                      <Button type="button" variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
