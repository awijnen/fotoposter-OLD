/*****************************************************************************/
/* OrdersCart: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrdersCart.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.OrdersCart.helpers({
  orderItems: function() {
    return OrderItems.find({orderId: this._id});
  }
});

/*****************************************************************************/
/* OrdersCart: Lifecycle Hooks */
/*****************************************************************************/
Template.OrdersCart.created = function () {
};

Template.OrdersCart.rendered = function () {
};

Template.OrdersCart.destroyed = function () {
};