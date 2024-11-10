import {describe, expect, it} from 'vitest';
import request from "supertest";
import { app } from "../index";

describe("POST method to /sum route", () => {
    it("should return the sum of two numbers", async () => {
        const res = await request(app).post("/sum").send({
            a: 4,
            b: 3
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(7);
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
        expect(res.body).toBe(7);
    })

    it('should return 411', async () => {
        const res = await request(app).get('/sum').send();
        expect(res.statusCode).toBe(411);
    })
})