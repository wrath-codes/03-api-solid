# APP

GymPass style app.

## RF's (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível se obter o perfil de um usuário logado;
- [x] Deve ser possível obter o numero de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas(até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RN's (Requisitos de negocio)

- [x] O usuário nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuário nao pode fazer check-in se nao estiver perto (100m) da academia;
- [x] O check-in so pode ser validado ate 20 minutos apos criado;
- [x] O check-in so pode ser validado por administradores;
- [x] A academia so pode ser cadastrada por administradores;

## RNF's (Requisitos nao-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas do dados precisam estar paginadas com 20 items por pagina;
- [x] O usuário deve ser identificado por um JWT(Jason Wed Token)
