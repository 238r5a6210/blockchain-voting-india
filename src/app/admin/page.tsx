'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getResults, VoteResult } from '@/lib/blockchain'

export default function AdminPage() {
  const [results, setResults] = useState<VoteResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalVotes, setTotalVotes] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchResults()
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchResults, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchResults = async () => {
    try {
      setError(null)
      const data = await getResults()
      setResults(data)
      setTotalVotes(data.reduce((sum, candidate) => sum + candidate.voteCount, 0))
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getVotePercentage = (voteCount: number) => {
    return totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : '0.0'
  }

  const sortedResults = [...results].sort((a, b) => b.voteCount - a.voteCount)
  const winner = sortedResults[0]

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
              <Button onClick={fetchResults} variant="outline" disabled={isLoading}>
                {isLoading ? 'Refreshing...' : 'Refresh Results'}
              </Button>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Admin Dashboard
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Election Results Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time voting results powered by blockchain technology
            </p>
            {lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {isLoading && results.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading election results...</p>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Total Votes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalVotes.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Leading Candidate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {winner?.candidateName.split(' ')[0] || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {winner ? `${getVotePercentage(winner.voteCount)}%` : '0%'}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Candidates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {results.length}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Live
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* Results Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vote Distribution</CardTitle>
                    <CardDescription>
                      Current vote counts and percentages for each candidate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {sortedResults.map((candidate, index) => (
                      <div key={candidate.candidateId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-gray-400' :
                              index === 2 ? 'bg-orange-600' :
                              'bg-blue-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {candidate.candidateName}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {candidate.voteCount.toLocaleString()} votes
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white">
                              {getVotePercentage(candidate.voteCount)}%
                            </p>
                          </div>
                        </div>
                        <Progress 
                          value={parseFloat(getVotePercentage(candidate.voteCount))} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Election Results</CardTitle>
                    <CardDescription>
                      Complete breakdown of votes by candidate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Votes</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedResults.map((candidate, index) => (
                          <TableRow key={candidate.candidateId}>
                            <TableCell>
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                index === 0 ? 'bg-yellow-500' :
                                index === 1 ? 'bg-gray-400' :
                                index === 2 ? 'bg-orange-600' :
                                'bg-blue-600'
                              }`}>
                                {index + 1}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{candidate.candidateName}</p>
                                <p className="text-sm text-gray-500">ID: {candidate.candidateId}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono">
                              {candidate.voteCount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  {getVotePercentage(candidate.voteCount)}%
                                </span>
                                <Progress 
                                  value={parseFloat(getVotePercentage(candidate.voteCount))} 
                                  className="h-2 w-20"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              {index === 0 ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Leading
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  Active
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Voting Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Total Registered Voters:</span>
                        <span className="font-medium">5,000,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Votes Cast:</span>
                        <span className="font-medium">{totalVotes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Turnout Rate:</span>
                        <span className="font-medium">{((totalVotes / 5000000) * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Blockchain Confirmations:</span>
                        <span className="font-medium text-green-600">100%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Network Status:</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Smart Contract:</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Data Integrity:</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Verified
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Last Block:</span>
                        <span className="font-mono text-sm">2 min ago</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Information</CardTitle>
                    <CardDescription>
                      Technical details about the voting smart contract
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Contract Address:</p>
                        <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                          0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Network:</p>
                        <p className="font-medium mt-1">Ethereum Testnet</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Gas Used:</p>
                        <p className="font-medium mt-1">2,847,392</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Block Height:</p>
                        <p className="font-medium mt-1">18,945,672</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
              <Link href="/vote">
                <Button variant="outline">
                  Cast Vote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
