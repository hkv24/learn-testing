import express from "express";
import { z } from "zod";

import { prismaClient } from "./db";

console.log(prismaClient.sum.create);

// We are doing just unit-testing here, so we r going to moc out the db therefore we r not migrating the prisma just yet

export const app = express();
app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number(),
});

app.post('/sum', async (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body);

    if(!parsedResponse.success) {
        res.status(411).json({
            message: "Invalid input",
        });
        return ;
    }

    const result = parsedResponse.data.a + parsedResponse.data.b;

    await prismaClient.sum.create({
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result : result,
        }
    });

    res.status(200).json(result);
});




app.get('/sum', (req, res) => {
    const a = Number(req.headers['a']);
    const b = Number(req.headers['b']);
    const parsedResponse = sumInput.safeParse({
        a: a,
        b: b,
    });

    if(!parsedResponse.success) {
        res.status(411).json({
            message: "Invalid input",
        });
        return ;
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json(answer);
});