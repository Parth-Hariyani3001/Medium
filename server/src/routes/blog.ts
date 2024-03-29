import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from "hono/jwt"
import { createBlogInput,updateBlogInput } from '@parthxd/blog-types';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
        prisma: PrismaClient
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
    if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
  
    c.set('userId',  payload.id );
    await next()
  })

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
    const prisma = c.get("prisma")
    const authorId = c.get('userId')
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
    const prisma = c.get("prisma")
    const blog = await prisma.post.update({
        where : {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = c.get("prisma")
    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({
        posts
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = c.get("prisma")
    const blog = await prisma.post.findUnique({
        where : {
            id: id
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        blog
    })
})

