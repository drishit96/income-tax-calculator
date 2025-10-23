/// <reference types="cypress" />

describe("Income tax calculator tests", () => {
  //unregister all service workers
  beforeEach(() => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  });

  it("should show correct tax for given input", () => {
    cy.visit("http://localhost:5000/");

    cy.get("[data-id='grossSalary']").type("1250000");
    cy.get("[data-id='incomeFromSavingsAccount']").type("15000");
    cy.get("[data-id='incomeFromOtherSources']").type("50000");
    cy.get("[data-id='incomeFromHouseProperty']").type("10000");

    cy.get("[data-id='standardDeduction']")
      .should("be.disabled")
      .and("have.value", "50000 or 75000");
    cy.get("[data-id='entertainmentAllowance']").type("1000");
    cy.get("[data-id='professionalTax']").type("2500");
    cy.get("[data-id='hraExemption']").type("20000");

    cy.get("[data-id='deduction80C']").type("120000");
    cy.get("[data-id='deduction80D']").type("10000");
    cy.get("[data-id='deduction80CCD1B']").type("20000");
    cy.get("[data-id='deduction80CCD2']").type("10000");
    cy.get("[data-id='deduction80TTA']").should("be.disabled").and("have.value", "10000");
    cy.get("[data-id='otherDeductions']").type("50000");

    cy.get("[data-id='taxSavingsHeader']").should("have.text", "Savings in New regime");
    cy.get("[data-id='taxPayableUnderOldRegime']").should("have.text", "₹1,26,828");
    cy.get("[data-id='taxPayableUnderNewRegime']").should("have.text", "₹68,640");
    cy.get("[data-id='taxSavingsValue']").should("have.text", "₹58,188");
  });

  it('should not allow negative value for any input except "Income from House Property"', () => {
    cy.visit("http://localhost:5000/");

    cy.get("[data-id='grossSalary']").clear().type("-75").should("not.have.value", "-75");
    cy.get("[data-id='incomeFromSavingsAccount']")
      .clear()
      .type("-15000")
      .should("not.have.value", "-15000");
    cy.get("[data-id='incomeFromOtherSources']")
      .clear()
      .type("-50000")
      .should("not.have.value", "-50000");
    cy.get("[data-id='incomeFromHouseProperty']")
      .clear()
      .type("-1000")
      .should("have.value", "-1000");

    cy.get("[data-id='entertainmentAllowance']")
      .clear()
      .type("-1000")
      .should("not.have.value", "-1000");
    cy.get("[data-id='professionalTax']")
      .clear()
      .type("-2500")
      .should("not.have.value", "-2500");

    cy.get("[data-id='deduction80C']")
      .clear()
      .type("-120000")
      .should("not.have.value", "-120000");
    cy.get("[data-id='deduction80D']")
      .clear()
      .type("-10000")
      .should("not.have.value", "-10000");
    cy.get("[data-id='deduction80CCD1B']")
      .clear()
      .type("-10000")
      .should("not.have.value", "-10000");
    cy.get("[data-id='deduction80CCD2']")
      .clear()
      .type("-85000")
      .should("not.have.value", "-");
  });

  it("should constrain deductions/exemptions to their limits", () => {
    cy.visit("http://localhost:5000/");

    cy.get("[data-id='incomeFromSavingsAccount']").type("25000");
    cy.get("[data-id='deduction80TTA']").should("have.value", "10000");

    cy.get("[data-id='deduction80C']").type("200000");
    cy.get("[data-id='deduction80CValue']").contains("150000");

    cy.get("[data-id='deduction80D']").type("200000");
    cy.get("[data-id='deduction80DValue']").contains("100000");

    cy.get("[data-id='deduction80CCD1B']").type("70000");
    cy.get("[data-id='deduction80CCD1BValue']").contains("50000");
  });

  it("should calculate HRA Exemption correctly", () => {
    cy.visit("http://localhost:5000/");

    cy.get("[data-id='hraExemptionCalculator']").click();
    cy.get("[data-id='basicSalary']").type("360000");
    cy.get("[data-id='hraReceived']").type("180000");
    cy.get("[data-id='actualRentPaid']").type("144000");
    cy.get("[data-id='calculateHRAButton']").click();

    cy.get("[data-id='hraExemption']").should("have.value", "108000");
  });
});
