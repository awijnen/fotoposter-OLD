/*****************************************************************************/
/* New: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersNew.events({
    'click .ordersnew-uploadsubmit': function(e, templ) {
        Session.set('uploading', true);
        var fileObjects = document.getElementById('ordersnew-uploadcontrol').files;
        var files = _.map(fileObjects, function(file) {
            return file;
        });
        var sessionArrayKey = 'imageUrlArray';

        var uploadDone = function(err, cloudStorageUrl) {
            if (err) {
                console.dir(err);
            } else {
                console.log('Pushing cloudStorageUrl in Session variable "imageUrlArray" ...' + cloudStorageUrl);
                App.sessionArrayPush(sessionArrayKey, cloudStorageUrl);
            }
        };

        var lastUploadDone = function(err, cloudStorageUrl) {
            if (err) {
                console.dir(err);
            } else {
                console.log('Pushing cloudStorageUrl in Session variable "imageUrlArray" ...' + cloudStorageUrl + '\nLast upload done starting insert ...');
                App.sessionArrayPush(sessionArrayKey, cloudStorageUrl);
                Session.set('uploading', false);
                runInsert();
            }
        };

        files.forEach(function(file, index, array) {
            var uploader = new Slingshot.Upload("myFileUploads");
            if (index == array.length-1) {uploader.send(file, lastUploadDone);}
            else {uploader.send(file, uploadDone);}
        });

        var runInsert = function() {
        	var orderAttributes = {
	            remark: "Dit is een order dat nog in je winkelwagen zit omdat het status 'cart' heeft.",
	            status: 'cart',
	            price: 100,
	        };

	        Meteor.call('orderInsert', orderAttributes, function(error, orderId) {
	            if (error) {
	                throw new Error('orderInsert method malfunction');
	            } else {
	                console.log("Created order with Order ID: ('" + orderId + "')");
	                Session.set('currentOrderId', orderId);

	                var imageUrlArray = Session.get('imageUrlArray');
			        imageUrlArray.forEach(function(url, index, array){
			        	var orderItemAttributes = {
				            orderId: orderId,
				            image: url,
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
        };
    },

    // 'click .ordersnew-uploadbutton': function() {
    //     var orderAttributes = {
    //         remark: "Dit is een order dat nog in je winkelwagen zit omdat het status 'cart' heeft.",
    //         status: 'cart',
    //         price: 100,
    //     };

    //     Meteor.call('orderInsert', orderAttributes, function(error, orderId) {
    //         if (error) {
    //             throw new Error('orderInsert method malfunction');
    //         } else {
    //             Session.set('currentOrderId', orderId);

    //             var imageUrlArray = Session.get('imageUrlArray');
    //             imageUrlArray.forEach(function(element, index, array) {
    //                 var orderItemAttributes = {
    //                     remark: "Deze foto mag je lekker afdrukken Yo!",
    //                     orderId: orderId,
    //                     image: element,
    //                 };

    //                 Meteor.call('orderItemInsert', orderItemAttributes, function(error, orderItemId) {
    //                     if (error) {
    //                         throw new Error('orderItemInsert method malfunction');
    //                     } else {
    //                         console.log("Created OrderItem ('" + orderItemId + "'') as part of Order ('" + orderId + "')");
    //                     }
    //                 });
    //             });
    //         }
    //     });
    // },

    'click .ordersnew-configurebutton': function() {
        var orderId = Session.get('currentOrderId');
        var orderItemId = OrderItems.findOne({
            orderId: orderId
        })._id;
        Router.go('order.items.configure', {
            _order_id: orderId,
            _order_item_id: orderItemId
        });
    }
});

Template.OrdersNew.helpers({
    numberOfImages: function() {
        return Session.get('imageUrlArray').length;
    },

    uploadingFiles: function() {
    	return Session.get('uploading');
    },

    filesUploaded: function() {
    	var sessionArrayHasImages = ! _.isEmpty(Session.get('imageUrlArray'));
    	var loadingHasFinished = ! Session.get('uploading');
    	return sessionArrayHasImages && loadingHasFinished;
    }
});

/*****************************************************************************/
/* New: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersNew.created = function() {
    Session.set('imageUrlArray', [
    ]);
    Session.set('loading', false);
};

Template.OrdersNew.rendered = function() {};

Template.OrdersNew.destroyed = function() {};
