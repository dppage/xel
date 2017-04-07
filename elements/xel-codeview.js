
// @copyright
//   © 2016-2017 Jarosław Foksa

"use strict";

{
  let {html} = Xel.utils.element;

  let shadowTemplate = html`
    <template>
      <link rel="stylesheet" href="node_modules/xel/stylesheets/xel-codeview.css" data-vulcanize>
      <link rel="stylesheet" href="node_modules/prismjs/themes/prism-coy.css"/ data-vulcanize>
      <code id="code" class="language-html"></code>
    </template>
  `;

  class XelCodeViewElement extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate.content, true));

      this._value = "";

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @type
    //   string
    // @default
    //   ""
    get value() {
      return this._value;
    }
    set value(value) {
      this._value = value;
      this._update();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this["#code"].append(document.createTextNode(this._value));

      if (this._value !== "") {
        Prism.highlightElement(this["#code"], true);
      }
    }
  }

  customElements.define("xel-codeview", XelCodeViewElement);
}
