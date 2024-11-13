"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("./db");
console.log(db_1.prismaClient.sum.create);
// We are doing just unit-testing here, so we r going to moc out the db therefore we r not migrating the prisma just yet
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumInput = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number(),
});
exports.app.post('/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedResponse = sumInput.safeParse(req.body);
    if (!parsedResponse.success) {
        res.status(411).json({
            message: "Invalid input",
        });
        return;
    }
    const result = parsedResponse.data.a + parsedResponse.data.b;
    const request = yield db_1.prismaClient.sum.create({
        // If you r dependent on what the db returns u, then some exceptions can happen bcz. we r mocking out the whole thing
        // So we need to mock out the thing and also mock out the return value
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result: result,
        }
    });
    console.log(request);
    res.json({ answer: result, id: request.id });
}));
exports.app.get('/sum', (req, res) => {
    const a = Number(req.headers['a']);
    const b = Number(req.headers['b']);
    const parsedResponse = sumInput.safeParse({
        a: a,
        b: b,
    });
    if (!parsedResponse.success) {
        res.status(411).json({
            message: "Invalid input",
        });
        return;
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.json({ answer: answer });
});
