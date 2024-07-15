import Input from './Input.vue';

describe('Input', () => {
  it('should mount', () => {
    cy.mount(Input, {
      props: {
        name: 'foobar'
      }
    });

    cy.get('input').should('exist').and('have.attr', 'name', 'foobar');
  });
});