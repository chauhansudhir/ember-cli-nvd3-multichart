import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nvd3-multichart', 'Integration | Component | nvd3 multichart', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{nvd3-multichart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#nvd3-multichart}}
      template block text
    {{/nvd3-multichart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
