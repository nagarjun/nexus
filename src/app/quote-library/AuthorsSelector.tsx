'use client'

import { useEffect, useState } from 'react'

import { getAuthors } from '@/actions/quotes/getAuthors'
import { Combobox } from '@/components/ui/combobox'
import type { ComboboxOption } from '@/components/ui/combobox'

interface AuthorsSelectorProps {
  value?: ComboboxOption
  onSelect: (author: ComboboxOption | undefined) => void
  allowAddNew?: boolean
}

export function AuthorsSelector({ value, onSelect, allowAddNew = false }: AuthorsSelectorProps) {
  const [authors, setAuthors] = useState<ComboboxOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAuthors = async () => {
      const response = await getAuthors()
      if (response.success && response.authors) {
        setAuthors(response.authors)
      }
      setIsLoading(false)
    }

    loadAuthors()
  }, [])

  return (
    <Combobox
      options={authors}
      value={value?.value || ''}
      onChange={(option) => {
        onSelect(option ?? undefined)
      }}
      placeholder={isLoading ? 'Loading authors...' : 'Select author...'}
      searchPlaceholder="Search authors..."
      emptyMessage="No authors found"
      allowAddNew={allowAddNew}
    />
  )
}
