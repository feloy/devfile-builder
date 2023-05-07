import { TAB_COMMANDS, TAB_CONTAINERS, TAB_IMAGES, TAB_RESOURCES } from "./consts";

describe('devfile editor errors handling', () => {

    it('fails when YAML is not valid', () => {
        cy.visit('http://localhost:4200');
        cy.clearDevfile();
        cy.setDevfile("wrong yaml content");
        cy.getByDataCy("yaml-error").should('contain.text', 'error parsing devfile YAML');
      });

    it('fails when adding a container with an already used name', () => {
        cy.visit('http://localhost:4200');
        cy.clearDevfile();
        cy.fixture('input/with-container.yaml').then(yaml => {
            cy.setDevfile(yaml);
        });
        cy.selectTab(TAB_CONTAINERS);
        cy.getByDataCy('add').click();
        cy.getByDataCy('container-name').type('container1');
        cy.getByDataCy('container-image').type('an-image');
        cy.getByDataCy('container-create').click();
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`container1 already exists`)
        });
    });

    it('fails when adding an image with an already used name', () => {
        cy.visit('http://localhost:4200');
        cy.clearDevfile();
        cy.fixture('input/with-container.yaml').then(yaml => {
            cy.setDevfile(yaml);
        });
        cy.selectTab(TAB_IMAGES);
        cy.getByDataCy('image-name').type('container1');
        cy.getByDataCy('image-image-name').type('an-image-name');
        cy.getByDataCy('image-build-context').type('/path/to/build/context');
        cy.getByDataCy('image-dockerfile-uri').type('/path/to/dockerfile');
        cy.getByDataCy('image-create').click();
            cy.on('window:alert', (str) => {
            expect(str).to.contain(`container1 already exists`)
        });
    });

    it('fails when adding a resource with an already used name', () => {
        cy.visit('http://localhost:4200');
        cy.clearDevfile();
        cy.fixture('input/with-container.yaml').then(yaml => {
            cy.setDevfile(yaml);
        });
        cy.selectTab(TAB_RESOURCES);
        cy.getByDataCy('resource-name').type('container1');
        cy.getByDataCy('resource-toggle-inlined').click();
        cy.getByDataCy('resource-manifest').type('a-resource-manifest');
        cy.getByDataCy('resource-create').click();
                cy.on('window:alert', (str) => {
            expect(str).to.contain(`container1 already exists`)
        });
    });

    it('fails when adding an exec command with an already used name', () => {
        cy.visit('http://localhost:4200');
        cy.clearDevfile();
        cy.fixture('input/with-command.yaml').then(yaml => {
            cy.setDevfile(yaml);
        });
        cy.selectTab(TAB_COMMANDS);
        cy.getByDataCy('add').click();
        cy.getByDataCy('new-command-exec').click();
    
        cy.getByDataCy('command-exec-name').type('command1');
        cy.getByDataCy('command-exec-command-line').type('a-cmdline');
        cy.getByDataCy('command-exec-working-dir').type('/path/to/working/dir');
        cy.getByDataCy('select-container').click().get('mat-option').contains('container1').click();
        cy.getByDataCy('command-exec-create').click();
        cy.on('window:alert', (str) => {
            expect(str).to.contain(`command1 already exists`)
        });
    });
});

