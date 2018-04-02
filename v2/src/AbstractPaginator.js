class AbstractPaginator {
  constructor(items, perPage, currentPage, options) {
    for (let option in options) {
      this[option] = options[otion];
    }

    this.setItems(items);
  }

  setItems(items) {
    this.items = items;

    return this;
  }

  mapInto(className) {
    return this.items.map(item => {
      return new className(item);
    });
  }

  toArray() {
    return {
      data: this.items,
    };
  }
}

module.exports = AbstractPaginator;