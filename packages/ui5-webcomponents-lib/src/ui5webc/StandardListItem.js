sap.ui.define(["sap/ui/core/Control"], Control => {
    const StandardListItem = Control.extend("ui5webc.StandardListItem", {
        metadata: {
            properties: {
                title: { type: "string", defaultValue: "" },
                description: { type: "string", defaultValue: "" },
                info: { type: "string", defaultValue: "" },
                icon: {
                    type: "sap.ui.core.URI",
                    defaultValue: ""
                }
            },
            events: {
                press: {}
            }
        },

        renderer: {
            apiVersion: 2,
            render: (oRM, oLI) => {
                oRM.openStart("ui5-li", oLI)
                oRM.attr("description", oLI.getDescription())
                oRM.attr("info", oLI.getInfo())
                oRM.attr("icon", oLI.getIcon())
                oRM.openEnd()
                oRM.text(oLI.getTitle())
                oRM.close("ui5-li")
            }
        }
    })

    const _pressFn = oEvent => {
        oEvent.srcControl.firePress()
    }

    StandardListItem.prototype.ontap = _pressFn
    // causes firing the event twice
    // StandardListItem.prototype.onclick = _pressFn

    return StandardListItem
})
