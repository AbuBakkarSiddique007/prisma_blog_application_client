"use client";

import { createBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const blogSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be less than 200 characters"),
    content: z
        .string()
        .min(10, "Content must be at least 10 characters")
        .max(5000, "Content must be less than 5000 characters"),
    tags: z.string(),
});

export function CreateBlogFormClient() {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
        validators: {
            onSubmit: blogSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating....");

            const blogData = {
                title: value.title,
                content: value.content,
                tags: value.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter((item) => item !== ""),
            };

            console.log(blogData);

            try {
                const res = await createBlogPost(blogData);
                console.log(res);

                if (res.error) {
                    toast.error(res.error.message, { id: toastId });
                    return;
                }

                toast.success("Post Created", { id: toastId });
            } catch (err) {
                toast.error("Something Went Wrong", { id: toastId });
            }
        },
    });

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle>Create Blog Post</CardTitle>
                <CardDescription>
                    Write a new blog post and add tags — keep content focused and clear.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="blog-post"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="A short, descriptive title"
                                            className="w-full"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Write your blog post here..."
                                            rows={10}
                                            className="w-full"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Tags (comma separated)
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="nextjs, react, javascript"
                                            className="w-full"
                                        />
                                        <p className="text-muted-foreground text-sm mt-2">Add tags to help readers find your post.</p>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex items-center justify-end">
                <Button form="blog-post" type="submit" className="ml-auto" disabled={form.state.isSubmitting}>
                    {form.state.isSubmitting ? "Creating..." : "Create Post"}
                </Button>
            </CardFooter>
        </Card>
    );
}