sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @yields {typeof sap.ui.core.mvc.Controller}
     */
    Controller => {
        "use strict"

        return Controller.extend("test.Sample.controller.BaseController", {
            /**
             * inits on controller instantiation
             */
            onInit() {},

            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} sName the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getModel(sName) {
                return this.getView().getModel(sName)
            },

            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle() {
                return this.getOwnerComponent()
                    .getModel("i18n")
                    .getResourceBundle()
            }
        })
    }
)
