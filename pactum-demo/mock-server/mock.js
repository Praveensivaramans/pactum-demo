const { mock, handler } = require('pactum');

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


mock.start(3000);