import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string, options?: Partial<TypeOptions>): Chainable<Element>;
      shouldShowDashboardPage(options?: Partial<TypeOptions>): Chainable<Element>;
      selectFloor(floorName: string, options?: Partial<TypeOptions>): Chainable<Element>;
      shouldShowCCTVsAndAlerts(
        minNumberOfCCTVs: number,
        minNumberOfAlerts: number,
        options?: Partial<TypeOptions>
      ): Chainable<Element>;
      openNthAlertPopover(alertIndex: number, options?: Partial<TypeOptions>): Chainable<Element>;
      shouldShowAlertsListModal(minNumberOfAlerts: number, options?: Partial<TypeOptions>): Chainable<Element>;
      shouldShowButtonsForNthAlertItem(alertIndex: number, options?: Partial<TypeOptions>): Chainable<Element>;
      clickSendAlertForNthAlertAndNthGuard(
        alertIndex: number,
        guardIndex: number,
        options?: Partial<TypeOptions>
      ): Chainable<Element>;
      clickIgnoreAlertForNthAlert(alertIndex: number, options?: Partial<TypeOptions>): Chainable<Element>;
    }
  }
}
