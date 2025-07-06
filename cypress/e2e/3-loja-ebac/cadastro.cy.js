/// <reference types="cypress" />
const { faker } = require('@faker-js/faker')

describe('Funcionalidade: Cadastro', () => {

  const seletor = {
    email: '#reg_email',
    senha: '#reg_password',
    botaoCadastro: ':nth-child(4) > .button',
    areaConta: '.woocommerce-MyAccount-content > :nth-child(2)',
    linkEditarConta: '.woocommerce-MyAccount-navigation-link--edit-account > a',
    nome: '#account_first_name',
    sobrenome: '#account_last_name',
    botaoSalvar: '.woocommerce-Button',
    mensagemSucesso: '.woocommerce-message',
    erroCadastro: '.woocommerce-error',
    forcaSenha: '.woocommerce-password-strength'
  }

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
  });

  it('Deve completar o cadastro com sucesso', () => {
    const email = faker.internet.email()
    const senha = faker.internet.password()
    const nome = faker.person.firstName()
    const sobrenome = faker.person.lastName()

    cy.get(seletor.email).type(email)
    cy.get(seletor.senha).type(senha)
    cy.get(seletor.botaoCadastro).click()

    cy.get(seletor.areaConta).should('exist')
    cy.get(seletor.linkEditarConta).click()
    cy.get(seletor.nome).type(nome)
    cy.get(seletor.sobrenome).type(sobrenome)
    cy.get(seletor.botaoSalvar).click()
    cy.get(seletor.mensagemSucesso).should('exist')
  })

  it('Não deve permitir cadastro com campos vazios', () => {
    cy.get(seletor.botaoCadastro).click();
    cy.get(seletor.erroCadastro).should('contain', 'Erro')
  });

  it('Não deve permitir cadastro com senha vazia', () => {
    const email = faker.internet.email()

    cy.get(seletor.email).type(email);
    cy.get(seletor.botaoCadastro).click();
    cy.get(seletor.erroCadastro).should('contain', 'Erro')
  })

  it('Deve exibir alerta para senha fraca', () => {
    const email = faker.internet.email()
    const senhaFraca = '123'

    cy.get(seletor.email).type(email);
    cy.get(seletor.senha).type(senhaFraca)
    cy.get(seletor.forcaSenha).should('contain', 'Muito fraca')
    cy.get(seletor.botaoCadastro).click()
  })

})
