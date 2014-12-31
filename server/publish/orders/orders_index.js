/*****************************************************************************/
/* OrdersIndex Publish Functions
/*****************************************************************************/

Meteor.publish('orders_index', function (orderAttributes) {
  return Orders.find(orderAttributes);
});