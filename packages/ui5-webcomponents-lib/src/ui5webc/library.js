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
            types: [],
            interfaces: [],
            controls: ["ui5webc.Title"],
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

        return thisLib
    }
)
