const request = require('supertest');
const server = require('../server');
const Auth = require('../users/users-model');
const db = require('../data/db-config')

const bob = {username: 'bob', password: 'bob123', phoneNumber: '1234567'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

describe("auth router tests", () => {
    describe("/register endpoint", () => {
        it("adds new user to database", async () => {
            let users
            await Auth.add(bob)
            users = await db('users')
            expect(users).toHaveLength(3) //there are two users already in the seeded data, so total should be 3 after 'bob' is added
        })
        it("data entered is formatted as expected", async () => {
            const user = await Auth.add(bob)
            expect(user).toMatchObject({user_id: 3, ...user})
        })
    })
    describe("/login endpoint", () => {
        it("returns a token on successful login", async () => {
            await request(server).post('/api/register').send(bob)
            const response = await request(server).post('/api/login').send({username: 'bob', password: 'bob123'})
            const token = response.body.token
            expect(token).toBeDefined()
        })
        it("returns correct error on invalid username/password", async () => {
            await request(server).post('/api/register').send(bob)
            const response = await request(server).post('/api/login').send({username: 'bob', password: 'bob999999'})
            expect(response.body.message).toContain('invalid login credentials')
        })
    })
    describe("user edit function", () => {
        it("user can edit their phone number", async () => {
            await request(server).post('/api/register').send(bob)
            const response = await request(server).post('/api/login').send({username: 'bob', password: 'bob123'})
            const token = response.body.token
            await request(server).put('/api/user/3').send({password: 'bob789'}).set('Authorization', token)
            const edit = await request(server).post('/api/login').send({username: 'bob', password: 'bob123'})
            expect(edit.body).toContain('invalid login credentials')
        })
    })
})