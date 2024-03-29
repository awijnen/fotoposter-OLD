/*****************************************************************************/
/* Header: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Header.events({
    'click #header-signout': function() {
    	Meteor.logout(function(err, templ) {
    		if (err) { Notifications.error('Error', err); }
    	});

    	Router.go('/');
    }
});

Template.Header.helpers({
    setActiveClass: function(linkName) {
        var cssClass = '';
        var currentRoute = Router.current().route.getName();

        if (linkName === currentRoute) {
            cssClass = 'active';
        }

        return cssClass;
    }
});

/*****************************************************************************/
/* Header: Lifecycle Hooks */
/*****************************************************************************/
Template.Header.created = function() {};

Template.Header.rendered = function() {};

Template.Header.destroyed = function() {};
