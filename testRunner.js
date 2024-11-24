import { Builder, Browser } from 'selenium-webdriver';
import { TestUserManagementSystem } from './userManagementSystem.js';
import { TestUserCV } from './userCV.js';

const driver = await new Builder().forBrowser(Browser.FIREFOX).build()
const url = "https://qvitae.com.do/";

const testUserManagementSystem = new TestUserManagementSystem(driver, url);
const testUserCV = new TestUserCV(driver, url);

await testUserManagementSystem.run();
await testUserCV.run();
await driver.quit();
