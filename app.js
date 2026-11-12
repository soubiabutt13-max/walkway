const WA='923001234567'; // Seller WhatsApp: country code, no + and no leading 0
const SHIP=250, STORE='StepPaki Luxury';
const U=id=>`https://images.unsplash.com/${id}?w=900&q=80`;
const FB=[U('photo-1542291026-7eec264c27ff'),U('photo-1549298916-b41d501d3772'),U('photo-1560769629-975ec94e6a86')]; // backup real photos if one fails
const S6=[39,40,41,42,43,44], SW=[36,37,38,39,40,41];
const P=[
{id:1,name:'Classic Oxford Leather Shoes',cat:'Leather Shoes',g:'m',old:8749,pct:20,r:4.8,n:126,sz:S6,col:['Black','Brown'],im:['photo-1533867617858-e7b97e060509','photo-1614252235316-8c857d38b5f4']},
{id:2,name:'Peshawari Chappal, Hand-Stitched',cat:'Peshawari Chappal',g:'m',old:3124,pct:20,r:4.9,n:312,sz:S6,col:['Brown','Tan'],im:['photo-1603487742131-4160ec999306','photo-1562273138-f46be4ebdf33']},
{id:3,name:"Embroidered Women's Khussa",cat:"Women's Khussa",g:'w',old:3299,pct:25,r:4.7,n:204,sz:SW,col:['Gold','Maroon','Black'],im:['photo-1543163521-1bf539c55dd2','photo-1525966222134-fcfa99b8ae77']},
{id:4,name:'Urban Street Sneakers',cat:'Sneakers',g:'m',old:6249,pct:20,r:4.6,n:98,sz:S6,col:['White','Grey','Red'],im:['photo-1542291026-7eec264c27ff','photo-1595950653106-6c9ebd614d3a']},
{id:5,name:'Formal Derby Leather Shoes',cat:'Leather Shoes',g:'m',old:7499,pct:30,r:4.8,n:77,sz:S6,col:['Black','Tan'],im:['photo-1614252235316-8c857d38b5f4','photo-1533867617858-e7b97e060509']},
{id:6,name:'Kolhapuri Style Chappal',cat:'Peshawari Chappal',g:'m',old:2499,pct:15,r:4.5,n:151,sz:S6,col:['Tan','Black'],im:['photo-1562273138-f46be4ebdf33','photo-1603487742131-4160ec999306']},
{id:7,name:'Ladies Zari Work Khussa',cat:"Women's Khussa",g:'w',old:2999,pct:25,r:4.7,n:188,sz:SW,col:['Pink','Gold','Black'],im:['photo-1525966222134-fcfa99b8ae77','photo-1543163521-1bf539c55dd2']},
{id:8,name:'Everyday Comfort Sneakers',cat:'Sneakers',g:'w',old:4999,pct:30,r:4.6,n:140,sz:SW,col:['White','Pink'],im:['photo-1460353581641-37baddab0fa2','photo-1491553895911-0055eca6402d']}
];
P.forEach(p=>{p.price=Math.round(p.old*(1-p.pct/100)/10)*10-1;p.im=p.im.map(U)});
const CATS=['All','Leather Shoes','Peshawari Chappal',"Women's Khussa",'Sneakers'];
const NAV=[['Home',''],["Men's",'men'],["Women's",'women'],['Peshawari Khussa & Chappal','chappal'],['Sale','sale']];
const state={cat:'All',q:'',nav:'',wishOnly:false};
let cart=[],wish=new Set(),cur=null,sel={};
const $=id=>document.getElementById(id), fmt=n=>'PKR '+n.toLocaleString('en-PK');
const stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
const IC={
menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
heart:'<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z"/>',
bag:'<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
refresh:'<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
shield:'<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
fb:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/>',
ig:'<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".5"/>',
wa:'<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20Z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .7c-1-.5-1.700-1.200-2.200-2.200l.7-1-1-2L9 9Z"/>'};
function ic(n,s=24){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${IC[n]}</svg>`}
function hydrate(){document.querySelectorAll('.ic[data-i]').forEach(e=>{e.innerHTML=ic(e.dataset.i,+e.dataset.s||24);e.classList.remove('ic');e.style.display='inline-flex'})}
function img(src,cls,alt=''){const id=(src.match(/photo-[\w-]+/)||[''])[0],k=Math.floor(Math.random()*3);return `<img src="images/${id}.jpg" alt="${alt}" class="${cls}" loading="lazy" onerror="this.onerror=function(){this.onerror=null;this.src=FB[${k}]};this.src='${src}'">`}
function toast(m){const t=$('toast');t.textContent=m;t.style.opacity=1;clearTimeout(t._t);t._t=setTimeout(()=>t.style.opacity=0,2400)}
function buildNav(){const h=NAV.map(([l,k])=>`<a href="#shop" onclick="setNav('${k}')" class="hover:text-[#6B1D2F] ${k==='sale'?'text-[#800020] font-semibold':''}">${l}</a>`).join('');$('dnav').innerHTML=h;$('mnav').innerHTML=h}
function setNav(k){state.nav=k;state.cat='All';state.wishOnly=false;$('mnav').classList.add('hide');render()}
function setCat(c){state.cat=c;state.nav='';state.wishOnly=false;render()}
function toggleWishView(){state.wishOnly=!state.wishOnly;render();$('shop').scrollIntoView({behavior:'smooth'});if(state.wishOnly&&!wish.size)toast('Your wishlist is empty')}
function filtered(){return P.filter(p=>{
 if(state.wishOnly&&!wish.has(p.id))return false;
 if(state.cat!=='All'&&p.cat!==state.cat)return false;
 if(state.nav==='men'&&p.g!=='m')return false;
 if(state.nav==='women'&&p.g!=='w')return false;
 if(state.nav==='chappal'&&!['Peshawari Chappal',"Women's Khussa"].includes(p.cat))return false;
 if(state.nav==='sale'&&p.pct<25)return false;
 return (p.name+p.cat).toLowerCase().includes(state.q.toLowerCase())})}
function render(){
 $('chips').innerHTML=CATS.map((c,i)=>`<button onclick="setCat(CATS[${i}])" class="pill border border-[#e3d8c8] bg-white rounded-full px-5 py-2 text-sm font-medium transition hover:border-[#6B1D2F] ${state.cat===c&&!state.nav&&!state.wishOnly?'on':''}">${c}</button>`).join('');
 $('ttl').textContent=state.wishOnly?'Your Wishlist':state.nav==='sale'?'Sale':'The Collection';
 const list=filtered();$('empty').classList.toggle('hide',list.length>0);
 $('grid').innerHTML=list.map(p=>`<div class="card bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
 <div class="relative aspect-[4/5] overflow-hidden cursor-pointer bg-[#f1ebe0]" onclick="openProduct(${p.id})">${img(p.im[0],'w-full h-full object-cover',p.name)}
 <span class="absolute top-3 left-3 bg-[#6B1D2F] text-[#F5E6B8] text-xs font-semibold px-3 py-1 rounded-full">${p.pct}% OFF</span>
 <button onclick="event.stopPropagation();toggleWish(${p.id})" class="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 ${wish.has(p.id)?'text-[#800020]':'text-slate-500'}" aria-label="Wishlist"><svg width="18" height="18" viewBox="0 0 24 24" fill="${wish.has(p.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8">${IC.heart}</svg></button></div>
 <div class="p-4 flex flex-col flex-1"><div class="text-[#D4AF37] text-xs tracking-wider">${stars(p.r)} <span class="text-slate-400 tracking-normal">(${p.n})</span></div>
 <h3 class="serif text-lg sm:text-xl font-semibold mt-1 leading-tight">${p.name}</h3><div class="text-xs text-slate-500">${p.cat}</div>
 <div class="mt-2"><span class="font-bold text-[#6B1D2F]">${fmt(p.price)}</span> <span class="text-xs text-slate-400 line-through">${fmt(p.old)}</span></div>
 <button onclick="openProduct(${p.id})" class="mt-4 bg-[#6B1D2F] hover:bg-[#800020] text-white rounded-full py-2.5 text-sm font-medium transition">View Details / Add</button></div></div>`).join('');
 $('wc').textContent=wish.size;$('cc').textContent=cart.reduce((a,i)=>a+i.qty,0)}
function toggleWish(id){wish.has(id)?wish.delete(id):wish.add(id);render();if(cur&&!$('pm').classList.contains('hide')&&cur.id===id)openProduct(id,true)}

function openProduct(id,keep){
 const p=P.find(x=>x.id===id);cur=p;if(!keep)sel={size:null,color:p.col[0],qty:1,img:0};
 $('pmb').innerHTML=`<button onclick="closeAll()" class="absolute top-4 right-5 z-10 text-slate-600" aria-label="Close">${ic('x')}</button>
 <div>${img(p.im[sel.img],'w-full aspect-square object-cover rounded-2xl bg-[#f1ebe0]',p.name)}
 <div class="flex gap-2 mt-3">${p.im.map((s,i)=>`<button onclick="sel.img=${i};openProduct(${p.id},true)">${img(s,'w-16 h-16 object-cover rounded-xl border-2 '+(i===sel.img?'border-[#6B1D2F]':'border-transparent'))}</button>`).join('')}</div></div>
 <div class="flex flex-col"><span class="text-xs text-slate-500">${p.cat}</span><h2 class="serif text-3xl font-semibold text-[#6B1D2F] leading-tight">${p.name}</h2>
 <div class="text-[#D4AF37] text-sm mt-1">${stars(p.r)} <span class="text-slate-500">${p.r} (${p.n} reviews)</span></div>
 <div class="mt-3"><span class="text-2xl font-bold">${fmt(p.price)}</span> <span class="line-through text-slate-400">${fmt(p.old)}</span> <span class="bg-[#f6efe4] text-[#6B1D2F] text-xs font-semibold px-2.5 py-1 rounded-full">${p.pct}% OFF</span></div>
 <div class="mt-5 flex justify-between text-sm font-medium"><span>PK Size</span><a href="#" onclick="openGuide();return false" class="text-[#800020] underline">Size Guide</a></div>
 <div class="flex flex-wrap gap-2 mt-2">${p.sz.map(s=>`<button onclick="sel.size=${s};openProduct(${p.id},true)" class="sz border border-[#e3d8c8] rounded-xl w-12 h-11 font-medium ${sel.size===s?'on':''}">${s}</button>`).join('')}</div>
 <div class="mt-4 text-sm font-medium">Color: <span class="font-normal text-slate-600">${sel.color}</span></div>
 <div class="flex flex-wrap gap-2 mt-2">${p.col.map(c=>`<button onclick="sel.color='${c}';openProduct(${p.id},true)" class="cl border border-[#e3d8c8] rounded-full px-4 py-1.5 text-sm ${sel.color===c?'on':''}">${c}</button>`).join('')}</div>
 <div class="mt-4 flex items-center gap-3"><span class="text-sm font-medium">Quantity</span>
 <div class="flex items-center border border-[#e3d8c8] rounded-full"><button onclick="sel.qty=Math.max(1,sel.qty-1);openProduct(${p.id},true)" class="w-9 h-9 text-lg">−</button><span class="w-8 text-center font-medium">${sel.qty}</span><button onclick="sel.qty=Math.min(10,sel.qty+1);openProduct(${p.id},true)" class="w-9 h-9 text-lg">+</button></div>
 <button onclick="toggleWish(${p.id})" class="ml-auto ${wish.has(p.id)?'text-[#800020]':'text-slate-500'}" aria-label="Wishlist"><svg width="24" height="24" viewBox="0 0 24 24" fill="${wish.has(p.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="1.7">${IC.heart}</svg></button></div>
 <div id="perr" class="text-red-700 text-xs mt-2 h-4"></div>
 <div class="mt-2 grid gap-2"><button onclick="addToCart(false)" class="bg-[#6B1D2F] hover:bg-[#800020] text-white font-semibold py-3.5 rounded-full transition">Add to Cart</button>
 <button onclick="addToCart(true)" class="border-2 border-[#6B1D2F] text-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2">${ic('wa',20)}Order via WhatsApp</button></div>
 <p class="text-xs text-slate-500 mt-3">100% genuine leather. 7-day exchange. COD available.</p></div>`;
 $('pm').classList.remove('hide');$('ov').classList.remove('hide');document.body.style.overflow='hidden'}
function openGuide(){$('gm').classList.remove('hide');$('ov').classList.remove('hide')}
function addToCart(wa){
 if(!sel.size){$('perr').textContent='Please select a size first.';return}
 if(wa){const t=cur.price*sel.qty;
  const m=`Assalam-o-Alaikum ${STORE}!\nI would like to order:\n• ${cur.name}\n  Size: PK ${sel.size} | Color: ${sel.color} | Qty: ${sel.qty}\n  Price: ${fmt(cur.price)} each\nDelivery: ${fmt(SHIP)}\nTotal Amount: ${fmt(t+SHIP)}\nPlease confirm availability. Shukriya!`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`,'_blank');return}
 const ex=cart.find(i=>i.pid===cur.id&&i.size===sel.size&&i.color===sel.color);
 ex?ex.qty=Math.min(10,ex.qty+sel.qty):cart.push({pid:cur.id,size:sel.size,color:sel.color,qty:sel.qty});
 render();toast('Added to your bag');openCart()}

