'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please provide post title',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please provide post description',
		trim: true
	},
	category: {
		type: String,
		default: '',
		required: 'Please provide category type',
		trim: true
	},
	gender: {
		type: String,
		default: '',
		required: 'Please provide category type',
		trim: true
	},
	price: {
		type: Number,
		default: '',
		required: 'Please provide pricing in $',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please provide a contact email address',
		trim: true
	},
	phone: {
		type: Number,
		default: '',
		required: 'Please provide a contact phonenumber',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Post', PostSchema);