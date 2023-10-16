//import { test, expect } from 'playwright'
import { Locator, Page } from 'playwright';
import { DASHBOARD } from '../constants';
import { ProductDetailsPage } from './product-details.page';

export class DashboardPage {
  private get addProductButton(): Locator {
    return this.page.locator(
      "//div[@class = 'product-dropdown-group']//button[@class = 'product-button product-button--brand']"
    );
  }
  private get createProductButton(): Locator {
    return this.page.locator('#createnewchild');
  }

  private get searchField(): Locator {
    return this.page.locator('.product-name-input.product-name-input-lg');
  }

  private getProductRow(name: string): Locator {
    // TODO: Revisit
    return this.page.locator(`//span[normalize-space()='${name}']`);
  }

  private getProductElement(name: string): Locator {
    return this.page.locator('.product-panel').filter({ hasText: name }).first();
  }
  public static async on(page: Page) {
    const dashboardPage = new DashboardPage(page);
    if (await dashboardPage.isDisplayed()) {
      return dashboardPage;
    }
    throw new Error('Product page is not displayed');
  }

  public getProductActionButton(buttonLabel: string): Locator {
    return this.page.locator(`//button[normalize-space()='${buttonLabel}']`);
  }

  private statusText(name: string): Locator {
    return this.getProductElement(name).locator('.product-status-chip.product-status--draft');
  }

  public async isDisplayed() {
    return (await this.page.locator('h5.product-main-header__subtitle').textContent()) === DASHBOARD;
  }

  public async createProduct(name: string) {
    await this.addProductButton.click();
    await this.createProductButton.click();
    const productDetailsPage = await ProductDetailsPage.on(this.page);
    await productDetailsPage.setProductName(name);
    return productDetailsPage.save();
  }

  public async isSearchFieldDisplayed(): Promise<boolean> {
    return this.searchField.isVisible();
  }

  public async cloneProduct(name: string) {
    const productPanel = await this.getProductElement(name)
      .locator('.icon.icon-threedots_vertical')
      .click();
    await this.getProductActionButton('Clone').click();
    await this.getProductActionButton('Clone').click();
    await this.page.waitForTimeout(5000);
  }
  public async deleteProduct(name: string) {
    const productPanel = await this.getProductElement(name)
      .locator('.icon.icon-threedots_vertical')
      .click();
    await this.getProductActionButton('Delete').click();
    await this.getProductActionButton('Delete').click();
    await this.page.waitForTimeout(5000);
  }
  private constructor(private page: Page) { }

  public async goToProductDetailsPage(name: string) {
    const productPanel = await this.getProductElement(name)
      .locator('.icon.icon-threedots_vertical')
      .click();
    await this.getProductActionButton('Edit').click();
    return ProductDetailsPage.on(this.page);
  }

  public async isAddNewAProductButtonDisplayed(): Promise<boolean> {
    return this.page.locator("button[class='product-button product-button--brand'] span").isVisible();
  }
  public async isProductExists(productName: string): Promise<boolean> {
    return this.getProductRow(productName).isVisible();
  }

  public async getStatus(productName: string) {
    return this.statusText(productName).textContent();
  }

  public countOf(name: string): Promise<number> {
    const productCount = this.getProductRow(name).count();
    return productCount;
  }

  public get accountName(): Promise<string | null> {
    return this.page.locator('h1.product-main-header__title').textContent();
  }
}
module.exports = { DashboardPage };
