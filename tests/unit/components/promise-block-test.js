import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('promise-block', 'Component - Promise block - Unit', {
  unit: true
});

test('Property - promiseContentAsArray', function() {
  let content;
  let promise;

  const component = this.subject();

  // Not an array
  content = Ember.Object.create();
  promise = Ember.Object.create({
    content: content
  });
  component.set('promise', promise);
  deepEqual(component.get('promiseContentAsArray'), [content]);

  // Is an array
  content = [Ember.Object.create()];
  promise = Ember.Object.create({
    content: content
  });
  component.set('promise', promise);
  equal(component.get('promiseContentAsArray'), content);

  // Is null
  content = null;
  promise = Ember.Object.create({
    content: content
  });
  component.set('promise', promise);
  deepEqual(component.get('promiseContentAsArray'), []);
});

test('Property - promiseContentAlreadyLoadedOnce', function() {
  const promiseContent = Ember.Object.create();
  const component = this.subject({
    promiseContentAsArray: [promiseContent]
  });

  ok(component.get('promiseContentAlreadyLoadedOnce'));

  // is empty
  promiseContent.set('isEmpty', true);
  ok(! component.get('promiseContentAlreadyLoadedOnce'));
  promiseContent.set('isEmpty', false);

  // is loading
  promiseContent.set('isLoading', true);
  ok(! component.get('promiseContentAlreadyLoadedOnce'));
  promiseContent.set('isLoading', false);

  // is empty but reloading
  promiseContent.setProperties({
    isEmpty: true,
    isReloading: true
  });
  ok(component.get('promiseContentAlreadyLoadedOnce'));
});

test('Property - readyToShowContent', function() {
  const promise = Ember.Object.create();
  const component = this.subject({
    promise: promise
  });

  component.set('promiseContentAlreadyLoadedOnce', false);
  promise.set('isFulfilled', false);
  ok(! component.get('readyToShowContent'));

  component.set('promiseContentAlreadyLoadedOnce', true);
  promise.set('isFulfilled', false);
  ok(component.get('readyToShowContent'));

  component.set('promiseContentAlreadyLoadedOnce', false);
  promise.set('isFulfilled', true);
  ok(component.get('readyToShowContent'));

  component.set('promiseContentAlreadyLoadedOnce', true);
  promise.set('isFulfilled', true);
  ok(component.get('readyToShowContent'));
});

test('Property - pendingPromise', function() {
  const component = this.subject();

  component.set('readyToShowContent', false);
  ok(component.get('pendingPromise'));

  component.set('readyToShowContent', true);
  ok(! component.get('pendingPromise'));
});
