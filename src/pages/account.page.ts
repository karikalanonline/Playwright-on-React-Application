import { Locator, Page } from '@playwright/test'
import { DashboardPage } from './dashboard.page';

export class AccountsPage {


	private get famButton(): Locator {
		return this.page.locator('[value ="FAM_Custom2"]')
	}

	private getAccountLink(accountId: string): Locator {
		return this.page.locator(`th a[href$="/${accountId}"]`);
	}

	constructor(private page: Page) { }

	public async goToAccount(accountId: string): Promise<DashboardPage> {
		await this.getAccountLink(accountId).click();
		const popup = await this.switchToFamTab();
		return DashboardPage.on(popup)



	}

	public async getTitle(): Promise<string> {
		return this.page.title();
	}

	private async switchToFamTab(): Promise<Page> {
		const [popup] = await Promise.all([
			this.page.waitForEvent('popup'),
			this.famButton.first().click()
		]);
		return popup;
	}
}
