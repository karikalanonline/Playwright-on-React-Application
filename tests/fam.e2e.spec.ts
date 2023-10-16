import { test, expect, Page } from '@playwright/test';
import { DashboardPage, Org, ProductDetailsPage, AccountsPage, Products, StandAloneAddons } from '../src';
const data = require('../testdata/account/productdetails.json');

let page: Page;

test.describe.serial('test', async () => {
	let dashboardPage: DashboardPage;
	let productsTab: Products;
	let standAloneAddons: StandAloneAddons;
	let productDetailsPage: ProductDetailsPage;

	test.beforeAll(async ({ browser }) => {
		const homePage = await Org.getInstance(browser).login();
		const accountsPage = await homePage.gotoAccounts();
		dashboardPage = await accountsPage.goToAccount(data.accountId);
	});

	test('Create New Product and Check if it is created', async ({}) => {
		const productDetailsPage = await dashboardPage.createProduct(data.newProductName);
		await productDetailsPage.back();
		expect(await dashboardPage.isProductExists(data.newProductName)).toBeTruthy();
	});

	test('Check the new product approval status', async ({}) => {
		expect(await dashboardPage.getStatus(data.newProductName)).toEqual('Draft');
	});

	test('Clone the product', async ({}) => {
		const countBeforeClone = await dashboardPage.countOf(data.newProductName);
		await dashboardPage.cloneProduct(data.newProductName);
		const countAfterClone = await dashboardPage.countOf(data.newProductName);
		expect(countAfterClone).toEqual(countBeforeClone + 1);
	});
	test('Delete the product', async ({}) => {
		const countBeforeDelete = await dashboardPage.countOf(data.newProductName);
		await dashboardPage.deleteProduct(data.newProductName);
		const countAfterDelete = await dashboardPage.countOf(data.newProductName);
		expect(countAfterDelete).toEqual(countBeforeDelete - 1);
	});
	test('add the new product', async ({}) => {
		const productDetailsPage = await dashboardPage.goToProductDetailsPage(data.newProductName);
		productsTab = await productDetailsPage.goToProducts();
		await productsTab.addProducts(data.product1);
	});
	test('delete the product', async ({}) => {
		await productsTab.selectProduct(data.product1);
		await productsTab.deleteProduct();
		const productCount = await productsTab.productCount(data.product1);
		expect(productCount).toEqual(0);
	});

	test('Add the standalone Addons', async ({}) => {
		const standAloneAddons = await productDetailsPage.goToStandAloneAddon();
	});
});
