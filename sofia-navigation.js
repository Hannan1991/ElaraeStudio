(() => {
 const button=document.querySelector('.menu-toggle'),nav=document.querySelector('.header nav');
 if(!button||!nav)return;
 button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');}));
})();
