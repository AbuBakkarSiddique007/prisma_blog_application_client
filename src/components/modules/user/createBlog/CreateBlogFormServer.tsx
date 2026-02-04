import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "../../../../../env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag, updateTag } from "next/cache";

const CreateBlogFormServer = () => {

    const API_URL = env.API_URL;

    const createBlog = async (formData: FormData) => {
        "use server"

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string;

        const blogData = {
            title,
            content,
            tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
        };

        console.log(JSON.stringify(blogData));

        const cookieStore = await cookies()

        // Backend posts endpoint is `/posts` (consistent with blog.service)
        const res = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData),
        });

        // if (!res.ok) {
        //     const text = await res.text().catch(() => "")
        //     console.error("Create post failed:", res.status, text)
        //     throw new Error(`Create post failed: ${res.status}`)
        // }

        // const json = await res.json().catch(() => null)
        // console.log("Post created:", json)

        console.log(res);

        if(res.status){
            redirect("/dashboard/create-blog?success=Blog created successfully")
        }

        if(res.ok){
            revalidateTag("blogPosts", "max")
            // updateTag("blogPosts") //Use either one of them
        }



    }


    return (
        <div>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription> You can your blog posts here. </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="blog-form" action={createBlog} >
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Blog Title</FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Enter Blog Title"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="content">Content</FieldLabel>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Enter Blog Content"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                <Textarea
                                    id="tags"
                                    name="tags"
                                    placeholder="Nextjs,React,JavaScript"
                                    required
                                />
                            </Field>
                        </FieldGroup>

                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        form="blog-form"
                        type="submit"
                        className=" w-full "
                    >Submit</Button>
                </CardFooter>

            </Card>
        </div>
    );
};

export default CreateBlogFormServer;