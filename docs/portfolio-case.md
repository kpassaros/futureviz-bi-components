# FutureViz Components — texto para o portfólio

## Introdução

FutureViz Components é uma biblioteca aberta de componentes configuráveis para Power BI e DataStudio. O projeto nasceu da necessidade de superar limitações visuais e funcionais dos elementos nativos sem comprometer agregações, filtros e rastreabilidade dos cálculos.

## Sobre o projeto

Em vez de criar dezenas de modelos rígidos, a FutureViz utiliza metadados, tokens e adaptadores de plataforma. A mesma estrutura pode assumir diferentes dimensões, métricas, formatos e temas.

A primeira validação prática foi realizada no DataStudio com KPIs, regras condicionais e uma lista de concentração de fluxo com Top 5, Top 10 e Todos.

## Resultados

- 20 testes funcionais validados.
- 2.508 registros renderizados e filtrados sem travamento perceptível.
- Cabeçalhos dinâmicos por metadados.
- Filtros de período, categoria e cross-filter recebidos.
- Temas, responsividade, estados vazios e tooltips.
- Catálogo e configurador publicáveis no GitHub Pages.

## Stack

- HTML, CSS e JavaScript.
- Handlebars no Templr.
- DAX e visuais HTML para Power BI.
- DataStudio/Looker Studio.
- GitHub Pages e GitHub Actions.

## Limitações

O MVP do DataStudio depende do Templr, um componente externo. A FutureViz não redistribui seu bundle e documenta explicitamente riscos de licença, continuidade e privacidade.
