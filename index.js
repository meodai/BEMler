'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// represents the BEM tree as an object
var BEMler = exports.BEMler = function () {
  function BEMler(moduleList) {
    var separatorElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '__';
    var separatorModifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--';

    _classCallCheck(this, BEMler);

    this.moduleList = moduleList.sort();
    this.modules = {};
    this.separator = {
      element: separatorElement,
      modifier: separatorModifier
    };
    // creating regular expression in order to match the first occurrence of
    // either a element or a modifier
    this.childReg = new RegExp('(' + separatorElement + '|' + separatorModifier + ')');

    this._parseList();
  }
  // transforms array into a structured object


  _createClass(BEMler, [{
    key: '_parseList',
    value: function _parseList() {
      var _this = this;

      this.moduleList.forEach(function (entry) {
        var child = _this._getChild(entry);

        if (!child && !_this.modules.hasOwnProperty(entry)) {
          _this.modules[entry] = {};
        } else if (child && _this.modules.hasOwnProperty(entry)) {
          throw new Error('no block called ' + entry);
        } else {
          _this._addChildToModules(child.type + 's', child.block, child.str);
        }
      });
    }
    // returns containing the element or modifier

  }, {
    key: '_getChild',
    value: function _getChild(str) {
      var match = str.match(this.childReg);
      var child = void 0,
          matchType = void 0,
          block = void 0;

      if (match && match.index > -1) {
        child = str.substring(match.index + match[0].length);
        block = str.substring(0, match.index);
        matchType = match[0] === this.separator.element ? 'element' : 'modifier';
        return {
          str: child,
          type: matchType,
          block: block
        };
      } else {
        return false;
      }
    }
    // adds elements / modifiers to the corresponding block

  }, {
    key: '_addChildToModules',
    value: function _addChildToModules(type, block, entry) {
      if (!this.modules[block].hasOwnProperty(type)) {
        this.modules[block][type] = [];
      }
      this.modules[block][type].push(entry);
    }
  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      return Object.keys(this.modules);
    }
  }, {
    key: 'getModifiers',
    value: function getModifiers(block) {
      return this.modules[block].modifiers;
    }
  }, {
    key: 'getElements',
    value: function getElements(block) {
      return this.modules[block].elements;
    }
  }]);

  return BEMler;
}();
