/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound',
    waitOn: function() {
		return [
					Meteor.subscribe('userData'),
					Meteor.subscribe('orders_index', {userId: Meteor.userId()}),
					Meteor.subscribe('papers_index'),
					Meteor.subscribe('finishes_index'),
					Meteor.subscribe('suspensions_index'),
				];
    }
});

/*
 *  Example:
 *  Router.route('/', {name: 'home'});
 */

Router.route('/', {name: 'landing'});

Router.route('/signin', {name: 'signin'});
Router.route('/signup', {name: 'signup'});

Router.route('/memberzone', {name: 'memberzone'});

Router.route('/orders', {name: 'orders.index'});
Router.route('/orders/cart', {name: 'orders.cart'});

Router.route('/orders/upload', {name: 'orders.upload'});
Router.route('/orders/configure/:_id', {name: 'orders.configure'});
Router.route('/orders/confirm/:_id', {name: 'orders.confirm'});
Router.route('/orders/complete/:_id', {name: 'orders.complete'});
Router.route('/orders/cancel/:_id', {name: 'orders.cancel'});

Router.route('/orders/test', {name: 'orders.test'});

Router.route('/papers', {name: 'papers.index'});
Router.route('/prices', {name: 'prices.index'});
Router.route('/finishes', {name: 'finishes.index'});
Router.route('/suspensions', {name: 'suspensions.index'});



/*
 * Require login for all but the informative pages
 */
var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			console.log('You need to login first.');
			Router.go('landing');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: ['orders.index', 'orders.upload', 'orders.configure', 'orders.confirm', 'orders.complete', 'orders.cancel', 'orders.cart']});