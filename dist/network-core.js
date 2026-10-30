// Reglas locales y transparentes para relacionar registros y tópicos.
(function(root){
  const topics=['Trabajo','Rutina','Sistema','Ansiedad','Calle','Consumo'];
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const groups={
    desgaste:['cans','agot','desgast','quem','exhaust'],
    tiempo:['tiempo','hora','dia','vida','seman','madrug'],
    consumo:['consum','compr','gast','publicidad'],
    presión:['presion','exig','rendir','productiv','urgenc','compet'],
    repetición:['repet','rutina','mismo','automat','ciclo'],
    desigualdad:['desigual','salario','sueldo','alquil','precio','injust','pagar','plata'],
    miedo:['miedo','ansied','angust','insegur','incertid'],
    ruido:['ruido','grit','trafic','bocina'],
    silencio:['call','silencio','escuch','guard','hablar'],
    resistencia:['resist','cambi','desobed','organiza','junt','compart']
  };
  const topicTerms={Trabajo:['trabaj','jefe','oficina','laboral','sueldo','salario'],Rutina:['rutina','repet','madrug','todos los dias','mismo'],Sistema:['sistema','desigual','injust','alquil','precio'],Ansiedad:['ansied','angust','miedo','futuro'],Calle:['calle','viaj','trafic','colectiv','bocina'],Consumo:['consum','compr','publicidad','gastar']};
  function keywords(text){const words=normalize(text).match(/[a-z]+/g)||[];return Object.entries(groups).filter(([,stems])=>words.some(w=>stems.some(stem=>w.startsWith(stem)))).map(([key])=>key)}
  function suggestTopic(text){const s=normalize(text);let best='',score=0;for(const topic of topics){const n=topicTerms[topic].filter(word=>s.includes(word)).length;if(n>score){score=n;best=topic}}return best}
  function makeNode(text,topic,id='local-'+Date.now()){text=String(text).trim();if(text.length<8||text.length>500)throw Error('Escribí entre 8 y 500 caracteres para darle contenido a tu nodo.');if(!topics.includes(topic))throw Error('Elegí un tópico.');return{id,text,topic,keywords:keywords(text),local:true,createdAt:new Date().toISOString()}}
  const seeds=[
    ['w1','Trabajo','El trabajo me consume. Termino la semana con un cansancio que no se va.'],
    ['w2','Trabajo','Me exigen rendir cada vez más y mi sueldo no alcanza para pagar el alquiler.'],
    ['w3','Trabajo','Odio entregar todo mi tiempo al trabajo y no tener vida afuera.'],
    ['r1','Rutina','Madrugar, viajar, trabajar, volver. Repetir lo mismo todos los días me desgasta.'],
    ['r2','Rutina','Vivir en automático. La rutina me consume el tiempo que quiero para mí.'],
    ['r3','Rutina','Me cansa callarme y seguir como si nada. Quiero cambiar este ciclo.'],
    ['s1','Sistema','Trabajamos para pagar todo. Los precios suben y la desigualdad sigue.'],
    ['s2','Sistema','Nos exigen competir cuando lo que necesitamos es organizarnos y escucharnos.'],
    ['a1','Ansiedad','La presión de ser productivo todo el tiempo me da ansiedad.'],
    ['a2','Ansiedad','Me angustia el futuro y me agota guardar este miedo en silencio.'],
    ['c1','Calle','Dos horas en el colectivo de ida y dos de vuelta. El viaje me consume la vida.'],
    ['c2','Calle','El ruido de las bocinas no me deja escuchar mis propios pensamientos.'],
    ['k1','Consumo','Nos hacen comprar para llenar un cansancio que ninguna compra resuelve.'],
    ['k2','Consumo','Todo el tiempo publicidad. Me agota que siempre me falte algo para estar bien.']
  ].map(([id,topic,text])=>({id,topic,text,keywords:keywords(text),local:false}));
  function shared(a,b){return a.keywords.filter(word=>b.keywords.includes(word))}
  function related(node,all){return all.filter(n=>n.id!==node.id).map(n=>({node:n,words:shared(node,n),sameTopic:n.topic===node.topic,score:shared(node,n).length*2+(n.topic===node.topic?3:0)})).filter(r=>r.score>0).sort((a,b)=>b.score-a.score||a.node.id.localeCompare(b.node.id))}
  function connections(all){const edges=[],seen=new Set();for(const a of all){for(const r of related(a,all).slice(0,3)){const key=[a.id,r.node.id].sort().join('|');if(seen.has(key))continue;seen.add(key);edges.push({a:a.id,b:r.node.id,words:r.words,sameTopic:r.sameTopic})}}return edges}
  function wordCounts(nodes){const map=new Map();for(const n of nodes)for(const w of n.keywords){if(!map.has(w))map.set(w,{word:w,count:0,topics:new Set()});const row=map.get(w);row.count++;row.topics.add(n.topic)}return [...map.values()].map(r=>({...r,topics:[...r.topics]})).sort((a,b)=>b.count-a.count||a.word.localeCompare(b.word))}
  function thought(selectedTopics,words,corpus){
    selectedTopics=selectedTopics.filter(t=>topics.includes(t));words=words.filter(w=>groups[w]).slice(0,3);
    if(!selectedTopics.length||!words.length)return '';
    const subjects={Trabajo:'el trabajo',Rutina:'la rutina',Sistema:'el sistema',Ansiedad:'la ansiedad',Calle:'la calle',Consumo:'el consumo'};
    let previous='';const parts=[];
    for(const word of words){
      const supporting=corpus?selectedTopics.filter(t=>corpus.some(n=>n.topic===t&&n.keywords.includes(word))):selectedTopics;
      if(!supporting.length)continue;
      const subject=supporting.map(t=>subjects[t]).join(' y '),plural=supporting.length>1;
      const clauses={desgaste:plural?'nos desgastan':'nos desgasta',tiempo:plural?'se quedan con nuestro tiempo':'se queda con nuestro tiempo',consumo:plural?'nos consumen':'nos consume',presión:plural?'nos ponen bajo presión':'nos pone bajo presión',repetición:plural?'nos encierran en el mismo ciclo':'nos encierra en el mismo ciclo',desigualdad:plural?'nos atraviesan con desigualdad':'nos atraviesa con desigualdad',miedo:plural?'nos llenan de incertidumbre':'nos llena de incertidumbre',ruido:plural?'no nos dejan escucharnos':'no nos deja escucharnos',silencio:plural?'nos empujan a callar':'nos empuja a callar',resistencia:plural?'no pueden con nuestra voz':'no puede con nuestra voz'};
      const text=(previous===subject?'':subject+' ')+clauses[word];parts.push(text.charAt(0).toUpperCase()+text.slice(1)+'.');previous=subject;
    }return parts.join(' ');
  }
  root.OdioNetworkCore={topics,normalize,keywords,suggestTopic,makeNode,seeds,shared,related,connections,wordCounts,thought};
})(globalThis);
