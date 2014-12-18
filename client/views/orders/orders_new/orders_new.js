/*****************************************************************************/
/* New: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersNew.events({
	'submit form': function (e, templ) {
		e.preventDefault();

		var order = {
			remark: templ.find('textarea[name=remark]').value
		};

		Meteor.call('orderInsert', order, function(error, orderId) {
			if (error) {
				throw new Error('orderInsert method malfunction');
			} else {
				Router.go('landing');
			}
		});
	}
});

Template.OrdersNew.helpers({
	/*
	 * Example:
	 *  items: function () {
	 *    return Items.find();
	 *  }
	 */
});

/*****************************************************************************/
/* New: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersNew.created = function () {
};

Template.OrdersNew.rendered = function () {
};

Template.OrdersNew.destroyed = function () {
};