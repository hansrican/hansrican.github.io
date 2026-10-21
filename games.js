(() => {
 const root=document.querySelector('#game-experience');if(!root)return;
 const data=JSON.parse(root.querySelector('#games-data').textContent);
 const buttons=[...root.querySelectorAll('[data-game]')],stage=root.querySelector('.game-stage');
 let selected=data[0].id,revision=0;
 buttons[0].classList.add('is-selected');buttons[0].setAttribute('aria-pressed','true');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 async function select(id){
  if(id===selected)return;
  selected=id;const token=++revision,item=data.find(x=>x.id===id);
  buttons.forEach(b=>{const on=b.dataset.game===id;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on));});
  stage.setAttribute('aria-busy','true');
  const image=new Image();image.src=item.image;try{await image.decode();}catch{}
  if(token!==revision)return;
  const scene=stage.querySelector('.game-scene').cloneNode(true);
  const art=scene.querySelector('.game-keyart');art.src=item.image;art.alt=item.name+'宣传图';art.style.objectPosition='center';scene.querySelector('.game-art-backdrop').style.backgroundImage=`url("${item.image}")`;
  scene.querySelector('.game-title').textContent=item.name;
  scene.querySelector('.game-category').textContent=item.category;
  const time=scene.querySelector('.game-time');time.hidden=!item.time;time.textContent=item.time;
  const achievements=scene.querySelector('.game-achievements');achievements.replaceChildren(...item.achievements.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  stage.replaceChildren(scene);stage.removeAttribute('aria-busy');
  if(!reduced.matches)scene.animate([{transform:'translateX(60px)',opacity:0},{transform:'translateX(0)',opacity:1}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
 }
 buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.game)));
})();
