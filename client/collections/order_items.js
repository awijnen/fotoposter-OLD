OrderItems.allow({
    update: function(userId, doc, fieldNames, modifier) {
        return userId;
    },

    remove: function(userId, doc) {
        return userId;
    }
});

OrderItems.deny({
    update: function(userId, doc, fieldNames, modifier) {
        return false;
    },

    remove: function(userId, doc) {
        return false;
    }
});

/*
 * Add query methods like this:
 *  OrderItems.findPublic = function () {
 *    return OrderItems.find({is_public: true});
 *  }
 */