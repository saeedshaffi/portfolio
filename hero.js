/* Hero behaviour: release the entrance animations once they finish, and make the
   eye's pupil track the cursor. Everything is document-delegated so it survives
   app.js re-rendering the hero on route changes. */
(function(){
  var tx=0,ty=0,cx=0,cy=0,frame=0;
  var settleTimer=0,settledFor=null;

  function hero(){return document.querySelector('.home-hero');}

  function settle(){
    var h=hero();
    if(!h||h===settledFor)return;
    settledFor=h;
    clearTimeout(settleTimer);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('is-return-visit')){h.classList.add('is-hero-entered');return;}
    /* longest pill delay (0.6s) + duration (0.6s) + slack */
    settleTimer=setTimeout(function(){if(document.contains(h))h.classList.add('is-hero-entered');},1400);
  }

  function render(){
    var eye=document.querySelector('.home-inline-cta .home-eye');
    cx+=(tx-cx)*0.55;
    cy+=(ty-cy)*0.55;
    if(eye){
      eye.style.setProperty('--eye-x',cx.toFixed(2)+'px');
      eye.style.setProperty('--eye-y',cy.toFixed(2)+'px');
    }
    if(Math.abs(tx-cx)>0.05||Math.abs(ty-cy)>0.05)frame=requestAnimationFrame(render);
    else frame=0;
  }

  function request(){if(!frame)frame=requestAnimationFrame(render);}

  function onPointerMove(event){
    var h=hero();
    var eye=h&&h.querySelector('.home-inline-cta .home-eye');
    if(!eye)return;
    /* The eye watches the cursor anywhere inside the hero card. */
    var hr=h.getBoundingClientRect();
    var inside=event.clientX>=hr.left&&event.clientX<=hr.right&&
               event.clientY>=hr.top&&event.clientY<=hr.bottom;
    if(!inside){
      if(tx||ty){tx=0;ty=0;request();}
      return;
    }
    var r=eye.getBoundingClientRect();
    var dx=event.clientX-(r.left+r.width/2);
    var dy=event.clientY-(r.top+r.height/2);
    var dist=Math.hypot(dx,dy);
    if(dist<1){tx=0;ty=0;request();return;}
    var radius=r.width*0.34;
    var reach=Math.min(1,dist/40);    /* full deflection within ~40px */
    tx=(dx/dist)*radius*reach;
    ty=(dy/dist)*radius*reach;
    request();
  }

  var canTrack=matchMedia('(hover: hover) and (pointer: fine)').matches&&
               !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(canTrack)document.addEventListener('pointermove',onPointerMove,{passive:true});
  document.addEventListener('pointerleave',function(){tx=0;ty=0;request();});

  settle();
  setInterval(settle,300);
  window.addEventListener('hashchange',function(){setTimeout(settle,60);});
})();
