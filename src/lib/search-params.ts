import { z } from 'zod'

export const sortSchema = z.enum(['new', 'popular', 'reading']).default('new')
export type SortKey = z.infer<typeof sortSchema>

export type FilterState = {
  categories: number[]
  tags: string[]
  q: string
  sort: SortKey
  page: number
}

const numberArrayFromCommaList = (value: string | null | undefined): number[] => {
  if (!value) return []
  return value
    .split(',')
    .map((v) => parseInt(v.trim(), 10))
    .filter((v) => Number.isFinite(v))
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort((a, b) => a - b)
}

const stringArrayFromCommaList = (value: string | null | undefined): string[] => {
  if (!value) return []
  return value
    .split(',')
    .map((v) => v.trim())
    .filter((v) => v.length > 0)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort()
}

export function parseSearchParams(params: URLSearchParams): FilterState {
  const categories = numberArrayFromCommaList(params.get('categories'))
  const tags = stringArrayFromCommaList(params.get('tags'))
  const q = (params.get('q') || '').trim()
  const sort = sortSchema.parse(params.get('sort') || undefined)
  const pageRaw = parseInt((params.get('page') || '1').trim(), 10)
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1

  return { categories, tags, q, sort, page }
}

export function buildSearchParams(state: Partial<FilterState>): string {
  const s: FilterState = {
    categories: state.categories ?? [],
    tags: state.tags ?? [],
    q: state.q ?? '',
    sort: state.sort ?? 'new',
    page: state.page && state.page > 0 ? state.page : 1,
  }

  const params = new URLSearchParams()
  if (s.categories.length > 0) params.set('categories', s.categories.join(','))
  if (s.tags.length > 0) params.set('tags', s.tags.join(','))
  if (s.q) params.set('q', s.q)
  if (s.sort !== 'new') params.set('sort', s.sort)
  if (s.page > 1) params.set('page', String(s.page))

  return params.toString()
}
