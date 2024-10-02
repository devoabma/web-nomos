# Sistema de Cadastro de Advogados - GERID

Este é o repositório do sistema de cadastro de advogados do **GERID**. A plataforma foi criada para facilitar o gerenciamento de dados dos advogados, oferecendo funcionalidades como cadastro, visualização e administração dos registros. A aplicação foi desenvolvida utilizando **Node.js**, **TypeScript**, **Prisma**, **PostgreSQL**, e uma infraestrutura gerenciada com **Docker** e **PM2**.

## Funcionalidades

- Cadastro de advogados com os campos: nome, CPF e e-mail.
- Listagem e gerenciamento de advogados cadastrados.
- Suporte a múltiplos ambientes através de contêineres Docker.
- Autenticação via **JWT** para advogados e administradores.
- Notificações com **Sonner** para feedback ao usuário.
- Sistema de rotas protegido com **JWT**.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (banco de dados gerenciado via Docker)
- **PM2** para gerenciamento de processos
- **GitHub Actions** para CI/CD
- **Fastify** para backend
- **React** com **Tailwind CSS** no frontend
- **Axios** para comunicação frontend/backend
- **JWT** para autenticação
- **Sonner** para notificações
- **React Query** para gerenciamento de dados

## Estrutura do Projeto

- **Backend:** Desenvolvido com Node.js, Fastify e Prisma, rodando em contêineres Docker, com um banco de dados PostgreSQL.
- **Frontend:** Construído com React, usando Tailwind CSS para o design e React Router Dom para o gerenciamento de rotas.
- **CI/CD:** Automatizado com GitHub Actions para garantir a entrega contínua e segura da aplicação.


## Autor

- [@hilquiasfmelo](https://www.instagram.com/hilquiasfmelo/?next=%2F)
