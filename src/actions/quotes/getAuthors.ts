'use server'

import { ComboboxOption } from '@/components/ui/combobox'

import { getPgClient } from '../../../lib/pg'

export async function getAuthors(): Promise<{
  success: boolean
  authors?: ComboboxOption[]
  message?: string
}> {
  const client = await getPgClient()

  try {
    const result = await client.query<{ id: string; name: string }>(
      `SELECT id, name FROM "quoteAuthors" ORDER BY name ASC`,
    )

    return {
      success: true,
      authors: result.rows.map((row) => ({
        value: row.id,
        label: row.name,
      })),
    }
  } catch (error) {
    console.error('Error fetching authors:', error)
    return {
      success: false,
      message: 'Failed to fetch authors',
      authors: [],
    }
  } finally {
    client.release()
  }
}
