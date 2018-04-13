const DelegatesToResource = require('./DelegatesToResource');

class Resource extends DelegatesToResource {
  constructor(object, wrap) {
    super(object);

    if (!(object instanceof Object)) {
      this.data = null;
      return this;
    }

    const data = this.toArray();

    if (wrap) {
      this.data = {
        data,
      };

      return this;
    }

    this.data = data;
    return this;
  }

  exec() {
    return this.data || null;
  }

  static collection(array, wrap) {
    array = array || [];
    const collection = array.data ? array.data : array;

    const data = collection.map(item => new this(item, false).exec());

    if (array.data) {
      return Object.assign({}, array, {
        data,
      });
    }

    if (wrap) {
      return {
        data,
      };
    }

    return data;
  }

  toArray() {
    return Object.assign({}, this.resource);
  }
}

module.exports = Resource;