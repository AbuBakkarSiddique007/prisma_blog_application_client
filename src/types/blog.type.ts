export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface BlogPost {
  id: string
  title: string
  content: string
  thumbnail: string | null
  isFeatured: boolean
  status: PostStatus
  tags: string[]
  views: number
  authorId: string
  createdAt: string
  updatedAt: string
  _count: {
    comments: number
  }
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface BlogApiResponse {
  message: string
  data: {
    data: BlogPost[]
    pagination: Pagination
  }
}
