const TAB_YAML = 0;
const TAB_CHART = 1;
const TAB_METADATA = 2;
const TAB_COMMANDS = 3;
const TAB_VOLUMES = 4;
const TAB_CONTAINERS = 5;
const TAB_IMAGES = 6;
const TAB_RESOURCES = 7;

describe('devfile editor spec', () => {
  it('fails when YAML is not valid', () => {
    cy.visit('http://localhost:4200');    
    cy.clearDevfile();
    cy.setDevfile("wrong yaml content");
    cy.getByDataCy("yaml-error").should('contain.text', 'error parsing devfile YAML');
  });


  it('displays matadata.name set in YAML', () => {
    cy.visit('http://localhost:4200');    
    cy.clearDevfile();
    cy.fixture('with-metadata-name.yaml').then(yaml => {
      cy.setDevfile(yaml);
    });

    cy.selectTab(TAB_METADATA);
    cy.getByDataCy("metadata-name").should('have.value', 'test-devfile');
  });

  it('displays containers set in YAML', () => {
    cy.visit('http://localhost:4200');    
    cy.clearDevfile();
    cy.fixture('with-container.yaml').then(yaml => {
      cy.setDevfile(yaml);
    });

    cy.selectTab(TAB_CONTAINERS);
    cy.get('mat-card').first()
      .should('contain.text', 'container1')
      .should('contain.text', 'nginx')
      .should('contain.text', 'the command to run')
      .should('contain.text', 'with arg');
  });
});
