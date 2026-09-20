# DataStudio + Templr

## Instalação

1. Adicione uma visualização da comunidade no DataStudio.
2. Informe o caminho `gs://templr`.
3. Autorize o componente conforme a política da organização.
4. Configure os campos descritos no README do componente.
5. Copie o `template.html` completo para **Template**.
6. Copie o `style.css` completo para **Style**.
7. Deixe **JavaScript Helpers / Experimental** vazio.

## Diretriz de facilidade

O usuário deve apenas selecionar dimensões e métricas e colar os códigos completos. Formatações, estados e cálculos ficam no componente sempre que o Templr permitir.

## Formatação numérica

Todo decimal deve ter no máximo 2 casas, especialmente:

- percentuais;
- variações;
- taxas;
- índices;
- médias;
- valores monetários.

Padrão validado:

```handlebars
{{divide (round (multiply (lookup metrics 0) 100)) 100}}
```

Percentual a partir de um decimal:

```handlebars
{{divide (round (multiply (lookup metrics 0) 10000)) 100}}%
```

## Datas no comparativo

O componente de períodos aceita:

- `YYYYMMDD` e apresenta dia, mês e ano;
- `YYYYMM` e apresenta mês e ano;
- `YYYY` e apresenta o ano.

A dimensão deve ser ordenada de forma decrescente para que as duas primeiras linhas representem os períodos mais recentes.

## Helpers validados

- `each`, `lookup`, `add`, `@index`, `@root`;
- `localeString`;
- `round`, `multiply`, `divide`, `subtract`;
- `gte`, `eq`;
- `if`, `else`.

Não utilize helpers fora desta lista sem validação no Templr.

## Comportamento confirmado

- Recebe filtros e controles do relatório.
- Atualiza os dados conforme as seleções.
- Renderiza estados vazios.
- Não depende de JavaScript Helpers nesta versão.
- Não há garantia de emissão de cross-filter pelo Template.

## Segurança

O Templr é uma dependência externa. Não inclua seu bundle no repositório sem licença verificável e evite dados sensíveis.
