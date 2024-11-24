import { Builder, Browser, By, Key } from 'selenium-webdriver';
import { waitTill, SECOND, wrongBehavior, WrongBehavior } from './utils.js'

export class TestUserCV {
  constructor(driver, url) {
    this.driver = driver;
    this.url = url;
  }

  async run() {
    try {
      await this.#login();
      await this.#can_see_about_section();
      await this.#can_see_skills_section();
      await this.#can_see_education_section();
      await this.#can_see_experiences_section();
    } catch (error) {
      console.log(error);
    }
  }

  async #can_see_about_section() {
    const got = await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[1]/h2')).getText();
    const expected = "About";

    if (got !== expected) {
      throw new Error(`Expected ${expected}. Got ${got}`);
    }
  }

  async #can_see_skills_section() {
    const got = await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[1]/h2')).getText();
    const expected = "About";

    if (got !== expected) {
      throw new Error(`Expected ${expected}. Got ${got}`);
    }
  }

  async #can_see_experiences_section() {
    const got = await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[3]')).getText();
    const expected = "Work experience";

    if (got !== expected) {
      throw new Error(`Expected ${expected}. Got ${got}`);
    }
  }

  async #can_see_education_section() {
    const got = await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[3]/div/div/div[2]/h2')).getText();
    const expected = "Education";

    if (got !== expected) {
      throw new Error(`Expected ${expected}. Got ${got}`);
    }
  }

  async #login() {
    await this.driver.get(this.url)
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div[4]/button')).click();
    await this.driver.findElement(By.xpath('//*[@id=":r0:"]')).sendKeys('fran@qvitae.com');
    await this.driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys('droide03');
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();

    await waitTill(SECOND * 2);
    await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[1]/div[1]/div[3]/div[1]/h1')).getText();
  }
}
