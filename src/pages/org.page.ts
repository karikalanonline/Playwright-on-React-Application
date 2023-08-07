import { Browser, Page } from 'playwright';
import { Connection } from 'jsforce';
import { execSync } from 'child_process';
import { HomePage } from './home-page';

export class Org {
	private static instance: Org;
	private page: Page;

	private constructor(private browser: Browser) {}

	private async createPage() {
		return this.browser.newPage();
	}

	async login() {
		this.page = await this.createPage();
		// const result = JSON.parse(execSync('sfdx force:org:display --json').toString()).result;

		const connection = new Connection({
			instanceUrl: 'https://kari-test.my.salesforce.com',
			accessToken:
				'00D4I000000fXhV!AQYAQBbOv7XmGMbU39VC7HEtGRRswMDbgtrMarO1zI_qem6e.0juW2UdwPkxPf2dtZZDg.JGbQ3LC2QuDQLFb5Bd_SJN_IWA'
		});

		try {
			// this url will append the access token with our instance Url. our org designed like this
			await this.page.goto(
				`${connection.instanceUrl}/secur/frontdoor.jsp?sid=${connection.accessToken}`
			);
		} catch (error) {
			throw new Error('Unable to login: ' + error.message);
		}

		const url = this.page.url();
		if (url.includes('lightning')) {
			await this.switchToClassic();
		}

		const popup = this.page.locator('#tryLexDialogX');
		if (await popup.isVisible()) {
			await popup.click();
		}

		await this.page.waitForLoadState('domcontentloaded');
		return new HomePage(this.page);
	}

	private async switchToClassic() {
		await this.page.locator('//div[@style ="background-color: #65CAE4"]').first().click();
		await this.page.locator('(//div[@class="profile-card-footer"]/a)[1]').click();
	}

	static getInstance(browser: Browser): Org {
		if (!this.instance) {
			//check if its negative OR false
			this.instance = new Org(browser);
		}
		return this.instance;
	}
}
