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
    return {};
  }
}

module.exports = PaginatedResourceResponse;