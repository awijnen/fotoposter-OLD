OrdersConfirmController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe('order_items_index', {userId: Meteor.userId(), orderId: this.params._id});
  },

  data: function () {
  	var orderId = this.params._id;
	return Orders.findOne(orderId);
  },

  action: function () {
    this.render();
    this.render('OrderActionFlow', {to: 'orderActionFlow'});
  }
});