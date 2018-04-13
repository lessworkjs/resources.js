class DelegatesToResource {
  constructor(resource) {
    if (!(resource instanceof Object)) {
      return false;
    }

    this.resource = resource;

    this.proxy = new Proxy(this, {
      get(target, property) {
        if (target[property]) {
          return target[property];
        }

        if (resource[property]) {
          return resource[property];
        }

        return undefined;
      },
    });

    return this.proxy;
  }
}

module.exports = DelegatesToResource;