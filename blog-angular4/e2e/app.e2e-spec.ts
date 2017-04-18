import { BlogAngular4Page } from './app.po';

describe('blog-angular4 App', () => {
  let page: BlogAngular4Page;

  beforeEach(() => {
    page = new BlogAngular4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
