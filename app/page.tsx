"use client";

import { useState, useEffect, useRef } from "react";

const WHATSAPP      = "https://wa.me/5511982408744";
const WHATSAPP_DIAG = "https://wa.me/5511982408744?text=Olá%2C%20gostaria%20de%20solicitar%20um%20diagnóstico%20gratuito.";
const LINKEDIN      = "https://www.linkedin.com/in/jackson-rodrigues-oliveira";
const EMAIL         = "mailto:contato@jackwolf.com.br";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bg:#0B0F14;--card:#11161D;--card2:#141B24;
    --teal:#00B2A9;--teal-h:#00D1C7;
    --teal-dim:rgba(0,178,169,0.12);
    --text:#F5F7FA;--muted:#9AA4B2;
    --border:rgba(255,255,255,0.07);--border-t:rgba(0,178,169,0.32);
  }
  html{scroll-behavior:smooth;}
  body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;line-height:1.6;}
  h1,h2,h3,h4,h5,h6{font-family:'Space Grotesk',sans-serif;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--teal);border-radius:2px;}

  .grid-bg{
    background-image:
      linear-gradient(rgba(0,178,169,0.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,178,169,0.03) 1px,transparent 1px);
    background-size:60px 60px;
  }
  .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}

  @keyframes fadeUp  {from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn  {from{opacity:0}to{opacity:1}}
  @keyframes float   {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes blink   {0%,100%{opacity:1}50%{opacity:0}}
  @keyframes shimmer {0%{background-position:-200% center}100%{background-position:200% center}}

  .animate-float{animation:float 5s ease-in-out infinite;}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}

  /* ══ NAV ══ */
  .nav{
    position:fixed;top:0;left:0;right:0;z-index:100;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 5%;height:104px;
    transition:background 0.3s,backdrop-filter 0.3s,border-color 0.3s;
    border-bottom:1px solid transparent;
  }
  .nav.scrolled{background:rgba(11,15,20,0.95);backdrop-filter:blur(20px);border-color:var(--border);}
  .nav-links{display:flex;gap:2rem;}
  .nav-links a{font-size:0.875rem;font-weight:500;color:var(--muted);text-decoration:none;transition:color 0.2s;}
  .nav-links a:hover{color:var(--text);}
  .nav-cta{
    background:var(--teal);color:#0B0F14;
    padding:0.6rem 1.5rem;border-radius:8px;
    font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.875rem;
    text-decoration:none;transition:all 0.2s;white-space:nowrap;
  }
  .nav-cta:hover{background:var(--teal-h);transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,178,169,0.3);}

  /* ══ MOBILE MENU ══ */
  .hamburger{
    display:none;flex-direction:column;gap:5px;
    cursor:pointer;padding:6px;background:none;border:none;
  }
  .hamburger span{
    display:block;width:26px;height:2.5px;
    background:var(--text);border-radius:2px;transition:all 0.3s;
  }
  .mobile-menu{
    display:none;position:fixed;
    top:104px;left:0;right:0;
    background:rgba(11,15,20,0.98);backdrop-filter:blur(20px);
    padding:1.5rem 5% 2rem;
    border-bottom:1px solid var(--border);z-index:99;
    flex-direction:column;gap:0;
    animation:fadeUp 0.25s ease;
  }
  .mobile-menu.open{display:flex;}
  .mobile-menu a{
    font-size:1rem;font-weight:500;color:var(--muted);
    text-decoration:none;padding:0.875rem 0;
    border-bottom:1px solid var(--border);transition:color 0.2s;
  }
  .mobile-menu a:hover{color:var(--text);}
  .mobile-menu a:last-child{
    margin-top:1.25rem;border:none;
    background:var(--teal);color:#0B0F14;
    text-align:center;border-radius:8px;
    font-family:'Space Grotesk',sans-serif;font-weight:700;padding:0.875rem;
  }

  /* ══ BUTTONS ══ */
  .btn-primary{
    display:inline-flex;align-items:center;gap:0.5rem;
    background:var(--teal);color:#0B0F14;
    padding:0.9rem 1.875rem;border-radius:9px;
    font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.9375rem;
    text-decoration:none;border:none;cursor:pointer;transition:all 0.25s;white-space:nowrap;
  }
  .btn-primary:hover{background:var(--teal-h);transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,178,169,0.38);}
  .btn-ghost{
    display:inline-flex;align-items:center;gap:0.5rem;
    background:transparent;color:var(--text);
    padding:0.9rem 1.875rem;border-radius:9px;
    font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.9375rem;
    text-decoration:none;border:1px solid var(--border-t);cursor:pointer;transition:all 0.25s;white-space:nowrap;
  }
  .btn-ghost:hover{border-color:var(--teal);color:var(--teal);background:var(--teal-dim);transform:translateY(-2px);}

  .section{padding:100px 5%;position:relative;overflow:hidden;}

  /* ══ SECTION HEADING ══ */
  .sh-wrap{margin-bottom:3rem;}
  .sh-wrap.center{text-align:center;}

  .sh-label{
    display:inline-flex;align-items:center;gap:0.6rem;
    font-family:'Space Grotesk',sans-serif;
    font-size:1.05rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
    color:var(--teal);
    border:1px solid var(--border-t);border-radius:100px;
    padding:0.45rem 1.3rem 0.45rem 0.9rem;
    margin-bottom:1.1rem;
  }
  .sh-label::before{content:'';display:block;width:18px;height:2px;background:var(--teal);border-radius:2px;flex-shrink:0;}
  .sh-wrap.center .sh-label{margin-left:auto;margin-right:auto;}

  .sh-title{
    font-family:'Space Grotesk',sans-serif;
    font-size:clamp(1.75rem,3.5vw,2.5rem);
    font-weight:800;line-height:1.2;letter-spacing:-0.03em;
    color:var(--text);padding-left:1.75rem;
  }
  .sh-wrap.center .sh-title{padding-left:0;}

  .sh-sub{
    font-size:1.0625rem;color:var(--muted);
    max-width:580px;line-height:1.75;
    margin-top:0.875rem;padding-left:1.75rem;
  }
  .sh-wrap.center .sh-sub{padding-left:0;margin-left:auto;margin-right:auto;}

  /* BADGE */
  .badge{
    display:inline-flex;align-items:center;gap:0.4rem;
    background:var(--teal-dim);border:1px solid var(--border-t);
    color:var(--teal);padding:0.35rem 1rem;border-radius:100px;
    font-size:0.75rem;font-weight:600;letter-spacing:0.04em;
  }
  .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);animation:blink 1.5s infinite;}

  .grad-text{
    background:linear-gradient(135deg,var(--teal) 0%,var(--teal-h) 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }

  /* CARDS */
  .card-soph{
    position:relative;background:var(--card);
    border:1px solid var(--border);border-radius:14px;
    padding:1.875rem;overflow:hidden;
    transition:all 0.35s cubic-bezier(0.23,1,0.32,1);
  }
  .card-soph::before{
    content:'';position:absolute;inset:0;border-radius:14px;
    background:radial-gradient(circle at 50% 0%,rgba(0,178,169,0.08),transparent 65%);
    opacity:0;transition:opacity 0.35s;
  }
  .card-soph::after{
    content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,var(--teal),transparent);
    opacity:0;transition:opacity 0.35s;
  }
  .card-soph:hover{border-color:var(--border-t);transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,0.35),0 0 35px rgba(0,178,169,0.09);}
  .card-soph:hover::before{opacity:1;}
  .card-soph:hover::after{opacity:1;}
  .card-num{
    position:absolute;top:1.25rem;right:1.25rem;
    font-family:'Space Grotesk',sans-serif;font-weight:800;
    font-size:1.875rem;color:rgba(0,178,169,0.06);letter-spacing:-0.05em;
    pointer-events:none;transition:color 0.35s;
  }
  .card-soph:hover .card-num{color:rgba(0,178,169,0.14);}

  .icon-box{
    width:46px;height:46px;border-radius:11px;
    background:var(--teal-dim);border:1px solid var(--border-t);
    display:flex;align-items:center;justify-content:center;
    color:var(--teal);margin-bottom:1rem;flex-shrink:0;transition:all 0.3s;
  }
  .card-soph:hover .icon-box{background:var(--teal);color:#0B0F14;box-shadow:0 4px 16px rgba(0,178,169,0.35);}

  .card-saas{
    background:linear-gradient(135deg,rgba(0,178,169,0.12),rgba(0,178,169,0.04));
    border:1px solid var(--border-t);border-radius:14px;padding:1.875rem;
    position:relative;overflow:hidden;transition:all 0.35s;
    box-shadow:0 0 40px rgba(0,178,169,0.08);
  }
  .card-saas::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--teal),transparent);}
  .card-saas:hover{box-shadow:0 0 60px rgba(0,178,169,0.18);transform:translateY(-4px);}
  .card-saas .icon-box{transition:all 0.3s;}
  .card-saas:hover .icon-box{background:var(--teal);color:#0B0F14;}

  .feat-card{
    background:var(--card2);border:1px solid var(--border-t);
    border-radius:9px;padding:0.7rem 0.9rem;
    display:flex;align-items:center;gap:0.6rem;
    font-size:0.8125rem;color:var(--text);transition:all 0.25s;
  }
  .feat-card:hover{background:var(--teal-dim);border-color:var(--teal);}
  .feat-dot{width:7px;height:7px;border-radius:50%;background:var(--teal);flex-shrink:0;}

  .metric-val{
    font-family:'Space Grotesk',sans-serif;
    font-size:clamp(2.5rem,5.5vw,3.5rem);font-weight:800;letter-spacing:-0.05em;
    background:linear-gradient(135deg,var(--teal),var(--teal-h));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }

  .mockup{background:var(--card2);border:1px solid var(--border);border-radius:14px;overflow:hidden;}
  .mockup-bar{
    background:#0D1219;padding:0.75rem 1rem;
    display:flex;align-items:center;gap:0.5rem;border-bottom:1px solid var(--border);
  }
  .dot{width:10px;height:10px;border-radius:50%;}

  .section-alt{background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  .section-hl{background:linear-gradient(135deg,rgba(0,178,169,0.05),transparent);border-top:1px solid rgba(0,178,169,0.12);border-bottom:1px solid rgba(0,178,169,0.12);}

  .founder-photo{
    width:300px;height:300px;border-radius:50%;
    overflow:hidden;border:3px solid var(--border-t);
    box-shadow:0 8px 50px rgba(0,0,0,0.4),0 0 24px rgba(0,178,169,0.12);
    flex-shrink:0;
  }
  .founder-photo img{
    width:100%;height:100%;
    object-fit:cover;
    object-position:center 18%;
    display:block;
  }

  /* ══ MOBILE ══ */
  @media(max-width:900px){
    .nav-links{display:none;}
    .nav-cta{display:none;}
    .hamburger{display:flex;}
    .grid-3col{grid-template-columns:repeat(2,1fr) !important;}
    .grid-4col{grid-template-columns:repeat(2,1fr) !important;}
  }
  @media(max-width:600px){
    .grid-3col{grid-template-columns:1fr !important;}
    .grid-4col{grid-template-columns:1fr !important;}
  }

  @media(max-width:768px){
    .section{padding:72px 5%;}
    .sh-label{font-size:0.875rem;}
    .sh-title{font-size:1.5rem;padding-left:1.1rem;}
    .sh-sub{font-size:0.9375rem;padding-left:1.1rem;}

    /* Hero mobile: empilha coluna única */
    .hero-flex{flex-direction:column !important;gap:2rem !important;padding-top:110px !important;}
    .hero-text{flex:unset !important;width:100% !important;}
    .hero-img{flex:unset !important;width:100% !important;}

    /* Buttons full width mobile */
    .btn-row{flex-direction:column !important;}
    .btn-row .btn-primary,.btn-row .btn-ghost{width:100%;justify-content:center;}

    /* Founder: empilha */
    .founder-flex{flex-direction:column !important;gap:2rem !important;align-items:center !important;text-align:center;}
    .founder-photo{width:180px;height:180px;border-radius:50%;}

    /* Pills hero */
    .hero-pills{gap:0.5rem !important;}

    /* Tech cols */
    .tech-grid{grid-template-columns:1fr !important;gap:2rem !important;}

    /* KPI bar */
    .kpi-bar{flex-direction:column !important;align-items:stretch !important;}
    .kpi-bar > div{text-align:center;}
  }

  @media(max-width:480px){
    .section{padding:60px 4%;}
    .sh-title{font-size:1.5rem;}
    .nav{padding:0 4%;height:80px;}
    .mobile-menu{top:80px;}
    h1{font-size:1.75rem !important;}
  }
`;

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const icons = {
    store:      <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
    package:    <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    eye:        <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    shuffle:    <><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></>,
    barChart:   <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    zap:        <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    target:     <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    users:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    cpu:        <><rect x="9" y="9" width="6" height="6"/><path d="M20 14h1M20 10h1M4 14H3M4 10H3M14 4V3M10 4V3M14 21v-1M10 21v-1"/><rect x="2" y="2" width="20" height="20" rx="2"/></>,
    award:      <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    checkCircle:<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    db:         <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    globe:      <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    settings:   <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    linkedin:   <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    mail:       <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    monitor:    <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    layers:     <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    menu:       <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x:          <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    whatsapp:   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {icons[name as keyof typeof icons]}
    </svg>
  );
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Counter({
  target,
  duration = 2200,
}: {
  target: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const isNeg = target.includes("-");
  const num = parseInt(target.replace(/\D/g,""));
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 70; let i = 0; const inc = num / steps;
        const t = setInterval(() => {
          i++; setVal(Math.round(isNeg ? -(i*inc) : i*inc));
          if (i >= steps) { setVal(isNeg ? -num : num); clearInterval(t); }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num, isNeg, duration]);
  return <span ref={ref} className="metric-val">{val > 0 ? "+" : ""}{val}%</span>;
}

const SH = ({ label, title, sub, center = false }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal sh-wrap${center ? " center" : ""}`}>
      <div className="sh-label">{label}</div>
      <h2 className="sh-title">{title}</h2>
      {sub && <p className="sh-sub">{sub}</p>}
    </div>
  );
};

