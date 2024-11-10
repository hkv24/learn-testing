import express from "express";
import { z } from "zod";

export const app = express();
app.use(express.json());

const sumInput =z.object({
    a: z.number(),
    b: z.number(),
});

app.post('/sum', (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body);

    if(!parsedResponse.success) {
        res.status(411).json({
            message: "Invalid input",
        });
        return ;
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.status(200).json(answer);
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
})