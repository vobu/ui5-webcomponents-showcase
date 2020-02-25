sap.ui.define(["test/Sample/controller/BaseController", "sap/ui/model/json/JSONModel"], (Controller, JSONModel) => {
    const extObj = {
        onInit() {
            fetch("/proxy/api/v1/latest?format=json")
                .then(response => response.json())
                .then(latestU5version => {
                    this.getModel("LatestUI5").setProperty("/latest", latestU5version.version)
                })
                .catch(err => console.error(err))
        }
    }

    return Controller.extend("test.Sample.controller.Main", extObj)
})
