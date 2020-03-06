/**
 * Initialization Code and shared classes of library ui5webc.
 */
sap.ui.define(
    ["sap/ui/core/Core", "sap/ui/core/library", "./lib/bundle"], // library dependency
    () => {
        // delegate further initialization of this library to the Core
        sap.ui.getCore().initLibrary({
            name: "ui5webc",
            dependencies: ["sap.ui.core"],
            types: ["ui5webc.ListMode", "ui5webc.TitleDesign"],
            interfaces: [],
            controls: [
                "ui5webc.DatePicker",
                "ui5webc.Item",
                "ui5webc.List",
                "ui5webc.MultiComboBox",
                "ui5webc.StandardListItem",
                "ui5webc.Title"
            ],
            elements: [],
            noLibraryCSS: true
        })

        /**
         * UI5 Web Components controls.
         *
         * @namespace
         * @alias ui5webc
         * @public
         */
        const oLib = ui5webc

        oLib.TitleDesign = {
            Default: "",
            Center: "center",
            Left: "left",
            Right: "right"
        }
        oLib.ListMode = {
            None: "None",
            SingleSelect: "SingleSelect",
            MultiSelect: "MultiSelect",
            Delete: "Delete"
        }

        return oLib
    }
)
