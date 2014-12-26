OrdersConfigureController = RouteController.extend({
	waitOn: function () {
		Meteor.subscribe('order_items_index', {userId: Meteor.userId(), orderId: this.params._id});
	},

	data: function () {},

	action: function () {
		this.render();
	}
});

OrdersConfigureController.helpers({
	getOrderId: function() {
		var orderId = this.params._id;
		return Orders.findOne(orderId)._id;
	}
});