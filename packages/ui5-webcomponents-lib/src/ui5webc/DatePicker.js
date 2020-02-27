sap.ui.define(["sap/ui/core/Control"], Control => {
    const DatePicker = Control.extend("ui5webc.DatePicker", {
        metadata: {
            properties: {
                placeholder: { type: "string", defaultValue: "", bindable: "bindable" },
                formatPattern: { type: "string", defaultValue: "" },
                value: { type: "string", defaultValue: "", bindable: "bindable" }
            },
            events: {
                dateSelected: {
                    parameters: {
                        value: { type: "string" }
                    }
                }
            }
        },

        /**
         * callback from "change" event handler of UI5 web component Datepicker
         * that
         * - sets the UI5 control's value
         * - fires the UI5 control's attached event handler
         *
         * @param {jQuery.event} $event
         */
        _onChange($event) {
            const newValue = $event.detail.value
            this.setValue(newValue)
            this.fireDateSelected({ value: newValue })
        },

        /**
         * bridge UI5 control's after rendering to
         * "change" event of UI5 web component
         */
        onAfterRendering() {
            if (!this.bEventListenerAttached) {
                this.bEventListenerAttached = true
                document.getElementById(this.getId()).addEventListener("change", this._onChange.bind(this))
            }
        },

        renderer: {
            apiVersion: 2,
            render: (oRM, oDatePicker) => {
                oRM.openStart("ui5-datepicker", oDatePicker)
                oRM.attr("placeholder", oDatePicker.getPlaceholder())
                oRM.attr("format-pattern", oDatePicker.getFormatPattern())
                oRM.attr("value", oDatePicker.getValue())
                oRM.openEnd()
                oRM.close("ui5-datepicker")
            }
        }
    })
    return DatePicker
})
