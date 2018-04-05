const DelegatedResource = require('./DelegatedResource');

class Resource extends DelegatedResource {
  constructor(object, wrap = true) {
    super(object);

    const data = this.toArray();

    if (wrap) {
      return {
        data,
      };
    }

    return data;
  }

  static collection(array, wrap = true) {
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