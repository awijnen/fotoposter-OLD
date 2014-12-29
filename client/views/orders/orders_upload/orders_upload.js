/*****************************************************************************/
/* New: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.OrdersUpload.events({
    'click .ordersupload-uploadsubmit': function(e, templ) {
        Session.set('uploading', true);
        var fileFormId = 'ordersupload-uploadcontrol';
        var fileFormControl = document.getElementById(fileFormId);
        var fileObjects = fileFormControl.files;
        var files = _.map(fileObjects, function(file) {
            return file;
        });
        var sessionArrayKey = 'imageUrlArray';
        var imageUrlKey = 'url';

        var orderAttributes = {
            remark: "Dit is een order dat nog in je winkelwagen zit omdat het status 'cart' heeft.",
            status: 'cart',
            price: 100,
        };

        var onOrderItemDone = function() {
        	console.log('onOrderItemDone callback executed');
    	};

        var onOrderDone = function() {
        	console.log('onOrderDone callback executed');
        };

        var onUploadDone = function(err, cloudStorageUrl) {
            if (err) {
                console.dir(err);
            } else {
                console.log('Pushing "' + cloudStorageUrl + '" in Session variable "imageUrlArray" ...');
                App.sessionArrayPush(sessionArrayKey, imageUrlKey, cloudStorageUrl);
            }
        };

        var onLastUploadDone = function() {
        	App.clearFileForm(fileFormId);
        	Session.set('uploading', false);
        	App.getOrCreateOrder(orderAttributes, onOrderDone, sessionArrayKey, imageUrlKey, onOrderItemDone);
        };

        App.uploadFileArray(files, onUploadDone, onLastUploadDone);
    },

    'change .ordersopen select': function(e, templ) {
        var val = templ.find('select').value;

        if (val === 'new_order') {
            Session.set('currentOrderId');
        } else {
            Session.set('currentOrderId', val);
        }
    }
});

Template.OrdersUpload.helpers({
    uploadingFiles: function() {
    	return Session.get('uploading');
    },

    orderItemsLoaded: function() {
    	var loadingHasFinished = ! Session.get('uploading');
    	var currentOrderId = Session.get('currentOrderId');
    	var orderItemsLoaded = ! _.isEmpty(OrderItems.find({orderId: currentOrderId}).fetch());

    	return loadingHasFinished && !!orderItemsLoaded;
    },

    currentOrderId: function() {
    	return Session.get('currentOrderId');
    },

    currentOrderItems: function(key) {
        var orderId = Session.get('currentOrderId');
        var orderItems = OrderItems.find({orderId: orderId});
        var result = {
            orderItems: orderItems,
            count: orderItems.count()
        };

        return result[key];
    }
});

/*****************************************************************************/
/* Upload: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersUpload.created = function() {
    Session.set('currentOrderId');
    Session.set('imageUrlArray', []);
    Session.set('uploading', false);
};

Template.OrdersUpload.rendered = function() {};

Template.OrdersUpload.destroyed = function() {};
