OrdersCompleteController = RouteController.extend({
  waitOn: function () {

  },

  data: function () {
  	var orderId = this.params._id;
  	return Orders.findOne(orderId);
  },

  action: function () {
    this.render();
  }
});