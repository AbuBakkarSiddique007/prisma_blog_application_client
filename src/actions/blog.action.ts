"use server"

import { updateTag } from 'next/cache';
import { BlogData } from './../services/blog.service';

import { blogService } from "@/services/blog.service"

export const getBlogs = async () =>{
    return await blogService.getAllBlogs()
}

export const createBlogPost = async (data: BlogData ) => {
  const res = await blogService.createBlogPost(data);
  updateTag("blogPosts");
  return res;
};