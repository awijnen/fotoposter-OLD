OrderItems = new Mongo.Collection('order_items');
/*
 * Add query methods like this:
 *  OrderItems.findPublic = function () {
 *    return OrderItems.find({is_public: true});
 *  }
 */

OrderItems.attachSchema(new SimpleSchema({
	userId: {
		type: String,
		label: 'User'
	},
	orderId: {
		type: String,
		label: 'Order'
	},
	quantity: {
		type: Number,
		label: 'Aantal'
	},
	width: {
		type: Number,
		label: 'Breedte'
	},
	length: {
		type: Number,
		label: 'Lengte'
	},
	paperId: {
		type: String,
		label: 'Papier'
	},
	finishId: {
		type: String,
		label: 'Afwerking'
	},
	suspensionId: {
		type: String,
		label: 'Ophanging'
	},
	laminate: {
		type: Boolean,
		label: 'Lamineren'
	},
	image: {
		type: String,
		label: 'Bestand'
	},
	remark: {
		type: String,
		label: 'Opmerking'
	},
	submitted: {
		type: Date,
		label: 'Datum ingegeven'
	}
}));