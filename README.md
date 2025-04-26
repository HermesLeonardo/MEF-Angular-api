# API de Gerenciamento de Empresas e Arquivos

Este projeto é uma API REST construída com Node.js, Express e TypeScript, para gerenciar empresas, arquivos, logs de acessos e tags de categorização.

## 🚀 Como iniciar a API

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
```

```bash
npm install
```

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUASENHA
DB_NAME=mef_database
DB_PORT=3306
PORT=3000
```

## INFO
DB_HOST: endereço do banco de dados (normalmente localhost)

DB_USER: usuário do banco de dados

DB_PASSWORD: senha do banco de dados

DB_NAME: nome do banco de dados

DB_PORT: porta do MySQL (normalmente 3306)

PORT: porta que a API vai rodar (padrão 3000)

##

```bash
npm run dev
```

##

# Funcionalidades da API
- CRUD de Empresas (/companies)

- CRUD de Arquivos da Empresa (/files)

- CRUD de Logs de Acessos a Arquivos (/file-access)

- CRUD de Tags para categorização (/tags)

- CRUD de Usuários (/users) — básico para fins administrativos

##


📋 Observação
Certifique-se que o banco de dados já esteja criado com as tabelas necessárias antes de iniciar a aplicação.

Caso queira popular a tabela tags com exemplos padrões, execute:

```bash

INSERT INTO tags (name, color) VALUES
('DOCUMENTOS SOCIETÁRIOS', '#4CAF50'),
('DOCUMENTOS PESSOAIS', '#2196F3'),
('ALVARÁS DE LICENÇA', '#FFC107'),
('CERTIFICADO DIGITAL', '#F44336'),
('FOLHA DE PAGAMENTO', '#FF9800'),
('CONTRATO DE PRESTAÇÃO DE SERVIÇOS', '#9C27B0');
```



#

### Valeu TMJ