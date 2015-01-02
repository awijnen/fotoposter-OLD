OrdersCartController = RouteController.extend({
	waitOn: function() {
		return Meteor.subscribe('order_items_index', {userId: Meteor.userId()});
	},

	data: function() {},

	action: function() {
		this.render();
	}
});

OrdersCartController.helpers({
	orders: function() {
		return Orders.find({
			userId: Meteor.userId(),
			status: 'cart'
		});
	}
});
