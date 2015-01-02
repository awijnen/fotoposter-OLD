/*****************************************************************************/
/* Orders Methods */
/*****************************************************************************/

Meteor.methods({
    /*
     * Example:
     *  '/app/orders/update/email': function (email) {
     *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
     *  }
     *
     */

    orderInsert: function(orderAttributes) {
        var user = Meteor.user();
        var order = _.extend(orderAttributes, {
            userId: user._id,
            submitted: new Date(),
            isPaid: false,
            hasStarted: false
        });

        return Orders.insert(order);
    },

    orderDelete: function(id) {
        OrderItems.remove({orderId: id}, function(err, res) {
            if (err) {
                throw new Error(err);
            } else {
                console.log(res);
            }
        });

        Orders.remove(id, function(err, res) {
            if (err) {
                throw new Error(err);
            } else {
                console.log(res);
            }
        });
    }

});
