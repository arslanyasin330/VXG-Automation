import { BasePage } from "../basePage";
import { Locator } from "@playwright/test";

export class LoginPage extends BasePage {
    private readonly logo: string = "img[alt='Main logo']";
    private readonly pageHeading: string = "h1[class*='font-semibold']";
    private readonly emailLabel: string = "label[for='email']";
    private readonly passwordLabel: string = "label[for='password']";
    private readonly emailInputField: string = "[id='email']";
    private readonly passwordInputField: string = "[id='password']";
    private readonly singInButton: string = "[class*='bg-accentMain']";
    private readonly errorMessage: string = "form [class*='text-red']";
    private readonly invalidCredentials: string = "p[class*='text-red']";
    private readonly sidebarMenu: string = "[aria-haspopup='menu']";
    private readonly signOutButton: string = "[role='menuitem']";

    async getLogo(): Promise<Locator> {
        return this.page.locator(this.logo);
    }
    async getHeading(): Promise<Locator> {
        return this.page.locator(this.pageHeading);
    }
    async getEmailLabel(): Promise<Locator> {
        return this.page.locator(this.emailLabel);
    }
    async getPasswordLabel(): Promise<Locator> {
        return this.page.locator(this.passwordLabel);
    }
    async enterEmail(Email: string): Promise<void> {
        const email = this.page.locator(this.emailInputField);
        await email.fill(Email);
    }
    async enterPassword(Password: string): Promise<void> {
        const email = this.page.locator(this.passwordInputField);
        await email.fill(Password);
    }
    async signIn(): Promise<void> {
        await this.page.locator(this.singInButton).click({ force: true });
    }
    async getErrorMessage(): Promise<string[]> {
        return this.page.locator(this.errorMessage).allInnerTexts();
    }
    async getInvalidCredentialsError(): Promise<string> {
        return this.page.locator(this.invalidCredentials).innerText();
    }
    async openSidebarMenu(): Promise<void> {
        await this.page.locator(this.sidebarMenu).click({ force: true });
    }
    async signOut(): Promise<void> {
        await this.page.locator(this.signOutButton).click({ force: true });
    }
}
