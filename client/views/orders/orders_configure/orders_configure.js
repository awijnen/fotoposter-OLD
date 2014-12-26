/*****************************************************************************/
/* OrdersConfigure: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersConfigure.events({
    'submit form.ordersconfigure-form': function(e, templ) {
    	e.preventDefault();

    	var orderItemAttributes = {
    		quantity: templ.find('input[name=quantity]').value,
	    	width: templ.find('input[name=width]').value,
	    	length: templ.find('input[name=length]').value,
	    	paper: templ.find('select[name=paper]').value,
	    	finish: templ.find('select[name=finish]').value,
	    	suspension: templ.find('select[name=suspension]').value
    	};
    }
});

Template.OrdersConfigure.helpers({
	currentOrderItems: function() {
		var controller = Iron.controller();
		var orderItemsBeingConfigured = Session.get('orderItemsBeingConfigured');
		// reduce array to one that's a simple array of strings representing IDs, which is required by the mongo db query API with the $in selector
		var ids = _.map(orderItemsBeingConfigured, function(obj) {
			return obj.orderItemId;
		});

		return OrderItems.find({
			_id: {$in: ids},
			orderId: controller.params._id}
		);
	},

	orderItemsConfiguring: function(key) {
		var orderItems = OrderItems.find({configured: false});
		var result = {
			orderItems: orderItems,
			count: orderItems.count()
		};

		return result[key];
	},

	orderItemsConfigured: function(key) {
		var orderItems = OrderItems.find({configured: true});
		var result = {
			orderItems: orderItems,
			count: orderItems.count()
		};

		return result[key];
	}
});

/*****************************************************************************/
/* OrdersConfigure: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersConfigure.created = function() {
	var orderId = Iron.controller().params._id;
	Session.set('currentOrderId', orderId);

	// If there's no order items being configured in the current session, find one belonging to the current order. Otherwise, just stick with the current session array of order items
	if (!Session.get('orderItemsBeingConfigured')) {
		var firstOrderItemId = OrderItems.findOne({orderId: orderId})._id;
		Session.set('orderItemsBeingConfigured', [{orderItemId: firstOrderItemId}]);
	}
};

Template.OrdersConfigure.rendered = function() {};

Template.OrdersConfigure.destroyed = function() {};
