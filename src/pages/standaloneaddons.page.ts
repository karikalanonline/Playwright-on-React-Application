import { Locator, Page } from 'playwright';
import { ProductDetailsPage } from './fa-details.page';

export class StandAloneAddons {
	constructor(private page: Page) {}

	public async standAloneAddons(page: Page) {
		return new StandAloneAddons(this.page);
	}

	public get addAddonsButton(): Locator {
		return this.page.locator(
			"//div[@class ='fa-main-footer']//span[normalize-space()='Add Add Ons']"
		);
	}

	public get negotiateAddonsButton(): Locator {
		return this.page.locator(
			"//div[@class ='fa-main-footer']//span[normalize-space()='Negotiate Add ons']"
		);
	}

	public get deleteAddonsButton(): Locator {
		return this.page.locator(
			"//div[@class ='fa-main-footer']//span[normalize-space()='Delete Add Ons']"
		);
	}

	public async getButton(button: string): Promise<Locator> {
		return this.page.locator(
			`//div[@class ='fa-main-footer']//span[normalize-space()='${button}']`
		);
	}
}
