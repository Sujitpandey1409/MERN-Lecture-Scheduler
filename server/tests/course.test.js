import request from "supertest";
import app from "../server.js";
import { expect } from "chai";

describe("Course API Tests", () => {
    it("GET /api/courses should return an empty array initially", async () => {
        const res = await request(app).get("/api/courses");
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("POST /api/courses should return 400 if required fields are missing", async () => {
        const res = await request(app).post("/api/courses").send({});
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message").that.includes("All fields are required");
    });

    it("POST /api/courses should create a course when valid data is provided", async () => {
        const res = await request(app).post("/api/courses").send({
            name: "React Basics",
            level: "Beginner",
            description: "Introduction to React",
            image: "react-course.jpg",
        });
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property("name", "React Basics");
    });
});
