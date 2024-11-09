import express from 'express';
export const app = express();

app.use(express.json());

app.post('/sum', (req: express.Request, res: express.Response) => {
    const { a, b } = req.body;
    const answer = a + b;

    res.status(200).json(answer);
});