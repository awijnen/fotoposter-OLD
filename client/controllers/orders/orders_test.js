OrdersTestController = RouteController.extend({
  waitOn: function () {
	var orderId = Session.get('currentOrderId');
	Meteor.subscribe('order_items_index', {userId: Meteor.userId(), orderId: orderId});
  },

  data: function () {
	var orderId = Session.get('currentOrderId');
	return Orders.findOne(orderId);
  },

  action: function () {
	this.render();
	this.render('OrderActionFlow', {to: 'orderActionFlow'});
  }
});