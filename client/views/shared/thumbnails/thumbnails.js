/*****************************************************************************/
/* Thumbnails: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Thumbnails.events({
	/*
	 * Example:
	 *  'click .selector': function (e, tmpl) {
	 *
	 *  }
	 */
});

Template.Thumbnails.helpers({
	orderItemsInCurrentOrder: function() {
		return OrderItems.find({orderId: Session.get('currentOrderId')});
	},

	numberOfOrderItems: function() {
		return OrderItems.find({orderId: Session.get('currentOrderId')}).count();
	}
});

/*****************************************************************************/
/* Thumbnails: Lifecycle Hooks */
/*****************************************************************************/
Template.Thumbnails.created = function() {};

Template.Thumbnails.rendered = function() {};

Template.Thumbnails.destroyed = function() {};
