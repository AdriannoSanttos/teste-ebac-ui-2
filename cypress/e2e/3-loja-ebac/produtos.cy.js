/// <reference types="cypress" />

describe('Funcionalidade: Produtos', () => {

  const seletores = {
    menuProdutos: '#primary-menu > .menu-item-629 > a',
    primeiroProduto: '.post-2559 > ',
    tamanhoM: '.button-variable-item-M',
    tamanhoL: '.button-variable-item-L',
    tamanhoS: '.button-variable-item-S',
    corBlue: '.button-variable-item-Blue',
    corRed: '.button-variable-item-Red',
    inputQuantidade: 'input.qty',
    botaoAumentar: '.plus',
    botaoDiminuir: '.minus',
    botaoAddCarrinho: '.single_add_to_cart_button',
    indicadorCarrinho: '.dropdown-toggle > .mini-cart-items',
    mensagemCarrinho: '.woocommerce-message',
    mensagemEstoque: '.stock',
    botaoAddWishlist: '[href="?add_to_wishlist=2559"]',
    mensagemWishlist: '#yith-wcwl-message',
    contadorWishlist: ':nth-child(2) > .text-skin > .count_wishlist',
    iconeWishlist: ':nth-child(2) > .text-skin > .fa',
    containerWishlist: '#wrapper-container',
    botaoRemoverWishlist: '.remove',
    tituloPaginaProdutos: '.page-title'
  };

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/')
  });

  it('Deve ir para /produtos ao clicar em "comprar"', () => {
    cy.get(seletores.menuProdutos).click();
    cy.get(seletores.tituloPaginaProdutos).should('exist')
  });

  it('Deve exibir uma mensagem de erro ao selecionar um produto sem estoque', () => {
    cy.get(seletores.menuProdutos).click()
    cy.get(seletores.primeiroProduto).click()
    cy.get(seletores.tamanhoM).click()
    cy.get(seletores.corBlue).click()
    cy.get(seletores.mensagemEstoque).should('contain', 'Fora de estoque')
  });

  it('Deve adicionar um produto ao carrinho com sucesso', () => {
    cy.get(seletores.menuProdutos).click()
    cy.get(seletores.primeiroProduto).click()
    cy.get(seletores.tamanhoL).click()
    cy.get(seletores.corRed).click()
    cy.get(seletores.inputQuantidade).should('exist')
    cy.get(seletores.botaoAddCarrinho).click()
    cy.get(seletores.indicadorCarrinho).should('contain', '1')
  });

  it('Deve adicionar e remover um produto da lista de desejos com sucesso', () => {
    cy.get(seletores.menuProdutos).click()
    cy.get(seletores.primeiroProduto).click()
    cy.get(seletores.botaoAddWishlist).click()
    cy.get(seletores.mensagemWishlist).should('contain', 'Produto adicionado')
    cy.get(seletores.contadorWishlist).should('contain', '1')
    cy.get(seletores.iconeWishlist).click()
    cy.get(seletores.containerWishlist).should('contain', 'Abominable Hoodie')
    cy.get(seletores.botaoRemoverWishlist).click()
    cy.get(seletores.mensagemCarrinho).should('contain', 'Produto removida com sucesso.'); // bug na palavra "removida" erro de concordância
  });

  it('Deve aparecer a mensagem "em estoque" ao selecionar tamanho e cor', () => {
    cy.get(seletores.menuProdutos).click()
    cy.get(seletores.primeiroProduto).click()
    cy.get(seletores.tamanhoS).click()
    cy.get(seletores.corRed).click()
    cy.get(seletores.mensagemEstoque).should('contain', 'em estoque')
  });

  it('Deve aumentar e diminuir a quantidade de produtos usando os botões "+ -" ', () => {
    cy.get(seletores.menuProdutos).click()
    cy.get(seletores.primeiroProduto).click()
    cy.get(seletores.tamanhoS).click()
    cy.get(seletores.corRed).click()
    cy.get(seletores.mensagemEstoque).should('contain', 'em estoque')
    cy.get(seletores.inputQuantidade).should('have.value', '1')
    cy.get(seletores.botaoAumentar).click()
    cy.get(seletores.inputQuantidade).should('have.value', '2')
    cy.get(seletores.botaoDiminuir).click()
    cy.get(seletores.inputQuantidade).should('have.value', '1')
  });

});
