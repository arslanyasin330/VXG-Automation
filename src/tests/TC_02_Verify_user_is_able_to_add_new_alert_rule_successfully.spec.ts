import * as allure from "allure-js-commons";
import { type Page } from "@playwright/test";
import { expect, test } from "../fixtures/base-fixtures";
import { LoginPage } from "../pageObjects/loginPage/login.po";
import { loginTestData } from "../testData/loginTestData/loginTestData";
import { HomePage } from "../pageObjects/home/home.po";
import { homeTestData } from "../testData/home/homeTestData";
import { AlertRulesPage } from "../pageObjects/alertRulesPage/alertRules.po";
import { alertRuleTestData } from "../testData/alertRuleTestData/alertRuleTestData";
import { AddNewAlertRulesPopup } from "../pageObjects/alertRulesPage/addNewAlertRule.po";
import { Timeout } from "../utils/enums";

let page: Page;
let loginPage: LoginPage;
let homePage: HomePage;
let alertRulesPage: AlertRulesPage;
let sidebarHeading: string[];

test.beforeAll(async ({ browser }): Promise<void> => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await loginPage.visit(process.env.BASE_URL);
    await Promise.all([
        expect(await loginPage.getLogo()).toBeVisible(),
        expect(await loginPage.getHeading()).toContainText(loginTestData.title),
        expect(await loginPage.getEmailLabel()).toContainText(loginTestData.emailLabel),
        expect(await loginPage.getPasswordLabel()).toContainText(loginTestData.passwordLabel),
    ]);
    await loginPage.enterEmail(process.env.SYSTEM_USERNAME);
    await loginPage.enterPassword(process.env.SYSTEM_PASSWORD);
    await loginPage.signIn();
    sidebarHeading = await homePage.getSidebarHeadings();
    const homePageUrl: string = page.url();
    expect(homePageUrl).toBe(homeTestData.homePageUrl);
});

test("Validate all sidebar headings are displayed correctly", { tag: ["@smoke"] }, async (): Promise<void> => {
    await allure.tags("smoke");
    await allure.severity("critical");
    await Promise.all([
        expect(sidebarHeading).toContain(homeTestData.dashboard),
        expect(sidebarHeading).toContain(homeTestData.monitoring),
        expect(sidebarHeading).toContain(homeTestData.alerts),
        expect(sidebarHeading).toContain(homeTestData.archive),
        expect(sidebarHeading).toContain(homeTestData.search),
        expect(sidebarHeading).toContain(homeTestData.setting),
        expect(sidebarHeading).toContain(homeTestData.settings.alert),
        expect(sidebarHeading).toContain(homeTestData.settings.alerts.rules),
        expect(sidebarHeading).toContain(homeTestData.settings.alerts.faces),
        expect(sidebarHeading).toContain(homeTestData.settings.users),
        expect(sidebarHeading).toContain(homeTestData.settings.cameras),
        expect(sidebarHeading).toContain(homeTestData.settings.sites),
    ]);
});

test("Validate successful addition of a new Alert Rule", { tag: ["@smoke"] }, async (): Promise<void> => {
    await allure.tags("smoke");
    await allure.severity("critical");
    alertRulesPage = new AlertRulesPage(page);
    const newAlertRulesPopup = new AddNewAlertRulesPopup(page);
    await homePage.openAlertsFromSettings();
    await Promise.all([
        expect(sidebarHeading).toContain(homeTestData.alerts),
        expect(sidebarHeading).toContain(homeTestData.settings.alerts.rules),
        expect(sidebarHeading).toContain(homeTestData.settings.alerts.faces),
    ]);

    await homePage.openSidebarHeadings(homeTestData.settings.alerts.rules);
    expect(await alertRulesPage.getAlertRulesTableHeading()).toContain(alertRuleTestData.allAlertRulesName);
    expect(await alertRulesPage.getAlertRulesTableHeading()).toContain(alertRuleTestData.action);
    await alertRulesPage.addAlertRule();
    expect(await newAlertRulesPopup.getAddNewAlertRuleText()).toContain(alertRuleTestData.addNewAlertRule);
    const newAlertRuleLabel = await newAlertRulesPopup.getAddNewRuleLabels();
    expect(newAlertRuleLabel).toContain(alertRuleTestData.alertRuleName);
    expect(newAlertRuleLabel).toContain(alertRuleTestData.selectSite);

    await newAlertRulesPopup.pressButton(alertRuleTestData.createAlert);
    const fieldsValidationErrorMessages = await newAlertRulesPopup.getValidationErrors();
    expect(fieldsValidationErrorMessages).toContain(alertRuleTestData.errorAlertRuleName);
    expect(fieldsValidationErrorMessages).toContain(alertRuleTestData.errorSelectSite);
    await newAlertRulesPopup.enterAlertRuleName(alertRuleTestData.newAlertName);
    await newAlertRulesPopup.selectSite(alertRuleTestData.siteName);
    expect(await newAlertRulesPopup.getAddNewRuleLabels()).toContain(alertRuleTestData.selectCamera);
    expect(await newAlertRulesPopup.getAddAnotherSiteButtonText()).toContain(alertRuleTestData.addAntherSite);

    await newAlertRulesPopup.pressButton(alertRuleTestData.createAlert);
    expect(await newAlertRulesPopup.getValidationErrors()).toContain(alertRuleTestData.errorSelectCamera);
    await newAlertRulesPopup.selectCamera();
    expect(await newAlertRulesPopup.getAddAnotherSiteButtonText()).toContain(alertRuleTestData.addAntherSite);
    const newAlertLabel = await newAlertRulesPopup.getAddNewRuleLabels();
    await Promise.all([
        expect(newAlertLabel).toContain(alertRuleTestData.generateAlertsAndNotify),
        expect(newAlertLabel).toContain(alertRuleTestData.recipients),
        expect(newAlertLabel).toContain(alertRuleTestData.alertType),
        expect(newAlertLabel).toContain(alertRuleTestData.chatGPT),
        expect(newAlertLabel).toContain(alertRuleTestData.cloudAI),
    ]);
    await newAlertRulesPopup.selectTimesAndDates(alertRuleTestData.notificationScheduleStartTime, alertRuleTestData.notificationScheduleEndTime);
    await newAlertRulesPopup.enterRecipients(process.env.SYSTEM_USERNAME);
    await newAlertRulesPopup.selectAlertType(alertRuleTestData.alertTypeName);
    await newAlertRulesPopup.pressButton(alertRuleTestData.createAlert);
    await page.reload();
    expect(await alertRulesPage.getAlertRuleName()).toContain(alertRuleTestData.newAlertName);
});

test("Validate page load performance meets expected standards", { tag: ["@smoke"] }, async (): Promise<void> => {
    const startTime = Date.now();
    await loginPage.visit(process.env.BASE_URL);
    await loginPage.waitForPageToLoad();
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    /**
     * Expected threshold required for page load. Currently, it's set to three seconds.
     */
    expect(loadTime).toBeLessThan(Timeout.THREE_SECONDS);
});

test("Verify successful user logout functionality", { tag: ["@smoke"] }, async (): Promise<void> => {
    await loginPage.visit(process.env.BASE_URL);
    await loginPage.openSidebarMenu();
    await loginPage.signOut();
    await Promise.all([
        expect(await loginPage.getHeading()).toContainText(loginTestData.title),
        expect(await loginPage.getEmailLabel()).toContainText(loginTestData.emailLabel),
        expect(await loginPage.getPasswordLabel()).toContainText(loginTestData.passwordLabel),
    ]);
});
