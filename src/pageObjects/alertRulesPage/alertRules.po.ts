import { BasePage } from "../basePage";
import { alertRuleTestData } from "../../testData/alertRuleTestData/alertRuleTestData";

export class AlertRulesPage extends BasePage {
    private readonly alertRulesTableHeading: string = "th [class*='font-medium']";
    private readonly addAlertRuleButton: string = "button[class*='inline-flex']";
    private readonly alertRuleName: string = "tbody tr span";

    async getAlertRulesTableHeading(): Promise<string[]> {
        await this.waitForVisible(this.alertRulesTableHeading);
        return this.page.locator(this.alertRulesTableHeading).allInnerTexts();
    }
    async addAlertRule(): Promise<void> {
        await this.page
            .locator(this.addAlertRuleButton)
            .filter({ hasText: alertRuleTestData.addAlertRule })
            .click({ force: true });
    }
    async getAlertRuleName(): Promise<string[]> {
        await this.waitForVisible(this.alertRuleName);
        return this.page.locator(this.alertRuleName).allInnerTexts();
    }
}
