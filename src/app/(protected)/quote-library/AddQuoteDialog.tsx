'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createQuote } from '@/actions/quotes'
import { Button } from '@/components/ui'
import type { ComboboxOption } from '@/components/ui/combobox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

import { AuthorsSelector } from './AuthorsSelector'

const formSchema = z.object({
  quote: z.string().min(1, 'Quote text is required'),
  authorName: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .or(z.string())
    .optional(),
  source: z.string().optional(),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  categories: z.array(z.string()).default([]),
})

export function AddQuoteDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [selectedAuthor, setSelectedAuthor] = useState<ComboboxOption>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: '',
      authorName: '',
      source: '',
      url: '',
      categories: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedAuthor) {
      toast({
        title: 'Error',
        description: 'Please select an author',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await createQuote({
        ...values,
        authorName: selectedAuthor.label,
      })
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Quote added successfully',
        })
        setOpen(false)
        form.reset()
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to add quote',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Quote
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Quote</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={7} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorName"
              render={() => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <AuthorsSelector value={selectedAuthor} onSelect={setSelectedAuthor} allowAddNew />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Add categories input field */}
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} loading={isLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
