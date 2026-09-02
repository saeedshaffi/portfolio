/* Hero "See my work" pill — three layers, modelled on damianskotzke.com:
   1. a muted loop of the walkthrough plays faintly behind the pill's label;
   2. on hover (fine pointer only) a square preview card fades/scales in and
      follows the cursor with eased lag; it carries a "View" badge;
   3. click opens a square 90vmin modal that plays the full walkthrough with
      sound — no controls, just ×, Esc or a click outside to close.
   Everything is delegated from the document, so it survives app.js
   re-rendering the hero on every route change. */
(function(){
  var PREVIEW=[['assets/kfh/kfh-cta-preview.webm','video/webm'],['assets/kfh/kfh-cta-preview.mp4','video/mp4']];
  var FULL=[['assets/kfh/kfh-walkthrough.webm','video/webm'],['assets/kfh/kfh-walkthrough.mp4','video/mp4']];
  var POSTER='assets/kfh/kfh-walkthrough-poster.webp';
  var CARD=224, GAP=16;            /* card size and its offset from the cursor */
  var EASE=0.16;                   /* per-frame lerp factor for the follow */

  var sources=function(list){return list.map(function(s){return '<source src="'+s[0]+'" type="'+s[1]+'">';}).join('');};
  var reduceMotion=function(){return window.matchMedia('(prefers-reduced-motion: reduce)').matches;};
  var finePointer=function(){return window.matchMedia('(hover: hover) and (pointer: fine)').matches;};
  var safePlay=function(v){var p=v&&v.play();if(p&&p.catch)p.catch(function(){});};

  function loopVideo(className){
    var v=document.createElement('video');
    v.className=className;
    v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;
    v.setAttribute('muted','');v.setAttribute('playsinline','');
    v.setAttribute('aria-hidden','true');
    v.tabIndex=-1;
    v.preload='auto';
    v.poster=POSTER;
    v.innerHTML=sources(PREVIEW);
    return v;
  }

  /* ---------- 1. Faint loop inside the pill ---------- */
  function mountPill(){
    var cta=document.querySelector('.home-inline-cta[data-hero-video]');
    if(!cta||cta.dataset.videoReady)return;
    var bg=cta.querySelector('.home-cta-bg');
    if(!bg)return;
    cta.dataset.videoReady='1';
    var v=loopVideo('home-cta-video');
    if(reduceMotion()){v.autoplay=false;v.preload='metadata';}
    bg.appendChild(v);
    if(!reduceMotion())safePlay(v);
  }
  /* The hero is re-rendered by app.js on navigation; watch for it. */
  var mountQueued=false;
  function queueMount(){
    if(mountQueued)return;
    mountQueued=true;
    requestAnimationFrame(function(){mountQueued=false;mountPill();});
  }
  new MutationObserver(queueMount).observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountPill);else mountPill();

  /* ---------- 2. Cursor-following preview card ---------- */
  var card=null,cardVideo=null,active=false,raf=0;
  var cur={x:0,y:0},target={x:0,y:0};

  function buildCard(){
    if(card)return card;
    card=document.createElement('div');
    card.className='hero-reel-card';
    card.setAttribute('aria-hidden','true');
    card.innerHTML=
      '<div class="hero-reel-card-inner">'+
        '<div class="hero-reel-card-border"></div>'+
        '<span class="hero-reel-card-badge">View'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
            '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>'+
          '</svg>'+
        '</span>'+
      '</div>';
    cardVideo=loopVideo('hero-reel-card-video');
    card.firstChild.insertBefore(cardVideo,card.firstChild.firstChild);
    document.body.appendChild(card);
    return card;
  }

  /* Where the card's top-left corner wants to be: just below-right of the
     pointer, flipped to the other side when it would leave the viewport. */
  function placeFor(x,y){
    var vw=window.innerWidth,vh=window.innerHeight;
    var px=x+GAP,py=y+GAP;
    if(px+CARD>vw-8)px=x-GAP-CARD;
    if(py+CARD>vh-8)py=y-GAP-CARD;
    return {x:Math.max(8,px),y:Math.max(8,py)};
  }

  function tick(){
    var dx=target.x-cur.x,dy=target.y-cur.y;
    cur.x+=dx*EASE;cur.y+=dy*EASE;
    card.style.transform='translate3d('+cur.x.toFixed(2)+'px,'+cur.y.toFixed(2)+'px,0)';
    if(active||Math.abs(dx)>0.5||Math.abs(dy)>0.5)raf=requestAnimationFrame(tick);
    else raf=0;
  }

  function showCard(event){
    if(!finePointer())return;
    buildCard();
    active=true;
    var p=placeFor(event.clientX,event.clientY);
    /* Start exactly at the pointer so the card never flies in from elsewhere. */
    target=p;cur={x:p.x,y:p.y};
    card.style.transform='translate3d('+p.x+'px,'+p.y+'px,0)';
    card.classList.add('is-visible');
    if(!reduceMotion())safePlay(cardVideo);
    if(!raf)raf=requestAnimationFrame(tick);
  }
  function moveCard(event){
    if(!active)return;
    target=placeFor(event.clientX,event.clientY);
    if(!raf)raf=requestAnimationFrame(tick);
  }
  function hideCard(){
    if(!card||!active)return;
    active=false;
    card.classList.remove('is-visible');
    if(cardVideo)cardVideo.pause();
  }

  var ctaFrom=function(event){return event.target instanceof Element?event.target.closest('.home-inline-cta[data-hero-video]'):null;};
  document.addEventListener('pointerover',function(event){
    var cta=ctaFrom(event);
    if(!cta||cta.contains(event.relatedTarget))return;
    cta.classList.add('is-previewing');
    showCard(event);
  });
  document.addEventListener('pointermove',moveCard,{passive:true});
  document.addEventListener('pointerout',function(event){
    var cta=ctaFrom(event);
    if(!cta||cta.contains(event.relatedTarget))return;
    cta.classList.remove('is-previewing');
    hideCard();
  });
  window.addEventListener('blur',hideCard);
  window.addEventListener('scroll',hideCard,{passive:true});

  /* ---------- 3. Square modal with the full walkthrough ---------- */
  var dialog=null,dialogVideo=null,hint=null,closing=false;

  function buildDialog(){
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.className='hero-reel-modal';
    dialog.setAttribute('aria-label','KFH Jazeel product walkthrough');
    dialog.innerHTML=
      '<div class="hero-reel-frame">'+
        '<video class="hero-reel-video" playsinline loop preload="metadata" poster="'+POSTER+'">'+sources(FULL)+'</video>'+
        '<button type="button" class="hero-reel-close" aria-label="Close video">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'+
        '</button>'+
        '<button type="button" class="hero-reel-hint" hidden>Tap for sound</button>'+
      '</div>';
    document.body.appendChild(dialog);
    dialogVideo=dialog.querySelector('.hero-reel-video');
    hint=dialog.querySelector('.hero-reel-hint');

    dialog.querySelector('.hero-reel-close').addEventListener('click',closeDialog);
    hint.addEventListener('click',function(){
      dialogVideo.muted=false;safePlay(dialogVideo);hint.hidden=true;
    });
    /* Click on the dark area (the dialog itself) closes; the frame does not. */
    dialog.addEventListener('click',function(event){
      if(event.target===dialog)closeDialog();
    });
    dialog.addEventListener('cancel',function(event){event.preventDefault();closeDialog();});
    return dialog;
  }

  function openDialog(){
    buildDialog();
    if(dialog.open)return;
    hint.hidden=true;
    closing=false;
    dialog.classList.remove('is-closing');
    document.documentElement.classList.add('hero-reel-open');
    dialog.showModal();
    try{dialogVideo.currentTime=0;}catch(e){}
    dialogVideo.muted=false;
    var played=dialogVideo.play();
    if(played&&played.catch){
      played.catch(function(){
        /* Autoplay with sound refused: play muted and offer one tap for audio. */
        dialogVideo.muted=true;safePlay(dialogVideo);hint.hidden=false;
      });
    }
    requestAnimationFrame(function(){dialog.querySelector('.hero-reel-close').focus();});
  }

  function closeDialog(){
    if(!dialog||!dialog.open||closing)return;
    closing=true;
    dialogVideo.pause();
    var finish=function(){
      dialog.classList.remove('is-closing');
      document.documentElement.classList.remove('hero-reel-open');
      dialog.close();
      closing=false;
    };
    if(reduceMotion()){finish();return;}
    dialog.classList.add('is-closing');
    window.setTimeout(finish,200);
  }

  document.addEventListener('click',function(event){
    var cta=ctaFrom(event);
    if(!cta)return;
    event.preventDefault();
    cta.classList.remove('is-previewing');
    hideCard();
    openDialog();
  });
  window.addEventListener('hashchange',function(){if(dialog&&dialog.open)closeDialog();});
})();
