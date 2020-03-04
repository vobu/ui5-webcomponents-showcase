sap.ui.define(["sap/ui/core/Control"], Control => {
    const MultiComboBox = Control.extend("ui5webc.MultiComboBox", {
        metadata: {
            properties: {
                placeholder: { type: "string", defaultValue: "", bindable: "bindable" },
                value: { type: "string", defaultValue: "", bindable: "bindable" },
                required: { type: "boolean", defaultValue: true, bindable: "bindable" }
            },
            defaultAggregation: "items",
            aggregations: {
                items: {
                    type: "sap.ui.core.Control",
                    multiple: true
                }
            },
            events: {}
        },

        renderer: {
            apiVersion: 2,
            render(oRM, oMultiComboBox) {
                oRM.openStart("ui5-multi-combobox", oMultiComboBox)
                oRM.attr("placeholder", oMultiComboBox.getPlaceholder())
                oRM.attr("value", oMultiComboBox.getValue())
                oRM.attr("required", oMultiComboBox.getRequired())
                oRM.openEnd()

                oMultiComboBox.getItems().forEach(item => {
                    oRM.renderControl(item)
                })

                oRM.close("ui5-multi-combobox")
            }
        }
    })

    return MultiComboBox
})
