const ResourceResponse = require('./ResourceResponse');

class PaginatedResourceResponse extends ResourceResponse {
  toResponse() {
    return this.wrap(
      this.resource.resolve(),
      Object.assign({},
        this.paginationInformation(),
        this.resource.with(),
        this.resource._additional)
    );
  }

  paginationInformation() {
    const paginated = this.resource.resource.toArray();

    return {
      links: this.paginationLinks(paginated),
      meta: this.meta(paginated),
    };
  }

  paginationLinks(paginated) {
    return {
      first: paginated.first_page_url || null,
      last: paginated.last_page_url || null,
      prev: paginated.prev_page_url || null,
      next: paginated.next_page_url || null,
    };
  }

  meta(paginated) {
    const keys = Object.keys(paginated).filter(item => ![
      'data',
      'first_page_url',
      'last_page_url',
      'prev_page_url',
      'next_page_url',
    ].includes(item));

    const results = {};

    keys.forEach(key => {
      results[key] = paginated[key];
    });

    return results;
  }
}

module.exports = PaginatedResourceResponse;