describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
          cy.visit('https://login.qa.studio/') });
 
    it('Верный пароль и верный логин', function () {
         cy.get('#mail').type('german@dolnikov.ru');
         cy.get('#pass').type('iLoveqastudio1');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
 
       it('Верный логин и неверный пароль', function () {
         cy.get('#mail').type('german@dolnikov.ru');
         cy.get('#pass').type('iLoveqastudio2');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })

     it('Неверный логин и верный пароль', function () {
        cy.get('#mail').type('german@dolnikovv.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

       it('Валидация на наличие @', function () {
         cy.get('#mail').type('germandolnikov.ru');
         cy.get('#pass').type('iLoveqastudio');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
     })
 
        it('Восстановление пароля', function () {
         cy.get('#forgotEmailButton').click();
         cy.get('#mailForgot').type('german@dolnikov.ru');
         cy.get('#restoreEmailButton').click();
         cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })

     it('Приведение к строчным буквам в логине (ОШИБКА)', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

 })

 
 describe('Покупка аватара', function () {    

    it('e2e тест на покупку нового аватара для тренера', function () {   
         cy.visit('https://pokemonbattle.ru/');                          
         cy.get('input[type="email"]').type('Sh1pZe@yandex.ru');                   
         cy.get('input[type="password"]').type('123544Jopa');              
         cy.get('button[type="submit"]').click();       

         cy.wait(2000);

         cy.get('.header__container > .header__id').click({ force: true }); 
         cy.get('[href="/shop"]').click();                               
         cy.get('.available > button').first().click({ force: true });   
         cy.get('.credit').type('4620869113632996');                     
         cy.get('.k_input_ccv').type('125');                             
         cy.get('.k_input_date').type('1225');                           
         cy.get('.k_input_name').type('IVANOV IVAN');                           
         cy.get('.pay-btn').click();                                     
         cy.get('#cardnumber').type('56456');                            
         cy.get('.payment__submit-button').click();                      
         cy.contains('Покупка прошла успешно').should('be.visible');     
     });
 });