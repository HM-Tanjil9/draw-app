import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleweare';
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types";
import { prismaClient } from '@repo/db/client';

const app = express()


app.post('/signup', async (req, res) => {
    const parseData = CreateUserSchema.safeParse(req.body);
    if(!parseData.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    try {
        await prismaClient.user.create({
            data: {
                email: parseData.data?.username,
                password: parseData.data.password,
                name: parseData.data.name
            }
        });
        res.json({ userId: '123' });
    } catch (e) {
        res.status(411).json({ error: "User already exist with username" });
    }
});

app.post('signin', (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if(!data.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({ token });
});

app.post('/room', middleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    res.json({ roomId: 111, userId: 1 });
});

app.listen(3333);