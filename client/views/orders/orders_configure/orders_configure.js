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
		var orderItemsBeingConfigured = _.map(Session.get('orderItemsBeingConfigured'), function(obj) {
			return obj.orderItemId;
		});

		var orderItems = OrderItems.find({
			configured: isConfigured,
			_id: {
				$nin: orderItemsBeingConfigured
			}
		});

		var result = {
			orderItems: orderItems,
			count: orderItems.count()
		};

		return result[key];
	},

	currentOrderItem: function(key) {
		var firstOrderItemBeinfConfigured = Session.get('orderItemsBeingConfigured')[0];

		if (firstOrderItemBeinfConfigured) {
			var orderItem = OrderItems.findOne(firstOrderItemBeinfConfigured.orderItemId);

			if (orderItem[key]) { return orderItem[key]; }
		}

		return '';
	}
});

/*****************************************************************************/
/* OrdersConfigure: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersConfigure.created = function() {
	var orderId = Iron.controller().params._id;
	Session.set('currentOrderId', orderId);
	Session.setDefault('orderItemsBeingConfigured', []);

	// On creation select the first order item belonging to the current order that hasn't been configured yet.
	var firstOrderItem = OrderItems.findOne({configured: false, orderId: orderId});

	if (firstOrderItem) {
		var firstOrderItemId = firstOrderItem._id;
		Session.set('orderItemsBeingConfigured', [{orderItemId: firstOrderItemId}]);
	}
};

Template.OrdersConfigure.rendered = function() {
	var syncFormValues = function() {
		var firstOrderItemBeinfConfigured = Session.get('orderItemsBeingConfigured')[0];

		var templ = Template.instance();
		var paper = $('select[name="paper"]');
		var finish = $('select[name="finish"]');
		var suspension = $('select[name="suspension"]');
		var laminate = $('input[name="laminate"]');

		if (firstOrderItemBeinfConfigured) {
			var orderItem = OrderItems.findOne(firstOrderItemBeinfConfigured.orderItemId);

			var paper_db = Papers.findOne(orderItem.paper);
			var finish_db = Finishes.findOne(orderItem.finish);
			var suspension_db = Suspensions.findOne(orderItem.suspension);

			if (paper_db) {
				paper.val(paper_db._id);
			} else {
				paper.val('');
			}

			if (finish_db) {
				finish.val(finish_db._id);
			} else {
				finish.val('');
			}

			if (suspension_db) {
				suspension.val(suspension_db._id);
			} else {
				suspension.val('');
			}

			if (!!orderItem.laminate) {
				laminate.prop('checked', true);
			} else {
				laminate.prop('checked', false);
			}
		} else {
			paper.val('');
			finish.val('');
			suspension.val('');
			laminate.prop('checked', false);
		}
	};

	this.autorun(syncFormValues);
};

Template.OrdersConfigure.destroyed = function() {};
