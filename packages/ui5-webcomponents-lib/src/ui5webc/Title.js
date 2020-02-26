sap.ui.define(["sap/ui/core/Control", "sap/ui/core/TitleLevel"], (Control, TitleLevel, TitleLevel) => {
    const Title = Control.extend("ui5webc.Title", {
        metadata: {
            properties: {
                text: { type: "string", group: "Appearance", defaultValue: "" },
                level: { type: "sap.ui.core.TitleLevel", group: "Appearance", defaultValue: TitleLevel.Auto },
                wrapping: { type: "boolean", group: "Appearance", defaultValue: false }
            },
            events: {}
        },

        renderer: {
            apiVersion: 2,
            render: function(oRM, oTitle) {
                oRM.openStart("ui5-title", oTitle)
                oRM.attr("level", oTitle.getLevel())
                oRM.attr("wrap", oTitle.getWrapping())
                oRM.openEnd()
                oRM.text(oTitle.getText())
                oRM.close("ui5-token")
            }
        }
    })

    return Title
})
