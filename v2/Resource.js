const DelegatedResource = require('./DelegatedResource');

class Resource extends DelegatedResource {
  constructor(resource) {
    super(resource);
  }

  static collection(resource) {
    const ResourceCollection = require('./ResourceCollection');

    return new ResourceCollection(resource, this)
  }

  process() {
    return this.toArray();
  }

  toArray() {
    return this.resource;
  }
}

module.exports = Resource;