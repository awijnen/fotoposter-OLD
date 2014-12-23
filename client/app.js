/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
    sessionArrayPush: function(sessionArrayKey, newItem) {
        var sessionArray = Session.get(sessionArrayKey);
        sessionArray.push(newItem);
        Session.set(sessionArrayKey, sessionArray);
    },

    sessionArrayPop: function(sessionArrayKey) {
        var sessionArray = Session.get(sessionArrayKey);
        sessionArray.pop();
        Session.set(sessionArrayKey, sessionArray);
    },
});

App.helpers = {
	printPath: function() {
    	if (Meteor.userId()) {
    		return Router.routes['orders.new'].path();
    	}
    	else {
    		return Router.routes['signin'].path();
    	}
    },

    addIndex: function (all) {
	    return _.map(all, function(val, index) {
	        return {index: index+1, value: val};
	    });
	},

    selected: function(val1, val2) {
        return val1 === val2 ? ' selected' : '';
    },

    papers: function() {
        return Papers.find();
    },

    finishes: function() {
        return Finishes.find();
    },

    suspensions: function() {
        return Suspensions.find();
    }
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});