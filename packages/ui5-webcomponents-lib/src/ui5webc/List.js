sap.ui.define(["sap/ui/core/Control"], Control => {
    const List = Control.extend("ui5webc.List", {
        metadata: {
            properties: {
                mode: {
                    type: "ui5webc.ListMode"
                }
            },
            defaultAggregation: "items",
            aggregations: {
                items: {
                    type: "sap.ui.core.Control", // so we can handle both list items altho they are not inherited
                    multiple: true
                }
            },
            events: {}
        },

        renderer: {
            apiVersion: 2,
            render: (oRM, oList) => {
                oRM.openStart("ui5-list", oList)
                oRM.attr("mode", oList.getMode())
                oRM.openEnd()

                oList.getItems().forEach(item => {
                    oRM.renderControl(item)
                })

                oRM.close("ui5-list")
            }
        }
    })

    return List
})
