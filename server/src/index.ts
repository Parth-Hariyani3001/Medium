import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

type Prisma = PrismaClient | never | any;
const app = new Hono<{
  Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables : {
		userId: string,
    prisma: Prisma 
	}
}>()

app.use("*", async (c,next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma)
  await next();
})

app.route("/api/v1/users", userRouter);
app.route("api/v1/blog",blogRouter);



export default app
