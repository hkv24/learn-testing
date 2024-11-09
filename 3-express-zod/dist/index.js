"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const sumInput = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number()
});
app.post('/sum', (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body);
    if (!parsedResponse.success) {
        res.status(411).json({
            message: "Invalid input",
        });
        return;
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.json(answer);
});
