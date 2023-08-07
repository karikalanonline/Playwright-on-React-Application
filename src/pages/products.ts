import { Locator, Page } from 'playwright';
import { ProductDetailsPage } from './fa-details.page';

export class Products {
	public constructor(private page: Page) {}

	private get addProductsButton(): Locator {
		return this.page.locator(
			"//div[@class ='box-button-container']//button[normalize-space()='Add Products']"
		);
	}

	private get addProductsWindow(): Locator {
		return this.page.locator("//div[@class='styles_modal__gNwvD modal fa-modal']");
	}

	private get filterSearchBox(): Locator {
		return this.page.locator("//input[@placeholder='Filter products']");
	}

	private retrivedProductPanel(product1: string): Locator {
		return this.page.locator(`//span[normalize-space()='${product1}']`);
	}

	private get addSelectedButton(): Locator {
		return this.page.locator(
			"//div[@class='fa-modal-footer']//button[normalize-space()='Add Selected']"
		);
	}

	private get underProductsTab(): Locator {
		return this.page.locator("//div[@class='card products-card']");
	}
	private get searchBox(): Locator {
		return this.page.locator("//input[@placeholder='Quick search']");
	}
	private async searchProduct(product1: string) {
		return this.searchBox.fill(product1);
	}
	private get retrivedProduct(): Locator {
		return this.page.locator("//div[@class='container__header']");
	}
	private get checkBox(): Locator {
		return this.page.locator("(//div[@class='container__header']//div[@class='checkbox'])[2]");
	}

	public async addProducts(product1: string) {
		await this.addProductsButton.click();
		await this.filterSearchBox.fill(product1);
		await this.retrivedProductPanel(product1).click();
		await this.addSelectedButton.click();
		await this.page.waitForTimeout(3000);
		const productDetailsPage = await ProductDetailsPage.on(this.page);
		await productDetailsPage.saveButton.click();
		await productDetailsPage.successMessageToaster.waitFor({ state: 'visible' });
	}

	public async getAllProductNames(): Promise<string[]> {
		const productNames = await this.page
			.locator(
				"//div[@class='container__header']//div[@class='fields__item fields__item--title']"
			)
			.allTextContents();
		console.log(productNames);
		return productNames;
	}
	public async getProductName(product1: string): Promise<Locator> {
		return this.page.locator(`//div[normalize-space()='${product1}']`);
	}

	public async selectProduct(product1: string) {
		await this.searchProduct(product1);
		await this.checkBox.click();
	}

	public async deleteProduct(): Promise<void> {
		await this.footerDeleteProductsButton.click();
		await this.deleteProductsButton.click();
	}
	private get productCheckBox(): Locator {
		return this.page.locator(
			"(//div[@class='container__header']//div[@class='container__checkbox'])[2]"
		);
	}
	private get footerDeleteProductsButton(): Locator {
		return this.page.locator("//span[normalize-space()='Delete Products']");
	}
	private get deleteProductsButton(): Locator {
		return this.page.locator(
			"//div[@class='fa-modal-footer']//button[contains(text(),'Delete Products')]"
		);
	}

	public async productCount(product1: string): Promise<Number> {
		return (await this.getProductName(product1)).count();
	}
	public async isProductExits(product1: string): Promise<boolean> {
		return (await this.getProductName(product1)).isEnabled();
	}
}
