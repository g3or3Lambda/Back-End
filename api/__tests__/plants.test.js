const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config')

const bob = {username: 'bob', password: 'bob123', phoneNumber: '1234567'}
const myPlant = {nickname: 'orchid', species: 'sdfjklnasdjll', h2oFrequency: '1 day'}

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

describe("plants endpoints tests", () => {
    describe("/GET request", () => {
        it("returns error if user has no token", async () => {
           const response =  await request(server).get('/api/plants')
           expect(response.status).toBe(401)
        })
        it("returns success when token is provided", async () => {
            await request(server).post('/api/register').send(bob)
            const login = await request(server).post('/api//login').send(bob)
            const token = login.body.token;
            const response = await request(server).get('/api/plants').set('Authorization', token)
            expect(response.status).toBe(200)
        })
    })
    describe("/POST request", () => {
        it("adds a new plant to database", async () => {
            await request(server).post('/api/register').send(bob)
            const login = await request(server).post('/api//login').send(bob)
            const token = login.body.token;
            const response = await request(server).post('/api/plants').set('Authorization', token).send(myPlant)
            expect(response.status).toBe(201)
        })
        it("returns the new plant object", async () => {
            await request(server).post('/api/register').send(bob)
            const login = await request(server).post('/api//login').send(bob)
            const token = login.body.token;
            const response = await request(server).post('/api/plants').set('Authorization', token).send(myPlant)
            expect(response.body).toMatchObject({plant_id: 4, ...myPlant})
        })
    })
    describe("/PUT request", () => {
        it("returns the newly edited plant object", async () => {
            await request(server).post('/api/register').send(bob)
            const login = await request(server).post('/api//login').send(bob)
            const token = login.body.token;
            await request(server).post('/api/plants').set('Authorization', token).send(myPlant)
            const response = await request(server).put('/api/plants/4').set('Authorization', token).send({nickname: 'editedOrchid'})
            expect(response.body.nickname).toContain('editedOrchid')
        })
    })
    describe("/DELETE request", () => {
        it("deletes the plant object", async () => {
            await request(server).post('/api/register').send(bob)
            const login = await request(server).post('/api//login').send(bob)
            const token = login.body.token;
            await request(server).post('/api/plants').set('Authorization', token).send(myPlant)
            const response = await request(server).delete('/api/plants/4').set('Authorization', token)
            expect(response.status).toBe(200)
        })
        it("plants array has the correct number of plants after deleting", async () => {
            await request(server).post('/api/register').send(bob)
            const login = await request(server).post('/api/login').send(bob)
            const token = login.body.token;
            await request(server).post('/api/plants').set('Authorization', token).send(myPlant)
            const response = await request(server).delete('/api/plants/4').set('Authorization', token)
            expect(response.status).toBe(200)
            const plants = await request(server).get('/api/plants').set('Authorization', token)
            expect(plants.body).toHaveLength(0)
        })
    })
})