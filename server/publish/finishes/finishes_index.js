/*****************************************************************************/
/* FinishesIndex Publish Functions
/*****************************************************************************/

Meteor.publish('finishes_index', function() {
    return Finishes.find();
});
