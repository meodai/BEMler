// represents the BEM tree as an object
export class BEMler {
  constructor (
    moduleList,
    separatorElement = '__',
    separatorModifier = '--'
  ) {
    this.moduleList = moduleList.sort();
    this.modules = {};
    this.separator = {
      element: separatorElement,
      modifier: separatorModifier,
    };
    // creating regular expression in order to match the first occurrence of
    // either a element or a modifier
    this.childReg = new RegExp(`(${separatorElement}|${separatorModifier})`);

    this._parseList();
  }
  // transforms array into a structured object
  _parseList () {
    let lastBlock;
    this.moduleList.forEach((entry) => {
      const child = this._getChild(entry);

      if (!child && !modules.hasOwnProperty(entry)) {
        this.modules[entry] = {}
        lastBlock = entry;
      } else if (child && modules.hasOwnProperty(entry)) {
        console.log(`no block called ${entry}`);
      }

      if (child) {
        this._addChildToModules(child.type + 's', lastBlock, child.str);
      }
    })
  }
  // returns containing the element or modifier
  _getChild (str) {
    const match = str.match(this.childReg);
    let child, matchType;

    if (match && match.index > -1) {
      child = str.substr(match.index + match[0].length);
      matchType = match[0] === this.separator.element ? 'element' : 'modifier';
      return {
        str: child,
        type: matchType,
      }
    } else {
      return false;
    }
  }
  // adds elements / modifiers to the corresponding block
  _addChildToModules (type, block, entry) {
    if (!this.modules[block].hasOwnProperty(type)) {
      this.modules[block][type] = [];
    }
    this.modules[block][type].push(entry);
  }
  getBlocks () {
    return Object.keys(this.modules);
  }
  getModifiers (block) {
    return this.modules[block].modifiers;
  }
  getElements (block) {
    return this.modules[block].elements;
  }
}
