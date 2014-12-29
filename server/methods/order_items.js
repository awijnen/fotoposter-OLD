/*****************************************************************************/
/* OrderItems Methods */
/*****************************************************************************/

Meteor.methods({
    /*
     * Example:
     *  '/app/order_items/update/email': function (email) {
     *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
     *  }
     *
     */

    orderItemInsert: function(orderItemAttributes) {
        var user = Meteor.user();
        var orderItem = _.extend(orderItemAttributes, {
            userId: user._id,
            submitted: new Date()
        });

        return OrderItems.insert(orderItem);
    },

    orderItemUpdate: function(id, orderItemAttributes) {
        return OrderItems.update(
            {_id: id},
            {$set: orderItemAttributes}
        );
    }
});
