/*****************************************************************************/
/* OrdersConfigure: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersConfigure.events({
	'submit form.ordersconfigure-form': function(e, templ) {
		e.preventDefault();

		var orderItemAttributes = {
			configured: true,
			quantity: templ.find('input[name=quantity]').value,
			width: templ.find('input[name=width]').value,
			length: templ.find('input[name=length]').value,
			paper: templ.find('select[name=paper]').value,
			finish: templ.find('select[name=finish]').value,
			suspension: templ.find('select[name=suspension]').value,
			laminate: templ.find('input[name=laminate]').checked
		};

		var onLastOrderItemDone = function() {
			var orderId = Session.get('currentOrderId');
			var orderItem = OrderItems.findOne({configured: false, orderId: orderId});

			if(orderItem) {
				var orderItemId = orderItem._id;
				Session.set('orderItemsBeingConfigured', [{orderItemId: orderItemId}]);
			}
		};

		App.updateOrderItems('orderItemsBeingConfigured', orderItemAttributes, onLastOrderItemDone);
	}
});

Template.OrdersConfigure.helpers({
	currentOrderItems: function() {
		var controller = Iron.controller();
		var orderId = controller.params._id;

		var orderItemsBeingConfigured = Session.get('orderItemsBeingConfigured');
		// reduce array to one that's a simple array of strings representing IDs, which is required by the mongo db query API with the $in selector
		var ids = _.map(orderItemsBeingConfigured, function(obj) {
			return obj.orderItemId;
		});

		return OrderItems.find({
			_id: {$in: ids},
			orderId: orderId}
		);	
	},

	orderItemsConfigured: function(key, isConfigured) {
		var orderItems = OrderItems.find({configured: isConfigured});
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

	// On creation select the first order item belonging to the current order that hasn't been configured yet.
	var firstOrderItem = OrderItems.findOne({configured: false, orderId: orderId});

	if (firstOrderItem) {
		var firstOrderItemId = firstOrderItem._id;
		Session.set('orderItemsBeingConfigured', [{orderItemId: firstOrderItemId}]);
	}
};

Template.OrdersConfigure.rendered = function() {};

Template.OrdersConfigure.destroyed = function() {};
