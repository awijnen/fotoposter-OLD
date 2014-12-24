/*****************************************************************************/
/* OrdersConfigure: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersConfigure.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.OrdersConfigure.helpers({

});

/*****************************************************************************/
/* OrdersConfigure: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersConfigure.created = function() {
	var controller = Iron.controller();
	Session.set('currentOrderId', controller.params._id);
};

Template.OrdersConfigure.rendered = function() {};

Template.OrdersConfigure.destroyed = function() {};
