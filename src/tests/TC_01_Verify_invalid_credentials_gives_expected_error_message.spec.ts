import type { Page } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage/login.po";
import { expect, test } from "../fixtures/base-fixtures";
import { loginTestData } from "../testData/loginTestData/loginTestData";
import * as allure from "allure-js-commons";

let page: Page;
let loginPage: LoginPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    await loginPage.visit(process.env.BASE_URL);
    await Promise.all([
        expect(await loginPage.getLogo()).toBeVisible(),
        expect(await loginPage.getHeading()).toContainText(loginTestData.title),
        expect(await loginPage.getEmailLabel()).toContainText(loginTestData.emailLabel),
        expect(await loginPage.getPasswordLabel()).toContainText(loginTestData.passwordLabel),
    ]);
});

test(
    "Validate error message is displayed for invalid login credentials",
    { tag: ["@smoke"] },
    async (): Promise<void> => {
        await allure.tags("smoke");
        await allure.severity("critical");
        await loginPage.signIn();
        await Promise.all([
            expect(await loginPage.getErrorMessage()).toContain(loginTestData.error.invalidEmail),
            expect(await loginPage.getErrorMessage()).toContain(loginTestData.error.toShortPassword),
        ]);
        await loginPage.enterPassword(process.env.SYSTEM_PASSWORD);
        await loginPage.signIn();
        expect(await loginPage.getErrorMessage()).toContain(loginTestData.error.invalidEmail);

        await page.reload();
        await loginPage.enterEmail(loginTestData.invalidEmailAddress);
        await loginPage.signIn();
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toBe(loginTestData.invalidEmailDialog(loginTestData.invalidEmailAddress));
            await dialog.accept();
        });

        await loginPage.enterEmail(loginTestData.incompleteEmailAddress);
        await loginPage.signIn();
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toBe(loginTestData.incompleteEmailDialog(loginTestData.incompleteEmailAddress));
            await dialog.accept();
        });
        await loginPage.enterEmail(process.env.SYSTEM_USERNAME);
        await loginPage.signIn();
        expect(await loginPage.getErrorMessage()).toContain(loginTestData.error.toShortPassword);
        await loginPage.enterPassword(loginTestData.invalidPassword);
        await loginPage.signIn();
        expect(await loginPage.getInvalidCredentialsError()).toContain(loginTestData.error.invalidCredentials);
    },
);
