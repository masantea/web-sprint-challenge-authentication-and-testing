//const { TestScheduler } = require("jest");
const supertest = require("supertest")
const request = require('supertest')
const server = require("../index")
const db = require("../database/dbConfig")
const userModel = require("../users/users-model")

describe('POST /register', () => {
 
  beforeEach(async () => {
    await db('users').truncate()
	})

	afterAll(async () => {
    await db('users').truncate()
  })

	it('should return a 201 CREATED status code', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'user1', password: 'pass' })
    expect(response.status).toBe(201)
	})
	
	it('should send back JSON', async () => {
    const response = await request(server)
			.post('/api/auth/register')
			.send({ username: 'user1', password: 'pass' })
    expect(response.type).toMatch(/json/i)
  })

	it('should send back saved user', async () => {
    const response = await request(server)
			.post('/api/auth/register')
      .send({ username: 'user1', password: 'pass' })
    expect(response.body.username).toBe('user1')
  })
})

describe('POST /api/auth/login', () => {
 
  beforeEach(async () => {
    await db('users').truncate()
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'user1', password: 'pass' })
	})
	
	afterAll(async () => {
    await db('users').truncate()
  })

  it('should allow a registered user to log in', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ username: 'user1', password: 'pass' })
    expect(response.status).toBe(200)
	})

  it('denies access if user has incorrect credentials', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ username: 'user1', password: 'notmypass' })
    expect(response.status).toBe(401)
	})
	
})
