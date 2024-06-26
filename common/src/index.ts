import { z } from "zod";

//Signup Object
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

//Signin Object
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

//Blog Creation object
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

//Blog Updation Object
export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})


export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>

