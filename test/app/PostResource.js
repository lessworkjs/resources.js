const Resource = require('../../src');

class PostResource extends Resource {
  toArray() {
    return {
      title: `${this.title} - Title`
    }
  }
}

module.exports = PostResource;