"use client";

import { getBlogs } from "@/actions/blog.action";
import type { BlogPost } from "@/types/blog.type";
import { useEffect, useState } from "react";

type BlogResponse = {
    data: BlogPost[] | null;
    error: string | null;
};

const AboutPage = () => {

    const [data, setData] = useState<BlogResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            const data = await getBlogs()
            setData(data);
            setError(data.error);
            console.log("About Page Data:", data);
        })()
    }, []);


    return (
        <div>
            <h1>This is a about page.</h1>
        </div>
    );
};

export default AboutPage;