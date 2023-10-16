import { Locator, Page } from 'playwright';

export class StandAloneAddons {
	constructor(private page: Page) {}

	public async standAloneAddons(page: Page) {
		return new StandAloneAddons(this.page);
	}

	public get addAddonsButton(): Locator {
		return this.page.locator(
			"//div[@class ='addon-main-footer']//span[normalize-space()='Add Add Ons']"
		);
	}

	public get negotiateAddonsButton(): Locator {
		return this.page.locator(
			"//div[@class ='addon-main-footer']//span[normalize-space()='Negotiate Add ons']"
		);
	}

	public get deleteAddonsButton(): Locator {
		return this.page.locator(
			"//div[@class ='addon-main-footer']//span[normalize-space()='Delete Add Ons']"
		);
	}

	public async getButton(button: string): Promise<Locator> {
		return this.page.locator(
			`//div[@class ='addon-main-footer']//span[normalize-space()='${button}']`
		);
	}
}
