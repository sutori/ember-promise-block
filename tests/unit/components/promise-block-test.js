import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('promise-block', 'Component - Promise block - Unit', {
  unit: true
});

test('Property - promiseContentAsArray', function(assert) {
  let content;
  let promise;

  const component = this.subject();

  // Not an array
  content = Ember.Object.create();
  promise = Ember.Object.create({
    content: content
  });
  component.set('promise', promise);
  assert.deepEqual(component.get('promiseContentAsArray'), [content]);

  // Is an array
  content = [Ember.Object.create()];
  promise = Ember.Object.create({
    content: content
  });
  component.set('promise', promise);
  assert.equal(component.get('promiseContentAsArray'), content);

  // Is null
  content = null;
  promise = Ember.Object.create({
    content: content
  });
  component.set('promise', promise);
  assert.deepEqual(component.get('promiseContentAsArray'), []);
});

test('Property - promiseContentAlreadyLoadedOnce', function(assert) {
  const promiseContent = Ember.Object.create();
  const component = this.subject({
    promiseContentAsArray: Ember.A([promiseContent])
  });

  assert.ok(component.get('promiseContentAlreadyLoadedOnce'));

  // is empty
  promiseContent.set('isEmpty', true);
  assert.ok(! component.get('promiseContentAlreadyLoadedOnce'));
  promiseContent.set('isEmpty', false);

  // is loading
  promiseContent.set('isLoading', true);
  assert.ok(! component.get('promiseContentAlreadyLoadedOnce'));
  promiseContent.set('isLoading', false);

  // is empty but reloading
  promiseContent.setProperties({
    isEmpty: true,
    isReloading: true
  });
  assert.ok(component.get('promiseContentAlreadyLoadedOnce'));
});

test('Property - readyToShowContent', function(assert) {
  const promise = Ember.Object.create();
  const component = this.subject({
    promise: promise
  });

  component.set('promiseContentAlreadyLoadedOnce', false);
  promise.set('isFulfilled', false);
  assert.ok(! component.get('readyToShowContent'));

  component.set('promiseContentAlreadyLoadedOnce', true);
  promise.set('isFulfilled', false);
  assert.ok(component.get('readyToShowContent'));

  component.set('promiseContentAlreadyLoadedOnce', false);
  promise.set('isFulfilled', true);
  assert.ok(component.get('readyToShowContent'));

  component.set('promiseContentAlreadyLoadedOnce', true);
  promise.set('isFulfilled', true);
  assert.ok(component.get('readyToShowContent'));
});

test('Property - pendingPromise', function(assert) {
  const component = this.subject();

  component.set('readyToShowContent', false);
  assert.ok(component.get('pendingPromise'));

  component.set('readyToShowContent', true);
  assert.ok(! component.get('pendingPromise'));
});
