import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['promise-block'],
  classNameBindings: ['pendingPromise:is-pending'],

  /* Properties */
  pendingPromise: Ember.computed.not('readyToShowContent'),
  readyToShowContent: Ember.computed.or('promise.isFulfilled', 'promiseContentAlreadyLoadedOnce'),
  promiseContentAlreadyLoadedOnce: function() {
    // If any of the models in the content has been fully loaded at least
    // once, we won't show the loader for this promise block anymore.
    return this.get('promiseContentAsArray').any((model) => {
      // Filter out models that haven't been loaded at least once to this point.
      return !(model.get('isEmpty') || model.get('isLoading')) || model.get('isReloading');
    });
  }.property('promiseContentAsArray.@each.isEmpty', 'promiseContentAsArray.@each.isLoading', 'promiseContentAsArray.@each.isReloading'),
  promiseContentAsArray: function() {
    let models = this.get('promise.content') || [];
    if (! Ember.isArray(models)) {
      models = [models];
    }

    return models;
  }.property('promise.content')
});
