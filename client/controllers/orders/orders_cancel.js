OrdersCancelController = RouteController.extend({
  waitOn: function () {
  	var orderId = this.params._id;
  	Meteor.subscribe('order_items_index', {userId: Meteor.userId(), orderId: orderId});
  },

  data: function () {
  	var orderId = this.params._id;
  	return Orders.findOne(orderId);
  },

  action: function () {
    this.render();
  }
});