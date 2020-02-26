/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library ui5webc.
 */
sap.ui.define(
    ["sap/ui/core/Core", "sap/ui/core/library", "./lib/bundle"], // library dependency
    () => {
        // delegate further initialization of this library to the Core
        sap.ui.getCore().initLibrary({
            name: "ui5webc",
            version: "${version}",
            dependencies: ["sap.ui.core"],
            types: ["ui5webc.TitleDesign"],
            interfaces: [],
            controls: ["ui5webc.Title", "ui5webc.List", "ui5webc.StandardListItem"],
            elements: [],
            noLibraryCSS: true
        })

        /**
         * UI5 Web Components controls.
         *
         * @namespace
         * @alias ui5webc
         * @author SAP SE
         * @version ${version}
         * @public
         */
        let thisLib = ui5webc

        thisLib.TitleDesign = {
            Default: "",
            Center: "center",
            Left: "left",
            Right: "right"
        }
        thisLib.ListMode = {
            None: "None",
            SingleSelect: "SingleSelect",
            MultiSelect: "MultiSelect",
            Delete: "Delete"
        }

        return thisLib
    }
)
