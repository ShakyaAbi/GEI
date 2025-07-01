import { useState, useEffect, useCallback } from 'react'
import { programAreasApi } from '../lib/programAreasApi'
import type { ProgramArea } from '../lib/programAreasApi'

export function useProgramAreas(filters?: {
  limit?: number;
  offset?: number;
}) {
  const [programAreas, setProgramAreas] = useState<ProgramArea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProgramAreas = useCallback(async () => {
    try {
      setLoading(true)
      const data = await programAreasApi.getProgramAreas(filters)
      setProgramAreas(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch program areas'))
    } finally {
      setLoading(false)
    }
  }, [filters?.limit, filters?.offset])

  useEffect(() => {
    fetchProgramAreas()
  }, [fetchProgramAreas])

  return { programAreas, loading, error, refetch: fetchProgramAreas }
}

export function useProgramArea(slug: string) {
  const [programArea, setProgramArea] = useState<ProgramArea | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProgramArea = async () => {
      if (!slug) {
        setLoading(false)
        setError(new Error('No slug provided'))
        return
      }
      
      try {
        setLoading(true)
        setError(null)
        const data = await programAreasApi.getProgramArea(slug)
        setProgramArea(data)
      } catch (err) {
        console.error('Error fetching program area:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch program area'))
        setProgramArea(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProgramArea()
  }, [slug])

  return { programArea, loading, error }
}