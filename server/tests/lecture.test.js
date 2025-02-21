import request from "supertest";
import app from "../server.js";
import { expect } from "chai";
import Lecture from "../models/Lecture.js"; // Import model to clean up data before tests

describe("Lecture API Tests", () => {
    let testLecture;
    const testData = {
        course: "67b49ca9f3deb2b8012e2b94", // Replace with a valid Course ID
        instructor: "67b492e29b804e0c6e90e740", // Replace with a valid Instructor ID
        date: "2025-02-20",
    };

    // Cleanup before running tests to prevent conflicts
    before(async () => {
        await Lecture.deleteMany({ instructor: testData.instructor, date: testData.date });
    });

    it("GET /api/lectures should return an empty array initially", async () => {
        const res = await request(app).get("/api/lectures");
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("POST /api/lectures should return 400 if required fields are missing", async () => {
        const res = await request(app).post("/api/lectures").send({});
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message").that.includes("Course, Instructor, and Date are required");
    });

    it("POST /api/lectures should create a lecture when valid data is provided", async () => {
        const res = await request(app).post("/api/lectures").send(testData);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property("date");

        // Save the created lecture for the next test
        testLecture = res.body;
    });

    it("POST /api/lectures should return 400 when scheduling a lecture for the same instructor on the same date", async () => {
        const res = await request(app).post("/api/lectures").send(testData);
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message").that.includes("Instructor already has a lecture on this date");
    });

    // Cleanup after tests to keep DB clean
    after(async () => {
        if (testLecture) {
            await Lecture.findByIdAndDelete(testLecture._id);
        }
    });
});
