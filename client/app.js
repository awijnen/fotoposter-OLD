/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
	sessionArrayPush: function(sessionArrayKey, newKey, newValue) {
		Session.setDefault(sessionArrayKey, []);
		var sessionArray = Session.get(sessionArrayKey);
		var pushObject = {};
		pushObject[newKey] = newValue;
		sessionArray.push(pushObject);
		Session.set(sessionArrayKey, sessionArray);
	},

	sessionArrayPop: function(sessionArrayKey) {
		var sessionArray = Session.get(sessionArrayKey);
		sessionArray.pop();
		Session.set(sessionArrayKey, sessionArray);
	},

	sessionArrayPopWithKeyValue: function(sessionArrayKey, searchKey, searchValue) {
		var sessionArray = Session.get(sessionArrayKey);
		var _sessionArray = sessionArray.filter(function(obj) {
			if (obj[searchKey] !== searchValue) {
				return obj;
			} else {
				return false;
			}
		});

		Session.set(sessionArrayKey, _sessionArray);
	},

	clearFileForm: function(elementId) {
		if (elementId.charAt(0) !== '#') {
			elementId = '#' + elementId;
		}
		var form = $(elementId);
		form.replaceWith(form = form.clone(true));
	},

	uploadFileArray: function(fileArray, onUploadDone, onLastUploadDone) {
		if (_.isEmpty(fileArray)) {
			onLastUploadDone();
			console.log('Done uploading files');
		} else {
			var file = fileArray.shift();

			var uploader = new Slingshot.Upload("myFileUploads");
			var uploadDone = function(err, cloudStorageUrl) {
				onUploadDone(err, cloudStorageUrl);
				return App.uploadFileArray(fileArray, onUploadDone, onLastUploadDone);
			};
			uploader.send(file, uploadDone);
		}
	},

	getOrCreateOrder: function(orderAttributes, onOrderDone, sessionArrayKey, imageUrlKey, onOrderItemDone) {
		var orderId;

		if (Session.get('currentOrderId')) {
			orderId = Session.get('currentOrderId');
			// onOrderDone();
			App.addOrderItemsToOrder(sessionArrayKey, imageUrlKey, orderId, onOrderItemDone);
		} else {
			orderId = Meteor.call('orderInsert', orderAttributes, function(error, orderId, onOrderDone) {
				if (error) {
					throw new Error('orderInsert method malfunction');
				} else {
					console.log("Created order with Order ID: ('" + orderId + "')");
					Session.set('currentOrderId', orderId);
					// onOrderDone();
					App.addOrderItemsToOrder(sessionArrayKey, imageUrlKey, orderId, onOrderItemDone);
				}
			});
		}
	},

	addOrderItemsToOrder: function(sessionArrayKey, key, orderId, onOrderItemDone) {
		var sessionArray = Session.get(sessionArrayKey);

		if (_.isEmpty(sessionArray)) {
			// sessionArray is empty
			console.log('Done adding order items to order. SessionArray is now empty.\n');
			console.log('setting "uploading" to false');
			Session.set('uploading', false);
		} else {
			var imageUrl = sessionArray.shift()[key];
			Session.set(sessionArrayKey, sessionArray);
			var orderItemAttributes = {
				orderId: orderId,
				image: imageUrl,
				configured: false
			};

			Meteor.call('orderItemInsert', orderItemAttributes, function(error, orderItemId) {
				if (error) {
					throw new Error('orderItemInsert method malfunction');
				} else {
					console.log("Created OrderItem ('" + orderItemId + "') as part of Order ('" + orderId + "')");
					onOrderItemDone();

					// Add another OrderItem
					App.addOrderItemsToOrder(sessionArrayKey, key, orderId, onOrderItemDone);
				}
			});
		}
	},

	updateOrderItems: function(sessionArrayKey, orderItemAttributes, onLastOrderItemDone) {
		var sessionArray = Session.get(sessionArrayKey);

		if (_.isEmpty(sessionArray)) {
			console.log('Done updating order items. SessionArray is now empty.\n');
			Session.set('updating', false);
			onLastOrderItemDone();
		} else {
			var orderItem = sessionArray.shift();
			var orderItemId = orderItem.orderItemId;

			Meteor.call('orderItemUpdate', orderItemId, orderItemAttributes, function(err, res) {
				if (err) {
					throw new Error(err);
				} else {
					// remove OrderItem from being-configured session variable
					App.sessionArrayPopWithKeyValue('orderItemsBeingConfigured', 'orderItemId', orderItemId);

					// insert next OrderItem
					App.updateOrderItems(sessionArrayKey, orderItemAttributes, onLastOrderItemDone);
				}
			});
		}
	}
});

App.helpers = {
	printPath: function() {
		if (Meteor.userId()) {
			return Router.routes['orders.upload'].path();
		}
		else {
			return Router.routes['signin'].path();
		}
	},

	addIndex: function (all) {
		return _.map(all, function(val, index) {
			return {index: index+1, value: val};
		});
	},

	selected: function(val1, val2) {
		return val1 === val2 ? ' selected' : '';
	},

	papers: function() {
		return Papers.find();
	},

	finishes: function() {
		return Finishes.find();
	},

	suspensions: function() {
		return Suspensions.find();
	},

	thumbnails: function(route) {
		switch (route) {
			case 'orders.upload':
				return OrderItems.find({orderId: Session.get('currentOrderId')});
			case 'orders.configure':
				return OrderItems.find({
					orderId: Session.get('currentOrderId'),
					configured: false
				});
			case 'orders.configured':
				return OrderItems.find({
					orderId: Session.get('currentOrderId'),
					configured: true
				});
			default:
				throw new Error("There's no thumbnail controller for this route: " + route);
		}
	},

	thumbnailsCount: function(route) {
		var orderItems = App.helpers.thumbnails(route);
		return orderItems.count();
	}
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});