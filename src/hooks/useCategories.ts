import { useState, useEffect } from 'react'
import { categoriesApi } from '../lib/apiClient'
import type { ResearchCategory } from '../lib/supabase'

export function useCategories() {
  const [categories, setCategories] = useState<ResearchCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await categoriesApi.getCategories()
        setCategories(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'))
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}