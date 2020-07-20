//const { TestScheduler } = require("jest");
const supertest = require("supertest")
const request = require('supertest')
const server = require("../index")
const db = require("../database/dbConfig")

describe('POST /register', () => {
  afterAll(async () => {
    await db('users').truncate()
  })
  beforeEach(async () => {
    await db('users').truncate()
	})

	it('should return a 201 CREATED status code', async () => {
    const response = await request(server)
      .get('/register')
      .send({ username: 'user1', password: 'pass' })
    expect(response.status).toBe(201)
	})
	
	// it('should send back JSON', async () => {
  //   const response = await request(server)
  //     .post('/register')
	// 		.send({ username: 'user1', password: 'pass' })
  //   expect(response.type).toMatch(/json/i)
  // })

	// it('should send back saved user', async () => {
  //   const response = await request(server)
  //     .post('/register')
  //     .send({ username: 'user1', password: 'pass' })
  //   expect(response.body.email).toBe('user1')
  // })
})