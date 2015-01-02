/*****************************************************************************/
/* OrderActionFlow: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.OrderActionFlow.events({

});

Template.OrderActionFlow.helpers({
  isActive: function(key) {
    var currentAction = Session.get('currentAction');
    if (currentAction === key) return 'active';
  }
});

/*****************************************************************************/
/* OrderActionFlow: Lifecycle Hooks */
/*****************************************************************************/
Template.OrderActionFlow.created = function () {
};

Template.OrderActionFlow.rendered = function () {
};

Template.OrderActionFlow.destroyed = function () {
};