export default function JackWolfLanding() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // fecha menu ao clicar em link
  const closeMenu = () => setMenuOpen(false);

  const r1=useReveal(),r2=useReveal(),r3=useReveal(),
        r4=useReveal(),r5=useReveal(),r6=useReveal(),r7=useReveal();

  const challenges = [
    { icon:"store",    title:"Baixa Execução no PDV",                    desc:"Ruptura, má exposição e falta de padrão comprometem a conversão no ponto de venda." },
    { icon:"package",  title:"Estoque Parado",                           desc:"Excesso de inventário sem giro impacta o fluxo de caixa e a eficiência operacional." },
    { icon:"eye",      title:"Falta de Visibilidade dos Distribuidores", desc:"Dados de sell-out e cobertura chegam tarde, impedindo decisões ágeis e precisas." },
    { icon:"shuffle",  title:"Processos Comerciais Desorganizados",      desc:"Fluxos manuais e dados fragmentados geram retrabalho e perda de oportunidades." },
    { icon:"barChart", title:"Falta de Indicadores",                     desc:"Sem KPIs estruturados, é impossível medir o que funciona e o que precisa de ajuste." },
    { icon:"zap",      title:"Dificuldade na Tomada de Decisão",         desc:"Dados dispersos e relatórios lentos atrasam decisões críticas de crescimento." },
  ];

  const services = [
    { icon:"target",     title:"Trade Marketing",         desc:"Estratégias de execução, visibilidade e sell-out para o ponto de venda." },
    { icon:"trendingUp", title:"Go-To-Market",            desc:"Planejamento de entrada em mercado, canais, precificação e força de vendas." },
    { icon:"settings",   title:"Estruturação Comercial",  desc:"Processos, rotinas e ferramentas para uma operação eficiente e escalável." },
    { icon:"cpu",        title:"Inteligência Comercial",  desc:"Análise de dados, painéis gerenciais e insights para decisões mais assertivas." },
    { icon:"barChart",   title:"Performance Comercial",   desc:"Diagnóstico, plano de ação e acompanhamento de indicadores de vendas." },
    { icon:"users",      title:"Treinamento Comercial",   desc:"Capacitação de equipes de vendas, distribuidores e promotores." },
    { icon:"award",      title:"Gestão de Indicadores",   desc:"KPIs, metas, dashboards e rituais de análise para gestão por dados." },
    { icon:"monitor",    title:"Plataforma SaaS Própria", desc:"Tecnologia proprietária para gestão de sell-in, sell-out, cobertura e performance de distribuidores em tempo real.", saas:true },
  ];

  const differentials = [
    { icon:"award",      title:"12+ Anos em Trade Marketing",     desc:"Experiência sólida com indústrias de grande porte e canais complexos." },
    { icon:"target",     title:"Especialização em GTM",           desc:"Metodologia própria de Go-To-Market para mercados competitivos." },
    { icon:"cpu",        title:"Inteligência Comercial",          desc:"Dados integrados à estratégia — não apenas relatórios, mas decisões." },
    { icon:"layers",     title:"Tecnologia Proprietária",         desc:"Plataformas SaaS desenvolvidas para a realidade do mercado brasileiro." },
    { icon:"trendingUp", title:"Foco em Resultado",               desc:"Cada entrega é medida por impacto real na performance comercial." },
    { icon:"settings",   title:"Estruturação de Processos",       desc:"Operações que funcionam de forma independente e escalável." },
    { icon:"globe",      title:"Visão Estratégica e Operacional", desc:"Do diagnóstico ao PDV — cobertura completa da cadeia comercial." },
  ];

  const steps = [
    { n:"01", title:"Diagnóstico",    desc:"Mapeamos gaps, oportunidades e o potencial real da sua operação." },
    { n:"02", title:"Estruturação",   desc:"Desenhamos o modelo ideal de processos, indicadores e canais." },
    { n:"03", title:"Implementação",  desc:"Implantamos com suporte ativo, ferramentas e treinamento." },
    { n:"04", title:"Acompanhamento", desc:"Monitoramos resultados e ajustamos com base em dados reais." },
    { n:"05", title:"Crescimento",    desc:"Escalamos o que funciona e construímos vantagem competitiva." },
  ];

  const hubFeatures = ["Sell-in / Sell-out","Estoque em tempo real","Cobertura de PDVs","Positivação","Ranking de Distribuidores","Dashboards Executivos"];
  const hubStats    = [
    { v:"Tempo Real", l:"Dados atualizados" },
    { v:"Multi-canal", l:"Todos os distribuidores" },
    { v:"IA Insights", l:"Análises automáticas" },
    { v:"100% Web", l:"Sem instalação" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <img src="/JACK_WOLF.png" alt="Jack Wolf"
          style={{ height:92, width:"auto", objectFit:"contain", display:"block" }} />

        <div className="nav-links">
          {[["Desafios","#challenges"],["Serviços","#services"],["Tecnologia","#tech"],["Resultados","#results"],["Processo","#process"]].map(([l,h])=>(
            <a key={l} href={h}>{l}</a>
          ))}
        </div>

        <a href={WHATSAPP_DIAG} target="_blank" rel="noreferrer" className="nav-cta">Solicitar Diagnóstico</a>

        {/* Hamburger mobile */}
        <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {[["Desafios","#challenges"],["Serviços","#services"],["Tecnologia","#tech"],["Resultados","#results"],["Processo","#process"]].map(([l,h])=>(
          <a key={l} href={h} onClick={closeMenu}>{l}</a>
        ))}
        <a href={WHATSAPP_DIAG} target="_blank" rel="noreferrer" onClick={closeMenu}>Solicitar Diagnóstico →</a>
      </div>

      {/* ── HERO ── */}
      <section className="section grid-bg" style={{ minHeight:"100vh", paddingTop:0, paddingBottom:80 }}>
        <div className="orb" style={{ width:700,height:700,background:"radial-gradient(circle,rgba(0,178,169,0.15) 0%,transparent 70%)",top:-150,right:-150 }} />
        <div className="orb" style={{ width:400,height:400,background:"radial-gradient(circle,rgba(0,178,169,0.07) 0%,transparent 70%)",bottom:-80,left:-80 }} />

        {/* Flex container alinhado ao topo para dashboard subir */}
        <div className="hero-flex" style={{
          display:"flex", alignItems:"flex-start", flexWrap:"wrap",
          gap:"3rem", paddingTop:130, minHeight:"100vh"
        }}>
          {/* Texto */}
          <div className="hero-text" style={{ flex:"1 1 460px", position:"relative", zIndex:1, animation:"fadeUp 0.85s ease forwards", paddingTop:"2rem" }}>
            <div className="badge" style={{ marginBottom:"1.75rem" }}>
              <span className="badge-dot"/>
              Plataforma SaaS · Inteligência Comercial · Consultoria Estratégica
            </div>

            {/* Título corrigido */}
            <h1 style={{ fontSize:"clamp(1.75rem,4.5vw,3.125rem)", fontWeight:800, lineHeight:1.14, letterSpacing:"-0.04em", marginBottom:"1.25rem" }}>
              A plataforma que conecta indústria, distribuidores e equipes de campo,{" "}
              <span className="grad-text">acelerando a performance comercial.</span>
            </h1>

            <p style={{ fontSize:"0.9375rem", color:"var(--muted)", maxWidth:510, lineHeight:1.8, marginBottom:"2rem" }}>
              A Jack Wolf combina expertise em Trade Marketing, Go-To-Market e Inteligência Comercial
              com plataforma própria, transformando dados comerciais em decisões que{" "}
              <strong style={{ color:"var(--text)" }}>geram crescimento.</strong>
            </p>

            <div className="btn-row" style={{ display:"flex", flexWrap:"wrap", gap:"0.875rem", marginBottom:"2.25rem" }}>
              <a href={WHATSAPP_DIAG} target="_blank" rel="noreferrer" className="btn-primary">
                Solicitar Diagnóstico <Icon name="arrowRight" size={16}/>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><Icon name="whatsapp"/></svg>
                Falar no WhatsApp
              </a>
            </div>

            <div className="hero-pills" style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem" }}>
              {[["12+ Anos","Experiência"],["Expertise em Distribuição","Canal Indireto"],["SaaS Própria","Plataforma JW"]].map(([v,l])=>(
                <div key={v} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.5rem 1rem", background:"var(--card)", border:"1px solid var(--border)", borderRadius:100 }}>
                  <span style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"0.8125rem", color:"var(--teal)" }}>{v}</span>
                  <span style={{ fontSize:"0.75rem", color:"var(--muted)" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard — alinhado ao topo, leve padding-top para ficar na linha */}
          <div className="hero-img" style={{ flex:"1 1 380px", display:"flex", justifyContent:"center", zIndex:1, paddingTop:"0.5rem", animation:"fadeIn 1s ease 0.5s forwards", opacity:0 }}>
            <div className="animate-float" style={{ width:"100%", maxWidth:460 }}>
              <div className="mockup" style={{ boxShadow:"0 30px 80px rgba(0,0,0,0.5),0 0 50px rgba(0,178,169,0.1)" }}>
                <div className="mockup-bar">
                  <span className="dot" style={{background:"#FF5F57"}}/><span className="dot" style={{background:"#FFBD2E"}}/><span className="dot" style={{background:"#28C840"}}/>
                  <span style={{ marginLeft:"auto", fontSize:10, color:"var(--muted)", fontFamily:"monospace" }}>Jack Wolf — Dashboard</span>
                </div>
                <img src="/dashboard.png" alt="Jack Wolf Dashboard" style={{ width:"100%", display:"block" }}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESAFIOS ── */}
      <section id="challenges" className="section section-alt">
        <SH label="Principais Desafios" title="Os gargalos que freiam o crescimento da sua operação." sub="Reconhece algum desses cenários? A Jack Wolf foi criada para resolver exatamente isso." />
        <div ref={r1} className="reveal grid-3col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.125rem" }}>
          {challenges.map((c,i)=>(
            <div key={c.title} className="card-soph">
              <span className="card-num">{String(i+1).padStart(2,"0")}</span>
              <div className="icon-box"><Icon name={c.icon} size={20}/></div>
              <h3 style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"1.125rem", color:"var(--text)", marginBottom:"0.5rem" }}>{c.title}</h3>
              <p style={{ fontSize:"0.9375rem", color:"var(--muted)", lineHeight:1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="services" className="section grid-bg">
        <div className="orb" style={{ width:500,height:500,background:"radial-gradient(circle,rgba(0,178,169,0.09) 0%,transparent 70%)",top:"20%",right:"-10%" }}/>
        <SH label="Como Ajudamos" title="Cobertura completa da sua operação comercial." sub="Do diagnóstico à execução, estruturamos sua operação com metodologia, tecnologia e acompanhamento." />
        <div ref={r2} className="reveal grid-4col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.125rem" }}>
          {services.map(s => s.saas ? (
            <div key={s.title} className="card-saas">
              <div className="icon-box"><Icon name={s.icon} size={20}/></div>
              <div style={{ position:"absolute", top:"1rem", right:"1rem" }}>
                <span className="badge" style={{ fontSize:"0.65rem" }}><span className="badge-dot"/>SaaS</span>
              </div>
              <h3 style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"1.0625rem", color:"var(--text)", marginBottom:"0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize:"0.9375rem", color:"var(--muted)", lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ) : (
            <div key={s.title} className="card-soph">
              <div className="icon-box"><Icon name={s.icon} size={20}/></div>
              <h3 style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"1.0625rem", color:"var(--text)", marginBottom:"0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize:"0.9375rem", color:"var(--muted)", lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECNOLOGIA ── */}
      <section id="tech" className="section section-hl">
        <div className="orb" style={{ width:600,height:600,background:"radial-gradient(circle,rgba(0,178,169,0.1) 0%,transparent 70%)",top:"10%",left:"-15%" }}/>
        <SH label="Tecnologia & Inteligência Comercial" title="Tecnologia que converte dados em vantagem competitiva." center
          sub="Além da consultoria estratégica, temos uma plataforma que conecta indústria e distribuidores." />

        <div ref={r3} className="reveal kpi-bar" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"1rem", marginBottom:"4.5rem" }}>
          {[["+100%","Visibilidade da Operação"],["+40%","Agilidade nas Decisões"],["+30%","Eficiência Comercial"]].map(([v,l])=>(
            <div key={v} style={{ background:"var(--teal-dim)", border:"1px solid var(--border-t)", borderRadius:12, padding:"1.1rem 2.25rem", textAlign:"center", flex:"1 1 160px" }}>
              <div style={{ fontFamily:"Space Grotesk", fontSize:"1.875rem", fontWeight:800, color:"var(--teal)" }}>{v}</div>
              <div style={{ fontSize:"0.8125rem", color:"var(--muted)", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div ref={r4} className="reveal tech-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"3rem", alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.875rem" }}>
              <div style={{ width:48,height:48,background:"var(--teal)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 24px rgba(0,178,169,0.4)",flexShrink:0 }}>
                <Icon name="db" size={22}/>
              </div>
              <div>
                <h3 style={{ fontFamily:"Space Grotesk", fontWeight:800, fontSize:"1.375rem", color:"var(--text)" }}>Data Hub Distribuidores</h3>
                <span style={{ fontSize:"0.75rem", color:"var(--teal)", fontWeight:600 }}>Jack Wolf Platform — SaaS</span>
              </div>
            </div>
            <p style={{ fontSize:"0.9375rem", color:"var(--muted)", lineHeight:1.8 }}>
              Plataforma de inteligência comercial que consolida dados de sell-in, sell-out, estoque,
              positivação e cobertura — permitindo que indústrias acompanhem a performance dos
              distribuidores em tempo real, com alertas e IA integrada.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.625rem" }}>
              {hubFeatures.map(f=>(
                <div key={f} className="feat-card"><span className="feat-dot"/>{f}</div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
              {hubStats.map(s=>(
                <div key={s.v} style={{ background:"var(--teal-dim)", border:"1px solid var(--border-t)", borderRadius:10, padding:"0.875rem 1rem", textAlign:"center" }}>
                  <div style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"0.9375rem", color:"var(--teal)" }}>{s.v}</div>
                  <div style={{ fontSize:"0.75rem", color:"var(--muted)", marginTop:3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div>
              <a href={WHATSAPP_DIAG} target="_blank" rel="noreferrer" className="btn-primary">
                Solicitar Demonstração <Icon name="arrowRight" size={16}/>
              </a>
            </div>
          </div>

          <div className="animate-float" style={{ animationDelay:"0.5s" }}>
            <div className="mockup" style={{ boxShadow:"0 30px 80px rgba(0,0,0,0.5),0 0 60px rgba(0,178,169,0.12)" }}>
              <div className="mockup-bar">
                <span className="dot" style={{background:"#FF5F57"}}/><span className="dot" style={{background:"#FFBD2E"}}/><span className="dot" style={{background:"#28C840"}}/>
                <span style={{ marginLeft:"auto", fontSize:10, color:"var(--muted)", fontFamily:"monospace" }}>Data Hub — Live</span>
              </div>
              <img src="/dashboard.png" alt="Data Hub" style={{ width:"100%", display:"block" }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTADOS ── */}
      <section id="results" className="section grid-bg" style={{ textAlign:"center" }}>
        <div className="orb" style={{ width:800,height:400,background:"radial-gradient(ellipse,rgba(0,178,169,0.16) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }}/>
        <SH label="Resultados Reais" title="Performance comprovada no campo." center
          sub="Indicadores médios observados em projetos com clientes da indústria de bens de consumo." />
        <div ref={r5} className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.5rem", position:"relative", zIndex:1 }}>
          {[
            { target:"+18", label:"Crescimento médio de vendas" },
            { target:"+32", label:"Melhoria na execução" },
            { target:"-22", label:"Redução de estoque parado" },
            { target:"+35", label:"Ganho em capilaridade (distribuição)" },
          ].map(m=>(
            <div key={m.label} className="card-soph" style={{ padding:"2.5rem 1.5rem", textAlign:"center" }}>
              <Counter target={m.target}/>
              <p style={{ fontSize:"0.875rem", color:"var(--muted)", marginTop:"0.875rem", lineHeight:1.55 }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="section section-alt">
        <SH label="Nossos Diferenciais" title="Por que a Jack Wolf entrega resultados consistentes?"
          sub="Uma combinação única de experiência, metodologia e tecnologia proprietária." />
        <div ref={r6} className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.125rem" }}>
          {differentials.map((d,i)=>(
            <div key={d.title} className="card-soph" style={{ display:"flex", gap:"1.125rem", alignItems:"flex-start" }}>
              <span className="card-num" style={{ top:"auto", bottom:"1rem", right:"1rem", fontSize:"1.5rem" }}>{String(i+1).padStart(2,"0")}</span>
              <div className="icon-box" style={{ marginBottom:0, marginTop:2, flexShrink:0 }}><Icon name={d.icon} size={18}/></div>
              <div>
                <h3 style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"1.0625rem", color:"var(--text)", marginBottom:"0.375rem" }}>{d.title}</h3>
                <p style={{ fontSize:"0.9375rem", color:"var(--muted)", lineHeight:1.65 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FUNDADOR ── */}
      <section className="section grid-bg">
        <div className="orb" style={{ width:500,height:500,background:"radial-gradient(circle,rgba(0,178,169,0.09) 0%,transparent 70%)",top:"20%",right:"0" }}/>
        <SH label="Sobre o Fundador" title="Expertise construída no campo, com foco em resultado." />
        <div className="founder-flex" style={{ display:"flex", flexWrap:"wrap", gap:"4rem", alignItems:"center" }}>
          <div className="founder-photo">
            <img src="/jackson.png" alt="Jackson Oliveira"/>
          </div>
          <div style={{ flex:1, minWidth:260 }}>
            <h3 style={{ fontFamily:"Space Grotesk", fontWeight:800, fontSize:"clamp(1.75rem,3vw,2.375rem)", letterSpacing:"-0.03em", lineHeight:1.2, marginBottom:"0.5rem" }}>
              Jackson Oliveira
            </h3>
            <p style={{ color:"var(--teal)", fontWeight:600, fontSize:"1.125rem", marginBottom:"1.5rem" }}>
              Especialista em Trade Marketing, GTM & Inteligência Comercial
            </p>
            <p style={{ color:"var(--muted)", lineHeight:1.85, fontSize:"1.0625rem", marginBottom:"1.75rem", maxWidth:500 }}>
              Com mais de 12 anos de experiência em Trade Marketing, Go-To-Market e Inteligência Comercial,
              Jackson construiu a Jack Wolf para transformar operações comerciais complexas em máquinas de
              crescimento previsível, orientadas por dados e tecnologia proprietária.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"0.75rem", maxWidth:480, marginBottom:"2rem" }}>
              {["Trade Marketing","Go-To-Market","Performance Comercial","Inteligência Comercial"].map(s=>(
                <div key={s} style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.9375rem" }}>
                  <Icon name="checkCircle" size={15}/><span style={{ color:"var(--text)" }}>{s}</span>
                </div>
              ))}
            </div>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding:"0.65rem 1.35rem", fontSize:"0.875rem" }}>
              <Icon name="linkedin" size={16}/> Conectar no LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESSO ── */}
      <section id="process" className="section section-hl">
        <SH label="Processo de Trabalho" title="Nossa metodologia de crescimento comercial." center
          sub="Uma metodologia estruturada para garantir resultados consistentes e escaláveis." />
        <div ref={r7} className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"1.125rem" }}>
          {steps.map(s=>(
            <div key={s.title} className="card-soph" style={{ textAlign:"center", padding:"2.25rem 1.25rem" }}>
              <div style={{ width:52,height:52,borderRadius:"50%",background:"var(--teal-dim)",border:"2px solid var(--border-t)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.25rem",fontFamily:"Space Grotesk",fontWeight:800,fontSize:"0.875rem",color:"var(--teal)" }}>
                {s.n}
              </div>
              <h3 style={{ fontFamily:"Space Grotesk", fontWeight:700, fontSize:"1.0625rem", color:"var(--text)", marginBottom:"0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize:"0.9rem", color:"var(--muted)", lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section grid-bg" style={{ textAlign:"center" }}>
        <div className="orb" style={{ width:900,height:500,background:"radial-gradient(ellipse,rgba(0,178,169,0.16) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }}/>
        <div style={{ position:"relative", zIndex:1, maxWidth:640, marginLeft:"auto", marginRight:"auto" }}>
          <div className="badge" style={{ marginBottom:"1.75rem" }}>
            <span className="badge-dot"/>Vamos conversar
          </div>
          <h2 style={{ fontFamily:"Space Grotesk", fontWeight:800, fontSize:"clamp(1.75rem,5vw,3rem)", letterSpacing:"-0.04em", lineHeight:1.15, marginBottom:"1.25rem" }}>
            Pronto para transformar sua{" "}
            <span className="grad-text">operação comercial?</span>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", lineHeight:1.8, maxWidth:500, marginLeft:"auto", marginRight:"auto", marginBottom:"2.75rem" }}>
            Vamos identificar oportunidades de crescimento e construir uma operação mais eficiente, previsível e orientada por dados.
          </p>
          <div className="btn-row" style={{ display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center", marginBottom:"2rem" }}>
            <a href={WHATSAPP_DIAG} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:"1rem", padding:"1rem 2.25rem" }}>
              Agendar Diagnóstico <Icon name="arrowRight" size={16}/>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize:"1rem", padding:"1rem 2.25rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><Icon name="whatsapp"/></svg>
              Falar no WhatsApp
            </a>
          </div>
          <p style={{ fontSize:"0.875rem", color:"var(--muted)" }}>
            Ou ligue: <a href="tel:+5511982408744" style={{ color:"var(--teal)", fontWeight:600, textDecoration:"none" }}>+55 11 98240-8744</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#080C10", borderTop:"1px solid var(--border)", padding:"3rem 5%" }}>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"1.5rem", marginBottom:"2rem" }}>
          <div>
            <div style={{ marginBottom:"0.875rem" }}>
              <img src="/JACK_WOLF.png" alt="Jack Wolf"
                style={{ height:80, width:"auto", objectFit:"contain", display:"block" }}/>
            </div>
            <p style={{ fontSize:"0.8125rem", color:"var(--muted)", maxWidth:300 }}>
              A plataforma que conecta indústria, distribuidores e equipes de campo.
            </p>
          </div>
          <div style={{ display:"flex", gap:"0.75rem" }}>
            {[{icon:"linkedin",href:LINKEDIN},{icon:"whatsapp",href:WHATSAPP},{icon:"mail",href:EMAIL}].map(({icon,href})=>(
              <a key={icon} href={href} target="_blank" rel="noreferrer"
                style={{ width:44,height:44,border:"1px solid var(--border)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",transition:"all 0.2s",textDecoration:"none" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border-t)";e.currentTarget.style.color="var(--teal)";e.currentTarget.style.background="var(--teal-dim)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)";e.currentTarget.style.background="transparent";}}>
                {icon==="whatsapp"
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><Icon name="whatsapp"/></svg>
                  : <Icon name={icon} size={18}/>}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:"1.5rem", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
          <p style={{ fontSize:"0.75rem", color:"var(--muted)" }}>© {new Date().getFullYear()} Jack Wolf. Todos os direitos reservados.</p>
          <p style={{ fontSize:"0.75rem", color:"var(--muted)" }}>Trade Marketing · Go-To-Market · Inteligência Comercial · Tecnologia</p>
        </div>
      </footer>
    </>
  );
}
