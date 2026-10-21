// Keep navigation within the project and reflect the section currently being read.
const topicLinks=[...document.querySelectorAll('.project-navigation a[href^="#"]')];
const tracked=[...document.querySelectorAll('.project-part,.topic,.subtopic-title[id]')];
function updateProjectNav(){
 let current=tracked[0];for(const el of tracked){if(el.getBoundingClientRect().top<=140)current=el;else break;}
 for(const link of topicLinks){const active=link.getAttribute('href')==='#'+current?.id;link.classList.toggle('is-active',active);if(active){link.setAttribute('aria-current','location');let group=link.closest('details');while(group){group.open=true;group=group.parentElement.closest('details');}}else link.removeAttribute('aria-current');}
 const percent=Math.min(100,Math.max(0,Math.round(window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)*100)));
 const label=document.querySelector('#readingPercent');if(label)label.textContent=percent+'%';const bar=document.querySelector('#readingProgress');if(bar)bar.style.width=percent+'%';
}
let scheduled=false;window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{updateProjectNav();scheduled=false;});}},{passive:true});updateProjectNav();
