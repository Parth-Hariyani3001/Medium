import { Hono } from "hono";
import { sign,verify } from "hono/jwt"
import { PrismaClient } from '@prisma/client/edge'
import { signupInput,signinInput } from "@parthxd/blog-types";

export const userRouter = new Hono<{
    Bindings: {
          DATABASE_URL: string,
          JWT_SECRET: string,
      },
      Variables : {
        userId: string,
        prisma: PrismaClient
      }
  }>()

userRouter.post('signup', async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
      const token: string = await sign({id: user.id},c.env.JWT_SECRET);
      c.status(200)
      return c.json({
        token,
      });
    } catch(e) {
      c.status(403)
      return c.json({
        error: "error while signing up"
      })
    }
  })
  
  userRouter.post('signin', async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
    try{
      const user = await prisma.user.findUnique({
        where : {
          email: body.email,
          password: body.password
        }
      });
      if(!user) {
        c.status(403);
        return c.json({
          error: "User not found/Incorrect credentials"
        })
      }
      const token = await sign({id: user.id},c.env.JWT_SECRET); 
      c.status(200);
      return c.json({
        token
      })
    } catch(e) {
      c.status(403);
      return c.json({
        error: "There was an error while signing in"
      })
    }
  })
