const Resource = require('./Resource');

class ResourceCollection extends Resource {
  constructor(resource, classname) {
    super(resource);

    this.collection = resource.map(item => {
      return new classname(item);
    })
  }

  toArray() {
    return this.collection.map(item => {
      return item.toArray();
    })
  }

}

module.exports = ResourceCollection;