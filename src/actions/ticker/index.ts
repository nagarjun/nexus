'use server'

import { getTopHNPosts } from './getTopHNPosts'
import { Ticker } from './types'

export async function getTickerContent(): Promise<Ticker.Content> {
  const contentProviders = [
    getTopHNPosts,
    // Add more content provider functions here
  ]

  const results = await Promise.allSettled(contentProviders.map((provider) => provider()))

  return results.reduce((acc, result) => {
    if (result.status === 'fulfilled') {
      return [...acc, ...result.value]
    }
    console.error('Error fetching content:', result.reason)
    return acc
  }, [] as Ticker.Content)
}
