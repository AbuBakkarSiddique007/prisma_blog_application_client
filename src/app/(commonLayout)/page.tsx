import { BlogCard } from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";




export default async function Home() {
  const { data } = await blogService.getAllBlogs({
    isFeatured: true
  },
    {
      cache: "no-store",
    });


  console.log(data);



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {
          data?.map((blog: BlogPost) => (

            <BlogCard key={blog.id} blog={blog} />

          ))}

      </div>
    </div>
  );
}