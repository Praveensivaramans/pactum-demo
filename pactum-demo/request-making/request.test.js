const pactum = require('pactum');
const { mock, request, handler } = pactum;
const addCreateUserExample = require('../add-interaction/add-interactions')
const addUserExample = require('../add-interaction/add-interactions')
const addAnotherUserExample = require('../add-interaction/add-interactions')

before(async () => {
    await mock.start(4000);
    request.setBaseUrl('http://localhost:4000');

handler.addInteractionHandler('get users', () => {
    return {
        request: {
            method: 'GET',
            path: '/users',
            queryParams: {
              id: 1
            }
          },
          response: {
            status: 200,
            body: {
              id: 1,
              name: 'Jon'
            }
          }
    }    
  });

  handler.addInteractionHandler('create users', () => {
    return {
        request: {
            method: 'POST',
            path: '/api/users',
            body: {
              name: 'praveen',
              job: 'figuring'
            }
          },
          response: {
            status: 201
          }
    }    
  });

 mock.addInteraction('get users');
 mock.addInteraction('create users');

});

after(async () => {
    await mock.stop();
});

describe('Order Service', () => {

    it('should create an user', async () => {
        await pactum.spec()
        .post('/api/users')
        .withJson({
          "name": 'praveen',
          "job": 'figuring'
        })
        .expectStatus(201);
    });

    
  it('get user by id', async () => {
    await pactum.spec()
      .get('/users?id=1')
      .expectStatus(200);
  });

});
