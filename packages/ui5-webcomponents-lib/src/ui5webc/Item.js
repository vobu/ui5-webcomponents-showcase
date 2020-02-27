sap.ui.define(["sap/ui/core/Control"], Control => {
    const Item = Control.extend("ui5webc.Item", {
        metadata: {
            properties: {
                text: { type: "string", defaultValue: "" }
            },
            events: {
                press: {}
            }
        },

        renderer: {
            apiVersion: 2,
            render: (oRM, oLI) => {
                oRM.openStart("ui5-li", oLI)
                oRM.openEnd()
                oRM.text(oLI.getText())
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
