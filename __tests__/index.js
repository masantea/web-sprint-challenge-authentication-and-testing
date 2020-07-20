//const { TestScheduler } = require("jest");
const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")

// a global jest hook to run after all the tests are done
afterAll(async () => {
	// closes the database connection so the jest command doesn't stall
	await db.destroy()
})

describe("hobbits integration tests", () => {
	it("GET /users", async () => {
		const res = await supertest(server).get("/")
		expect(res.statusCode).toBe(200)
		// `content-type` headers tell the client how to render the data
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.message).toBe("Welcome to our API")
	})