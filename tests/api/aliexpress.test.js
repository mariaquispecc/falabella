const request = require('supertest');

const API = 'https://aliexpress-datahub.p.rapidapi.com';
const headers = {
  'x-rapidapi-key': '9ee9a574a3msh509699532d7c84ap1de7e5jsnbea64494856a',
  'x-rapidapi-host': 'aliexpress-datahub.p.rapidapi.com',
  'Content-Type': 'application/json'
};

describe('AliExpress API', () => {
  test('R1: GET /base_params → 200 + base', async () => {
    const res = await request(API)
      .get('/base_params?filter=baseRegion')
      .set(headers);

    expect(res.status).toBe(200);
    console.log(res.body);
  });

  test('R2: GET /custom → 200 + custom', async () => {
    const res = await request(API)
      .get('/custom')
      .set(headers);

    expect(res.status).toBe(200);
    console.log(res.body);
  });

  test('R3: POST /custom → 200 + custom', async () => {
    const res = await request(API)
      .post('/custom')
      .set(headers)
      .send({
        key1: 'value',
        key2: 'value'
      });

    expect(res.status).toBe(200);
    console.log(res.body);
  });
});
