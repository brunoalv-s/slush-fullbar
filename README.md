# Gerador Fullbar [![npm version](https://badge.fury.io/js/slush-fullbar.svg)](https://badge.fury.io/js/slush-fullbar) [![](https://img.shields.io/badge/unicorn-approved-ff69b4.svg)](https://www.youtube.com/watch?v=9auOCbH5Ns4)

### Instalação

Primeiro instale globalmente o Slush
```
npm install -g slush
```

Instale o `slush-fullbar` globalmente:
```
npm install -g slush-fullbar
```

### Usando
Cria uma nova pasta para o seu projeto:
```
mkdir my-fullbar-app
```

Execute o gerador dentro da nova pasta
```
cd my-fullbar-app

slush fullbar
```

Agora você terá algumas perguntas para responder, esse passo é importante para a configuração do seu projeto. Você pode apenas ir apertando o enter, se você desejar a configuração Padrão.

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

### Gulpfile
Você pode ver todas as opções disponíveis no `gulpfile` através do comando:
```
gulp help
```

### Links Úteis
- [Chalk](https://github.com/chalk/chalk)

### Outros Links
- [mCustomScroll](http://manos.malihu.gr/jquery-custom-content-scroller/)
- [SGS](http://diogomoretti.github.io/sgs/)
