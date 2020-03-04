sap.ui.define(["sap/ui/core/Control"], Control => {
    const Item = Control.extend("ui5webc.Item", {
        metadata: {
            properties: {
                // mapped to <ui5-li>$text</ui5>
                text: { type: "string", defaultValue: "" }
            },
            events: {
                press: {}
            }
        },

        renderer: {
            apiVersion: 2,
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

    const _pressFn = oEvent => {
        oEvent.srcControl.firePress()
    }

    Item.prototype.ontap = _pressFn
    // causes firing the event twice
    // Item.prototype.onclick = _pressFn

    return Item
})
