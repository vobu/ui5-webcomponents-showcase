sap.ui.define(
    [
        "sap/ui/core/UIComponent",
        "sap/ui/core/ComponentSupport" // make sure to include the ComponentSupport in the bundle
    ],
    UIComponent => {
        "use strict"

        return UIComponent.extend("test.Sample.Component", {
            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init() {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments)

                // enable routing
                this.getRouter().initialize()
            }
        })
    }
)
