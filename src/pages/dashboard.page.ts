//import { test, expect } from 'playwright'
import { Locator, Page } from 'playwright';
import { FAC } from '../constants';
import { ProductDetailsPage } from './product-details.page';

export class DashboardPage {
  private get addNewAgreementButton(): Locator {
    return this.page.locator(
      "//div[@class = 'fa-dropdown-group']//button[@class = 'fa-button fa-button--brand']"
    );
  }
  private get createProductButton(): Locator {
    return this.page.locator('#createnewchild');
  }

  private get searchField(): Locator {
    return this.page.locator('.fa-input.fa-input-lg');
  }

  private getProductRow(name: string): Locator {
    // TODO: Revisit
    return this.page.locator(`//span[normalize-space()='${name}']`);
  }

  private getProductElement(name: string): Locator {
    return this.page.locator('.fa-panel').filter({ hasText: name }).first();
  }
  public static async on(page: Page) {
    const facPage = new DashboardPage(page);
    if (await facPage.isDisplayed()) {
      return facPage;
    }
    throw new Error('Product page is not displayed');
  }

  public getProductActionButton(buttonLabel: string): Locator {
    return this.page.locator(`//button[normalize-space()='${buttonLabel}']`);
  }

  private statusText(name: string): Locator {
    return this.getProductElement(name).locator('.fa-chip.fa-chip--draft');
  }

  public async isDisplayed() {
    return (await this.page.locator('h5.fa-main-header__subtitle').textContent()) === FAC;
  }

  public async createProduct(name: string) {
    await this.addNewAgreementButton.click();
    await this.createProductButton.click();
    const faDetailsPage = await ProductDetailsPage.on(this.page);
    await faDetailsPage.setProductName(name);
    return faDetailsPage.save();
  }

  public async isSearchFieldDisplayed(): Promise<boolean> {
    return this.searchField.isVisible();
  }

  public async cloneProduct(name: string) {
    const facPanel = await this.getProductElement(name)
      .locator('.icon.icon-threedots_vertical')
      .click();
    await this.getProductActionButton('Clone').click();
    await this.getProductActionButton('Clone').click();
    await this.page.waitForTimeout(5000);
  }
  public async deleteProduct(name: string) {
    const facPanel = await this.getProductElement(name)
      .locator('.icon.icon-threedots_vertical')
      .click();
    await this.getProductActionButton('Delete').click();
    await this.getProductActionButton('Delete').click();
    await this.page.waitForTimeout(5000);
  }
  private constructor(private page: Page) { }

  public async goToProductDetailsPage(name: string) {
    const facPanel = await this.getProductElement(name)
      .locator('.icon.icon-threedots_vertical')
      .click();
    await this.getProductActionButton('Edit').click();
    return ProductDetailsPage.on(this.page);
  }

  public async isAddNewAProductButtonDisplayed(): Promise<boolean> {
    return this.page.locator("button[class='fa-button fa-button--brand'] span").isVisible();
  }
  public async isProductExists(faName: string): Promise<boolean> {
    return this.getProductRow(faName).isVisible();
  }

  public async getStatus(faName: string) {
    return this.statusText(faName).textContent();
  }

  public countOf(name: string): Promise<number> {
    const faCount = this.getProductRow(name).count();
    return faCount;
  }

  public get accountName(): Promise<string | null> {
    return this.page.locator('h1.fa-main-header__title').textContent();
  }
}
module.exports = { FacPage: DashboardPage };
