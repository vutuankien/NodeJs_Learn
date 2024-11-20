const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const uid = new ShortUniqueId({ length: 5 });
const CourseSchema = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, unique: true },
        videoId: { type: String, maxLength: 255 },
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    },
);
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

CourseSchema.pre('save', function (next) {
    let course = this;
    let newSlug = slugify(course.name, { lower: true, replacement: '_' });

    const existCourse = mongoose
        .model('Course')
        .findOne({ slug: newSlug })
        .lean();

    if (existCourse) {
        newSlug = newSlug + '_' + uid.rnd();
    }

    course.slug = newSlug;
    next();
});

module.exports = mongoose.model('Course', CourseSchema, 'Courses');
