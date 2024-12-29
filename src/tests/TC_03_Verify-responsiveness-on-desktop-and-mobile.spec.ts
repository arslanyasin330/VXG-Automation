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

    const scenarios = [
        {
            name: "Desktop",
            viewport: { width: 1920, height: 1080 },
            context: null,
        },
        {
            name: "Mobile",
            viewport: devices["iPhone 12"].viewport,
            userAgent: devices["iPhone 12"].userAgent,
            context: "mobile",
        },
    ];

    for (const scenario of scenarios) {
        test(`Verify ${scenario.name} responsiveness of the application`, { tag: ["@smoke"] }, async ({ page, browser }) => {
            if (scenario.context === "mobile") {
                const mobileContext = await browser.newContext({
                    viewport: scenario.viewport,
                    userAgent: scenario.userAgent,
                });
                page = await mobileContext.newPage();
            } else {
                await page.setViewportSize(scenario.viewport as { width: number; height: number });
            }

            // Initialize login page and visit base URL
            loginPage = new LoginPage(page);
            await loginPage.visit(process.env.BASE_URL);

            // Assertions for login page
            await expect(page).toHaveTitle(loginTestData.landingPageTitle);
            await expect(page).toHaveURL(loginTestData.signInUrl);
            await expect(await loginPage.getLogo()).toBeVisible();
            await expect(await loginPage.getHeading()).toContainText(loginTestData.title);
            await expect(await loginPage.getEmailLabel()).toContainText(loginTestData.emailLabel);
            await expect(await loginPage.getPasswordLabel()).toContainText(loginTestData.passwordLabel);

            // Log in and verify home page
            await loginPage.enterEmail(process.env.SYSTEM_USERNAME);
            await loginPage.enterPassword(process.env.SYSTEM_PASSWORD);
            await loginPage.signIn();

            homePage = new HomePage(page);
            sidebarHeading = await homePage.getSidebarHeadings();
            const homePageUrl: string = page.url();
            expect(homePageUrl).toBe(homeTestData.homePageUrl);

            // Validate sidebar headings
            const expectedHeadings = [
                homeTestData.dashboard,
                homeTestData.monitoring,
                homeTestData.alerts,
                homeTestData.archive,
                homeTestData.search,
                homeTestData.setting,
                homeTestData.settings.alert,
                homeTestData.settings.alerts.rules,
                homeTestData.settings.alerts.faces,
                homeTestData.settings.users,
                homeTestData.settings.cameras,
                homeTestData.settings.sites,
            ];
            for (const heading of expectedHeadings) {
                await expect(sidebarHeading).toContain(heading);
            }

            if (scenario.context === "mobile") {
                await page.context().close();
            }
        });
    }
});
