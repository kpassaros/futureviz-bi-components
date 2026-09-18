(()=>{
  let S={theme:"light",cols:3,sel:null,blocks:[]};
  const base={label:"Indicador",value:"R$ 1,19 Mi",description:"Atualizado pelos filtros",badge:"+8,4%",progress:"72%"};
  function add(type,text){
    S.blocks.push({id:Date.now()+Math.random(),type,text:text||base[type]});
    S.sel=S.blocks.at(-1).id;
    draw();
  }
  function html(){
    const blocks=S.blocks.map(b=>` <div class="fv-${b.type}">${b.text}</div>`).join("\n");
    return `<section class="futureviz ${S.theme}">\n${blocks}\n</section>`;
  }
  function draw(){
    canvas.className="canvas "+S.theme;
    canvas.style.setProperty("--cols",S.cols);
    canvas.innerHTML=S.blocks.map(b=>`<div draggable="true" data-id="${b.id}" class="block ${S.sel===b.id?"selected":""}">${b.type==="value"?"<strong>"+b.text+"</strong>":b.type==="progress"?`<span>${b.text}</span><div class="bar" style="--w:${b.text}"></div>`:b.text}</div>`).join("");
    code.value=html();
    document.querySelectorAll("[data-id]").forEach(e=>{
      e.onclick=()=>{S.sel=+e.dataset.id;draw()};
      e.ondragstart=x=>x.dataTransfer.setData("id",e.dataset.id);
      e.ondragover=x=>x.preventDefault();
      e.ondrop=x=>{x.preventDefault();let a=S.blocks.findIndex(z=>z.id==x.dataTransfer.getData("id")),b=S.blocks.findIndex(z=>z.id==e.dataset.id),m=S.blocks.splice(a,1)[0];S.blocks.splice(b,0,m);draw()};
    });
    let b=S.blocks.find(x=>x.id===S.sel);
    props.innerHTML=b?`<label>Conteúdo<textarea id="txt">${b.text}</textarea></label><button id="del">Excluir</button>`:"Selecione um bloco.";
    if(b){
      txt.oninput=e=>{b.text=e.target.value;draw()};
      del.onclick=()=>{S.blocks=S.blocks.filter(x=>x.id!==b.id);S.sel=null;draw()};
    }
  }
  document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(b.dataset.add));
  document.querySelector("[data-preset]").onclick=()=>{S.blocks=[];add("label","Entradas");add("value","R$ 5,2 Mi");add("label","Saídas");add("value","R$ 3,9 Mi");add("label","Saldo");add("value","R$ 1,3 Mi")};
  btheme.onchange=e=>{S.theme=e.target.value;draw()};
  cols.oninput=e=>{S.cols=+e.target.value;draw()};
  copycode.onclick=()=>FV.copy(code.value);
  json.onclick=()=>{let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,2)],{type:"application/json"}));a.download="futureviz-component.json";a.click()};
  document.querySelector("[data-preset]").click();
})();
