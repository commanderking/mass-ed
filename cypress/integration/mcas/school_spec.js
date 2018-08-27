describe("App", function() {
  const baseUrl = Cypress.env("baseURL");
  const abingtonWoodscaleSchoolCode = 10015;
  it("visits the school mcas page, displays charts and selected schools when school is added", () => {
    cy.visit(baseUrl);
    cy.get('button[data-id="McasDataButton"]').click();
    cy.url().should("include", "/mcas");

    cy.get("#SchoolButton").click();
    cy.url().should("include", "/mcas/school");
    cy.get("#AddSchoolDistrictButton").should("contain", "ADD SCHOOL");
    cy.get("#McasChart").should("have.length", 0);

    cy.get("#SchoolDistrictSelect").click();
    cy.get(`#SchoolDistrictOption-${abingtonWoodscaleSchoolCode}`).click();
    cy.get("#AddSchoolDistrictButton").click();
    cy.get("#McasChart").should("have.length", 1);
    cy.get("#SelectedSchoolsComponent").should("have.length", 1);
  });

  it("can delete schools once added", () => {
    cy.visit(`${baseUrl}/mcas/school`);
    cy.get("#SchoolDistrictSelect").click();
    cy.get(`#SchoolDistrictOption-${abingtonWoodscaleSchoolCode}`).click();
    cy.get("#AddSchoolDistrictButton").click();

    cy
      .get(`#DeleteSchoolDistrict-${abingtonWoodscaleSchoolCode}-button`)
      .click();
    cy.get("#McasChart").should("have.length", 0);
    cy.get("#SelectedSchoolsComponent").should("have.length", 0);
  });
});
