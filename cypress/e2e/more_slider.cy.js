describe("Swiper Gallery More Tests", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Checks if navigation in swiper works properly", function () {
    cy.get(".swiper-button-next").click();
    cy.wait(2000);
    cy.get(".swiper-slide-active").should("contain", "London");
    cy.get(".swiper-button-prev").click();
    cy.wait(2000);
    cy.get(".swiper-slide-active").should("contain", "Rome");
  });

  it("Checks every card content exists and has correct description", function () {
    const slidesData = [
      { title: "Rome", description: "Italy" },
      { title: "London", description: "United Kingdom" },
      { title: "Paris", description: "France" },
    ];
    slidesData.forEach((slide) => {
      cy.get(".swiper-slide-active h1")
        .should("exist")
        .and("contain", slide.title);

      cy.get(".swiper-slide-active p")
        .should("exist")
        .and("contain", slide.description);

      cy.get(".swiper-button-next").click();
      cy.wait(2000);
    });
  });
  it("Should show main container, three slides and buttons should be visible and clickable", function () {
    cy.get(".swiper").should("be.visible");
    cy.get(".swiper-slide").should("have.length", 3);
    cy.get(".swiper-button-next").should("be.visible").click();
    cy.get(".swiper-button-prev").should("be.visible").click();
  });
});

describe("Swiper Gallery More Tests On Various Devices", function () {
  it("Checks if gallery fits on various devices", function () {
    const devices = [
      { name: "iphone", width: 375, height: 667 },
      { name: "ipad", width: 768, height: 1024 },
      { name: "macbook", width: 1920, height: 1080 },
    ];
    devices.forEach((device) => {
      cy.visit("http://localhost:3000");
      cy.viewport(device.width, device.height);
      cy.get(".swiper").should("be.visible");
      cy.get(".swiper-button-next").should("be.visible").click();
      cy.wait(2000);
      cy.get(".swiper-slide-active").should("contain", "London");
      cy.get(".swiper-button-prev").should("be.visible").click();
      cy.wait(2000);
      cy.get(".swiper-slide-active").should("contain", "Rome");
    });
  });
});
