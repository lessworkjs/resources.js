const Resource = require('./Resource');

class Transform extends Resource {
  toArray() {
    return {
      ida: this.id
    }
  }
}

console.log('results', Transform.collection([{
  id: '1'
}]).process())

/*
console.log(new Resource({
  id: '1'
}).process());*/