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
    cy.fixture('input/with-metadata-name.yaml').then(yaml => {
      cy.setDevfile(yaml);
    });

    cy.selectTab(TAB_METADATA);
    cy.getByDataCy("metadata-name").should('have.value', 'test-devfile');
  });

  it('displays container set in YAML', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();
    cy.fixture('input/with-container.yaml').then(yaml => {
      cy.setDevfile(yaml);
    });

    cy.selectTab(TAB_CONTAINERS);
    cy.getByDataCy('container-info').first()
      .should('contain.text', 'container1')
      .should('contain.text', 'nginx')
      .should('contain.text', 'the command to run')
      .should('contain.text', 'with arg');
  });

  it('displays a created container', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();

    cy.selectTab(TAB_CONTAINERS);
    cy.getByDataCy('container-name').type('created-container');
    cy.getByDataCy('container-image').type('an-image');
    cy.getByDataCy('container-create').click();

    cy.getByDataCy('container-info').first()
      .should('contain.text', 'created-container')
      .should('contain.text', 'an-image');
  });

  it('displays a created image', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();

    cy.selectTab(TAB_IMAGES);
    cy.getByDataCy('image-name').type('created-image');
    cy.getByDataCy('image-image-name').type('an-image-name');
    cy.getByDataCy('image-build-context').type('/path/to/build/context');
    cy.getByDataCy('image-dockerfile-uri').type('/path/to/dockerfile');
    cy.getByDataCy('image-create').click();

    cy.getByDataCy('image-info').first()
      .should('contain.text', 'created-image')
      .should('contain.text', 'an-image-name')
      .should('contain.text', '/path/to/build/context')
      .should('contain.text', '/path/to/dockerfile');
  });

  it('displays a created resource', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();

    cy.selectTab(TAB_RESOURCES);
    cy.getByDataCy('resource-name').type('created-resource');
    cy.getByDataCy('resource-manifest').type('a-resource-manifest');
    cy.getByDataCy('resource-create').click();

    cy.getByDataCy('resource-info').first()
      .should('contain.text', 'created-resource')
      .should('contain.text', 'a-resource-manifest');
  });

  it('creates an exec command with a new container', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();

    cy.selectTab(TAB_COMMANDS);
    cy.getByDataCy('new-command-exec').click();
    cy.getByDataCy('command-exec-name').type('created-command');
    cy.getByDataCy('command-exec-command-line').type('a-cmdline');
    cy.getByDataCy('command-exec-working-dir').type('/path/to/working/dir');
    cy.getByDataCy('select-container').click().get('mat-option').contains('(New Container)').click();
    cy.getByDataCy('container-name').type('a-created-container');
    cy.getByDataCy('container-image').type('an-image');
    cy.getByDataCy('container-create').click();

    cy.getByDataCy('select-container').should('contain', 'a-created-container');
    cy.getByDataCy('command-exec-create').click();

    cy.getByDataCy('command-info').first()
      .should('contain.text', 'created-command')
      .should('contain.text', 'a-cmdline')
      .should('contain.text', '/path/to/working/dir')
      .should('contain.text', 'a-created-container');

    cy.selectTab(TAB_CONTAINERS);
    cy.getByDataCy('container-info').first()
      .should('contain.text', 'a-created-container')
      .should('contain.text', 'an-image');
  });

  it('creates an apply image command with a new image', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();

    cy.selectTab(TAB_COMMANDS);
    cy.getByDataCy('new-command-image').click();
    cy.getByDataCy('command-image-name').type('created-command');
    cy.getByDataCy('select-container').click().get('mat-option').contains('(New Image)').click();
    cy.getByDataCy('image-name').type('a-created-image');
    cy.getByDataCy('image-image-name').type('an-image-name');
    cy.getByDataCy('image-build-context').type('/context/dir');
    cy.getByDataCy('image-dockerfile-uri').type('/path/to/Dockerfile');
    cy.getByDataCy('image-create').click();

    cy.getByDataCy('select-container').should('contain', 'a-created-image');
    cy.getByDataCy('command-image-create').click();

    cy.getByDataCy('command-info').first()
      .should('contain.text', 'created-command')
      .should('contain.text', 'a-created-image');

    cy.selectTab(TAB_IMAGES);
    cy.getByDataCy('image-info').first()
      .should('contain.text', 'a-created-image')
      .should('contain.text', 'an-image-name')
      .should('contain.text', '/context/dir')
      .should('contain.text', '/path/to/Dockerfile');
  });

  it('creates an apply resource command with a new resource', () => {
    cy.visit('http://localhost:4200');
    cy.clearDevfile();

    cy.selectTab(TAB_COMMANDS);
    cy.getByDataCy('new-command-apply').click();
    cy.getByDataCy('command-apply-name').type('created-command');
    cy.getByDataCy('select-container').click().get('mat-option').contains('(New Resource)').click();
    cy.getByDataCy('resource-name').type('a-created-resource');
    cy.getByDataCy('resource-manifest').type('spec: {}');
    cy.getByDataCy('resource-create').click();

    cy.getByDataCy('select-container').should('contain', 'a-created-resource');
    cy.getByDataCy('command-apply-create').click();

    cy.getByDataCy('command-info').first()
      .should('contain.text', 'created-command')
      .should('contain.text', 'a-created-resource');

    cy.selectTab(TAB_RESOURCES);
    cy.getByDataCy('resource-info').first()
      .should('contain.text', 'a-created-resource')
      .should('contain.text', 'spec: {}');
  });
});
