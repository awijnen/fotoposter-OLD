OrdersIndexController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});

OrdersIndexController.helpers({
	orders: function() {
		return Orders.find({status: 'submitted'});
	}
});