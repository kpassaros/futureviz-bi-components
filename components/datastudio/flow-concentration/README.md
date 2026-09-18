# Concentração de fluxo — DataStudio

Evidencia as maiores concentrações de uma métrica sem linguagem de competição.

## Campos
- 1 dimensão: entidade, categoria, faixa de atraso ou equivalente.
- 1 métrica: saída, valor vencido, custo ou equivalente.
- Ordenação: métrica decrescente.

## Instalação
1. Adicione a visualização da comunidade pelo manifesto `gs://templr`.
2. Configure a dimensão e a métrica.
3. Cole `template.html` em Template.
4. Cole `style.css` em Style.
5. Mantenha JavaScript Helpers vazio.

## Recursos
- Cabeçalhos dinâmicos por metadados.
- Top 5, Top 10 e Todos.
- Tooltip nativo.
- Cabeçalho sticky.
- Filtros e cross-filter recebidos.

## Limites
- Não emite cross-filter.
- Eventos JavaScript inline não executam.
- Templr é uma dependência externa.
