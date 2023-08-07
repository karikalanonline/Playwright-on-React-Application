import { Locator, Page } from 'playwright';
import { DashboardPage as DashBoardPage } from './dashboard.page';
import { Products } from './products';
import { StandAloneAddons } from './standaloneaddons.page';
// const data = require('../testdata/account/fadetails.json')

export class ProductDetailsPage {
	private constructor(private page: Page) {}
	private get backButton(): Locator {
		return this.page.locator("(//*[name()='svg'][@class='icon icon-back '])[1]");
	}

	async back() {
		await this.backButton.click();
		return DashBoardPage.on(this.page);
	}

	static async on(page: Page) {
		const faDetailsPage = new ProductDetailsPage(page);
		return faDetailsPage;
	}

	public async productDetailsPage() {
		return new ProductDetailsPage(this.page);
	}

	public get saveButton(): Locator {
		return this.page.locator("//button[normalize-space()='Save']");
	}

	private get productNameInput(): Locator {
		return this.page.locator("//div[.='Agreement name']//input");
	}

	public get successMessageToaster(): Locator {
		return this.page.locator("//div[@class='toaster-container']");
	}
	private getTabElement(tabName: string): Locator {
		return this.page.locator(
			`//li[contains(@class,'fa-tab ')]//a[normalize-space()='${tabName}']`
		);
	}

	public async isTabSelected(tabName: string) {
		return (await this.getTabElement(tabName).getAttribute('class'))?.includes('active');
	}
	public async setProductName(name: string): Promise<void> {
		await this.productNameInput.fill(name);
	}

	public async save(): Promise<ProductDetailsPage> {
		await this.saveButton.click();
		await this.successMessageToaster.waitFor({
			state: 'visible'
		});
		return this;
	}
	public async goToProducts() {
		const productsTab = await this.isTabSelected('Products');
		if (productsTab == false) {
			await this.getTabElement('Products').click();
		}
		return new Products(this.page);
	}

	public async goToStandAloneAddon() {
		const standAloneAddonsTab = await this.isTabSelected('Standalone Addons');
		if (standAloneAddonsTab == false) {
			await this.getTabElement('Standalone Addons').click();
		}
		return new StandAloneAddons(this.page);
	}
}
