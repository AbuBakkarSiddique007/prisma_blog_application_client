import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import type { BlogPost } from "@/types/blog.type";
import { ArrowLeft, Calendar, Eye, MessageCircle, Star, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";


export const dynamicParams = true;

export async function generateStaticParams() {
    const { data } = await blogService.getAllBlogs()

    return data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 1) || [];
}



const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const { data } = await blogService.getBlogById(id);





    if (!data) {
        notFound();
    }

    const blog: BlogPost = data;

    const placeholderImage = `https://avatar.vercel.sh/${blog.id}`;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/blogs" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blogs
                </Link>
            </Button>

            {/* Hero Image */}
            <div className="relative mb-8 overflow-hidden rounded-xl">
                <img
                    src={blog.thumbnail ?? placeholderImage}
                    alt={blog.title}
                    className="aspect-video w-full object-cover"
                />
                {blog.isFeatured && (
                    <Badge
                        className="absolute top-4 right-4 flex items-center gap-1"
                        variant="secondary"
                    >
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                    </Badge>
                )}
                <Badge
                    className="absolute top-4 left-4"
                    variant={blog.status === "PUBLISHED" ? "default" : "outline"}
                >
                    {blog.status}
                </Badge>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{blog.title}</h1>

            {/* Meta Information */}
            <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Author ID: {blog.authorId}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blog.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {blog.views} views
                </span>
                <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {blog._count.comments} comments
                </span>
            </div>

            {/* Tags */}
            {blog.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}

            <Separator className="mb-8" />

            {/* Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {blog.content}
                    </p>
                </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-muted-foreground text-sm">Created At</p>
                            <p className="font-medium">{formatDate(blog.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Last Updated</p>
                            <p className="font-medium">{formatDate(blog.updatedAt)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Post ID</p>
                            <p className="font-mono text-sm">{blog.id}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Status</p>
                            <Badge
                                variant={blog.status === "PUBLISHED" ? "default" : "outline"}
                            >
                                {blog.status}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogPage;

