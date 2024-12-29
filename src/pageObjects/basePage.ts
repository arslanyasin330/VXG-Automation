import { Page } from "@playwright/test";
import { Timeout } from "../utils/enums";

export class BasePage {
    protected page: Page;
    private readonly button: string = "[type='button']";

    constructor(page: Page) {
        this.page = page;
    }
    async visit(url: string): Promise<void> {
        await this.page.goto(url);
    }
    async waitForReadiness(number = Timeout.THREE_SECONDS): Promise<void> {
        return this.page.waitForTimeout(number);
    }
    async pressButton(buttonName: string): Promise<void> {
        await this.page.locator(this.button).filter({ hasText: buttonName }).click({ force: true });
    }
    async waitForPageToLoad(timeout = 30000): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded", { timeout: timeout });
    }
    async waitForVisible(selector: string, timeout = 30000): Promise<void> {
        try {
            await this.page.waitForSelector(selector, { state: "visible", timeout });
        } catch (error) {
            console.error(
                `Failed to find visible element with selector "${selector}" within ${timeout / 1000} seconds`,
            );
            throw error;
        }
    }
}
