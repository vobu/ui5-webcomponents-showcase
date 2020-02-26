sap.ui.define(["test/Sample/controller/BaseController", "sap/ui/model/json/JSONModel"], (Controller, JSONModel) => {
    const extObj = {
        onInit() {
            fetch("/proxy/api/v1/latest?format=json")
                .then(response => response.json())
                .then(latestU5version => {
                    this.getModel("LatestUI5").setProperty("/latest", latestU5version.version)
                })
                .catch(err => console.error(err))
        },
        // this now is attached to the list item (as it should be, IMO :) )
        onPeopleSelect(oEvent) {
            this.getModel("Main").setProperty("/TabContainerBusy", true)
            const oListItemSelected = oEvent.getSource() // different from retrieving selected XML control!
            const sPersonDetail = oListItemSelected.getBindingContext("Backend").getPath()
            const sModelBasePath = oListItemSelected.getBindingContext("Backend").getModel().sServiceUrl // I know
            fetch(`${sModelBasePath}${sPersonDetail}?$format=json`)
                .then(response => response.json())
                .then(oPersonDetailData => {
                    this.getModel("PeopleDetail").setData(oPersonDetailData)
                })
                .catch(err => console.error(err))
                .finally(this.getModel("Main").setProperty("/TabContainerBusy", false))
        }
    }

    return Controller.extend("test.Sample.controller.Main", extObj)
})
