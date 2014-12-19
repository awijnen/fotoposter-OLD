Orders = new Mongo.Collection('orders');
/*
 * Add query methods like this:
 *  Orders.findPublic = function () {
 *    return Orders.find({is_public: true});
 *  }
 */

Orders.attachSchema(new SimpleSchema({
	userId: {
		type: String,
		label: 'User'
	},
	remark: {
		type: String,
		label: 'Opmerking'
	},
	status: {
		type: String,
		label: 'Status'
	},
	submitted: {
		type: Date,
		label: 'Datum ingegeven'
	},
	price: {
		type: Number,
		label: 'Prijs'
	},
	isPaid: {
		type: Boolean,
		label: 'Is betaald'
	},
	processingStarted: {
		type: Boolean,
		label: 'Werk gestart'
	}
}));