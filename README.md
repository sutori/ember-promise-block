# ember-promise-block

This README outlines the details of collaborating on this Ember addon.

## Building yourself

* `git clone` this repository
* `npm install`
* `bower install`

## Installing

Install as an Ember-CLI addon:

    ember install ember-promise-block

## Usage

    // templates/posts.hbs
    {{#promise-block promise=postsPromise loaderTemplate='helpers/loader'}}
      {{#each posts as |post|}}
        {{post.title}}
      {{/each}}
    {{/promise-block}}

The component will show the partial in `loaderTemplate` while `promise` is not resolved. It then shows the block when it resolves. The default value for `loaderTemplate` is `helpers/loader`.

Example controller:

    // controllers/posts.js
    import Ember from 'ember';

    export default Ember.Controller.extend({
      postsPromise: function() {
        return this.get('store').query('post');
      }.property(),
      posts: Ember.computed.reads('postsPromise.content')
    });

Example model:

    // models/post.js
    import DS from 'ember-data';
    
    export default DS.Model.extend({
      title: DS.attr('string')
    });
    
## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
