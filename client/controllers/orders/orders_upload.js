OrdersUploadController = RouteController.extend({
  waitOn: function () {
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