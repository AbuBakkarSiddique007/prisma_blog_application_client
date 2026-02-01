import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { BlogPost } from "@/types/blog.type"
import { Eye, MessageCircle } from "lucide-react"
import Link from "next/link"

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  const placeholderImage = `https://avatar.vercel.sh/${blog.id}`

  console.log("Blog Id :",  blog.id);

  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      {/* Thumbnail */}
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-black/20" />
        <img
          src={blog.thumbnail ?? placeholderImage}
          alt={blog.title}
          className="aspect-video w-full object-cover"
        />
        {blog.isFeatured && (
          <Badge className="absolute top-2 right-2 z-20" variant="secondary">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardAction>
          <Badge variant="outline">{blog.status}</Badge>
        </CardAction>
        <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {blog.content}
        </CardDescription>
      </CardHeader>

      {/* Tags */}
      {blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 px-6">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="text-muted-foreground flex items-center gap-4 px-6 text-sm">
        <span className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {blog.views}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          {blog._count.comments}
        </span>
      </div>

      <CardFooter>
        {/* <Button  className="w-full">Read More</Button> */}

        <Button asChild className="w-full">
          <Link href={`/blogs/${blog.id}`}>Read More</Link>
        </Button>

      </CardFooter>
    </Card>
  )
}