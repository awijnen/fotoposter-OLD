/*****************************************************************************/
/* OrderItemsIndex Publish Functions
/*****************************************************************************/

Meteor.publish('order_items_index', function (orderItemAttributes) {
  return OrderItems.find(orderItemAttributes);
});