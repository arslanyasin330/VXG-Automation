import { test as base } from "@playwright/test";
import { HomePage } from "../pageObjects/home/home.po";
import { LoginPage } from "../pageObjects/loginPage/login.po";
import { AlertRulesPage } from "../pageObjects/alertRulesPage/alertRules.po";
import { AddNewAlertRulesPopup } from "../pageObjects/alertRulesPage/addNewAlertRule.po";

interface BaseFixture {
    loginPage: LoginPage;
    homePage: HomePage;
    alertRulesPage: AlertRulesPage;
    newAlertRulesPopup: AddNewAlertRulesPopup;
}

export const test = base.extend<BaseFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    alertRulesPage: async ({ page }, use) => {
        await use(new AlertRulesPage(page));
    },
    newAlertRulesPopup: async ({ page }, use) => {
        await use(new AddNewAlertRulesPopup(page));
    },
});

export { expect } from "@playwright/test";
