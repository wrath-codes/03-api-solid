# APP

GymPass style app.

## RF's (Requisitos funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel se obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usualio logado;
- [ ] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RN's (Requisitos de negocio)

- [ ] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## RNF's (Requisitos nao-funcionais)

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas lstas do dados precisam estar paginadas com 20 items por pagina;
- [ ] O usuraio deve ser identificado por um JWT(Jason Wed Token)
