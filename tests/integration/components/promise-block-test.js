import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import startApp from 'frontend/tests/helpers/start-app';

let App;

moduleForComponent('promise-block', 'Component - Promise block - Integration', {
  integration: true,
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('Pending', function() {
  this.set('promise', Ember.Object.create({
    isPending: true
  }));

  this.render(Ember.HTMLBars.compile(`
    {{promise-block promise=promise}}
  `));

  ok(exists('.promise-block.is-pending'), "Adds the 'is-pending' class");
  ok(exists('.loader'), "Shows the loader");
});

test('Fulfilled', function() {
  this.set('promise', Ember.Object.create({
    isFulfilled: true
  }));

  this.render(Ember.HTMLBars.compile(`
    {{#promise-block promise=promise}}
      <p class="content">The content</p>
    {{/promise-block}}
  `));

  ok(notExists('.promise-block.is-pending'), "Does not add the 'is-pending' class");
  ok(notExists('.loader'), "Does not show the loader");
  ok(exists('.content'), "Shows the content");
});

test('Promise content already loaded', function() {
  this.set('promise', Ember.Object.create({
    content: Ember.Object.create()
  }));

  this.render(Ember.HTMLBars.compile(`
    {{#promise-block promise=promise}}
      <p class="content">The content</p>
    {{/promise-block}}
  `));

  ok(notExists('.promise-block.is-pending'), "Does not add the 'is-pending' class");
  ok(notExists('.loader'), "Does not show the loader");
  ok(exists('.content'), "Shows the content");
});
