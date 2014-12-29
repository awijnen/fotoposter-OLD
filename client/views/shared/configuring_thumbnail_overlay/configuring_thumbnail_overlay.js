/*****************************************************************************/
/* ConfiguringThumbnailOverlay: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ConfiguringThumbnailOverlay.events({
	'click a': function(e, templ) {
		var orderItemId = this._id;
		App.sessionArrayPopWithKeyValue('orderItemsBeingConfigured', 'orderItemId', orderItemId);
	}
});

Template.ConfiguringThumbnailOverlay.helpers({
	/*
	 * Example:
	 *  items: function () {
	 *    return Items.find();
	 *  }
	 */
});

/*****************************************************************************/
/* ConfiguringThumbnailOverlay: Lifecycle Hooks */
/*****************************************************************************/
Template.ConfiguringThumbnailOverlay.created = function () {
};

Template.ConfiguringThumbnailOverlay.rendered = function () {
};

Template.ConfiguringThumbnailOverlay.destroyed = function () {
};