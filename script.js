/* Portfolio behaviour. Edit the SKILLS list below to change the test suite. */
const SKILLS={Programming:['Python','JavaScript','SQL','MySQL','Python QR Codes','Telegram Chatbot'],'Testing tools':['PyTest','Selenium WebDriver','Postman','Newman','Apache JMeter'],'Management / DevOps':['Jira','Git','GitHub','Azure DevOps','Agile','SDLC & STLC'],Web:['HTML5','CSS3','Bootstrap','WordPress','Netlify','Tailwind','HTML Email','Code Minification','Image Optimization'],Other:['Manual Testing','Database Testing (SQL)','Teamwork','Problem-Solving']};
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);

/* Theme */
const root=document.documentElement,tb=$('#theme');
const setTheme=t=>{root.dataset.theme=t;tb.textContent=t==='dark'?'[ light ]':'[ dark ]';try{localStorage.setItem('theme',t)}catch(e){}};
let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
setTheme(saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
tb.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');

/* Build skills suite */
const suite=$('#suite');
Object.entries(SKILLS).forEach(([g,list])=>{
  suite.insertAdjacentHTML('beforeend',`<div class="grp">::${g.toLowerCase().replace(/\W+/g,'_')}</div>`);
  list.forEach(s=>suite.insertAdjacentHTML('beforeend',`<div class="row"><span>test_${s.toLowerCase().replace(/\W+/g,'_').replace(/_$/,'')}</span><span class="dots">${'.'.repeat(120)}</span><span class="ok">PASSED</span></div>`));
});

$('#sum').textContent=`${$$('.suite .row').length} passed, 0 failed in 0.42s`;

/* Loader */
const lines=['test_login.py::test_valid_user PASSED','test_login.py::test_invalid_password PASSED','test_api.py::test_get_200 PASSED','test_api.py::test_post_201 PASSED','test_api.py::test_response_time PASSED','test_ui.py::test_checkout_flow PASSED','test_load.py::test_100_users PASSED','== 7 passed in 1.84s =='];
let done=false;
function finish(){
  if(done)return;done=true;
  const l=$('#loader');
  if(RM){l.remove();intro();return}
  gsap.timeline({onComplete:()=>l.remove()})
    .to('.half.top',{yPercent:-100,duration:.8,ease:'power4.inOut'})
    .to('.half.bot',{yPercent:100,duration:.8,ease:'power4.inOut'},0)
    .add(intro,.35);
}
function runLoader(){
  const term=$('#term'),pct=$('#pct');let i=0;
  const o={v:0};
  gsap.to(o,{v:100,duration:RM?.3:2,ease:'none',onUpdate:()=>pct.textContent=Math.round(o.v),onComplete:finish});
  const t=setInterval(()=>{if(i>=lines.length||done){clearInterval(t);return}term.textContent+=(i?'\n':'')+lines[i++]},RM?20:240);
}
$('#skip').onclick=finish;addEventListener('keydown',e=>{if(!done&&e.key!=='Tab')finish()});

/* Hero intro + BUG/FIXED loop + scroll animations */
function intro(){
  if(!RM){gsap.from('.ln',{yPercent:110,duration:1,stagger:.12,ease:'power4.out'});
    gsap.from('.hero-foot,.hero .tag',{opacity:0,y:20,delay:.5,duration:.8})}
  const f=$('.flip');if(!RM)setInterval(()=>f.classList.toggle('fixed'),1800);else f.classList.add('fixed');
}
if(!RM){
  $$('.rv,.h2').forEach(el=>gsap.from(el,{opacity:0,y:40,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
  gsap.to('.tl .line',{scaleY:1,ease:'none',scrollTrigger:{trigger:'#tl',start:'top 70%',end:'bottom 70%',scrub:true}});
  $$('.suite .row').forEach(r=>{
    const d=r.querySelector('.dots'),ok=r.querySelector('.ok');
    gsap.from(d,{clipPath:'inset(0 100% 0 0)',duration:.6,ease:'none',scrollTrigger:{trigger:r,start:'top 92%'}});
    gsap.to(ok,{opacity:1,scale:1,delay:.5,duration:.25,ease:'back.out(3)',scrollTrigger:{trigger:r,start:'top 92%'}});
  });
}else{gsap.set('.ok,.tl .line',{opacity:1,scaleY:1,scale:1})}

/* Counters */
$$('[data-count]').forEach(el=>{
  const end=+el.dataset.count,o={v:0};
  const run=()=>gsap.to(o,{v:end,duration:RM?.01:1.6,ease:'power2.out',onUpdate:()=>el.textContent=Math.round(o.v)+'+'});
  ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:run});
});

/* Cursor, magnetic buttons, project preview */
const dot=$('#dot'),ring=$('#ring'),peek=$('#peek');
let mx=0,my=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;gsap.set(dot,{x:mx,y:my});gsap.to(ring,{x:mx,y:my,duration:.2});
  gsap.to(peek,{x:mx+24,y:my+24,duration:.25})});
$$('[data-hover],a,button,input,textarea').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('on'));el.addEventListener('mouseleave',()=>ring.classList.remove('on'))});
$$('.mag').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.4,duration:.3})});
  b.addEventListener('mouseleave',()=>gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}));
});
$$('#plist a').forEach(a=>{
  const show=()=>{peek.innerHTML=`${a.querySelector('.mono').textContent}<br>${a.dataset.p}<br>[200 OK]`;gsap.to(peek,{opacity:1,scale:1,duration:.2})};
  a.addEventListener('mouseenter',show);a.addEventListener('focus',show);
  ['mouseleave','blur'].forEach(ev=>a.addEventListener(ev,()=>gsap.to(peek,{opacity:0,scale:.8,duration:.2})));
});

/* Contact form: Netlify POST, mailto fallback */
$('#form').addEventListener('submit',async e=>{
  e.preventDefault();const f=e.target,m=$('#fmsg'),d=new FormData(f);
  try{
    const r=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(d).toString()});
    if(!r.ok)throw 0;m.textContent='[PASS] Message sent. I will reply by email.';f.reset();
  }catch(_){
    m.textContent='[FAIL] Could not send. Opening your email app instead.';
    location.href=`mailto:ozihuddinalfuzayel@gmail.com?subject=${encodeURIComponent('Portfolio message from '+d.get('name'))}&body=${encodeURIComponent(d.get('message')+'\n\n'+d.get('email'))}`;
  }
});
runLoader();
