import { describe, expect, it, vi } from 'vitest';
import request from "supertest";
import { app } from "../index";
import { prismaClient } from '../__mocks__/db';

vi.mock('../db');


describe("POST method to /sum route", () => {
    it("should return the sum of two numbers", async () => {
        prismaClient.sum.create.mockResolvedValue({
        // resolve bcz. ' prismaClient.sum.create ' is asynchronous
        // the thing that the promise reslves is what we r mocking
            id: 1,
            a: 3,
            b: 4,
            result: 7
        });

        // Spy
        vi.spyOn(prismaClient.sum, 'create');

        const res = await request(app).post("/sum").send({
            a: 4,
            b: 3
        });

        // Spy
        expect(prismaClient.sum.create).toHaveBeenCalledTimes(1);
        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data: {
                a: 4,
                b: 3,
                result: 7
            }
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(1);
        // can check that user does not sends errorness values
        expect(res.body.answer).toBe(7);
    });

    it("should return the sum of two numbers", async () => {
        const res = await request(app).post("/sum").send({
            a: ['4'],
        });
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid input");
    });
});




describe('GET method to /sum route', () => {
    it("should return the sum of two numbers", async () => {
        const res = await request(app)
        .get("/sum")
        .set({
            a: '4',
            b: '3',
        })
        .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(7);
    });

    it('should return 411', async () => {
        const res = await request(app).get('/sum').send();
        expect(res.statusCode).toBe(411);
    });
});