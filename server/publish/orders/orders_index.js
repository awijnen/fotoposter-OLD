/*****************************************************************************/
/* OrdersIndex Publish Functions
/*****************************************************************************/

Meteor.publish('orders_index', function (order) {
  return Orders.find(order);
});