function openCart(){closeAll(true);$('drawer').classList.remove('translate-x-full');$('ov').classList.remove('hide');renderCart()}
function money(){const s=cart.reduce((a,i)=>a+P.find(p=>p.id===i.pid).price*i.qty,0);const d=s?SHIP:0;return{s,d,t:s+d}}
function renderCart(){
 $('citems').innerHTML=cart.length?cart.map((i,x)=>{const p=P.find(q=>q.id===i.pid);return `<div class="flex gap-4">${img(p.im[0],'w-24 h-28 rounded-xl object-cover',p.name)}
 <div class="flex-1 text-sm"><div class="serif text-lg font-semibold leading-tight">${p.name}</div><div class="text-slate-500 text-xs mt-0.5">PK ${i.size} · ${i.color}</div>
 <div class="font-semibold text-[#6B1D2F] mt-1">${fmt(p.price*i.qty)}</div>
 <div class="flex items-center gap-2 mt-2"><div class="flex items-center border border-[#e3d8c8] rounded-full bg-white"><button onclick="chg(${x},-1)" class="w-7 h-7">−</button><span class="w-6 text-center">${i.qty}</span><button onclick="chg(${x},1)" class="w-7 h-7">+</button></div>
 <button onclick="cart.splice(${x},1);render();renderCart()" class="text-xs text-[#800020] underline ml-auto">Remove</button></div></div></div>`}).join(''):'<p class="text-center text-slate-500 mt-24">Your bag is empty.<br>Find a pair you love in the collection.</p>';
 const m=money();
 $('csum').innerHTML=`<div class="flex justify-between"><span>Subtotal</span><span>${fmt(m.s)}</span></div><div class="flex justify-between"><span>Shipping (flat)</span><span>${m.s?fmt(m.d):'-'}</span></div>
 <div class="flex justify-between font-bold text-lg pt-2 border-t border-[#eadfcf] mt-2"><span>Total</span><span class="text-[#6B1D2F]">${fmt(m.t)}</span></div>
 <button onclick="openCheckout()" ${cart.length?'':'disabled'} class="w-full mt-3 bg-[#6B1D2F] hover:bg-[#800020] disabled:opacity-40 text-white font-semibold py-3.5 rounded-full transition">Proceed to Checkout</button>`}
