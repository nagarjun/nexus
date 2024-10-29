'use client'

import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (option: ComboboxOption | null) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  allowAddNew?: boolean
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No option found.',
  className,
  allowAddNew = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState<ComboboxOption | null>(
    value ? options.find((option) => option.value === value) || null : null,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('flex w-full justify-between child:w-full child:justify-between', className)}
        >
          {selectedItem?.label || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', className)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} onValueChange={setSearch} />
          <CommandList>
            {allowAddNew && search && !options.some((opt) => opt.label.toLowerCase() === search.toLowerCase()) ? (
              <CommandItem
                value={search}
                onSelect={() => {
                  const newOption = { value: 'new', label: search }
                  setSelectedItem(newOption)
                  onChange(newOption)
                  setOpen(false)
                  setSearch('')
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add &quot;{search}&quot;
              </CommandItem>
            ) : (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(currentValue) => {
                    const selectedOption = options.find((opt) => opt.label === currentValue)
                    setSelectedItem(currentValue === value ? null : selectedOption || null)
                    onChange(currentValue === value ? null : selectedOption || null)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
