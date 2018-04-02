const AbstractPaginator = require('./src/AbstractPaginator');

class SimplePaginator extends AbstractPaginator {
  toArray() {
    return {
      current_page: null, // this.currentPage(),
      data: this.items,
      first_page_url: null, //this.url(1),
      from: null, //this.firstItem(),
      next_page_url: null, //this.nextPageUrl(),
      path: null, //this.path,
      per_page: null, //this.perPage(),
      prev_page_url: null, //this.previousPageUrl(),
      to: null, //this.lastItem(),
    };
  }
}

module.exports = SimplePaginator;