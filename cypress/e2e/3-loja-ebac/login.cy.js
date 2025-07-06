/// <reference types="cypress"/>

describe('Funcionalidade Login', () => {

    const selector = {
    username: '#username',
    password: '#password',
    loginButton: '.woocommerce-form > .button',
    errorMessage: '.woocommerce-error > li'
  }
  
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        
    })

    it('Deve fazer login com sucesso', () => {
        cy.get(selector.username).type('irmaodojorel@teste.com.br')
        cy.get(selector.password).type('teste@001')
        cy.get(selector.loginButton).click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, irmaodojorel')
    
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get(selector.username).type('irmaodojoorell@teste.com.br')
        cy.get(selector.password).type('teste@001')
        cy.get(selector.loginButton).click()
        cy.get(selector.errorMessage).should('contain', 'Endereço de e-mail desconhecido')
        
    })

    it('Deve exibir uma mensagem de erro ao inserir uma senha inválida', () => {
        cy.get(selector.username).type('irmaodojorel@teste.com.br')
        cy.get(selector.password).type('teste@002')
        cy.get(selector.loginButton).click()
        cy.get(selector.errorMessage).should('contain','Perdeu a senha?')
            
    })

    it('Deve exibir uma mensagem de erro ao tentar logar com o campo de email vazio', () => {
        cy.get(selector.password).type('teste@001')
        cy.get(selector.loginButton).click()
        cy.get(selector.errorMessage).should('contain', 'Erro: Nome de usuário é obrigatório.')   
    })

    it('Deve exibir uma mensagem de erro ao tentar logar com o campo de senha vazio', () => {
        cy.get(selector.username).type('irmaodojorel@teste.com.br')
        cy.get(selector.loginButton).click()
        cy.get(selector.errorMessage).should('contain', 'Erro: O campo da senha está vazio.')     
    })

    it('Deve exibir uma mensagem de erro ao tentar logar com os campos de email e senha vazios', () => {
        cy.get(selector.loginButton).click()
        cy.get(selector.errorMessage).should('contain', 'Erro: Nome de usuário é obrigatório.')
        
    })

})