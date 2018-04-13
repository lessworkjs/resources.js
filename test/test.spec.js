const test = require('japa');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const Resource = require('../src/');
const UserResource = require('./app/UserResource');
const BlankResource = require('./app/BlankResource');
const data = require('./app/data');

test.group('Resource', (group) => {
  test('should transform a collection.', (assert) => {
    const collection = UserResource.collection(data, true);

    expect(collection).to.deep.equal({
      data: [{
          id: 1,
          name: 'Bob',
          email: 'bob@bob.com',
          posts: {
            "data": [{
              "title": "im cool - Title"
            }, {
              "title": "so cool cool - Title"
            }]
          },
          created_at: 'today',
          updated_at: 'today'
        },
        {
          id: 2,
          name: 'Waldo',
          email: 'waldo@waldo.com',
          posts: {
            "data": []
          },
          created_at: 'today',
          updated_at: 'today'
        }
      ]
    });
  });

  test('should transform a collection without wrapper.', (assert) => {
    const collection = UserResource.collection(data, false);

    expect(collection).to.deep.equal(
      [{
          id: 1,
          name: 'Bob',
          email: 'bob@bob.com',
          posts: {
            "data": [{
              "title": "im cool - Title"
            }, {
              "title": "so cool cool - Title"
            }]
          },
          created_at: 'today',
          updated_at: 'today'
        },
        {
          id: 2,
          name: 'Waldo',
          email: 'waldo@waldo.com',
          posts: {
            "data": []
          },
          created_at: 'today',
          updated_at: 'today'
        }
      ]
    );
  });

  test('should transform a single item.', (assert) => {
    const single = new UserResource(data[0], true).exec();

    expect(single).to.deep.equal({
      data: {
        id: 1,
        name: 'Bob',
        email: 'bob@bob.com',
        posts: {
          "data": [{
            "title": "im cool - Title"
          }, {
            "title": "so cool cool - Title"
          }]
        },
        created_at: 'today',
        updated_at: 'today'
      }
    });
  });

  test('should transform a single item without wrapper.', (assert) => {
    const single = new UserResource(data[0], false).exec();

    expect(single).to.deep.equal({
      id: 1,
      name: 'Bob',
      email: 'bob@bob.com',
      posts: {
        "data": [{
          "title": "im cool - Title"
        }, {
          "title": "so cool cool - Title"
        }]
      },
      created_at: 'today',
      updated_at: 'today'
    });
  });

  test('should transform a collection with the data key.', (assert) => {
    const collection = UserResource.collection({
      data: data
    }, true);

    expect(collection).to.deep.equal({
      data: [{
          id: 1,
          name: 'Bob',
          email: 'bob@bob.com',
          posts: {
            "data": [{
              "title": "im cool - Title"
            }, {
              "title": "so cool cool - Title"
            }]
          },
          created_at: 'today',
          updated_at: 'today'
        },
        {
          id: 2,
          name: 'Waldo',
          email: 'waldo@waldo.com',
          posts: {
            "data": []
          },
          created_at: 'today',
          updated_at: 'today'
        }
      ]
    });
  });

  test('should transform a single item without toArray.', (assert) => {
    const single = new BlankResource(data[0], true).exec();

    expect(single).to.deep.equal({
      data: {
        id: '1',
        name: 'Bob',
        email: 'bob@bob.com',
        posts: [{
          "title": "im cool"
        }, {
          "title": "so cool cool"
        }],
        created_at: 'today',
        updated_at: 'today'
      }
    });
  });

  test('should return null', (assert) => {
    const single = new BlankResource(null).exec();

    expect(single).to.be.null;
  });
});