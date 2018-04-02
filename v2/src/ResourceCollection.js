const Resource = require('./Resource');
const AbstractPaginator = require('./AbstractPaginator');
const PaginatedResourceResponse = require('./PaginatedResourceResponse');

class ResourceCollection extends Resource {
  constructor(resource, collects) {
    super(resource);

    this.wrap = collects.wrap;
    this.collects = collects;
    this.resource = this.collectResource(resource);
  }

  collectResource(resource) {
    if (resource instanceof AbstractPaginator) {
      this.collection = resource.mapInto(this.collects)

      return resource.setItems(this.collection);
    }

    return this.collection = resource.map(item => {
      return new this.collects(item);
    });
  }

  toArray() {
    return this.collection.map(item => {
      return item.toArray();
    })
  }

  toResponse() {
    if (this.resource instanceof AbstractPaginator) {
      return new PaginatedResourceResponse(this).toResponse();
    }

    return super.toResponse();
  }

}

module.exports = ResourceCollection;