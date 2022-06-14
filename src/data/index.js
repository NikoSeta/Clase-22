const { schema, normalize, denormalize } = require('normalizr') 
const util = require('util')


function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

let array = []

const user = new schema.Entity('users')
const comment = new schema.Entity('comments', {
    commenter: user
});
const post = new schema.Entity('posts', {
    author: user,
    comments: [comment]
});
const blog = new schema.Entity('blog', {
    posts: [post]
});

console.log('----------- OBJETO ORIGINAL --------------');
console.log(JSON.stringify(originalData).length);

console.log('----------- OBJETO NORMALIZADO --------------');
const normalizeData = normalize(originalData, blog);
print(normalizeData)
console.log(JSON.stringify(normalizeData).length);

console.log('----------- OBJETO DESNORMALIZADO --------------');
const denormalizeData = denormalize(normalizeData.result, blog, normalizeData.entities);
print(denormalizeData)