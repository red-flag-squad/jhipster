function goToHomePage() {
  cy.visit('/');
}

function openLoginForm() {
  cy.get('#navbarResponsive')
    .contains('Account')
    .click();
  cy.get('#navbarResponsive .dropdown-menu')
    .contains('Sign in')
    .click();
  }

function LogOut() {
  cy.get('#navbarResponsive')
    .contains('Account')
    .click();
  cy.get('#navbarResponsive .dropdown-menu')
    .contains('Sign out')
    .click();
}

function signInAsAdmin() {
  goToHomePage();
  openLoginForm();

  cy.get('#username').type('admin');
  cy.get('#password').type('admin');
  cy.get('.modal-body')
    .contains('Sign in')
    .click();
}

function createNewEvent({ name, startsAt, duration }) {
  cy.contains('Entities').click();
  cy.contains('Event').click();

  cy.get('#page-heading')
    .contains('Create a new Event')
    .click();

  cy.get('#field_name').type(name);
  cy.get('#field_startsAt').type(startsAt);
  cy.get('#field_duration').type(duration);

  cy.get('#save-entity').click();
}

function createNewCycle({ name, events }) {
  cy.contains('Entities').click();
  cy.contains('Cycle').click();

  cy.get('#page-heading')
    .contains('Create a new Cycle')
    .click();

  cy.get('#field_name').type(name);
  cy.get('#field_events').select(events);

  cy.get('#save-entity').click();
}

function assertEventHasBeenCreated() {
  cy.get('.alerts .alert-success');
}

function assertCycleHasBeenCreated() {
  assertEventHasBeenCreated();
}

describe('Event entity', () => {
  beforeEach(() => {
    signInAsAdmin();
  });

  afterEach(() => {
    LogOut();
  });

  it('can be created', () => {
    createNewEvent({
      name: 'Test',
      startsAt: '2020-02-27',
      duration: 4
    });

    assertEventHasBeenCreated();
  });
});

describe('Cycle entity', () => {
  beforeEach(() => {
    signInAsAdmin();
    
    createNewEvent({
      name: 'CycleEvent',
      startsAt: '2020-02-27',
      duration: 4
    });
    createNewEvent({
      name: 'AnotherCycleEvent',
      startsAt: '2020-02-28',
      duration: 4
    });
  });

  afterEach(() => {
    LogOut();
  });

  it('can be created', () => {
    createNewCycle({
      name: 'Cycle',
      events: ['CycleEvent', 'AnotherCycleEvent']
    });

    assertCycleHasBeenCreated();
  });
});