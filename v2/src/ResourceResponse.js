class ResourceResponse {
  constructor(resource) {
    this.resource = resource;
  }

  toResponse() {
    return this.wrap(this.resource.resolve(), this.resource.with(), this.resource._additional);
  }

  wrap(data, _with = [], _additional = []) {
    if (this.haveDefaultWrapperAndDataIsUnwrapped(data)) {
      data = {
        [this.wrapper()]: data
      };
    } else if (this.haveAdditionalInformationAndDataIsUnwrapped(data, _with, _additional)) {
      data = {
        [this.wrapper() || 'data']: data
      };
    }

    return Object.assign(data, _with, _additional);
  }

  wrapper() {
    return this.resource.wrap;
  }

  haveDefaultWrapperAndDataIsUnwrapped(data) {
    return this.wrapper() && !(this.wrapper() in data);
  }

  haveAdditionalInformationAndDataIsUnwrapped(data, _with = [], _additional = []) {
    return (_with.length || _additional.length) && (!this.wrapper() || !this.wrapper() in data);
  }
}

module.exports = ResourceResponse;