'use server'

import axios from 'axios'

import { Ticker } from './types'

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace GetTopHNPosts {
  export interface Response {
    exhaustive: Exhaustive
    exhaustiveNbHits: boolean
    exhaustiveTypo: boolean
    hits: Hit[]
    hitsPerPage: number
    nbHits: number
    nbPages: number
    page: number
    params: string
    processingTimeMS: number
    processingTimingsMS: ProcessingTimingsMs
    query: string
    serverTimeMS: number
  }

  interface Exhaustive {
    nbHits: boolean
    typo: boolean
  }

  interface Hit {
    _highlightResult: HighlightResult
    _tags: string[]
    author: string
    children: number[]
    created_at: string
    created_at_i: number
    num_comments: number
    objectID: string
    points: number
    story_id: number
    title: string
    updated_at: string
    url: string
    story_text?: string
  }

  interface HighlightResult {
    author: Author
    title: Title
    url: Url
    story_text?: StoryText
  }

  interface Author {
    matchLevel: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchedWords: any[]
    value: string
  }

  interface Title {
    matchLevel: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchedWords: any[]
    value: string
  }

  interface Url {
    matchLevel: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchedWords: any[]
    value: string
  }

  interface StoryText {
    matchLevel: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchedWords: any[]
    value: string
  }

  interface ProcessingTimingsMs {
    _request: Request
  }

  interface Request {
    queue: number
    roundTrip: number
  }
}

export async function getTopHNPosts(): Promise<Ticker.Item[]> {
  try {
    const response = await axios.get<GetTopHNPosts.Response>(
      'http://hn.algolia.com/api/v1/search?tags=front_page&numericFilters=points>150',
    )

    // Sort by points in descending order and take the top 5
    const sortedHits = response.data.hits.sort((a, b) => b.points - a.points)
    const top5Hits = sortedHits.slice(0, 5)

    return top5Hits.map((hit) => ({
      id: hit.objectID,
      type: Ticker.ContentType.HN,
      title: hit.title,
      url: hit.url,
    }))
  } catch (error) {
    console.error('Error fetching top HN posts:', error)
    throw new Error('Failed to fetch top HN posts')
  }
}
