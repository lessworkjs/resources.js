'use strict';

class Resource {
  constructor(object, wrap = true) {
    Object.assign(this, object);
    const data = this.toArray();

    if (wrap) {
      return {
        data
      };
    }

    return data;
  }

  static collection(array, wrap = true) {
    array = array || [];
    const collection = array.data ? array.data : array;

    const data = collection.map(item => {
      return new this(item, false);
    });

    if (array.data) {
      return Object.assign({}, array, {
        data
      });
    }

    if (wrap) {
      return {
        data
      }
    }

    return data;
  }

  toArray() {
    return Object.assign({}, this);
  }
}

module.exports = Resource;