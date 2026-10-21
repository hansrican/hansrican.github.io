// Animated content plays directly in place. No image opens a browser tab.
document.querySelectorAll('.gif-play').forEach(button=>{const fig=button.closest('figure'),img=fig?.querySelector('img');if(img){img.src=button.dataset.src;const a=img.closest('a');if(a)a.replaceWith(img);}button.remove();});
const dialog=document.querySelector('#imageDialog');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{dialog.querySelector('img').src=button.dataset.zoom||button.querySelector('img')?.src;dialog.showModal();}));
dialog?.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
// Legacy appendix pages retain their navigation, but images also stay within the page.
document.querySelectorAll('.document figure a:has(img)').forEach(a=>{const img=a.querySelector('img');a.replaceWith(img);});
const toc=document.querySelector('#documentToc');if(toc){let count=0;const entries=new Map();document.querySelectorAll('.document h3,.document>p').forEach(el=>{const text=el.textContent.trim();if(text.length<=95&&(/^([一二三四五六七八九十]+、|\d+\.\d+\s)/.test(text)||el.tagName==='H3'))entries.set(text,el);});for(const [text,el]of entries){el.id='section-'+count++;el.classList.add('doc-heading');const link=document.createElement('a');link.href='#'+el.id;link.textContent=text;toc.appendChild(link);}if(!count)toc.textContent='按原文顺序阅读 ↓';}
