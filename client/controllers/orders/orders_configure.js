OrdersConfigureController = RouteController.extend({
  waitOn: function () {},

  data: function () {
  	// var orderItemId = this.params._id;
  	// return OrderItems.findOne(orderItemId);
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