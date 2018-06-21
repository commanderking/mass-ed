describe("App", function() {
  it("visits the district mcas page", function() {
    cy.visit("localhost:3000");
    cy.get('button[data-id="McasDataButton"]').click();
    cy.url().should("include", "/mcas");

    cy.get("#DistrictButton").click();
    cy.url().should("include", "/mcas/district");
    cy.get("#AddSchoolDistrictButton").should("contain", "ADD DISTRICT");

    cy.get(".rc-select-selection__rendered").click();
  });
});
