/*****************************************************************************/
/* OrdersTest: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersTest.events({
	"click button.upload": function() {
		var files = $("input.file_bag")[0].files;
		S3.upload(files, "/subfolder", function(e, r) {
				console.log(r);
		});
	}
});

Template.OrdersTest.helpers({
	"files": function() {
		return S3.collection.find();
	}
});

/*****************************************************************************/
/* OrdersTest: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersTest.created = function() {};

Template.OrdersTest.rendered = function() {};

Template.OrdersTest.destroyed = function() {};
