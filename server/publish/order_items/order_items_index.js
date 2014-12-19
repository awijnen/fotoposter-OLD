/*****************************************************************************/
/* OrderItemsIndex Publish Functions
/*****************************************************************************/

Meteor.publish('order_items_index', function (orderItem) {
  return OrderItems.find(orderItem);
});