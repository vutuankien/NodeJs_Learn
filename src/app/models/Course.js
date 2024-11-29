const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const uid = new ShortUniqueId({ length: 5 });

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, unique: true },
        videoId: { type: String, maxLength: 255 },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
        level: { type: String, maxLength: 200 },
    },
    {
        timestamps: true,
        _id: false, // Tự động thêm createdAt và updatedAt
    },
);

// Auto-increment plugin for `_id`
CourseSchema.plugin(AutoIncrement);

// Soft delete plugin
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

// Middleware to generate unique slug before saving
CourseSchema.pre('save', async function (next) {
    let course = this;
    let newSlug = slugify(course.name, { lower: true, replacement: '_' });

    // Check if slug already exists
    const existCourse = await mongoose
        .model('Course')
        .findOne({ slug: newSlug })
        .lean();

    if (existCourse) {
        newSlug = `${newSlug}_${uid()}`;
    }

    course.slug = newSlug;
    next();
});

// Custom query helper for sorting
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

module.exports = mongoose.model('Course', CourseSchema, 'Courses');
