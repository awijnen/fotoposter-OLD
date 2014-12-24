OrdersConfigureController = RouteController.extend({
	waitOn: function () {},

	data: function () {
		return OrderItems.findOne({orderId: this.params._id});
	},

	action: function () {
		this.render();
	}
});

OrdersConfigureController.helpers({
	getOrderId: function(orderId) {
			return Orders.findOne(orderId)._id;
		}
});