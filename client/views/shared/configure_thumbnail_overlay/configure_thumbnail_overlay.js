/*****************************************************************************/
/* ConfigureThumbnailOverlay: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ConfigureThumbnailOverlay.events({
	'click a': function(e, templ) {
		var orderItemId = this._id;
		App.sessionArrayPush('orderItemsBeingConfigured', 'orderItemId', orderItemId);
	}
});

Template.ConfigureThumbnailOverlay.helpers({
	/*
	 * Example:
	 *  items: function () {
	 *    return Items.find();
	 *  }
	 */
});

/*****************************************************************************/
/* ConfigureThumbnailOverlay: Lifecycle Hooks */
/*****************************************************************************/
Template.ConfigureThumbnailOverlay.created = function () {
};

Template.ConfigureThumbnailOverlay.rendered = function () {
};

Template.ConfigureThumbnailOverlay.destroyed = function () {
};