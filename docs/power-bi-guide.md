# Power BI

## Estratégia

A FutureViz usa medidas DAX que produzem HTML para um visual compatível. O modelo semântico continua responsável por agregação e filtros.

## Nomes e campos dinâmicos

Para alternar dimensão ou medida, use **Parâmetros de Campo** do Power BI. O configurador FutureViz também pode substituir rótulos no código durante a geração.

Não dependa de `SELECTEDMEASURENAME()` em uma medida comum: essa função pertence a cenários de Calculation Groups. Declare o rótulo diretamente ou por uma medida de título.

Exemplo:

```dax
Título da Métrica = SELECTEDVALUE('Parâmetro Métrica'[Parâmetro Métrica], "Entrada Realizada")
```

## Temas Claro e Escuro

Na visualização do componente, escolha **Claro** ou **Escuro** antes de copiar. O seletor atualiza a prévia e a medida DAX completa, incluindo o atributo `data-theme` e as cores estruturais do card. Se trocar o modo, copie novamente a DAX.

## Checklist

- Validar HTML no visual escolhido.
- Confirmar contexto de filtros.
- Testar nulos, zero e negativos.
- Testar os modos Claro e Escuro e os tamanhos.
- Revisar política organizacional para visuais personalizados.
