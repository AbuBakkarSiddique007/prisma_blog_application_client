import { CreateBlogFormClient } from '@/components/modules/user/createBlog/CreateBlogFormClient';
import CreateBlogFormServer from '@/components/modules/user/createBlog/CreateBlogFormServer';
import { blogService } from '@/services/blog.service';
import React from 'react';

const CreateBlogPage = async () => {

    const { data } = await blogService.getAllBlogs({}, { cache: "no-store" });
    console.log("Data : ", data);

    return (
        <div>
            {/* <CreateBlogFormServer /> */}
            <CreateBlogFormClient />

            {/* {
                data?.map((blog) => (
                    <div key={blog.id}>
                        <h2>{blog.title}</h2>
                    </div>
                ))
            } */}
            
        </div>
    );
};

export default CreateBlogPage;