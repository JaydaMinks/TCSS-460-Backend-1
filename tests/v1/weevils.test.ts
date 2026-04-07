import request from 'supertest';
import { app } from '../../src/app';

describe('Weevils API', () => {

  //  GET /v1/weevils/:name (happy path)
  test('GET /v1/weevils/:name returns a weevil', async () => {
    const res = await request(app).get('/v1/weevils/acorn');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('fact');
  });

  // GET invalid weevil (sad path)
  test('GET /v1/weevils/:name returns 404 for unknown weevil', async () => {
    const res = await request(app).get('/v1/weevils/unknown123');

    expect(res.status).toBe(404);
  });

  //  GET search query
  test('GET /v1/weevils/search returns results', async () => {
    const res = await request(app).get('/v1/weevils/search?type=cute');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  // POST weevil (happy path)
  test('POST /v1/weevils creates a weevil', async () => {
    const res = await request(app)
      .post('/v1/weevils')
      .send({
        name: 'testweevil',
        fact: 'Test fact',
        type: 'cute'
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBeDefined();
  });

  // POST missing fields (sad path)
  test('POST /v1/weevils fails with missing data', async () => {
    const res = await request(app)
      .post('/v1/weevils')
      .send({ name: 'badweevil' });

    expect(res.status).toBe(400);
  });

});