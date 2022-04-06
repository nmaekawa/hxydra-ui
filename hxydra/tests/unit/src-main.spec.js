import { screen } from '@testing-library/vue'

describe('src/main.js', () => {
  it('load src-main page', async () => {
    document.body.innerHTML =
      '<div id="app">' +
      '</div>';
    require('@/main.js')
    screen.getByText("Welcome to Kondo", {exact: false})
  });
})