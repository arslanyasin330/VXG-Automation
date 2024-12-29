import { expect, test } from "../fixtures/base-fixtures";
import { devices } from "@playwright/test";
import { loginTestData } from "../testData/loginTestData/loginTestData";
import { LoginPage } from "../pageObjects/loginPage/login.po";
import { homeTestData } from "../testData/home/homeTestData";
import { HomePage } from "../pageObjects/home/home.po";

test.describe("Responsive Website Testing", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let sidebarHeading: string[];
    const desktopViewport = { width: 1920, height: 1080 };

    test("Verify desktop responsiveness of the application", { tag: ["@smoke"] }, async ({ page }) => {
        await page.setViewportSize(desktopViewport);
        loginPage = new LoginPage(page);
        await loginPage.visit(process.env.BASE_URL);

        await expect(page).toHaveTitle(loginTestData.landingPageTitle);
        await expect(page).toHaveURL(loginTestData.signInUrl);
        await expect(await loginPage.getLogo()).toBeVisible();
        await expect(await loginPage.getHeading()).toContainText(loginTestData.title);
        await expect(await loginPage.getEmailLabel()).toContainText(loginTestData.emailLabel);
        await expect(await loginPage.getPasswordLabel()).toContainText(loginTestData.passwordLabel);

        await loginPage.enterEmail(process.env.SYSTEM_USERNAME);
        await loginPage.enterPassword(process.env.SYSTEM_PASSWORD);
        await loginPage.signIn();

        homePage = new HomePage(page);
        sidebarHeading = await homePage.getSidebarHeadings();
        const homePageUrl: string = page.url();
        expect(homePageUrl).toBe(homeTestData.homePageUrl);
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
        await page.close();
    });

    test("Verify mobile responsiveness of the application", { tag: ["@smoke"] }, async ({ browser }) => {
        const mobileContext = await browser.newContext({
            ...devices["iPhone 12"],
        });
        const mobilePage = await mobileContext.newPage();
        loginPage = new LoginPage(mobilePage);
        await mobilePage.goto(process.env.BASE_URL);

        await expect(mobilePage).toHaveTitle(loginTestData.landingPageTitle);
        await expect(mobilePage).toHaveURL(loginTestData.signInUrl);
        await expect(await loginPage.getLogo()).toBeVisible();
        await expect(await loginPage.getHeading()).toContainText(loginTestData.title);
        await expect(await loginPage.getEmailLabel()).toContainText(loginTestData.emailLabel);
        await expect(await loginPage.getPasswordLabel()).toContainText(loginTestData.passwordLabel);

        await loginPage.enterEmail(process.env.SYSTEM_USERNAME);
        await loginPage.enterPassword(process.env.SYSTEM_PASSWORD);
        await loginPage.signIn();

        homePage = new HomePage(mobilePage);
        sidebarHeading = await homePage.getSidebarHeadings();
        const homePageUrl: string = mobilePage.url();
        expect(homePageUrl).toBe(homeTestData.homePageUrl);
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
        await mobileContext.close();
    });
});
