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
	},

	'click .ordersnew-uploadbutton': function() {
		var orderAttributes = {
			remark: "Dit is een order dat nog in je winkelwagen zit omdat het status 'cart' heeft.",
			status: 'cart',
			price: 100,
		};

		Meteor.call('orderInsert', orderAttributes, function(error, orderId) {
			if (error) {
				throw new Error('orderInsert method malfunction');
			} else {
				Session.set('orderIdToBeConfigured', orderId);

				var imageUrlArray = Session.get('imageUrlArray');
				imageUrlArray.forEach(function(element, index, array) {
					var orderItemAttributes = {
						remark: "Deze foto mag je lekker afdrukken Yo!",
						orderId: orderId,
						image: element,
					};

					Meteor.call('orderItemInsert', orderItemAttributes, function(error, orderItemId) {
						if (error) {
							throw new Error('orderItemInsert method malfunction');
						} else {
							console.log("Created OrderItem ('" + orderItemId + "'') as part of Order ('" + orderId + "')");
						}
					});
				});
			}
		});
	},

	'click .ordersnew-configurebutton': function() {
		var orderId = Session.get('orderIdToBeConfigured');
		var orderItemId = OrderItems.findOne({orderId: orderId})._id;
		Router.go('order.items.configure', {_order_id: orderId, _order_item_id: orderItemId});
	}
});

Template.OrdersNew.helpers({
	imageUrlArray: function() {
		var imageUrlArray = Session.get('imageUrlArray');
		return imageUrlArray;
	},

	numberOfImages: function() {
		return Session.get('imageUrlArray').length;
	}
});

/*****************************************************************************/
/* New: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersNew.created = function () {
	Session.set('imageUrlArray', [
		'https://s3.eu-central-1.amazonaws.com/fotoposter/Customs.jpg',
		'https://s3.eu-central-1.amazonaws.com/fotoposter/bicycle_road.jpeg',
		'https://s3.eu-central-1.amazonaws.com/fotoposter/bulb.jpg'
		]
	);
};

Template.OrdersNew.rendered = function () {
};

Template.OrdersNew.destroyed = function () {
};