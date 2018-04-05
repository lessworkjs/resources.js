class DelegatedResource {
  constructor(resource) {
    this.resource = resource;

    return this.proxy = new Proxy(this, {
      get(target, property) {
        if (target[property]) {
          return target[property];
        }

        if (resource[property]) {
          return resource[property];
        }
      }
    });
  }
}

module.exports = DelegatedResource;