/*****************************************************************************/
/* SuspensionsIndex Publish Functions
/*****************************************************************************/

Meteor.publish('suspensions_index', function () {
  return Suspensions.find();
});