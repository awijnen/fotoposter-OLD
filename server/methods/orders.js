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
        check(orderAttributes, {
            remark: String,
            status: String,
            price: Number
        });

        var user = Meteor.user();
        var order = _.extend(orderAttributes, {
            userId: user._id,
            submitted: new Date(),
            isPaid: false,
            hasStarted: false
        });

        return Orders.insert(order);
    }

});
