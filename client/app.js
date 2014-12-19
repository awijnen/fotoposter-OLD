/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
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
	}
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});