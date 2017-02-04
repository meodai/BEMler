import 'babel-polyfill';

// Import chai.
let chai = require('chai'),
    path = require('path');

chai.should();

import {BEMler} from '../index';

describe('BEMler', () => {
  describe('#basics', () => {
    let bemler;

    beforeEach(() => {
      // Create a new Rectangle object before every test.
      bemler = new BEMler([
        'table__head',
        'table--fat',
        'table__row',
        'table__row--fat__icon',
        'table--fat__row--fat__icon',
        'table__row--fat',
        'table',
        'button',
        'button--secondary',
        'button__icon',
        'button--icon',
        'button--secondary__icon',
        'button--fat',
      ]);

    });

    it('outputs correct object', () => {
      JSON.stringify(bemler.modules).should.equal('{"button":{"modifiers":["fat","icon","secondary","secondary__icon"],"elements":["icon"]},"table":{"modifiers":["fat","fat__row--fat__icon"],"elements":["head","row","row--fat","row--fat__icon"]}}')
    });
  });
});
