const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');
const slugify = require('slugify');

const uid = new ShortUniqueId({ length: 5 });
const Schema = mongoose.Schema;
const newsSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        slug: { type: String, unique: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    },
);

newsSchema.pre('save', function (next) {
    let news = this;
    let newSlug = slugify(news.title, { lower: true, replacement: '_' });

    const existNews = mongoose.model('News').findOne({ slug: newSlug }).lean();

    if (existNews) {
        newSlug = newSlug + '_' + uid.rnd();
    }
    news.slug = newSlug;
    next();
});

module.exports = mongoose.model('News', newsSchema, 'News');
