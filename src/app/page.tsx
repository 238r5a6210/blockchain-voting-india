import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Blockchain Voting System
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/vote" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Vote
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Register
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Results
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Secure Digital Voting
            <span className="block text-blue-600 dark:text-blue-400">for India</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the future of democratic participation with our blockchain-powered voting system. 
            Transparent, secure, and tamper-proof elections for a digital India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vote">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Cast Your Vote
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3">
                Register to Vote
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://placehold.co/1200x600?text=Modern+blockchain+voting+interface+with+Indian+flag+colors+and+digital+democracy+elements" 
            alt="Modern blockchain voting interface showcasing digital democracy with Indian flag colors, secure voting symbols, and technological elements representing transparent elections"
            className="w-full h-auto"
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-green-600 rounded-full"></div>
              </div>
              <CardTitle className="text-xl">Secure & Transparent</CardTitle>
              <CardDescription>
                Every vote is recorded on the blockchain, ensuring complete transparency and preventing tampering.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-blue-600 rounded-full"></div>
              </div>
              <CardTitle className="text-xl">Real-time Results</CardTitle>
              <CardDescription>
                View live voting results as they happen, with instant updates from the blockchain network.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-purple-600 rounded-full"></div>
              </div>
              <CardTitle className="text-xl">Digital Identity</CardTitle>
              <CardDescription>
                Secure voter registration and verification using digital identity protocols and Aadhaar integration.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Register</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete your voter registration with Aadhaar verification
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Connect</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Connect your digital wallet to access the voting platform
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vote</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Cast your secure vote on the blockchain network
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Verify</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                View real-time results and verify your vote on the blockchain
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Participate?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join millions of Indians in shaping the future through secure digital voting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                View Results
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2024 Blockchain Voting System India. Powered by secure blockchain technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
