/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')    
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2, Curso básico cypress - v2,'
        cy.get('[id="firstName"]').type('Maria')
        cy.get('[id="lastName"]').type('Silva')
        cy.get('[id="email"]').type('xofisic145@flowminer.com')
        cy.get('[id="open-text-area"]').type(longText, {delay: 0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro com um email com formatação inválida', () => {
        cy.get('[id="firstName"]').type('Maria')
        cy.get('[id="lastName"]').type('Silva')
        cy.get('[id="email"]').type('xofisic145flowminer.com')
        cy.get('[id="open-text-area"]').type('Curso básico cypress - v2')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo Telefone continua vazio ao ser preenchido com valor não-numérico', () => {
        cy.get('#phone')
            .type('teste@')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('[id="firstName"]').type('Maria')
        cy.get('[id="lastName"]').type('Silva')
        cy.get('[id="email"]').type('xofisic145@flowminer.com')
        cy.get('[id="open-text-area"]').type('Curso básico cypress - v2')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click() //Clique no botão utilizando cy.contains
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        //Campo Nome
        cy.get('[id="firstName"]')
            .type('Maria')
            .should('have.value', 'Maria')
            .clear()
            .should('have.value', '')
        //Campo Sobrenome
        cy.get('[id="lastName"]')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        //Campo Email
        cy.get('[id="email"]')
            .type('xofisic145@flowminer.com')
            .should('have.value', 'xofisic145@flowminer.com')
            .clear()
            .should('have.value', '')
        //Campo Telefone
        cy.get('[id="phone"]')
            .type('11999999998')
            .should('have.value', '11999999998')
            .clear()
            .should('have.value', '')
        //Campo área de texto
        cy.get('[id="open-text-area"]')
            .type('Curso básico cypress - v2')
            .should('have.value', 'Curso básico cypress - v2')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento - resolução 1', () => {
        //Opção Ajuda
        cy.get('input[type="radio"][value="ajuda"]')
            .check()
            .should('be.checked')
        //Opção Elogio
        cy.get('input[type="radio"][value="elogio"]')
            .check()
            .should('be.checked')
        //Opção Feedback
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('Marca cada tipo de atendimento - resolução 2', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]') //Pega todos os elementos do tipo "checkbox"
            .check() //Marcou ambos ao mesmo tempo
            .should('be.checked') //Valida que todos os checkboxes estão marcados
            .last() //Pega o último elemento
            .uncheck() //Desmarca o último elemento
            .should('not.be.checked') //Valida que o último elemento está desmarcado
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('[id="file-upload"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') //Todo link que contém target igual a blank, vai abrir em uma nova guia. Este teste verifica este ponto
    })

    it('Acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')//Inovoke serve para invocar uma função. Neste caso, o atributo target foi removido para que o link abra na mesma aba 
            .click()        

        cy.get('[id="white-background"]')
            .should('contain', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
            .should('contain', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
            .should('contain', 'No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
            .should('contain', 'Talking About Testing')
    })
})
  
