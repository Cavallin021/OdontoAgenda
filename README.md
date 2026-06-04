# 🦷 OdontoAgenda

O **OdontoAgenda** é uma solução Full Stack robusta desenvolvida para otimizar a gestão de clínicas odontológicas de médio e grande porte. O sistema resolve o desafio logístico de coordenar a disponibilidade de múltiplos dentistas e salas de atendimento simultâneas, oferecendo uma interface intuitiva para agendamentos eficientes e bloqueio automatizado de conflitos de horários.

---

## 🚀 Principais Funcionalidades

- **Calendário Dinâmico:** Visualização interativa e organizada de consultas por salas e profissionais.
- **Gestão de Múltiplas Salas:** Cadastro e controle de agendas separadas de acordo com o espaço físico.
- **Agendamento Inteligente:** Validação rigorosa no back-end para evitar choques de horários.
- **Autenticação e Segurança:** Controle de acesso seguro para funcionários e dentistas.
- **Controle de Pacientes e Dentistas:** Vinculação dinâmica e rastreabilidade total das consultas.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando o ecossistema completo de TypeScript, garantindo tipagem estática e segurança em toda a aplicação.

### Front-end
- **Core:** [React 19](https://react.dev) & [TypeScript](https://typescriptlang.org)
- **Build Tool:** [Vite](https://vite.dev)
- **Componentes Visuais:** [Material UI (MUI)](https://mui.com) & [Emotion](https://emotion.sh)
- **Calendário:** [React Big Calendar](https://github.com)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com)
- **Manipulação de Datas:** [Date-fns](https://date-fns.org)
- **Comunicação HTTP:** [Axios](https://axios-http.com)

### Back-end
- **Framework:** [NestJS 11](https://nestjs.com) (Arquitetura escalável e modular)
- **ORM:** [Prisma](https://prisma.io) (Modelagem e consultas eficientes)
- **Autenticação:** [Passport](http://passportjs.org) & [JWT (JSON Web Tokens)](https://jwt.io)
- **Criptografia:** [Bcrypt](https://github.com)
- **Validação:** [Class-validator](https://github.com) & Class-transformer

---

## 💻 Como Executar o Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina o [Node.js](https://nodejs.org) (versão LTS recomendada).

### 1. Clonar o repositório
```bash
git clone https://github.com
cd OdontoAgenda
```

### 2. Configurar e rodar o Back-end (NestJS)
```bash
cd backend
# Instale as dependências
npm install

# Configure suas variáveis de ambiente no arquivo .env (Ex: DATABASE_URL, JWT_SECRET)
# Execute as migrações do banco de dados com o Prisma:
npx prisma migrate dev

# Inicie o servidor em modo de desenvolvimento
npm run start:dev
```

### 3. Configurar e rodar o Front-end (React + Vite)
Abra uma nova janela do terminal, retorne à raiz do projeto e execute:
```bash
cd frontend
# Instale as dependências
npm install

# Inicie a aplicação web
npm run dev
```

---
