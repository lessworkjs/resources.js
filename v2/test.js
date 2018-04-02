const Resource = require('./src/Resource');

class Transform extends Resource {
  toArray() {
    return {
      ida: this.id
    }
  }
}

const SimplePaginator = require('./SimplePaginator');

Transform.withoutWrapping();
Transform.wrap = "data"

console.log('paginated collection', Transform.collection(new SimplePaginator([{
  id: '1'
}, {
  id: '2'
}])).additional().response())

console.log('regular collection', Transform.collection([{
    id: '1'
  },
  {
    id: '2'
  }
]).additional({
  meta: {
    key: 'value'
  }
}).response())

Transform.wrap = null

console.log('regular collection no wrap', Transform.collection([{
    id: '1'
  },
  {
    id: '2'
  }
]).additional({
  meta: {
    key: 'value'
  }
}).response())

let v = new Transform({
  id: '1'
});
v.wrap = null
console.log('single no wrap', v.response());

v = new Transform({
  id: '1'
}).additional({
  additional: ['data']
});
console.log('single', v.response());