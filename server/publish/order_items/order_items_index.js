/*****************************************************************************/
/* OrderItemsIndex Publish Functions
/*****************************************************************************/

Meteor.publish('order_items_index', function () {
  return OrderItems.find();
});