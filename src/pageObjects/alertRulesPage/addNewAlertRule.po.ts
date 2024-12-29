import { AlertRulesPage } from "./alertRules.po";
import { alertRuleTestData } from "../../testData/alertRuleTestData/alertRuleTestData";
import { Timeout } from "../../utils/enums";
import { expect } from "playwright/test";

export class AddNewAlertRulesPopup extends AlertRulesPage {
    protected readonly addNewAlertRule: string = "[class*='custom-scrollbar'] h2";
    protected readonly addNewRuleLabel: string = "label[class*='text-sm']";
    protected readonly validationAlertRule: string = "div[class*='text-red']";
    private readonly addAlertRuleNameButton: string = "[name='name']";
    private readonly siteDropdown: string = "[role='combobox']";
    private readonly cameraDropdown: string = "[class*='relative py'] span";
    private readonly cameraOptions: string = "[role='option']";
    private readonly addAnotherSiteButton: string = "[type='button'][class*='text-accentDark']";
    private readonly timesAndDates: string = "[class='relative'] svg";
    private readonly alertTypeButton: string = "[type='button'][role='combobox']";
    private readonly timeFirstSelected: string = "[id='radix-:r74:']";
    private readonly timeSecondSelected: string = "[id='radix-:rbs:']";
    private readonly timeErrorMessage: string = "[class*='mt-1 p']";
    private readonly saveScheduleButton: string = "[class*='bg-black text-white']";
    private readonly recipientsTextField: string = "[name='recipients']";
    private readonly selectType: string = "[role='option'] [id]";

    async getAddNewAlertRuleText(): Promise<string[]> {
        await this.waitForVisible(this.addNewAlertRule);
        return this.page.locator(this.addNewAlertRule).allInnerTexts();
    }
    async getAddNewRuleLabels(): Promise<string[]> {
        return this.page.locator(this.addNewRuleLabel).allInnerTexts();
    }
    async getValidationErrors(): Promise<string[]> {
        return this.page.locator(this.validationAlertRule).allInnerTexts();
    }
    async enterAlertRuleName(RuleName: string): Promise<void> {
        await this.page.locator(this.addAlertRuleNameButton).fill(RuleName);
    }
    async selectSite(site: string): Promise<void> {
        await this.page.locator(this.siteDropdown).click({ force: true });
        await this.page.locator(`text=${site}`).click();
    }
    async getAddAnotherSiteButtonText(): Promise<string> {
        return await this.page.locator(this.addAnotherSiteButton).innerText();
    }
    async selectCamera(): Promise<void> {
        await this.page.locator(this.cameraDropdown).first().click({ force: true });
        await this.waitForVisible(this.cameraOptions);
        await this.page.locator(this.cameraOptions).first().click({ force: true });
    }
    async selectTimesAndDates(): Promise<void> {
        await this.page.locator(this.timesAndDates).click();
        expect(await this.getAddNewAlertRuleText()).toContain(alertRuleTestData.notificationSchedule);
        expect(await this.getAddNewRuleLabels()).toContain(alertRuleTestData.notificationType);
        await this.selectTimeOption(2, "first");
        expect(await this.getTimeErrorMessage()).toContain(alertRuleTestData.timeErrorMessage);
        await this.waitForReadiness(Timeout.ONE_SECONDS);
        await this.selectTimeOption(3, "second");
        await this.saveSchedule();
    }
    async selectTimeOption(Index: number, timeOption: "first" | "second"): Promise<void> {
        const selectTime = this.page.locator(this.alertTypeButton).nth(Index);
        await this.waitForReadiness(Timeout.ONE_SECONDS);
        await selectTime.click({ force: true });
        const timeSelector = timeOption === "first" ? this.timeFirstSelected : this.timeSecondSelected;
        await this.page.locator(timeSelector).click({ force: true });
    }

    async getTimeErrorMessage(): Promise<string> {
        return await this.page.locator(this.timeErrorMessage).innerText();
    }
    async saveSchedule(): Promise<void> {
        await this.page.locator(this.saveScheduleButton).click();
    }
    async enterRecipients(Recipients: string): Promise<void> {
        await this.page.locator(this.recipientsTextField).fill(Recipients);
    }
    async selectAlertType(AlertType: string): Promise<void> {
        const selectAlertType = this.page.locator(this.alertTypeButton).last();
        await selectAlertType.click({ force: true });
        const alertTypeOption = this.page.locator(this.selectType).filter({ hasText: AlertType });
        await alertTypeOption.click({ force: true });
    }
}
