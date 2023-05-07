import { TAB_CONTAINERS, TAB_IMAGES } from "./consts";

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

    it.only('fails when adding an image with an already used name', () => {
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
});

