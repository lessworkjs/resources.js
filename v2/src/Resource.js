const DelegatedResource = require('./DelegatedResource');
const ResourceResponse = require('./ResourceResponse');

class Resource extends DelegatedResource {
  constructor(resource) {
    super(resource);

    this._with = [];
    this._additional = [];
    this.wrap = 'data';
  }

  static collection(resource) {
    const ResourceCollection = require('./ResourceCollection');

    return new ResourceCollection(resource, this)
  }

  resolve() {
    return this.toArray();
  }

  response() {
    return this.toResponse();
  }

  toResponse() {
    return new ResourceResponse(this).toResponse();
  }

  toArray() {
    return this.resource.toArray();
  }

  with() {
    return this._with;
  }

  additional(data) {
    this._additional = data;

    return this;
  }

  static wrap(value) {
    this.wrap = value;
  }

  static withoutWrapping() {
    this.wrap = null;
    return this
  }
}

module.exports = Resource;