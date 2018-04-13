[![Coverage Status](https://coveralls.io/repos/github/lessworkjs/resources.js/badge.svg?branch=master)](https://coveralls.io/github/lessworkjs/resources.js?branch=master)
[![Build Status](https://travis-ci.org/lessworkjs/resources.js.svg?branch=master)](https://travis-ci.org/lessworkjs/resources.js)


# resources.js
A javascript data transformation layer.

Inspired by Laravels [Eloquent API Resources](https://laravel.com/docs/5.6/eloquent-resources).

# Installation
```bash
npm i resources.js
```

# Basic Usage


Create a resource, `UserResource.js`.

```js
const Resource = require('resources.js');

class UserResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

module.exports = UserResource;
```

Create some data, maybe in `index.js`
```js
const data = [{
  id: '1',
  name: 'Bob',
  email: 'bob@bob.com',
  created_at: 'today',
  updated_at: 'today',
  posts: [{
      title: 'im cool'
    },
    {
      title: 'so cool cool'
    },
  ]
}, {
  id: '2',
  name: 'Waldo',
  email: 'waldo@waldo.com',
  created_at: 'today',
  updated_at: 'today',
}];
```

Then you can transform a single item:
```js 
const single = new UserResource(data[0]).exec();
console.log(single);
/**
 *  { data:
      { id: 1,
        name: 'Bob',
        email: 'bob@bob.com',
        posts:
         { data:
            [ { title: 'im cool - Title' },
              { title: 'so cool cool - Title' } ] },
        created_at: 'today',
        updated_at: 'today' } }
 */
```
Or all of them
```js 
const collection = UserResource.collection(data);
console.log(collection);
/**
 *  { data:
      [ { id: 1,
          name: 'Bob',
          email: 'bob@bob.com',
          posts:
           { data:
              [ { title: 'im cool - Title' },
                { title: 'so cool cool - Title' } ] },
          created_at: 'today',
          updated_at: 'today' },
        ... ] }
 */
```


# Advance Usage
## Data wrapper 
You can enable the data wrapper by passing true to the second arguement for both methods.

```js 
const single = new UserResource(data[0], true).exec();
console.log(single);
/**
 *  { id: 1,
     name: 'Bob',
     email: 'bob@bob.com',
     created_at: 'today',
     updated_at: 'today' } }
 */
```

Or all of them
```js 
const collection = UserResource.collection(data, true);
console.log(collection);
/**
 *  [ { id: 1,
       name: 'Bob',
       email: 'bob@bob.com',
       created_at: 'today',
       updated_at: 'today' },
     { id: 2,
       name: 'Waldo',
       email: 'waldo@waldo.com',
       posts: { data: [] },
       created_at: 'today',
       updated_at: 'today' } ]
 */
```

If you pass a `data` key to  collections you cannot disable this option.


## Pagination 
If you pass a `data` key to collections your transformation will be merged with the rest of the passed object.

Let's use a simple Paginator class.

```js 
class Paginator {
  constructor(data) {
    return {
      data,
      meta: {
        page: 1,
        total: data.length
      },
      links: {
        nextPage: '...',
        prevPage: '...'
      }
    }
  }
}
```

We'll return our data as `data` key along with other pagination information like `meta` and `links`

Now we can call `collection` with the paginator
```js 
const paginated = UserResource.collection(new Paginator(data));
console.log(paginated);
/**
 *  { data:
      [ { id: 1,
          name: 'Bob',
          email: 'bob@bob.com',
          created_at: 'today',
          updated_at: 'today' },
        ...
     meta: { page: 1, total: 2 },
     links: { nextPage: '...', prevPage: '...' } },
 */
```

## Nested Resources
Transforming nested resources is not to difficult, just create a new resource like `PostResource.js`

```js 
const Resource = require('resources.js');

class PostResource extends Resource {
  toArray() {
    return {
      title: `${this.title} - Title`
    }
  }
}

module.exports = PostResource;
```

Then  modify the `UserResource`
```js 
class UserResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      email: this.email,
      posts: PostResource.collection(this.posts, true),
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}
```

Now when you do a transformation you'll see `posts`
```js 
/**
 *  { id: 1,
     name: 'Bob',
     email: 'bob@bob.com',
     posts:
      { data:
         [ { title: 'im cool - Title' },
           { title: 'so cool cool - Title' } ] },
     created_at: 'today',
     updated_at: 'today' } }
 */
```