'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { castVote, getCandidates, connectWallet, checkVotingStatus, markAsVoted } from '@/lib/blockchain'

interface Candidate {
  id: number
  name: string
  party: string
  symbol: string
}

export default function VotePage() {
  const [candidates] = useState<Candidate[]>(getCandidates())
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)

  useEffect(() => {
    checkWalletConnection()
  }, [])

  useEffect(() => {
    if (walletAddress) {
      checkIfVoted()
    }
  }, [walletAddress])

  const checkWalletConnection = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  const checkIfVoted = async () => {
    try {
      const voted = await checkVotingStatus(walletAddress)
      setHasVoted(voted)
    } catch (error) {
      console.error('Error checking voting status:', error)
    }
  }

  const handleConnectWallet = async () => {
    try {
      const { address } = await connectWallet()
      setWalletAddress(address)
      setIsConnected(true)
      setAlert({ type: 'success', message: 'Wallet connected successfully!' })
    } catch (error: any) {
      setAlert({ type: 'error', message: error.message })
    }
  }

  const handleVote = async (candidateId: number) => {
    if (!isConnected) {
      setAlert({ type: 'error', message: 'Please connect your wallet first' })
      return
    }

    if (hasVoted) {
      setAlert({ type: 'error', message: 'You have already voted!' })
      return
    }

    setIsVoting(true)
    setSelectedCandidate(candidateId)

    try {
      // In a real implementation, this would interact with the blockchain
      // For demo purposes, we'll simulate the voting process
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate blockchain transaction time
      
      markAsVoted(walletAddress)
      setHasVoted(true)
      setAlert({ 
        type: 'success', 
        message: `Vote cast successfully for ${candidates.find(c => c.id === candidateId)?.name}!` 
      })
    } catch (error: any) {
      setAlert({ type: 'error', message: error.message })
    } finally {
      setIsVoting(false)
      setSelectedCandidate(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Blockchain Voting System
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Connected
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              ) : (
                <Button onClick={handleConnectWallet} variant="outline">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cast Your Vote
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Select your preferred candidate for the upcoming election
            </p>
          </div>

          {alert && (
            <Alert className={`mb-6 ${
              alert.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' :
              alert.type === 'error' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
              'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
            }`}>
              <AlertDescription className={
                alert.type === 'success' ? 'text-green-800 dark:text-green-200' :
                alert.type === 'error' ? 'text-red-800 dark:text-red-200' :
                'text-blue-800 dark:text-blue-200'
              }>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          {!isConnected && (
            <Card className="mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-yellow-800 dark:text-yellow-200">
                  Wallet Connection Required
                </CardTitle>
                <CardDescription className="text-yellow-700 dark:text-yellow-300">
                  Please connect your digital wallet to participate in voting. This ensures the security and authenticity of your vote.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleConnectWallet} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          )}

          {hasVoted && (
            <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">
                  Vote Recorded Successfully
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Your vote has been securely recorded on the blockchain. Thank you for participating in the democratic process!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin">
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-300">
                    View Results
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className={`transition-all duration-200 hover:shadow-lg ${
                hasVoted ? 'opacity-60' : 'hover:scale-[1.02]'
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{candidate.name}</CardTitle>
                        <CardDescription className="text-base">
                          {candidate.party}
                        </CardDescription>
                        <Badge variant="outline" className="mt-1">
                          Symbol: {candidate.symbol}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleVote(candidate.id)}
                      disabled={!isConnected || hasVoted || isVoting}
                      className={`px-8 py-2 ${
                        isVoting && selectedCandidate === candidate.id
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {isVoting && selectedCandidate === candidate.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Voting...</span>
                        </div>
                      ) : hasVoted ? (
                        'Voted'
                      ) : (
                        'Vote'
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Your vote is secure, anonymous, and recorded on the blockchain for transparency.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">
                  View Results
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
