# 📚 API de Livros

Esta é uma API desenvolvida em **Node.js com Express**, organizada no padrão **MVC**, e publicada no Render.  
O objetivo é gerenciar **autores**, **categorias** e **livros**, permitindo realizar operações de CRUD (Create, Read, Update, Delete) e consultas específicas.

---

## 🌐 URL da API hospedada

🔗 [https://aula09-fv5q.onrender.com/](https://aula09-fv5q.onrender.com/)

---

## 🧱 Estrutura de Pastas

```
📦 projeto-api-livros
├── src/
│   ├── controllers/
│   │   ├── AutorController.js
│   │   ├── CategoriaController.js
│   │   └── LivroController.js
│   ├── routes/
│   │   ├── autorRoutes.js
│   │   ├── categoriaRoutes.js
│   │   └── livroRoutes.js
│   └── models/
│       ├── Autor.js
│       ├── Categoria.js
│       └── Livro.js
├── .env
├── package.json
└── server.js
```

---

## 🚀 Inicialização Local

Se quiser rodar o projeto localmente, siga os passos abaixo:

```bash
# 1. Clonar o repositório
git clone https://github.com/Joel-Santos/Aula09.git
cd Aula09

# 2. Instalar dependências
npm install

# 3. Criar o arquivo .env
PORT=3000

# 4. Executar o servidor
npm start
```

Depois, acesse:  
👉 [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Rotas da API

### 🧍‍♂️ Autores (`/autores`)

| Método | Rota | Descrição |
|--------|-------|------------|
| `GET` | `/autores` | Lista todos os autores |
| `GET` | `/autores/:id` | Busca um autor pelo ID |
| `GET` | `/autores/nome/:nome` | Busca um autor pelo nome |
| `GET` | `/autores/nacionalidade/:nacionalidade` | Busca autores pela nacionalidade |
| `POST` | `/autores` | Cria um novo autor |
| `PUT` | `/autores/:id` | Atualiza um autor existente |
| `DELETE` | `/autores/:id` | Exclui um autor pelo ID |

**Exemplo de corpo (POST):**
```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileira"
}
```

---

### 🏷️ Categorias (`/categorias`)

| Método | Rota | Descrição |
|--------|-------|------------|
| `GET` | `/categorias` | Lista todas as categorias |
| `GET` | `/categorias/:id` | Busca uma categoria pelo ID |
| `GET` | `/categorias/nome/:nome` | Busca uma categoria pelo nome |
| `POST` | `/categorias` | Cria uma nova categoria |
| `PUT` | `/categorias/:id` | Atualiza uma categoria existente |
| `DELETE` | `/categorias/:id` | Exclui uma categoria pelo ID |

**Exemplo de corpo (POST):**
```json
{
  "nome": "Romance"
}
```

---

### 📖 Livros (`/livros`)

| Método | Rota | Descrição |
|--------|-------|------------|
| `GET` | `/livros` | Lista todos os livros |
| `GET` | `/livros/:id` | Busca um livro pelo ID |
| `GET` | `/livros/ano/:ano` | Busca livros publicados em determinado ano |
| `GET` | `/livros/autor/:id` | Busca livros pelo ID do autor |
| `GET` | `/livros/categoria/:id` | Busca livros pelo ID da categoria |
| `GET` | `/livros/autor/nome/:nomeAutor` | Busca livros pelo nome do autor |
| `GET` | `/livros/categoria/nome/:nomeCategoria` | Busca livros pelo nome da categoria |
| `POST` | `/livros` | Cria um novo livro |
| `PUT` | `/livros/:id` | Atualiza um livro existente |
| `DELETE` | `/livros/:id` | Exclui um livro pelo ID |

**Exemplo de corpo (POST):**
```json
{
  "titulo": "Dom Casmurro",
  "anoPublicao": 1899,
  "autorId": 1,
  "categoriaId": 2,
  "preco":39.99
}
```

---

## 🧪 Como Testar as Rotas

Você pode testar a API de várias formas:

### 1️⃣ Usando o navegador
- Para **requisições GET**, basta acessar diretamente:  
  👉 [https://aula09-fv5q.onrender.com/livros](https://aula09-fv5q.onrender.com/livros)  
  👉 [https://aula09-fv5q.onrender.com/autores](https://aula09-fv5q.onrender.com/autores)

---

### 2️⃣ Usando **Postman** ou **Insomnia**

Crie uma nova requisição com os seguintes dados:

- **URL:** `https://aula09-fv5q.onrender.com/livros`
- **Método:** `POST`
- **Body:** (JSON)
  ```json
  {
    "titulo": "O Cortiço",
    "anoPublicacao": 1890,
    "autorId": 1,
    "categoriaId": 1,
    "preco": 39.99
  }
  ```

---

### 3️⃣ Usando **cURL** (terminal)

```bash
curl -X GET https://aula09-fv5q.onrender.com/livros
```

```bash
curl -X POST https://aula09-fv5q.onrender.com/autores \
-H "Content-Type: application/json" \
-d '{"nome":"José de Alencar","nacionalidade":"Brasileira"}'
```

---

## ✅ Resposta Padrão

Ao acessar a rota raiz:

**GET** `https://aula09-fv5q.onrender.com/`

**Resposta:**
```json
"API de Livros!"
```

---

## 🧩 Tecnologias Utilizadas

- Node.js  
- Express  
- Dotenv  
- JavaScript ES Modules  
- Render (deploy)

---

## 🧑‍💻 Autores

**Joel Santos e Turma 165**  
📘 Projeto educacional — Aula 09  
📅 Publicado no Render  
