/// <reference types="cypress"/>

describe('Funcionalidade Login', () => {

    const usuario = {
    username: '#username',
    password: '#password',
    loginButton: '.woocommerce-form > .button',
    errorMessage: '.woocommerce-error > li'
  }
    

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        
    })

    it('Deve fazer login com sucesso', () => {
        cy.get(usuario.username).type('irmaodojorel@teste.com.br')
        cy.get(usuario.password).type('teste@001')
        cy.get(usuario.loginButton).click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, irmaodojorel')
    
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get(usuario.username).type('irmaodojoorell@teste.com.br')
        cy.get(usuario.password).type('teste@001')
        cy.get(usuario.loginButton).click()
        cy.get(usuario.errorMessage).should('contain', 'Endereço de e-mail desconhecido')
        
    })

    it('Deve exibir uma mensagem de erro ao inserir uma senha inválida', () => {
        cy.get(usuario.username).type('irmaodojorel@teste.com.br')
        cy.get(usuario.password).type('teste@002')
        cy.get(usuario.loginButton).click()
        cy.get(usuario.errorMessage).should('contain','Perdeu a senha?')
            
    })

    it('Deve exibir uma mensagem de erro ao tentar logar com o campo de email vazio', () => {
        cy.get(usuario.password).type('teste@001')
        cy.get(usuario.loginButton).click()
        cy.get(usuario.errorMessage).should('contain', 'Erro: Nome de usuário é obrigatório.')   
    })

    it('Deve exibir uma mensagem de erro ao tentar logar com o campo de senha vazio', () => {
        cy.get(usuario.username).type('irmaodojorel@teste.com.br')
        cy.get(usuario.loginButton).click()
        cy.get(usuario.errorMessage).should('contain', 'Erro: O campo da senha está vazio.')     
    })

    it('Deve exibir uma mensagem de erro ao tentar logar com os campos de email e senha vazios', () => {
        cy.get(usuario.loginButton).click()
        cy.get(usuario.errorMessage).should('contain', 'Erro: Nome de usuário é obrigatório.')
        
    });
})