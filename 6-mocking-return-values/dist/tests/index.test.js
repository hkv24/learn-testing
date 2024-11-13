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
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const db_1 = require("../__mocks__/db");
vitest_1.vi.mock('../db');
(0, vitest_1.describe)("POST method to /sum route", () => {
    (0, vitest_1.it)("should return the sum of two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 3,
            b: 4,
            result: 7
        });
        const res = yield (0, supertest_1.default)(index_1.app).post("/sum").send({
            a: 4,
            b: 3
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.answer).toBe(7);
    }));
    (0, vitest_1.it)("should return the sum of two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/sum").send({
            a: ['4'],
        });
        (0, vitest_1.expect)(res.statusCode).toBe(411);
        (0, vitest_1.expect)(res.body.message).toBe("Invalid input");
    }));
});
(0, vitest_1.describe)('GET method to /sum route', () => {
    (0, vitest_1.it)("should return the sum of two numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .get("/sum")
            .set({
            a: '4',
            b: '3',
        })
            .send();
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.answer).toBe(7);
    }));
    (0, vitest_1.it)('should return 411', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/sum').send();
        (0, vitest_1.expect)(res.statusCode).toBe(411);
    }));
});
