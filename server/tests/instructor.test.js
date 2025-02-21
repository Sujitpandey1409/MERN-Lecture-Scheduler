import request from "supertest";
import app from "../server.js";
import { expect } from "chai";

describe("Instructor API Tests", () => {
    it("GET /api/instructors should return an empty array initially", async () => {
        const res = await request(app).get("/api/instructors");
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("POST /api/instructors should return 400 if required fields are missing", async () => {
        const res = await request(app).post("/api/instructors").send({});
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message").that.includes("Name and email are required");
    });

    it("POST /api/instructors should create an instructor when valid data is provided", async () => {
        const res = await request(app).post("/api/instructors").send({
            name: "John Doe",
            email: "john@example.com",
        });
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property("name", "John Doe");
    });
});
