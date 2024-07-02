import Input from './Input.vue'

describe('<Input name="test" />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Input)
  })
})