const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShortUniqueId = require('short-unique-id');
const slugify = require('slugify');

const uid = new ShortUniqueId({ length: 5 });
const author = new Schema({
    name: { type: 'string', required: true, maxLength: 255 },
    quotes: { type: 'string', required: true, maxLength: 255 },
    origin: { type: 'string', required: true, maxLength: 255 },
    content: { type: 'string', required: true, maxLength: 500 },
    image: { type: 'string', required: true },
    slug: { type: 'string', unique: true },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
});

author.pre('save', function (next) {
    let author = this;
    let authorslug = slugify(author.name, { lower: true, replacement: '_' });

    const existAuthor = mongoose
        .model('Author')
        .findOne({ slug: authorslug })
        .lean();

    if (existAuthor) {
        authorslug = authorslug + '_' + uid.rnd();
    }
    author.slug = authorslug;
    next();
});

module.exports = mongoose.model('Author', author, 'Authors');
