import { LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import getBoats from "@salesforce/apex/BoatDataService.getBoats";

/* The delay uses when debouncing event handlers before invoking Apex */
const DELAY = 300;

export default class BoatSearch extends NavigationMixin(LightningElement) {
  isLoading = false;
  boatTypeId = "";

  @wire(getBoats, { boatTypeId: "$boatTypeId" })
  boats;

  // Handles loading event
  handleLoading() {
    this.isLoading = true;
  }

  // Handles done loading event
  handleDoneLoading() {
    this.isLoading = false;
  }

  // Handles search boat event
  // This custom event comes from the form
  searchBoats(event) {
    this.boatTypeId = event.detail.boatTypeId;
    this.template
      .querySelector("c-boat-search-results")
      .searchBoats(this.boatTypeId);
    this.handleDoneLoading();
  }

  createNewBoat() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Boat__c",
        actionName: "new"
      }
    });
  }
}
