import { Locator, Page } from '@playwright/test'
import { DashboardPage } from './dashboard.page';

export class AccountsPage {


	private get dashboardButton(): Locator {
		return this.page.locator('[value ="FAM_Custom2"]')
	}

	private getAccountLink(accountId: string): Locator {
		return this.page.locator(`th a[href$="/${accountId}"]`);
	}

	constructor(private page: Page) { }

	public async goToAccount(accountId: string): Promise<DashboardPage> {
		await this.getAccountLink(accountId).click();
		const popup = await this.switchToDashboardTab();
		return DashboardPage.on(popup)



	}

	public async getTitle(): Promise<string> {
		return this.page.title();
	}

	private async switchToDashboardTab(): Promise<Page> {
		const [popup] = await Promise.all([
			this.page.waitForEvent('popup'),
			this.dashboardButton.first().click()
		]);
		return popup;
	}
}
