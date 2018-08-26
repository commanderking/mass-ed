describe("App", function() {
  const actonBoxboroughDistrictCode = 6000000;
  const arlingtonDistrictCode = 100000;
  it("visits the district mcas page, displays charts and selected schools when districts added", function() {
    cy.visit("localhost:3000");
    cy.get('button[data-id="McasDataButton"]').click();
    cy.url().should("include", "/mcas");

    cy.get("#DistrictButton").click();
    cy.url().should("include", "/mcas/district");
    cy.get("#AddSchoolDistrictButton").should("contain", "ADD DISTRICT");
    cy.get("#McasChart").should("have.length", 0);

    cy.get("#SchoolDistrictSelect").click();
    cy.get(`#SchoolDistrictOption-${actonBoxboroughDistrictCode}`).click();
    cy.get("#AddSchoolDistrictButton").click();

    // Select second district
    cy.get(".rc-select-selection__clear-icon").click();
    cy.get("#SchoolDistrictSelect").click();
    cy.get(`#SchoolDistrictOption-${arlingtonDistrictCode}`).click();
    cy.get("#AddSchoolDistrictButton").click();
    cy.get("#McasChart").should("have.length", 1);
    cy.get("#SelectedSchoolsComponent").should("have.length", 1);
  });
  it("can delete districts", () => {
    cy.visit("localhost:3000/mcas/district");

    cy.get("#SchoolDistrictSelect").click();
    cy.get(`#SchoolDistrictOption-${actonBoxboroughDistrictCode}`).click();
    cy.get("#AddSchoolDistrictButton").click();

    cy
      .get(`#DeleteSchoolDistrict-${actonBoxboroughDistrictCode}-button`)
      .click();
    cy.get("#McasChart").should("have.length", 0);
    cy.get("#SelectedSchoolsComponent").should("have.length", 0);
  });
});
