import dotenv from "dotenv";       
dotenv.config();

import express from 'express'
import connect from './lib/connect.js'
import cors from 'cors'

const app = express()

import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import webhookRouter from './routes/webhook.route.js'
import { clerkMiddleware } from '@clerk/express'


app.use(cors(process.env.CLIENT_URL))

app.use(clerkMiddleware())
app.use('/webhooks', webhookRouter)

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/auth-state', (req, res) => {
    const authState = req.auth();
    res.json({ authState });
})

app.use('/users', userRouter)
app.use( '/posts', postRouter)
app.use( '/comments', commentRouter )

app.use((error, req, res, next) => {
    res.status(500).json({ 
        message: error.message,
        status: error.status || 500,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack

     });
});

app.listen(3000, async ()=>{
    await connect()

    console.log("Server is running")
})