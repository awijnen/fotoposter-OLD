OrdersCartController = RouteController.extend({
	waitOn: function() {},

	data: function() {},

	action: function() {
		this.render();
	}
});

OrdersCartController.helpers({
	orders: function() {
		return Orders.find({
			status: 'cart'
		});
	},

	getPaperName:function(paperId) {
		return Papers.findOne(paperId).name;
	},

	getFinishName:function(finishId) {
		return Finishes.findOne(finishId).name;
	},

	getSuspensionName:function(suspensionId) {
		return Suspensions.findOne(suspensionId).name;
	}
});
