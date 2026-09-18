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

## Checklist

- Validar HTML no visual escolhido.
- Confirmar contexto de filtros.
- Testar nulos, zero e negativos.
- Testar temas e tamanhos.
- Revisar política organizacional para visuais personalizados.
