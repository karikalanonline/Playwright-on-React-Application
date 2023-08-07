import { test, expect, Page } from '@playwright/test';
import { FacPage, Org, FaDetailsPage, AccountsPage, Products, standAloneAddons } from '../src';
const data = require('../testdata/account/fadetails.json');

let page: Page;

test.describe.serial('test', async () => {
	let facPage: FacPage;
	let productsTab: Products;
	let standAloneAddons: standAloneAddons;
	let faDetailsPage: FaDetailsPage;

	test.beforeAll(async ({ browser }) => {
		const homePage = await Org.getInstance(browser).login();
		const accountsPage = await homePage.gotoAccounts();
		facPage = await accountsPage.goToAccount(data.accountId);
	});

	test('Create New FA and Check if it is created', async ({}) => {
		const faDetailsPage = await facPage.createFrameAgreement(data.newFaName);
		await faDetailsPage.back();
		expect(await facPage.isFrameAgreementExists(data.newFaName)).toBeTruthy();
	});

	test('Check the new FA status', async ({}) => {
		expect(await facPage.getStatus(data.newFaName)).toEqual('Draft');
	});

	test('Clone the FA', async ({}) => {
		const countBeforeClone = await facPage.countOf(data.newFaName);
		await facPage.cloneFA(data.newFaName);
		const countAfterClone = await facPage.countOf(data.newFaName);
		expect(countAfterClone).toEqual(countBeforeClone + 1);
	});
	test('Delete the FA', async ({}) => {
		const countBeforeDelete = await facPage.countOf(data.newFaName);
		await facPage.deleteFA(data.newFaName);
		const countAfterDelete = await facPage.countOf(data.newFaName);
		expect(countAfterDelete).toEqual(countBeforeDelete - 1);
	});
	test('add the new product', async ({}) => {
		const faDetailsPage = await facPage.goToFaDetailsPage(data.newFaName);
		productsTab = await faDetailsPage.goToProducts();
		await productsTab.addProducts(data.product1);
	});
	test('delete the product', async ({}) => {
		await productsTab.selectProduct(data.product1);
		await productsTab.deleteProduct();
		const productCount = await productsTab.productCount(data.product1);
		expect(productCount).toEqual(0);
	});

	test('Add the standalone Addons', async ({}) => {
		const standAloneAddons = await faDetailsPage.goToStandAloneAddon();
	});
});
