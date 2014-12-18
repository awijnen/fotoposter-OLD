/*****************************************************************************/
/* OrderItemsNew: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrderItemsNew.events({
  'submit form': function (e, templ) {
    e.preventDefault();

    var orderItem = {
      remark: templ.find('textarea[name=remark]').value
    };

    Meteor.call('orderItemInsert', orderItem, function(error, orderItemId) {
      if (error) {
        throw new Error('orderItemInsert method malfunction');
      } else {
        Router.go('landing');
      }
    });
  }
});

Template.OrderItemsNew.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* OrderItemsNew: Lifecycle Hooks */
/*****************************************************************************/
Template.OrderItemsNew.created = function () {
};

Template.OrderItemsNew.rendered = function () {
};

Template.OrderItemsNew.destroyed = function () {
};