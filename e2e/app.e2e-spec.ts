import { EcomPage } from './app.po';

describe('ecom App', () => {
  let page: EcomPage;

  beforeEach(() => {
    page = new EcomPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
