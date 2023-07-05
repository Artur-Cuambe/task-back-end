# Base

## Instalação do Projeto
Para começar, precisará instalar as dependências do projeto. Abra o terminal e execute o seguinte comando:

# npm

```
npm install
```
## Iniciar o Projeto
Após a instalação das dependências, inicie o projeto com o seguinte comando:
```
# npm
npm start
```
Isso iniciará o servidor e tornará o projeto acessível no endereço (http://localhost:4000).

### Testar o projecto
Para garantir que tudo esteja funcionando corretamente, pode executar os testes do projeto usando o seguinte comando:
```
# npm
npm test
```
### Extrutura do projecto
```
task-back-end/
|-- node_modules/
|-- src/
|   |-- controllers/
|   |   |-- taskController.js
|   |-- models/
|   |   |-- taskModel.js
|   |-- routes/
|   |   |-- taskRoutes.js
|   |-- config/
|   |   |-- db.js
|   |-- tests/
|   |   |-- task.test.js
|   |-- app-test.js
|   |-- app.js
|-- jest.config.js
|-- jest.setup.js
|-- package.json
|-- .gitignore
```