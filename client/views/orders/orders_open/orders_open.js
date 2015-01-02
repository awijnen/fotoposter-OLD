/*****************************************************************************/
/* OrdersOpen: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersOpen.events({
	'change #test': function() {
		var template = Template.instance();
		var select = template.find('#test');
		var orderIdSelected = select.options[select.selectedIndex].value;
		Session.set('currentOrderId', orderIdSelected);
	}
});

Template.OrdersOpen.helpers({
	openOrders: function() {
		var currentUser = Meteor.userId();
		return Orders.find({userId: currentUser, status: 'cart'});
	}
});

/*****************************************************************************/
/* OrdersOpen: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersOpen.created = function() {
	var controller = Iron.controller();
	var orderId = controller.params.hash;
	Session.set('currentOrderId', orderId);
};

Template.OrdersOpen.rendered = function() {
	var syncDropdown = function() {
		var templ = Template.instance();
		var dropdown = $('select[name="ordersopen-dropdown"]');
		var currentOrderId = Session.get('currentOrderId');

		if (currentOrderId) {
			dropdown.val(currentOrderId);
		} else {
			dropdown.val('new_order');
		}
	};

	this.autorun(syncDropdown);
};

Template.OrdersOpen.destroyed = function() {};
