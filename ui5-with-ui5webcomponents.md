# Using UI5 with UI5 Web Components

So there’s been quite some talk so far on how to use [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) with frameworks like React, Angular or Vue - but surprisingly not [UI5](https://ui5.sap.com) itself!

Let’s change that :)

🔥 https://github.com/vobu/ui5-webcomponents-showcase

## multiple disclaimers

- all of the following is a Proof-of-Concept; the UI5 core team is hard at work providing a more streamlined solution for hooking up UI5 with its’ Web Components
- much of the code-credit goes to [UI5 chieftain Peter Müßig](https://people.sap.com/peter.muessig), who provided the inital setup

## Overview

A Web Component is essentially a plain HTML tag in a custom format:

```html
<glass raised content="beer">🍺</glass>
```

The advantages over a set of combined standard HTML(5) elements are the cleaner API/structure and the smaller footprint:

```html
<div id="__hbox6" data-sap-ui="__hbox6" class="sapMFlexBox sapMHBox sapMFlexBoxJustifyStart sapMFlexBoxAlignItemsCenter sapMFlexBoxWrapNoWrap sapMFlexBoxAlignContentStretch sapMFlexBoxBGTransparent sapUiTinyMargin sapMFlexItem">
    <div id="__data30" class="sapMFlexItemAlignAuto sapMFlexBoxBGTransparent sapMFlexItem" style="order: 0; flex-grow: 0; flex-shrink: 1; flex-basis: auto; min-height: auto; min-width: auto;">
        <span id="__text5" data-sap-ui="__text5" class="sapMText sapUiSelectable sapMTextMaxWidth" style="text-align: left;">🍺</span>
    </div>
</div>
<!-- div div div, the train arrives, as we used to say :) -->
```

UI5 Web Components look like the former, with the recognizable `ui5` prefix:

```html
<ui5-datepicker></ui5-datepicker>
```

Under the hood there’s a whole lot more going on, including `Shadow DOM` and `ES Modules`, as e.g. explained on https://www.webcomponents.org/introduction  - but let’s leave it at that and just acknowledge: 

**Web Components are based on [Web Standards](https://www.w3.org/wiki/WebComponents/) and on their way to be completely included in the respective [DOM](https://w3c.github.io/webcomponents/spec/shadow/#bib-dom), [HTML](https://w3c.github.io/webcomponents/spec/shadow/#bib-html),  [CSS](https://w3c.github.io/webcomponents/spec/shadow/#bib-css-scoping-1), and [UI Event](https://w3c.github.io/webcomponents/spec/shadow/#bib-uievents) standard.**

## Web Component -> XML view

To use a UI5 Web Component inside an XML view, a [custom control](https://ui5.sap.com/#/topic/8dcab0011d274051808f959800cabf9f) can be used as a "bridge" to connect the Web Component to the UI5 runtime lifecycle, including data binding.

The definition of the custom control is by the books: `sap.ui.core.Control` is extended as custom element `ui5webc.Item`:

```javascript
sap.ui.define(["sap/ui/core/Control"], Control => {
    return Control.extend("ui5webc.Item", {
       // ...
    })
})
```

Then the [UI5 control’s metadata](https://ui5.sap.com/#/topic/7b52540d9d8c4e00b9723151622bbb64) is mapped either to the Web Component’s property or -as in this example- to the HTML tag’s content:

```javascript
sap.ui.define(["sap/ui/core/Control"], Control => {
    return Control.extend("ui5webc.Item", {
        metadata: {
            properties: {
                // mapped to <ui5-li>$text</ui5>
                text: { type: "string", defaultValue: "" }
            }
        }
        // ...
    })
})

```

At runtime, the custom control should then render the UI5 Web Component with the mapped metadata:

```javascript
sap.ui.define(["sap/ui/core/Control"], Control => {
    return Control.extend("ui5webc.Item", {
        metadata: {
            properties: {
                // mapped to <ui5-li>$text</ui5>
                text: { type: "string", defaultValue: "" }
            }
        },
        renderer: {
            apiVersion: 2, // high-perf!
            /**
             * renders as <ui5-li>some content here</ui5-li>
             * @param {sap.ui.core.RenderManager} oRM - UI5's render manager
             * @param {ui5webc.Item} oLI - this UI5 custom control
             */
            render(oRM, oLI) {
                oRM.openStart("ui5-li", oLI)
                oRM.openEnd()
                oRM.text(oLI.getText()) // see metadata property "text" above
                oRM.close("ui5-li")
            }
        }
    })
})
```

Using the "custom web component control" in an XML view is the same as with any custom control:

```xml
<mvc:View controllerName="test.Sample.controller.Main" 
	xmlns:webc="ui5webc">
    <!-- ... -->
    <!-- UI5 Web Component with data binding, yay! -->
    <webc:Item text="{Backend>boundProperty}" />
</mvc:View>
```

Due to the established link between UI5 runtime and UI5 Web Component, the "custom web component control" immediately benefits from the framework's features such as data binding and internationalization.

Sweet!

## Working example

At the https://github.com/vobu/ui5-webcomponents-showcase at the article’s beginning, a complete working example of using UI5 Web Components in XML views can be found.

Let’s look at the layout:

```shell
└── packages
    ├── ui5-app-webcomponents
    ├── ui5-app-xmlcontrols
    └── ui5-webcomponents-lib
```

The showcase even goes as far as

- containing a back-to-back comparison of the same app, once done with well-known UI5 controls (`ui5-app-xmlcontrols`) and once with UI5 Web Components (`ui5-app-webcomponents`)
- providing a UI5 library `ui5-webcomponents-lib ` with the bespoken "custom web component controls" set up for further development and ready to be included in any UI5 application





- rollup` createas a custom bundle out of 

  - all `ui5-webcomponents` specified in `$lib/lib/bundle.js` 
  - all "bridges" (aka UI5 custom controls rendering a UI5 Web Component) in `$lib/src/$libraryName`

  and puts it for consumption at `$lib/dist/resources/$libraryName/lib/bundles.js`

- `ui5 build $library` creates ..well… a UI5 library in `$lib/dist/resources/$libraryName` - most important here is that in the source definition of the library (`$lib/src/ui5webc/library.js`), the above created rollup-bundle is consumed

```javascript
sap.ui.define(["./lib/bundle"]), () => {})
```

This exposes the "bridges" (aka UI5 custom controls rendering a UI5 Web Component) via the UI5 library to the application’s XML view runtime - yeah!

## creating a new bridge

- import target `ui5-webcomponent`s in `$lib/lib/bundle.js`

- extend desired UI5 control as `$lib/src/$libraryName/$controlName.js`, making it a UI5 custom control

- map metadata of UI5 custom control to rendering attribute of the UI5 Web Component

  ```javascript
  metadata: {
  	properties: {
      	placeholder: { type: "string", defaultValue: "" },
      	// ...
      }
  }
  
  //...
   
  renderer: {
      apiVersion: 2,
      render: (oRM, oLI) => {
      	oRM.openStart("ui5-datepicker", oLI)
          oRM.attr("placeholder", oLI.getPlaceholder())
          // ...
      }
  }
  ```

  