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
Template.OrdersOpen.created = function() {};

Template.OrdersOpen.rendered = function() {};

Template.OrdersOpen.destroyed = function() {};
