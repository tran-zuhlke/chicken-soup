/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import TypeOptions = Cypress.TypeOptions;
import { testId } from '../../src/testing/testId';

Cypress.Commands.add('getByTestId', (testId: string, options?: Partial<TypeOptions>) => {
  cy.get(`[data-testid="${testId}"]`, options);
});

Cypress.Commands.add('shouldShowDashboardPage', () => {
  cy.getByTestId(testId.premisesDropdown).should('be.visible');
});

Cypress.Commands.add('selectFloor', (floorName: string) => {
  cy.getByTestId(testId.premisesDropdown).select(floorName);
});

Cypress.Commands.add('shouldShowCCTVsAndAlerts', (minNumberOfCCTVs: number, minNumberOfAlerts: number) => {
  cy.getByTestId(testId.cctvPlayer).should('have.length.gte', minNumberOfCCTVs);
  cy.getByTestId(testId.showIncidentPopoverButton).should('have.length.gte', minNumberOfAlerts);
});

Cypress.Commands.add('openNthAlertPopover', (alertIndex: number) => {
  cy.getByTestId(testId.showIncidentPopoverButton).eq(alertIndex).click();
  cy.getByTestId(testId.sendAlertButton).should('be.visible').and('be.enabled');
  cy.getByTestId(testId.ignoreAlertButton).should('be.visible').and('be.enabled');
});

Cypress.Commands.add('shouldShowAlertsListModal', (minNumberOfAlerts: number) => {
  cy.getByTestId(testId.alertPopup).should('be.visible');
  cy.getByTestId(testId.alertListGroupItem).should('have.length.gte', minNumberOfAlerts);
});

Cypress.Commands.add('shouldShowButtonsForNthAlertItem', (alertIndex: number) => {
  cy.getByTestId(testId.alertListGroupItem)
    .eq(alertIndex)
    .getByTestId(testId.sendAlertButton)
    .should('be.visible')
    .and('be.enabled');
  cy.getByTestId(testId.alertListGroupItem)
    .eq(alertIndex)
    .getByTestId(testId.ignoreAlertButton)
    .should('be.visible')
    .and('be.enabled');
});

Cypress.Commands.add('clickSendAlertForNthAlertAndNthGuard', (alertIndex: number, guardIndex: number) => {
  cy.getByTestId(testId.sendAlertButton).eq(alertIndex).click();
  cy.getByTestId(testId.alertGuardButton).eq(guardIndex).click();
});

Cypress.Commands.add('clickIgnoreAlertForNthAlert', (alertIndex: number) => {
  cy.getByTestId(testId.ignoreAlertButton).eq(alertIndex).click();
});
