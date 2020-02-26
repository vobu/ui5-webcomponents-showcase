sap.ui.define(["sap/ui/core/Control", "sap/ui/core/TitleLevel"], (Control, TitleLevel) => {
    const extObj = {
        metadata: {
            properties: {
                text: { type: "string", defaultValue: "" },
                level: { type: "sap.ui.core.TitleLevel", defaultValue: TitleLevel.Auto },
                wrapping: { type: "boolean", defaultValue: false },
                align: {
                    design: {
                        type: "ui5webc.TitleAlign",
                        defaultValue: ui5webc.TitleDesign.Default
                    }
                }
            },
            events: {}
        },
        renderer: {
            apiVersion: 2,
            render: (oRM, oTitle) => {
                oRM.openStart("ui5-title", oTitle)
                oRM.attr("level", oTitle.getLevel())
                oRM.attr("wrap", oTitle.getWrapping())
                oTitle.getAlign() !== "" ? oRM.attr("align", oTitle.getAlign()) : null
                oRM.openEnd()
                oRM.text(oTitle.getText())
                oRM.close("ui5-title")
            }
        }
    }
    const Title = Control.extend("ui5webc.Title", extObj)

    return Title
})
