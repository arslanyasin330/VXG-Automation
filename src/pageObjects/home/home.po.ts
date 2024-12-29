import { BasePage } from "../basePage";
import { Locator } from "@playwright/test";
import { homeTestData } from "../../testData/home/homeTestData";

export class HomePage extends BasePage {
    protected readonly sideBarHeading: string = "[class*='block font-medium']";

    get sideBarHeadings(): Locator {
        return this.page.locator(this.sideBarHeading);
    }
    async getSidebarHeadings(): Promise<string[]> {
        await this.waitForVisible(this.sideBarHeading);
        return this.sideBarHeadings.allInnerTexts();
    }
    async openAlertsFromSettings(): Promise<void> {
        await this.sideBarHeadings.filter({ hasText: homeTestData.alerts }).last().click({ force: true });
    }
    async openSidebarHeadings(heading: string): Promise<void> {
        await this.sideBarHeadings.filter({ hasText: heading }).first().click({ force: true });
    }
}
