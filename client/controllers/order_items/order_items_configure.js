OrderItemsConfigureController = RouteController.extend({
  waitOn: function () {},

  data: function () {
  	var orderItemId = this.params._order_item_id;
  	return OrderItems.findOne(orderItemId);
  },

  action: function () {
    this.render();
  }
});

OrderItemsConfigureController.helpers({
	getOrderId: function(orderId) {
    	return Orders.findOne(orderId)._id;
    }
});