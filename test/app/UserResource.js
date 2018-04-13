const Resource = require('../../src/');
const PostResource = require('./PostResource');

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

module.exports = UserResource;