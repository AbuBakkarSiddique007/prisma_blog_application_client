import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";
import Link from "next/link";

const HistoryTable = ({ posts } : {posts : BlogPost[]}) => {
    return (
        <div className="border rounded-md overflow-hidden">
            <Table>
                <TableCaption>List of your posts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead className="text-center">Views</TableHead>
                        <TableHead className="text-center">Comments</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-sm text-muted-foreground">
                                No posts found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        posts.map((post, idx) => (
                            <TableRow key={post.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <Link href={`/blogs/${post.id}`} className="font-medium hover:underline">
                                            {post.title}
                                        </Link>
                                        <span className="text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags && post.tags.length > 0 ? (
                                            post.tags.map((t) => (
                                                <span key={t} className="inline-block border rounded px-2 py-0.5 text-xs">
                                                    {t}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-sm">No Tags</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-medium">{post.views}</TableCell>
                                <TableCell className="text-center">{post._count.comments}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default HistoryTable;