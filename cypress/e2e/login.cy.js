describe("login page", () => {
  // This hook runs before each test case and navigates to the login page
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  // This test case checks if the user can log in to the app
  it("i can log in to the app", () => {
    // This gets the input field for the username and types the value 'admin'
    cy.get(":nth-child(1) > form > #username")
      .should("be.visible")
      .type("admin");

    // This gets the input field for the password and types the value 'admin123'
    cy.get(":nth-child(1) > form > #password")
      .should("be.visible")
      .type("admin123");

    // This clicks the login button
    cy.get(":nth-child(1) > form > .btn").click();
  });

  it("shows an error message for invalid login credentials", () => {
    // Enter invalid username and password
    cy.get(":nth-child(1) > form > #username").type("invaliduser");
    cy.get(":nth-child(1) > form > #password").type("invalidpassword");

    // Click the login button
    cy.get(":nth-child(1) > form > .btn").click();

    // Assert that an error message is displayed
    cy.get(".LoginScreen_error__0yekj")
      .should("be.visible")
      .contains("Invalid username or password");
  });

  it("successfully registers a new user", () => {
    // Enter registration details
    cy.get(":nth-child(3) > form").type("newuser");
    cy.get(":nth-child(3) > form > #password").type("newpassword");
    cy.get("#voornaam").type("John");

    // Click the registration button
    cy.get(":nth-child(3) > form > .btn").click();

    // Assert that the user is logged in and redirected to the home page
    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("Welcome, newuser");
  });

  // This test case checks if the password is shown as text when the reveal icon is clicked
  it("When I enter my password and click the reveal icon it is shown as text", () => {
    // This gets the input field for the password and types the value 'admin123'
    cy.get(":nth-child(1) > form > #password")
      .should("be.visible")
      .type("admin123");

    // This checks if the type attribute of the password input field is 'password'
    cy.get(":nth-child(1) > form > #password").should(
      "have.attr",
      "type",
      "password"
    );

    // This checks if the type attribute of the password input field is 'text'
    cy.get(":nth-child(1) > form > #password").should(
      "have.attr",
      "type",
      "text"
    );
  });
});
