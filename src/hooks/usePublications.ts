import { useState, useEffect, useCallback } from 'react'
import { publicationsApi } from '../lib/prismaApi'
import type { Publication } from '../types/prisma'

export function usePublications(filters?: {
  category?: string;
  year?: number;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true)
      const data = await publicationsApi.getPublications(filters)
      setPublications(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch publications'))
    } finally {
      setLoading(false)
    }
  }, [filters?.category, filters?.year, filters?.featured, filters?.limit, filters?.offset])

  useEffect(() => {
    fetchPublications()
  }, [fetchPublications])

  return { publications, loading, error, refetch: fetchPublications }
}