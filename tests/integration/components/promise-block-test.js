import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import startApp from '../../helpers/start-app';
import hbs from 'htmlbars-inline-precompile';

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

test('Pending', function(assert) {
  this.set('promise', Ember.Object.create({
    isPending: true
  }));

  this.render(hbs`
    {{promise-block promise=promise}}
  `);

  assert.ok(!!find('.promise-block.is-pending').length, "Adds the 'is-pending' class");
  assert.ok(!!find('.loader').length, "Shows the loader");
});

test('Fulfilled', function(assert) {
  this.set('promise', Ember.Object.create({
    isFulfilled: true
  }));

  this.render(hbs`
    {{#promise-block promise=promise}}
      <p class="content">The content</p>
    {{/promise-block}}
  `);

  assert.ok(!find('.promise-block.is-pending').length, "Does not add the 'is-pending' class");
  assert.ok(!find('.loader').length, "Does not show the loader");
  assert.ok(!!find('.content').length, "Shows the content");
});

test('Promise content already loaded', function(assert) {
  this.set('promise', Ember.Object.create({
    content: Ember.Object.create()
  }));

  this.render(hbs`
    {{#promise-block promise=promise}}
      <p class="content">The content</p>
    {{/promise-block}}
  `);

  assert.ok(!find('.promise-block.is-pending').length, "Does not add the 'is-pending' class");
  assert.ok(!find('.loader').length, "Does not show the loader");
  assert.ok(!!find('.content').length, "Shows the content");
});
