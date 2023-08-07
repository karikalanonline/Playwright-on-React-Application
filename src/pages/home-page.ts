import { Locator, Page } from "playwright";
import { AccountsPage } from "./account.page";

export class HomePage {
    constructor(private page: Page) { }

    private get accountTab(): Locator { // Getter methods
        return this.page.locator('li a[title="Accounts Tab"]');
    }

    public async gotoAccounts(): Promise<AccountsPage> {
        await this.accountTab.click();
        return new AccountsPage(this.page);
    }
}
