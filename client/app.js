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
    }
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});