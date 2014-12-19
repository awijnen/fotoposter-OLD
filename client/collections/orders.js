Orders.allow({
    insert: function(userId) {
        return userId;
    },

    update: function(userId, doc, fieldNames, modifier) {
        return userId;
    },

    remove: function(userId, doc) {
        return userId;
    }
});

Orders.deny({
    insert: function(userId) {
        return false;
    },

    update: function(userId, doc, fieldNames, modifier) {
        return false;
    },

    remove: function(userId, doc) {
        return false;
    }
});

/*
 * Add query methods like this:
 *  Orders.findPublic = function () {
 *    return Orders.find({is_public: true});
 *  }
 */