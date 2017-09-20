# wBooks
https://welligtonporto.github.io/wbooks/

Uma simples aplicação web utilizando a API do [Google Books](https://developers.google.com/books/docs/overview) atendendo os seguintes requisitos:

* Como usuário eu quero **pesquisar um livro** por palavra-chave e ver o resultado na
mesma página;
* Como usuário eu quero conseguir **fazer paginação do resultado da pesquisa**;
* Como usuário eu quero **marcar um livro como favorito**;
* Como usuário eu quero **clicar em um livro na listagem e ver uma página com mais
informações do livro**;
* Como usuário eu gostaria que a **palavra-chave pesquisada fosse destacada no
resultado da pesquisa**.

## Execução & Desenvolvimento

```sh
$ npm install
$ gulp
$ gulp dev (for watch)
```

## Tecnologias

### [AngularJS v1.6.5](https://angularjs.org/)
Escolhi o AngularJS pois é o Framework de JavaScript que mais tenho familiaridade hoje, tornando possível o rápido desenvolvimento deste projeto.

### [Bootstrap v4.0.0-beta](https://getbootstrap.com/)
A UI ficou basicamente por conta da nova versão do Bootstrap, tecnologia também eleita pela minha familiaridade e qualidade dos rescursos oferecidos.

### [Fontello](http://fontello.com/)
Escolhi esta ferramenta online para obter os ícones utilizados no projeto de forma bem prática.

Gosto bastante dela pois além das diversas opções de ícones, também pode ser feito o upload ícones personalizados.

### Task Runner
Elegi o [Gulp.js](https://gulpjs.com/) para me auxiliar no desenvolvimento do projeto.

Ele basicamente tem a finalidade de:
* Auxiliar no desenvolvimento do CSS3 com Sass/Compass, validar e gerar um arquivo final minificado.
* Auxiliar no desenvolvimento do JavaScript (AngularJS), concatenar todos os arquivos, validar e gerar apenas um arquivo final minificado.
* Controlar os arquivos gerados no Fontello para distribuição do projeto
* Baixar dependências do projeto e preparar para distrubuição

**Autor:** [Welligton Porto](https://www.linkedin.com/in/welligtonporto/)

Novas features em breve... :)
