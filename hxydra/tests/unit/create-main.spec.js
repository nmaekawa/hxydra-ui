import { screen } from '@testing-library/vue'

describe('src/pages/kondo_create/main.js', () => {
  it('load create-main page', async () => {
    document.body.innerHTML =
      '<div id="app">' +
      '</div>';
    require('@/pages/kondo_create/main.js')
    screen.getByText("Create New Project", {exact: false})
  });
})