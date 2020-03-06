# Using UI5 with UI5 Web Components

Using [UI5 Web Components](https://sap.github.io/ui5-webcomponents/)  with … well … UI5 is somewhat unheard of. There’s been quite some talk so far on how to use them with frameworks like React, Angular or Vue - but surprisingly not [UI5](https://ui5.sap.com) itself!

Let’s change that :)

🔥 https://github.com/vobu/ui5-webcomponents-showcase

[TOC]

## quick start

```bash
$> git clone https://github.com/vobu/ui5-webcomponents-showcase
$> cd ui5-webcomponents-showcase
# yarn needed
$> yarn
$> yarn start
# ... build output ...
# ... finished!
# point browser to 
# http://localhost:9081/index.html and
# http://localhost:9082/index.html
```

## multiple disclaimers!

- all of the following is a Proof-of-Concept; the UI5 core team is hard at work providing a more streamlined solution for hooking up UI5 with its’ Web Components
- much of the code-credit goes to [UI5 chieftain Peter Müßig](https://people.sap.com/peter.muessig), who provided the inital setup

## overview

A Web Component is essentially a plain HTML tag in a custom format:

```html
<glass raised content="beer">🍺</glass>
```

The advantages over a set of combined standard HTML(5) elements are the cleaner API/structure and the smaller footprint. Look at the sample HTML output of a standard UI5 control and judge for yourself:

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

**Web Components are based on [Web Standards](https://www.w3.org/wiki/WebComponents/) and on their way to be completely included in the respective [DOM](https://w3c.github.io/webcomponents/spec/shadow/#bib-dom), [HTML](https://w3c.github.io/webcomponents/spec/shadow/#bib-html),  [CSS](https://w3c.github.io/webcomponents/spec/shadow/#bib-css-scoping-1), and [UI Event](https://w3c.github.io/webcomponents/spec/shadow/#bib-uievents) W3C standard.**

## web component &rarr; XML view

To use a UI5 Web Component inside an XML view, a [custom control](https://ui5.sap.com/#/topic/8dcab0011d274051808f959800cabf9f) is used as a "bridge" to connect the web component to the UI5 runtime lifecycle, including data binding.

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

> Note the `apiVersion: 2` as part of the renderer declaration! 
>
> It instructs the Rendering Manager to enable in-place DOM patching, massively improving rendering performance. 
>
> UI5 architect Cahit Gürgüc [gave a talk on this at UI5con 2019](https://www.slideshare.net/aborjinik/rendering-evolution-in-ui5) - ever since he implemented it into UI5’s core, `apiVersion: 2` should always be used when developing custom controls!

Using the "custom web component control" in an XML view is the same as with any custom control:

```xml
<mvc:View controllerName="test.Sample.controller.Main" 
	xmlns:webc="ui5webc"> <!-- declare a namespace -->
    <!-- ... -->
    <!-- UI5 Web Component with data binding, yay! -->
    <webc:Item text="{Backend>boundProperty}" />
</mvc:View>
```

Due to the now established link between UI5 runtime and UI5 Web Component, this "custom web component control" immediately benefits from the framework's features such as data binding and internationalization.

Sweet!

## working example

The showcase at https://github.com/vobu/ui5-webcomponents-showcase holds a complete working example of using UI5 Web Components in XML views.

It’s divided into three packages:

```shell
─── packages
    ├── ui5-app-webcomponents
    ├── ui5-app-xmlcontrols
    └── ui5-webcomponents-lib
```

The showcase even goes as far as

- containing a back-to-back comparison of the same app:
  once done with well-known UI5 controls (`ui5-app-xmlcontrols`),
  and once with UI5 Web Components (`ui5-app-webcomponents`)
- providing a UI5 library `ui5-webcomponents-lib ` with the bespoken "custom web component controls". The library is used in both UI5 apps and set up for further development.

### how the packages play together

Issuing `yarn start` in  `/` of the repository first builds the UI5 library, then starts two local UI5 tooling servers: http://localhost:9081/index.html for the regular UI5 controls, http://localhost:9082/index.html for the UI5 Web Components; both including OData v4- + REST-bindings.

#### building the library

Building the library is a 2-step process: first web components and "custom control bridges" are combined as UI5 library sources, then the actual UI5 library is built.

For the first step, [`rollup`](https://rollupjs.org) is used to createa a custom bundle in `ui5-webcomponents-lib/dist/resources/$libraryName/lib/bundles.js` consisting of:

- all `ui5-webcomponents` specified in `ui5-webcomponents-lib/lib/bundle.js` 
- all "bridges" (aka UI5 custom controls rendering a UI5 Web Component) in `ui5-webcomponents-lib/src/ui5webc`

Then `ui5 build $library` is used to create ...well… a UI5 library in `ui5-webcomponents-lib/dist/resources/ui5webc/*`.

Note the source definition of the library (`ui5-webcomponents-lib/src/ui5webc/library.js`): in there, the above created rollup-bundle is consumed:

```javascript
sap.ui.define(["./lib/bundle"]), () => {})
```

This exposes the "bridges" (aka UI5 custom controls rendering a UI5 Web Component) via the UI5 library to the UI5 view runtime - yeah!

#### consuming the library and using the web components

The generated UI5 library is linked to the application as as dependency in `ui5-app-webcomponents/package.json`:

```json
"dependencies": {
    // ...
    "ui5-webcomponents-lib": "0.0.1"
  }
```

 `yarn` allow for locally resolving this via its `workspaces`, see `/package.json`.

Subsequently, the `ui5-tooling ` takes care of exposing the library (via `ui5-webcomponents-lib/ui5.yaml`) to the application.

Voilà &rarr; http://localhost:908[1|2]/index.html

### development mode

The showcase includes a "development mode" that allows for continous work on the web components' UI5 library without having to restart the UI5 applications’ servers each time.

Doing `yarn start:dev` in the project’s `/` starts two UI5 tooling servers (XML controls at http://localhost:8081, web components at http://localhost:8082), then puts a watch mode on `packages/ui5-webcomponents-lib`: whenever source files of the library change, it is rebuild and quickly ready to be re-consumed:

```bash
[build] [nodemon] restarting due to changes...
[build] [nodemon] starting `npm run -s build`
[build] 
lib/bundle.js → dist/resources/ui5webc/lib/bundle.js...
[build] info[build]  [build] builder:builder[build]  Building project webcomponents not including dependencies...
[build] info[build]  [build] builder:builder 🛠 [build]  (1/1) Building project webcomponents
# ...
[build] info[build]  builder:builder Build succeeded in 798 ms
[build] info [build] builder:builder Executing cleanup tasks...
[build] created dist/resources/ui5webc/lib/bundle.js in 5.7s
[build] [nodemon] clean exit - waiting for changes before restart
```

Doing a reload of http://localhost:8082/index.html then shows the changes of the library. Additionally the [UI5 tooling community livereload middleware](https://www.npmjs.com/package/ui5-middleware-livereload) is used to reload localhost:8082 upon changes in the "UI5 Web Components"-app.

W00t &rarr; hot reload for http://localhost:9082/index.html and hot rebuild for the web components!

## creating a new "bridge"

For using additional UI5 Web Components other than the ones already in the showcase, the process is pretty much straight forward:

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
      render(oRM, oCustomControl) {
      	oRM.openStart("ui5-datepicker", oCustomControl)
          oRM.attr("placeholder", oCustomControl.getPlaceholder())
          // ...
      }
  }
  ```


There it is: a UI5 Web Component living as a UI5 custom control, ready to be used in any UI5 application.

Rock’n’Roll!