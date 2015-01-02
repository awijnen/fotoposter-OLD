/*****************************************************************************/
/* OrdersConfirm: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersConfirm.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.OrdersConfirm.helpers({
  orderItems: function() {
    var orderId = this._id;
    return OrderItems.find({orderId: orderId});
  }
});

/*****************************************************************************/
/* OrdersConfirm: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersConfirm.created = function () {
  Session.set('currentAction', 'confirm');
};

Template.OrdersConfirm.rendered = function () {
};

Template.OrdersConfirm.destroyed = function () {
};