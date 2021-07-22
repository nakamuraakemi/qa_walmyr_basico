describe("Tickets", () => {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW")); 

    // it.only - executa somente esse cenário

    // Campo input type text
    it("fills all the text input fields", () => {

        const firstName = "Karina";
        const lastName = "Nakamura";

        // Get - identificar elementos por elementos css
        // Type - digita um texto no campo
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("ka.nakamura@hotmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);       

    });

    // Campo tipo select
    it("select two tickets", () =>{        
        cy.get("#ticket-quantity").select("2");
    });

    // Radio Button
    it("select 'vip' ticket type", () =>{        
        cy.get("#vip").check();
    });

    // Checkbox 
    it("selects 'social media' check box", () =>{               
        cy.get("#social-media").check();
    });

    it("selects 'friend' and 'publication', then uncheck friend", () =>{        
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    // Asserts
    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid e-mail", () => {
        cy.get("#email").type("ka.nakamura-hotmail.com");
        cy.get("#email.invalid").should("exist");
    });

    it("alerts on invalid e-mail", () => {
        cy.get("#email")
        .as("email")
        .type("ka.nakamura-hotmail.com");

        // ao usar o álias, o estado do elemento é salvo
        cy.get("#email.invalid")
        .as("invalidEmail") 
        .should("exist");
        
        cy.get("@email")
        .clear()
        .type("ka.nakamura@hotmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () => {
        const firstName = "Karina";
        const lastName = "Nakamura";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#ticket-quantity").select("2");        
        cy.get("#vip").check();
        
        cy.get(".agreement p").should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`);

        cy.get("#email").type("ka.nakamura@hotmail.com");
        cy.get("#friend").check();        
        cy.get("#requests").type("Vegetarian");

        // selecionando checkbox com um click
        cy.get("#agree").click();

        cy.get("#signature").type(`${fullName}`);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        // resetando o formulário
        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");

        cy.get(".agreement p").should("not.contain", `I, ${fullName}, wish to buy 2 VIP tickets.`);

    });

    // comandos personalizados são uma opção para pageobjects
    it("fills mandatorys fields using suport commands", () => {
        const customer = {
            firstName: "Karina",
            lastName: "Nakamura",
            email: "ka.nakamura@hotmail.com"
        };

        // função/comando implementado em support/commands
        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        // resetando o formulário
        cy.get("#agree").uncheck();
        cy.get("@submitButton").should("be.disabled");

    });
});