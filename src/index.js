const DelegatesToResource = require('./DelegatesToResource');

class Resource extends DelegatesToResource {
  constructor(object, wrap = false) {
    super(object);

    const data = this.toArray();

    if (wrap) {
      return {
        data,
      };
    }

    return data;
  }

  static collection(array, wrap = false) {
    array = array || [];
    const collection = array.data ? array.data : array;

    const data = collection.map(item => new this(item, false));

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