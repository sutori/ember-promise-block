import Ember from 'ember';

/* Input:
 * - promise
 * - loaderTemplate: partial that will be shown as the loader
 */
export default Ember.Component.extend({
  classNames: ['promise-block'],
  classNameBindings: ['pendingPromise:is-pending'],

  /* Default */
  loaderTemplate: 'helpers/loader',

  /* Properties */
  pendingPromise: Ember.computed.not('readyToShowContent'),
  readyToShowContent: Ember.computed.or('promise.isFulfilled', 'promiseContentAlreadyLoadedOnce'),
  promiseContentAlreadyLoadedOnce: Ember.computed('promiseContentAsArray.@each.isEmpty', 'promiseContentAsArray.@each.isLoading', 'promiseContentAsArray.@each.isReloading', function() {
    // If any of the models in the content has been fully loaded at least
    // once, we won't show the loader for this promise block anymore.
    return this.get('promiseContentAsArray').any((model) => {
      // Filter out models that haven't been loaded at least once to this point.
      return !(model.get('isEmpty') || model.get('isLoading')) || model.get('isReloading');
    });
  }),
  promiseContentAsArray: Ember.computed('promise.content', function() {
    let models = this.get('promise.content') || Ember.A([]);
    if (! Ember.isArray(models)) {
      models = Ember.A([models]);
    }

    return models;
  })
});
