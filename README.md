### Como usar
Instale globalmente o Slush
```
npm install -g slush
```

Após clonar o repositório, instale todas as dependencias.
```
npm install
```

Para usar o gerador, e fazer os testes necessários, use no terminal `npm link`.

### Links Úteis
- [Chalk](https://github.com/chalk/chalk)

### Outros Links
- [mCustomScroll](http://manos.malihu.gr/jquery-custom-content-scroller/)
- [SGS](http://diogomoretti.github.io/sgs/)

### Estrutura de Arquivos
```
slush-fullbar/
├── assets/
|   ├── css
|       └─ main.min.css
|   ├── img
|   ├── fonts
|   ├── js
|       ├─ vendors/
|       └─ main.js
|   └─── sass/
|       ├─ 1-Settings/
|       ├─ 2-Tools/
|       ├─ 3-Base/
|       ├─ 4-Components/
|       ├─ 5-Trumps/
|       └─ main.sass
├── index.html
├── gulpfile.js
├── package.json
└─── .gitignore
```