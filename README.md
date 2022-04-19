# Projeto prático de Arquitetura Limpa

# API Usecases
- Registrar o usuário em uma _mailing list_
- Enviar um e-mail para o usuário registrado

## Anotações e lembretes
---
Pacotes utilizados no momento de gravação:
```json
"devDependencies": {
  "@shelf/jest-mongodb": "^1.2.3",
  "@types/express": "^4.17.11",
  "@types/jest": "^26.0.15",
  "@types/mongodb": "^3.6.7",
  "@types/node": "^14.17.27",
  "@types/nodemailer": "^6.4.4",
  "@types/supertest": "^2.0.10",
  "@typescript-eslint/eslint-plugin": "^4.33.0",
  "@typescript-eslint/parser": "^4.33.0",
  "eslint": "^7.32.0",
  "eslint-config-standard": "^16.0.1",
  "eslint-plugin-import": "^2.25.2",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-promise": "^4.2.1",
  "git-commit-msg-linter": "^3.2.8",
  "husky": "^4.3.0",
  "jest": "^26.6.3",
  "lint-staged": "^10.5.1",
  "rimraf": "^3.0.2",
  "supertest": "^6.1.6",
  "ts-jest": "^26.4.3",
  "typescript": "^4.4.4"
},
"dependencies": {
  "dotenv": "^10.0.0",
  "express": "^4.17.1",
  "module-alias": "^2.2.2",
  "mongodb": "^3.7.3",
  "nodemailer": "^6.7.0"
}
```
Para atualizar os pacotes para a versão atual, basta executar os comandos
```shell
$ npx npm-check-updates --upgrade && npm install
```

<footer>Curso ministrado por Otávio Lemos</footer>