function chg(x,d){cart[x].qty=Math.max(1,Math.min(10,cart[x].qty+d));render();renderCart()}

function openCheckout(){
 closeAll(true);const m=money();
 $('cosum').innerHTML=`${cart.reduce((a,i)=>a+i.qty,0)} item(s) · Shipping ${fmt(m.d)}<br><span class="text-[#6B1D2F] text-lg font-bold">Total: ${fmt(m.t)}</span>`;
 $('err').textContent='';$('co').classList.remove('hide');$('ov').classList.remove('hide')}
document.addEventListener('change',e=>{if(e.target.name==='pay')$('payn').classList.toggle('hide',!e.target.value.startsWith('Jazz'))});
function placeOrder(){
 const n=$('fn').value.trim(),ph=$('ph').value.trim(),c=$('ct').value,a=$('ad').value.trim(),pay=document.querySelector('[name=pay]:checked').value;
 if(!cart.length)return $('err').textContent='Your bag is empty.';
 if(n.length<3)return $('err').textContent='Please enter your full name.';
 if(!/^(03\d{2}-?\d{7}|\+?923\d{9})$/.test(ph.replace(/\s/g,'')))return $('err').textContent='Enter a valid mobile number like 03XX-XXXXXXX.';
 if(!c)return $('err').textContent='Please select your city.';
 if(a.length<10)return $('err').textContent='Please enter your complete address.';
 const m=money();
 const lines=cart.map((i,x)=>{const p=P.find(q=>q.id===i.pid);return `${x+1}. ${p.name}\n   Size: PK ${i.size} | Color: ${i.color} | Qty: ${i.qty}\n   ${fmt(p.price)} x ${i.qty} = ${fmt(p.price*i.qty)}`}).join('\n');
 const msg=`Assalam-o-Alaikum!\nNew order from *${STORE}*\n\n*Customer Details*\nName: ${n}\nPhone: ${ph}\nAddress: ${a}, ${c}\n\n*Order Items*\n${lines}\n\nSubtotal: ${fmt(m.s)}\nShipping: ${fmt(m.d)}\n*Total Amount: ${fmt(m.t)}*\n\nPayment Method: ${pay}\n\nPlease confirm my order. Shukriya!`;
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');
 cart=[];render();closeAll();toast('Order ready in WhatsApp. Press send to confirm.')}

function closeAll(keepOv){['pm','gm','co'].forEach(i=>$(i).classList.add('hide'));$('drawer').classList.add('translate-x-full');if(!keepOv)$('ov').classList.add('hide');document.body.style.overflow=''}
function subscribe(){const v=$('nl').value.trim();if(!/^\S+@\S+\.\S+$/.test(v))return toast('Enter a valid email address');$('nl').value='';toast('Subscribed. Shukriya!')}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
$('yr').textContent=new Date().getFullYear();buildNav();render();hydrate();
