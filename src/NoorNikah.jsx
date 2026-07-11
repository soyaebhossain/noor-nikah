import React, { useEffect, useState } from "react";
import {
  getAllDistricts,
  getAllDivisions,
  getDistrictsByDivision,
  getThanasByDistrict,
  getUnionsByUpazila,
  getUpazilasByDistrict,
} from "bangladesh-geo-data";

/*
  নূর নিকাহ (NoorNikah) — Demo halal matrimony platform (multi-page).
  Simple useState-based routing connects: Home, Browse, Profile detail, Register, Login.
  All profiles / stories are FICTIONAL placeholder data for demonstration only.
*/

const C = {
  green900: "#0B3D2E", green700: "#15604A", green600: "#1C7A5E",
  gold: "#C9A227", goldSoft: "#E6CE84", cream: "#F6F2E9",
  card: "#FFFFFF", ink: "#16241F", muted: "#5C6B63", line: "rgba(11,61,46,.12)",
};

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.nn{font-family:'Hind Siliguri',system-ui,sans-serif;color:${C.ink};background:${C.cream};line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100vh;overflow-x:hidden;}
.nn .serif{font-family:'Fraunces',Georgia,serif;}
.nn .wrap{max-width:1180px;margin:0 auto;padding:0 22px;}
.nn a{color:inherit;text-decoration:none;cursor:pointer;}
.nn button{font-family:inherit;cursor:pointer;border:none;}
.nn :focus-visible{outline:2px solid ${C.gold};outline-offset:2px;border-radius:4px;}
.nn input,.nn select,.nn textarea{font-family:inherit;}

.nn .announce{background:${C.green900};color:${C.goldSoft};font-size:13px;text-align:center;padding:7px 12px;}
.nn header{position:sticky;top:0;z-index:40;background:rgba(246,242,233,.92);backdrop-filter:blur(8px);border-bottom:1px solid ${C.line};}
.nn .nav{display:flex;align-items:center;justify-content:space-between;height:70px;}
.nn .brand{display:flex;align-items:center;gap:10px;font-weight:700;}
.nn .brand .mark{width:38px;height:38px;}
.nn .brand .bn{font-size:21px;color:${C.green900};line-height:1;}
.nn .brand .en{font-size:10.5px;letter-spacing:3px;color:${C.gold};text-transform:uppercase;}
.nn .navlinks{display:flex;align-items:center;gap:26px;}
.nn .navlinks a{font-size:15px;color:${C.green900};opacity:.85;}
.nn .navlinks a:hover{opacity:1;}
.nn .navlinks a.active{color:${C.gold};opacity:1;font-weight:600;}
.nn .nav-cta{display:flex;align-items:center;gap:14px;}
.nn .language-switch{position:relative;display:flex;align-items:center;gap:6px;}
.nn .language-switch select{appearance:none;background:#fff;border:1px solid ${C.line};border-radius:999px;padding:9px 30px 9px 12px;color:${C.green900};font:600 13px/1.2 inherit;cursor:pointer;max-width:112px;}
.nn .language-switch:after{content:"⌄";position:absolute;right:11px;top:7px;color:${C.green700};pointer-events:none;}
.nn #google_translate_element{position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;}
.nn .goog-te-banner-frame,.nn .goog-te-banner-frame.skiptranslate{display:none!important;}
body{top:0!important;}
.nn .btn{border-radius:999px;font-weight:600;font-size:15px;padding:11px 22px;transition:transform .15s,background .2s;display:inline-flex;gap:8px;align-items:center;justify-content:center;}
.nn .btn:hover{transform:translateY(-1px);}
.nn .btn-gold{background:${C.gold};color:${C.green900};box-shadow:0 6px 18px rgba(201,162,39,.3);}
.nn .btn-gold:hover{background:#d6b13a;}
.nn .btn-ghost{background:transparent;color:${C.green900};border:1px solid ${C.line};}
.nn .btn-green{background:${C.green700};color:#fff;}
.nn .btn-green:hover{background:${C.green600};}
.nn .btn-lg{padding:14px 28px;font-size:16px;}
.nn .hamburger{display:none;}

.nn .hero{position:relative;overflow:hidden;padding:70px 0 30px;}
.nn .hero-arch{position:absolute;top:-40px;left:50%;transform:translateX(-50%);width:720px;max-width:96%;z-index:0;}
.nn .hero-inner{position:relative;z-index:1;text-align:center;max-width:760px;margin:0 auto;}
.nn .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;color:${C.green700};background:rgba(28,122,94,.1);padding:7px 16px;border-radius:999px;font-weight:600;}
.nn h1{font-size:clamp(32px,5.4vw,56px);line-height:1.12;color:${C.green900};margin:22px 0 14px;font-weight:700;}
.nn h1 .accent{color:${C.gold};}
.nn .lead{font-size:18px;color:${C.muted};max-width:600px;margin:0 auto 8px;}

.nn .search{background:${C.card};border:1px solid ${C.line};border-radius:20px;box-shadow:0 24px 60px -28px rgba(11,61,46,.4);padding:22px;margin:34px auto 0;max-width:880px;text-align:left;}
.nn .seg{display:inline-flex;background:${C.cream};border-radius:999px;padding:4px;margin-bottom:16px;}
.nn .seg button{border-radius:999px;padding:8px 22px;font-weight:600;font-size:14px;color:${C.muted};background:transparent;}
.nn .seg button.on{background:${C.green700};color:#fff;}
.nn .fields{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:12px;align-items:end;}
.nn .field label{display:block;font-size:12.5px;color:${C.muted};margin-bottom:5px;font-weight:600;}
.nn .field select,.nn .field input{width:100%;padding:12px;border:1px solid ${C.line};border-radius:12px;background:#fff;font-size:15px;color:${C.ink};}
.nn .note{font-size:13px;color:${C.muted};margin-top:14px;display:flex;gap:8px;align-items:center;}
.nn .trust{display:flex;flex-wrap:wrap;justify-content:center;gap:26px;margin:30px auto 0;}
.nn .trust div{display:flex;align-items:center;gap:8px;font-size:14px;color:${C.green900};font-weight:500;}

.nn .stats{background:${C.green900};color:#fff;margin-top:56px;}
.nn .stats .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding:38px 22px;}
.nn .stat{text-align:center;}
.nn .stat .num{font-size:34px;font-weight:600;color:${C.goldSoft};}
.nn .stat .lbl{font-size:14px;opacity:.8;margin-top:2px;}

.nn section.block{padding:70px 0;}
.nn .head{text-align:center;max-width:620px;margin:0 auto 44px;}
.nn .kicker{font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};font-weight:700;}
.nn .head h2{font-size:clamp(26px,3.6vw,36px);color:${C.green900};margin:10px 0;}
.nn .head p{color:${C.muted};font-size:16.5px;}

.nn .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.nn .step{background:${C.card};border:1px solid ${C.line};border-radius:16px;padding:26px 22px;}
.nn .step .n{font-family:'Fraunces',serif;font-size:15px;color:${C.gold};font-weight:600;}
.nn .step .ic{width:46px;height:46px;border-radius:12px;background:rgba(28,122,94,.1);display:grid;place-items:center;margin:14px 0;}
.nn .step h3{font-size:18px;color:${C.green900};margin-bottom:6px;}
.nn .step p{font-size:14.5px;color:${C.muted};}

.nn .profiles{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.nn .pcard{background:${C.card};border:1px solid ${C.line};border-radius:18px;overflow:hidden;transition:transform .18s,box-shadow .2s;cursor:pointer;}
.nn .pcard:hover{transform:translateY(-4px);box-shadow:0 20px 40px -24px rgba(11,61,46,.45);}
.nn .pcard .avatar{height:150px;background:linear-gradient(135deg,${C.green700},${C.green900});display:grid;place-items:center;position:relative;}
.nn .pcard .priv{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.18);color:#fff;font-size:11px;padding:4px 10px;border-radius:999px;display:flex;gap:5px;align-items:center;}
.nn .pcard .body{padding:16px 18px 18px;}
.nn .pcard .pid{font-size:12px;color:${C.gold};font-weight:600;}
.nn .pcard h4{font-size:16px;color:${C.green900};margin:2px 0 10px;}
.nn .pcard .row{display:flex;gap:7px;font-size:13.5px;color:${C.muted};margin-bottom:5px;align-items:center;}
.nn .pcard .deen{margin-top:10px;display:inline-block;font-size:12px;background:rgba(201,162,39,.14);color:#8a6d12;padding:4px 10px;border-radius:999px;}
.nn .match-card{cursor:default;border-radius:20px;box-shadow:0 12px 32px -24px rgba(11,61,46,.45);}
.nn .match-card:hover{transform:translateY(-3px);}
.nn .match-head{display:grid;grid-template-columns:62px 1fr auto;gap:12px;align-items:center;padding:14px;background:#f2faf7;border-bottom:1px solid ${C.line};}
.nn .match-ring{width:60px;height:60px;border-radius:50%;display:grid;place-items:center;position:relative;background:conic-gradient(#12b886 calc(var(--score)*1%),#d8eee6 0);}
.nn .match-ring:after{content:"";position:absolute;inset:6px;border-radius:50%;background:#f2faf7;}
.nn .match-ring span{position:relative;z-index:1;font-size:20px;font-weight:700;color:#07956c;line-height:1;text-align:center;}
.nn .match-ring small{display:block;font-size:8px;font-weight:500;color:${C.muted};margin-top:3px;}
.nn .match-title b{display:block;color:${C.green900};font-size:16px;}
.nn .match-title span{font-size:12px;color:${C.muted};}
.nn .perfect{text-align:center;color:${C.muted};font-size:11px;}.nn .perfect b{display:block;color:#07956c;font-size:19px;}
.nn .match-card .avatar{height:142px;background:linear-gradient(160deg,#fff 0 36%,#f7f4fa);}
.nn .match-card .avatar .type,.nn .match-card .avatar .views{position:absolute;top:12px;background:#fff;border:1px solid ${C.line};box-shadow:0 5px 14px rgba(20,30,26,.1);border-radius:999px;padding:7px 13px;font-size:12px;display:flex;align-items:center;gap:6px;}
.nn .match-card .avatar .type{left:12px}.nn .match-card .avatar .views{right:12px}
.nn .match-card .avatar-icon{width:72px;height:72px;border-radius:50%;background:${C.green900};display:grid;place-items:center;margin-top:20px;}
.nn .match-card .bio-no{position:absolute;bottom:-16px;background:#fff;border:1px solid ${C.line};border-radius:999px;padding:8px 20px;box-shadow:0 6px 13px rgba(220,80,220,.2);font-size:13px;color:${C.ink};}
.nn .verified-badge{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#1689e5;color:#fff;font-size:12px;font-weight:800;vertical-align:middle;box-shadow:0 2px 7px rgba(22,137,229,.3);}
.nn .barakah-hero{background:linear-gradient(135deg,#eaf6ff,#f5fbf8);border:1px solid rgba(22,137,229,.18);border-radius:24px;padding:42px;display:grid;grid-template-columns:1.2fr .8fr;gap:30px;align-items:center;}
.nn .barakah-price{background:#fff;border:1px solid ${C.line};border-radius:20px;padding:28px;box-shadow:0 20px 50px -35px rgba(11,61,46,.5);text-align:center;}
.nn .barakah-list{list-style:none;margin:22px 0}.nn .barakah-list li{display:flex;gap:10px;align-items:flex-start;padding:9px 0;color:${C.ink};}
.nn .match-card .body{padding:34px 18px 18px;text-align:center;}
.nn .match-facts{display:flex;justify-content:center;gap:13px;flex-wrap:wrap;color:${C.muted};font-size:12px;margin-bottom:14px;}
.nn .match-facts span{display:inline-flex;align-items:center;gap:4px;}
.nn .match-card .full-bio{width:100%;background:#fff;border:1px solid ${C.line};box-shadow:0 5px 10px rgba(220,80,220,.18);}

.nn .values{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.nn .val{display:flex;gap:14px;padding:22px;background:${C.card};border:1px solid ${C.line};border-radius:16px;}
.nn .val .ic{flex:none;width:44px;height:44px;border-radius:12px;background:${C.green900};display:grid;place-items:center;}
.nn .val h3{font-size:17px;color:${C.green900};margin-bottom:4px;}
.nn .val p{font-size:14px;color:${C.muted};}

.nn .plans{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:stretch;}
.nn .plan{background:${C.card};border:1px solid ${C.line};border-radius:20px;padding:30px 26px;display:flex;flex-direction:column;}
.nn .plan.feat{background:${C.green900};color:#fff;border-color:${C.green900};box-shadow:0 26px 60px -28px rgba(11,61,46,.6);position:relative;}
.nn .plan .tag{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:${C.gold};}
.nn .plan .price{font-family:'Fraunces',serif;font-size:36px;margin:10px 0 2px;color:${C.green900};}
.nn .plan.feat .price{color:${C.goldSoft};}
.nn .plan .per{font-size:13px;color:${C.muted};}
.nn .plan.feat .per{color:rgba(255,255,255,.7);}
.nn .plan ul{list-style:none;margin:20px 0;flex:1;}
.nn .plan li{font-size:14.5px;padding:8px 0;display:flex;gap:9px;align-items:flex-start;border-bottom:1px solid ${C.line};}
.nn .plan.feat li{border-color:rgba(255,255,255,.12);}
.nn .ribbon{position:absolute;top:18px;right:18px;background:${C.gold};color:${C.green900};font-size:11px;font-weight:700;padding:5px 12px;border-radius:999px;}

.nn .stories{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.nn .story{background:${C.card};border:1px solid ${C.line};border-radius:16px;padding:26px;}
.nn .story p{font-size:15px;color:${C.ink};font-style:italic;}
.nn .story .who{margin-top:16px;display:flex;align-items:center;gap:12px;}
.nn .story .ava{width:42px;height:42px;border-radius:999px;background:${C.green700};display:grid;place-items:center;color:#fff;font-weight:600;}
.nn .story .who b{color:${C.green900};font-size:14.5px;display:block;}
.nn .story .who span{color:${C.muted};font-size:12.5px;}

.nn .faq{max-width:760px;margin:0 auto;}
.nn .qa{border:1px solid ${C.line};border-radius:14px;margin-bottom:12px;background:${C.card};overflow:hidden;}
.nn .qa button{width:100%;text-align:left;padding:18px 20px;font-size:16px;font-weight:600;color:${C.green900};background:transparent;display:flex;justify-content:space-between;gap:14px;align-items:center;}
.nn .qa .ans{padding:0 20px 18px;font-size:14.5px;color:${C.muted};}

.nn .ctaband{background:linear-gradient(135deg,${C.green900},${C.green700});color:#fff;border-radius:26px;padding:50px 30px;text-align:center;}
.nn .ctaband h2{font-size:clamp(26px,3.6vw,38px);margin-bottom:10px;}
.nn .ctaband p{opacity:.85;max-width:520px;margin:0 auto 24px;font-size:16px;}

.nn footer{background:${C.green900};color:rgba(255,255,255,.75);margin-top:70px;padding:50px 0 26px;}
.nn .fgrid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:30px;}
.nn footer h5{color:#fff;font-size:14px;margin-bottom:14px;}
.nn footer a{display:block;font-size:14px;padding:5px 0;opacity:.8;}
.nn footer a:hover{opacity:1;color:${C.goldSoft};}
.nn .fbottom{border-top:1px solid rgba(255,255,255,.12);margin-top:34px;padding-top:20px;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;}

/* page header (sub-pages) */
.nn .pagehead{background:${C.green900};color:#fff;padding:46px 0 40px;position:relative;overflow:hidden;}
.nn .pagehead h1{color:#fff;font-size:clamp(28px,4vw,42px);margin:8px 0 6px;}
.nn .pagehead p{color:rgba(255,255,255,.8);font-size:16px;}
.nn .crumb{font-size:13px;color:${C.goldSoft};display:flex;gap:8px;align-items:center;}
.nn .crumb a:hover{text-decoration:underline;}

/* browse */
.nn .browse-grid{display:grid;grid-template-columns:280px 1fr;gap:26px;align-items:start;}
.nn .filters{background:${C.card};border:1px solid ${C.line};border-radius:18px;padding:22px;position:sticky;top:90px;}
.nn .filters h3{font-size:16px;color:${C.green900};margin-bottom:14px;}
.nn .filters .field{margin-bottom:14px;}
.nn .result-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px;}
.nn .result-meta b{color:${C.green900};}
.nn .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.nn .empty{background:${C.card};border:1px dashed ${C.line};border-radius:16px;padding:50px;text-align:center;color:${C.muted};}

/* profile detail */
.nn .pd{display:grid;grid-template-columns:300px 1fr;gap:28px;align-items:start;margin-top:-60px;position:relative;z-index:2;}
.nn .pd-card{background:${C.card};border:1px solid ${C.line};border-radius:20px;overflow:hidden;box-shadow:0 20px 50px -30px rgba(11,61,46,.5);position:sticky;top:90px;}
.nn .pd-card .ava{height:200px;background:linear-gradient(135deg,${C.green700},${C.green900});display:grid;place-items:center;}
.nn .pd-card .meta{padding:20px;}
.nn .pd-card .pid{color:${C.gold};font-weight:600;font-size:13px;}
.nn .pd-card h2{color:${C.green900};font-size:22px;margin:4px 0 12px;}
.nn .pd-card .mini{font-size:14px;color:${C.muted};display:flex;gap:8px;align-items:center;margin-bottom:7px;}
.nn .bio{display:flex;flex-direction:column;gap:18px;}
.nn .bio-sec{background:${C.card};border:1px solid ${C.line};border-radius:18px;padding:24px 26px;}
.nn .bio-sec h3{font-size:17px;color:${C.green900};margin-bottom:14px;display:flex;gap:9px;align-items:center;}
.nn .biorows{display:grid;grid-template-columns:1fr 1fr;gap:12px 26px;}
.nn .biorow{display:flex;justify-content:space-between;gap:12px;font-size:14.5px;border-bottom:1px dashed ${C.line};padding-bottom:8px;}
.nn .biorow .k{color:${C.muted};}
.nn .biorow .v{color:${C.ink};font-weight:600;text-align:right;}
.nn .guard{background:rgba(201,162,39,.1);border:1px solid rgba(201,162,39,.3);border-radius:14px;padding:16px 18px;font-size:14px;color:#7a5f10;display:flex;gap:10px;}

/* simple content pages */
.nn .content-page{max-width:900px;margin:0 auto;}
.nn .content-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
.nn .info-card{background:${C.card};border:1px solid ${C.line};border-radius:18px;padding:24px 26px;}
.nn .info-card h3{font-size:18px;color:${C.green900};margin-bottom:10px;display:flex;gap:9px;align-items:center;}
.nn .info-card p,.nn .info-card li{font-size:15px;color:${C.muted};}
.nn .info-card ul{list-style:none;display:grid;gap:10px;}
.nn .info-card li{display:flex;gap:9px;align-items:flex-start;}
.nn .info-card li:before{content:"";width:7px;height:7px;border-radius:999px;background:${C.gold};margin-top:9px;flex:none;}
.nn .contact-panel{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start;}
.nn .dashboard-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;}
.nn .dash-card{background:${C.card};border:1px solid ${C.line};border-radius:18px;padding:22px;}
.nn .dash-card strong{display:block;color:${C.green900};font-size:24px;margin-bottom:2px;}
.nn .dash-card span{color:${C.muted};font-size:14px;}
.nn .actionbar{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px;}
.nn .status-list{display:grid;gap:12px;}
.nn .status-item{display:flex;gap:12px;align-items:flex-start;border-bottom:1px solid ${C.line};padding:10px 0 12px;}
.nn .status-item:last-child{border-bottom:none;padding-bottom:0;}
.nn .status-item .dot{width:12px;height:12px;border-radius:999px;background:${C.gold};margin-top:7px;flex:none;}

/* forms */
.nn .formwrap{max-width:760px;margin:0 auto;}
.nn .formcard{background:${C.card};border:1px solid ${C.line};border-radius:20px;padding:30px;margin-bottom:20px;}
.nn .formcard h3{font-size:18px;color:${C.green900};margin-bottom:18px;display:flex;gap:9px;align-items:center;}
.nn .frow{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
.nn .fgroup label{display:block;font-size:13px;color:${C.muted};font-weight:600;margin-bottom:6px;}
.nn .fgroup input,.nn .fgroup select,.nn .fgroup textarea{width:100%;padding:12px 13px;border:1px solid ${C.line};border-radius:12px;background:#fff;font-size:15px;color:${C.ink};}
.nn .fgroup textarea{resize:vertical;min-height:90px;}
.nn .full{grid-column:1/-1;}
.nn .authcard{max-width:440px;margin:0 auto;background:${C.card};border:1px solid ${C.line};border-radius:20px;padding:34px;}
.nn .authcard h2{color:${C.green900};font-size:24px;margin-bottom:6px;}
.nn .authcard p.sub{color:${C.muted};font-size:14.5px;margin-bottom:22px;}
.nn .authcard .fgroup{margin-bottom:16px;}
.nn .success{max-width:560px;margin:0 auto;background:${C.card};border:1px solid ${C.line};border-radius:20px;padding:46px 34px;text-align:center;}
.nn .success .badge{width:74px;height:74px;border-radius:999px;background:rgba(28,122,94,.12);display:grid;place-items:center;margin:0 auto 18px;}
.nn .success h2{color:${C.green900};font-size:26px;margin-bottom:8px;}
.nn .success p{color:${C.muted};margin-bottom:8px;}
.nn .success .pid{display:inline-block;background:${C.cream};border:1px solid ${C.line};border-radius:10px;padding:8px 16px;font-weight:700;color:${C.green900};margin:8px 0 22px;}

.nn .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${C.green900};color:#fff;padding:13px 22px;border-radius:12px;font-size:14.5px;box-shadow:0 10px 30px rgba(0,0,0,.3);z-index:60;}
.nn .mobile-menu{display:none;flex-direction:column;padding:10px 22px 18px;border-top:1px solid ${C.line};}
.nn .mobile-menu a{padding:11px 0;color:${C.green900};font-weight:500;border-bottom:1px solid ${C.line};}

@media(max-width:900px){
  .nn .navlinks,.nn .nav-cta .btn-ghost{display:none;}
  .nn .nav-cta>.btn-gold{display:none;}
  .nn .nav-cta .hamburger{display:inline-flex;}
  .nn .fields{grid-template-columns:1fr 1fr;}
  .nn .steps,.nn .profiles,.nn .values,.nn .plans,.nn .stories,.nn .grid3,.nn .dashboard-grid{grid-template-columns:1fr 1fr;}
  .nn .stats .wrap{grid-template-columns:1fr 1fr;gap:28px;}
  .nn .fgrid{grid-template-columns:1fr 1fr;}
  .nn .browse-grid{grid-template-columns:1fr;}
  .nn .filters{position:static;}
  .nn .pd{grid-template-columns:1fr;margin-top:-40px;}
  .nn .pd-card{position:static;}
  .nn .mobile-menu.open{display:flex;}
  .nn .barakah-hero{grid-template-columns:1fr;}
}
@media(max-width:560px){
  .nn .fields,.nn .steps,.nn .profiles,.nn .values,.nn .plans,.nn .stories,.nn .grid3,.nn .fgrid,.nn .frow,.nn .biorows,.nn .content-grid,.nn .contact-panel,.nn .dashboard-grid{grid-template-columns:1fr;}
  .nn .announce{font-size:11.5px;padding:6px 10px;line-height:1.45;}
  .nn .nav{height:62px;padding-left:14px;padding-right:14px;}
  .nn .brand{gap:7px;min-width:0;}
  .nn .brand .mark{width:32px;height:32px;}
  .nn .brand .bn{font-size:18px;}
  .nn .brand .en{font-size:8.5px;letter-spacing:2px;}
  .nn .nav-cta{gap:7px;}
  .nn .nav-cta>.btn-gold{display:none;}
  .nn .hamburger{padding:8px 10px!important;}
  .nn .hero{padding:38px 0 22px;}
  .nn .hero-inner{padding-left:16px;padding-right:16px;}
  .nn .hero-arch{top:-12px;width:560px;max-width:none;opacity:.7;}
  .nn h1{font-size:34px;margin:16px 0 12px;}
  .nn .lead{font-size:15.5px;line-height:1.65;}
  .nn .search{padding:16px;margin-top:24px;border-radius:16px;}
  .nn .seg{display:grid;grid-template-columns:1fr 1fr;width:100%;}
  .nn .seg button{padding:8px 10px;}
  .nn .trust{gap:12px 18px;margin-top:22px;}
}
@media(prefers-reduced-motion:reduce){.nn *{transition:none!important;}}
`;

/* ---------- icons ---------- */
const Ic = ({ d, s = 22, c = C.green700, fill = "none", sw = 1.7 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const I = {
  shield: <><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  heart: <path d="M12 20s-7-4.5-9.5-9C1 8 3 4.5 6.5 4.5c2 0 3.2 1.2 5.5 3.5 2.3-2.3 3.5-3.5 5.5-3.5C21 4.5 23 8 21.5 11 19 15.5 12 20 12 20z" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 5.2A3.2 3.2 0 0 1 18 11" /><path d="M17 14.6c2.4.5 4 2.4 4 5.4" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
  doc: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h6" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  ring: <><circle cx="12" cy="14" r="5.5" /><path d="M9 7l1.5-3h3L15 7" /></>,
  check: <path d="M5 13l4 4L19 7" />,
  star: <path d="M12 3l2.6 5.6 6.4.8-4.7 4.3 1.2 6.3L12 17.8 6.5 20l1.2-6.3L3 9.4l6.4-.8L12 3z" />,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" />,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  back: <path d="M15 5l-7 7 7 7" />,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M19 3v18" /></>,
  briefcase: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 10v9h12v-9" /></>,
};

const Logo = (
  <svg className="mark" viewBox="0 0 48 48" fill="none">
    <path d="M24 4C13 4 7 13 7 24c0 11 8 20 17 20s17-9 17-20C41 13 35 4 24 4z" stroke={C.gold} strokeWidth="2" />
    <path d="M24 12c-6 0-9 6-9 12 0 7 5 12 9 12s9-5 9-12c0-6-3-12-9-12z" fill={C.green700} />
    <path d="M30 16a8 8 0 1 0 0 16 9.5 9.5 0 0 1 0-16z" fill={C.goldSoft} />
  </svg>
);

/* ---------- demo data ---------- */
const PROFILES = [
  { id: "NN-2041", who: "পাত্রী", age: 24, height: "৫'৩\"", dist: "ঢাকা", area: "মিরপুর", job: "শিক্ষার্থী (অনার্স)", edu: "অনার্স, ইংরেজি", marital: "অবিবাহিত", deen: "নিয়মিত নামাজ, পর্দানশীন", religious: "পাঁচ ওয়াক্ত নামাজ আদায় করেন, পর্দা মেনে চলেন, দ্বীনি জ্ঞান অর্জনে আগ্রহী।", family: "মধ্যবিত্ত দ্বীনি পরিবার; বাবা ব্যবসায়ী, মা গৃহিণী।", about: "একজন দ্বীনদার, দায়িত্বশীল জীবনসঙ্গী কামনা করি যিনি পরিবারকে গুরুত্ব দেন।", complexion: "উজ্জ্বল শ্যামলা" },
  { id: "NN-3187", who: "পাত্র", age: 29, height: "৫'৮\"", dist: "চট্টগ্রাম", area: "আগ্রাবাদ", job: "সফটওয়্যার প্রকৌশলী", edu: "বিএসসি, সিএসই", marital: "অবিবাহিত", deen: "সুন্নতি দাড়ি, দ্বীনদার", religious: "সুন্নত অনুসরণ করেন, নিয়মিত নামাজি, হালাল উপার্জনে সচেতন।", family: "শিক্ষিত পরিবার; এক ভাই, এক বোন।", about: "দ্বীনদার ও পর্দানশীন জীবনসঙ্গীর সন্ধানে আছি।", complexion: "ফর্সা" },
  { id: "NN-1925", who: "পাত্রী", age: 26, height: "৫'৪\"", dist: "সিলেট", area: "জিন্দাবাজার", job: "চিকিৎসক (এমবিবিএস)", edu: "এমবিবিএস", marital: "অবিবাহিত", deen: "হাফিজা, পর্দানশীন", religious: "কুরআনে হাফিজা, পূর্ণ পর্দা মেনে চলেন।", family: "আলেম পরিবার।", about: "দ্বীন ও পেশাকে সম্মান করেন এমন সঙ্গী চাই।", complexion: "উজ্জ্বল" },
  { id: "NN-2760", who: "পাত্র", age: 31, height: "৫'১০\"", dist: "রাজশাহী", area: "শাহমখদুম", job: "মাদ্রাসা শিক্ষক", edu: "কামিল (হাদিস)", marital: "অবিবাহিত", deen: "আলেম, তাহাজ্জুদগুজার", religious: "আলেম, নিয়মিত তাহাজ্জুদ আদায় করেন।", family: "দ্বীনি পরিবার।", about: "সহজ-সরল, দ্বীনদার জীবনসঙ্গী প্রত্যাশী।", complexion: "শ্যামলা" },
  { id: "NN-3320", who: "পাত্রী", age: 23, height: "৫'২\"", dist: "খুলনা", area: "সোনাডাঙ্গা", job: "শিক্ষার্থী", edu: "এইচএসসি", marital: "অবিবাহিত", deen: "নিয়মিত নামাজি, পর্দানশীন", religious: "পর্দা মেনে চলেন, দ্বীন শিখতে আগ্রহী।", family: "ধার্মিক মধ্যবিত্ত পরিবার।", about: "দায়িত্বশীল ও দ্বীনদার সঙ্গীর সন্ধানে।", complexion: "উজ্জ্বল শ্যামলা" },
  { id: "NN-2588", who: "পাত্র", age: 27, height: "৫'৭\"", dist: "ঢাকা", area: "উত্তরা", job: "ব্যাংক কর্মকর্তা", edu: "এমবিএ", marital: "অবিবাহিত", deen: "নিয়মিত নামাজি", religious: "নিয়মিত নামাজ আদায় করেন, হালাল উপার্জনে সচেষ্ট।", family: "চাকরিজীবী পরিবার।", about: "দ্বীনদার, পরিবারপ্রিয় সঙ্গী চাই।", complexion: "ফর্সা" },
  { id: "NN-3471", who: "পাত্রী", age: 28, height: "৫'৫\"", dist: "চট্টগ্রাম", area: "চান্দগাঁও", job: "শিক্ষিকা", edu: "এমএ, বাংলা", marital: "অবিবাহিত", deen: "পর্দানশীন", religious: "পর্দা মেনে চলেন, নিয়মিত নামাজি।", family: "শিক্ষক পরিবার।", about: "দ্বীন ও আদর্শে মিল আছে এমন সঙ্গী প্রত্যাশী।", complexion: "উজ্জ্বল" },
  { id: "NN-2912", who: "পাত্র", age: 33, height: "৫'৯\"", dist: "সিলেট", area: "আম্বরখানা", job: "ব্যবসায়ী", edu: "স্নাতক", marital: "বিপত্নীক", deen: "দ্বীনদার, দানশীল", religious: "নিয়মিত নামাজি, দানে আগ্রহী।", family: "ব্যবসায়ী পরিবার।", about: "একজন দ্বীনদার সঙ্গীর সন্ধানে আছি।", complexion: "শ্যামলা" },
];

PROFILES.forEach((profile, index) => { profile.views = 1840 + index * 417; profile.verified = index === 0 || index === 2; });

const BARAKAH_PLAN = { id: "barakah", tag: "বারাকাহ্ — ব্লু ব্যাজ", meaning: "বরকত, প্রাচুর্য ও স্থায়ী কল্যাণ", price: "৳৪৯৯", per: "এককালীন · ১ বছর", feat: true, items: ["প্রোফাইলে ব্লু ভেরিফায়েড ব্যাজ", "বিশেষভাবে প্রোফাইল যাচাই", "সার্চ ফলে অগ্রাধিকার", "গুরুত্বপূর্ণ প্রোফাইল হিসেবে পরিচিতি"], cta: "বারাকাহ্ নিন" };

const PLANS = [
  { id: "free", tag: "সাদাকাহ্ — ফ্রি", meaning: "বিনিময়হীন দান ও কল্যাণ", price: "৳০", per: "চিরকাল", feat: false, items: ["বায়োডাটা তৈরি", "সীমিত প্রোফাইল ব্রাউজ", "মৌলিক ফিল্টার"], cta: "শুরু করুন" },
  { id: "premium", tag: "খিদমাহ্ — প্রিমিয়াম", meaning: "বিশেষ সেবা ও সহযোগিতা", price: "৳৯৯৯", per: "প্রতি মাস", feat: true, items: ["সব প্রোফাইল আনলক", "সরাসরি যোগাযোগ", "অগ্রাধিকার সাপোর্ট", "অ্যাডভান্সড ফিল্টার", "প্রোফাইল হাইলাইট"], cta: "খিদমাহ্ নিন" },
  { id: "vip", tag: "সাফওয়াহ্ — ভিআইপি", meaning: "নির্বাচিত ও বিশিষ্ট সদস্য", price: "৳২৪৯৯", per: "প্রতি মাস", feat: false, items: ["খিদমাহ্-এর সব সুবিধা", "ডেডিকেটেড ম্যাচমেকার", "ম্যানুয়াল প্রোফাইল বাছাই", "পরিবারের সাথে সমন্বয়"], cta: "সাফওয়াহ্ নিন" },
];

const STORIES = [
  { t: "দ্বীনদারিতাকে অগ্রাধিকার দিয়ে খুঁজছিলাম। অভিভাবকের সম্পৃক্ততায় বিষয়টি সহজ হয়েছে।", n: "আব্দুল্লাহ ও মারিয়াম", c: "ঢাকা", a: "আ" },
  { t: "গোপনীয়তা নিয়ে নিশ্চিন্ত ছিলাম। মাত্র দুই মাসে উপযুক্ত পরিবার পেয়েছি।", n: "তানভীর ও সুমাইয়া", c: "চট্টগ্রাম", a: "ত" },
  { t: "যাচাইকৃত প্রোফাইল থাকায় পরিবার দ্রুত আস্থা পেয়েছে।", n: "রাকিব ও আয়েশা", c: "সিলেট", a: "র" },
];

const bn = (item) => item?.nameBn || item?.name || "";
const ALL_DIVISIONS = getAllDivisions();
const ALL_DISTRICTS = getAllDistricts();

/* ---------- shared layout ---------- */
function LanguageSwitcher() {
  const languages = [
    ["bn", "বাংলা"], ["en", "English"], ["ar", "العربية"], ["hi", "हिन्दी"],
    ["ur", "اردو"], ["id", "Bahasa"], ["ms", "Melayu"], ["tr", "Türkçe"], ["fr", "Français"]
  ];
  const [language, setLanguage] = useState(() => localStorage.getItem("noornikah-language") || "bn");
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate && !document.querySelector("#google_translate_element select")) {
        new window.google.translate.TranslateElement({ pageLanguage: "bn", autoDisplay: false }, "google_translate_element");
      }
    };
    if (window.google?.translate) window.googleTranslateElementInit();
    else if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  const changeLanguage = (next) => {
    setLanguage(next);
    localStorage.setItem("noornikah-language", next);
    const value = next === "bn" ? "/bn/bn" : `/bn/${next}`;
    document.cookie = `googtrans=${value};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  };
  return <div className="language-switch notranslate"><span aria-hidden="true">🌐</span><select aria-label="ভাষা নির্বাচন" value={language} onChange={(e) => changeLanguage(e.target.value)}>{languages.map(([code, label]) => <option value={code} key={code}>{label}</option>)}</select><div id="google_translate_element" /></div>;
}

function Header({ page, go, fire }) {
  const [menu, setMenu] = useState(false);
  const link = (id, label) => (
    <a className={page === id ? "active" : ""} onClick={() => { go(id); setMenu(false); }}>{label}</a>
  );
  return (
    <>
      <div className="announce">১০০% হালাল পদ্ধতিতে আপনার দ্বীনদার জীবনসঙ্গী খুঁজুন — আজই বিনামূল্যে শুরু করুন</div>
      <header>
        <div className="wrap nav">
          <a className="brand" onClick={() => go("home")}>{Logo}
            <span><span className="bn serif">নূর নিকাহ</span><br /><span className="en">NoorNikah</span></span>
          </a>
          <nav className="navlinks">
            {link("home", "হোম")}
            {link("browse", "প্রোফাইল")}
            <a className={page === "assisted" ? "active" : ""} onClick={() => go("assisted")}>সহায়ক সেবা</a>
            <a className={page === "membership" ? "active" : ""} onClick={() => go("membership")}>সদস্যপদ</a>
            <a className={page === "stories" ? "active" : ""} onClick={() => go("stories")}>সফলতার গল্প</a>
          </nav>
          <div className="nav-cta">
            <LanguageSwitcher />
            <button className="btn btn-ghost" onClick={() => go("login")}>লগইন</button>
            <button className="btn btn-gold" onClick={() => go("register")}>বায়োডাটা তৈরি করুন</button>
            <button className="btn btn-ghost hamburger" style={{ padding: "10px 12px" }} aria-label="মেনু" onClick={() => setMenu(!menu)}>
              <Ic d={<path d="M4 7h16M4 12h16M4 17h16" />} c={C.green900} />
            </button>
          </div>
        </div>
        <div className={"mobile-menu" + (menu ? " open" : "")}>
          {link("home", "হোম")}{link("browse", "প্রোফাইল")}{link("assisted", "সহায়ক সেবা")}{link("membership", "সদস্যপদ")}{link("stories", "সফলতার গল্প")}
          <a onClick={() => { go("login"); setMenu(false); }}>লগইন</a>
          <button className="btn btn-gold" style={{ marginTop: 12 }} onClick={() => { go("register"); setMenu(false); }}>বায়োডাটা তৈরি করুন</button>
        </div>
      </header>
    </>
  );
}

function Footer({ go }) {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <a className="brand" onClick={() => go("home")} style={{ marginBottom: 12 }}>{Logo}
              <span><span className="bn serif" style={{ color: "#fff" }}>নূর নিকাহ</span><br /><span className="en">NoorNikah</span></span></a>
            <p style={{ fontSize: 14, opacity: .75, maxWidth: 280 }}>হালাল পথে দ্বীনদার জীবনসঙ্গী খুঁজে পাওয়ার নিরাপদ ও বিশ্বস্ত প্ল্যাটফর্ম।</p>
          </div>
          <div><h5>প্ল্যাটফর্ম</h5>
            <a onClick={() => go("home")}>হোম</a><a onClick={() => go("browse")}>প্রোফাইল</a>
            <a onClick={() => go("register")}>বায়োডাটা তৈরি</a><a onClick={() => go("assisted")}>সহায়ক সেবা</a><a onClick={() => go("membership")}>সদস্যপদ</a><a onClick={() => go("stories")}>সফলতার গল্প</a><a onClick={() => go("login")}>লগইন</a></div>
          <div><h5>সহায়তা</h5><a onClick={() => go("contact")}>যোগাযোগ</a><a onClick={() => go("safety")}>নিরাপত্তা টিপস</a><a onClick={() => go("faq")}>প্রশ্ন ও উত্তর</a></div>
          <div><h5>আইনি</h5><a onClick={() => go("privacy")}>গোপনীয়তা নীতি</a><a onClick={() => go("terms")}>ব্যবহারের শর্ত</a></div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} নূর নিকাহ (ডেমো)। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>বাংলাদেশ · halal · privacy-first</span>
        </div>
      </div>
    </footer>
  );
}

const PCard = ({ p, go, match }) => match ? (
  <div className="pcard match-card">
    <div className="match-head">
      <div className="match-ring" style={{ "--score": match.score }}><span>{match.score}<small>ম্যাচ</small></span></div>
      <div className="match-title"><b>✧ {match.label}</b><span>{match.criteria}টি মানদণ্ডের ভিত্তিতে</span></div>
      <div className="perfect"><b>{match.perfect}</b>পারফেক্ট</div>
    </div>
    <div className="avatar">
      <span className="type">{p.who}</span><span className="views"><Ic d={I.eye} s={15} c={C.ink} /> {p.views}</span>
      <span className="avatar-icon"><Ic d={p.who === "পাত্রী" ? I.moon : I.star} s={42} c="rgba(255,255,255,.55)" /></span>
      <span className="bio-no">বায়ো নং — {p.id.replace("NN-", "")} {p.verified && <span className="verified-badge" title="বারাকাহ ভেরিফায়েড">✓</span>}</span>
    </div>
    <div className="body">
      <div className="match-facts"><span>{p.age} বছর</span><span><Ic d={I.briefcase} s={14} c={C.ink} /> {p.job}</span><span><Ic d={I.heart} s={14} c={C.ink} /> {p.marital}</span><span><Ic d={I.pin} s={14} c={C.ink} /> {p.dist}</span></div>
      <button className="btn full-bio" onClick={() => go("profile", p)}>সম্পূর্ণ বায়ো দেখুন</button>
    </div>
  </div>
) : (
  <div className="pcard" onClick={() => go("profile", p)}>
    <div className="avatar">
      <Ic d={p.who === "পাত্রী" ? I.moon : I.star} s={44} c="rgba(255,255,255,.35)" />
      <span className="priv"><Ic d={I.lock} s={12} c="#fff" /> গোপন</span>
    </div>
    <div className="body">
      <div className="pid">{p.who} · #{p.id}</div>
      <h4>{p.age} বছর</h4>
      <div className="row"><Ic d={I.pin} s={15} c={C.muted} /> {p.dist}</div>
      <div className="row"><Ic d={I.users} s={15} c={C.muted} /> {p.job}</div>
      <span className="deen">{p.deen}</span>
    </div>
  </div>
);

const PlanCard = ({ p, go }) => (
  <div className={"plan" + (p.feat ? " feat" : "")}>
    {p.feat && <span className="ribbon">জনপ্রিয়</span>}
    <span className="tag">{p.tag}</span>
    {p.meaning && <div style={{ fontSize: 13, color: p.feat ? "rgba(255,255,255,.72)" : C.muted, marginTop: 7, lineHeight: 1.45 }}>{p.meaning}</div>}
    <div className="price serif">{p.price}</div>
    <div className="per">{p.per}</div>
    <ul>{p.items.map((it) => (<li key={it}><Ic d={I.check} s={17} c={p.feat ? C.goldSoft : C.green600} /> <span>{it}</span></li>))}</ul>
    <button className={"btn " + (p.feat ? "btn-gold" : "btn-green")} onClick={() => p.id === "free" ? go("register") : p.id === "barakah" ? go("barakah") : go("checkout", { plan: p })}>{p.cta}</button>
  </div>
);

const StoryCard = ({ s }) => (
  <div className="story">
    <Ic d={I.star} s={18} c={C.gold} fill={C.gold} />
    <p>“{s.t}”</p>
    <div className="who"><span className="ava">{s.a}</span><span><b>{s.n}</b><span>{s.c}</span></span></div>
  </div>
);

/* ---------- HOME ---------- */
function Home({ go, fire }) {
  const [side, setSide] = useState("পাত্রী");
  const [searchAge, setSearchAge] = useState("সব");
  const [searchDist, setSearchDist] = useState("সব");
  const [searchDivisionId, setSearchDivisionId] = useState("");
  const [searchDistrictId, setSearchDistrictId] = useState("");
  const [searchUpazilaId, setSearchUpazilaId] = useState("");
  const [searchThanaId, setSearchThanaId] = useState("");
  const [searchUnionId, setSearchUnionId] = useState("");
  const [searchVillage, setSearchVillage] = useState("");
  const [searchDeen, setSearchDeen] = useState("সব");
  const [faq, setFaq] = useState(0);
  const homeDistricts = searchDivisionId ? getDistrictsByDivision(searchDivisionId) : ALL_DISTRICTS;
  const homeUpazilas = searchDistrictId ? getUpazilasByDistrict(searchDistrictId) : [];
  const homeThanas = searchDistrictId ? getThanasByDistrict(searchDistrictId) : [];
  const homeUnions = searchUpazilaId ? getUnionsByUpazila(searchUpazilaId) : [];
  const selectedHomeUpazila = homeUpazilas.find((u) => u.id === searchUpazilaId);
  const selectedHomeThana = homeThanas.find((t) => t.id === searchThanaId);
  const selectedHomeUnion = homeUnions.find((u) => u.id === searchUnionId);
  const faqs = [
    { q: "নূর নিকাহ কীভাবে কাজ করে?", a: "বিনামূল্যে বায়োডাটা তৈরি করুন, পছন্দ অনুযায়ী প্রোফাইল খুঁজুন, এবং অভিভাবকের সম্মতিতে শরীয়াহসম্মত উপায়ে যোগাযোগ করুন।" },
    { q: "আমার তথ্য কি গোপন থাকবে?", a: "হ্যাঁ। ছবি ও যোগাযোগের তথ্য ডিফল্টভাবে গোপন; শুধু আপনার অনুমতিতে শেয়ার হয়।" },
    { q: "প্রোফাইল কি যাচাই করা হয়?", a: "প্রতিটি প্রোফাইল NID ও মোবাইল নম্বরে যাচাই করা হয়।" },
    { q: "অভিভাবক কীভাবে যুক্ত থাকবেন?", a: "আপনি একজন ওয়ালি যুক্ত করতে পারেন, যিনি যোগাযোগের প্রতিটি ধাপে থাকবেন।" },
  ];
  return (
    <>
      <section className="hero">
        <svg className="hero-arch" viewBox="0 0 720 360" fill="none" aria-hidden="true">
          <path d="M60 360V190C60 25 200 -20 360 -20S660 25 660 190V360" stroke={C.line} strokeWidth="2" />
          <path d="M120 360V200C120 80 230 45 360 45s240 35 240 155V360" stroke="rgba(201,162,39,.35)" strokeWidth="1.5" />
          <circle cx="360" cy="40" r="6" fill={C.gold} />
        </svg>
        <div className="wrap hero-inner">
          <span className="eyebrow"><Ic d={I.moon} s={15} /> দ্বীন ও আদর্শের ভিত্তিতে জীবনসঙ্গী</span>
          <h1 className="serif">যেখানে শুরু হয় <span className="accent">পবিত্র</span> বন্ধন</h1>
          <p className="lead">নিরাপদ, গোপনীয় ও শরীয়াহসম্মত পদ্ধতিতে উপযুক্ত জীবনসঙ্গী খুঁজে নিন — অভিভাবকের সম্পৃক্ততায়।</p>
          <div className="search">
            <div className="seg">{["পাত্রী", "পাত্র"].map((s) => (
              <button key={s} className={side === s ? "on" : ""} onClick={() => setSide(s)}>{s} খুঁজছি</button>))}</div>
            <div className="fields">
              <div className="field"><label>বয়স</label><select value={searchAge} onChange={(e) => setSearchAge(e.target.value)}><option>সব</option><option>১৮-২৪</option><option>২৫-৩০</option><option>৩১+</option></select></div>
              <div className="field"><label>বিভাগ</label><select value={searchDivisionId} onChange={(e) => { setSearchDivisionId(e.target.value); setSearchDistrictId(""); setSearchUpazilaId(""); setSearchThanaId(""); setSearchUnionId(""); setSearchDist("সব"); }}><option value="">সব বিভাগ</option>{ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
              <div className="field"><label>জেলা</label><select value={searchDistrictId} onChange={(e) => { const next = e.target.value; setSearchDistrictId(next); setSearchUpazilaId(""); setSearchThanaId(""); setSearchUnionId(""); setSearchDist(bn(homeDistricts.find((d) => d.id === next)) || "সব"); }}><option value="">সব জেলা</option>{homeDistricts.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
              <div className="field"><label>উপজেলা</label><select value={searchUpazilaId} onChange={(e) => { setSearchUpazilaId(e.target.value); setSearchUnionId(""); }} disabled={!searchDistrictId}><option value="">সব উপজেলা</option>{homeUpazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
              <div className="field"><label>থানা</label><select value={searchThanaId} onChange={(e) => setSearchThanaId(e.target.value)} disabled={!searchDistrictId}><option value="">সব থানা</option>{homeThanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
              <div className="field"><label>ইউনিয়ন</label><select value={searchUnionId} onChange={(e) => setSearchUnionId(e.target.value)} disabled={!searchUpazilaId}><option value="">সব ইউনিয়ন</option>{homeUnions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
              <div className="field"><label>গ্রাম</label><input value={searchVillage} onChange={(e) => setSearchVillage(e.target.value)} placeholder="গ্রামের নাম" /></div>
              <div className="field"><label>দ্বীনদারিতা</label><select value={searchDeen} onChange={(e) => setSearchDeen(e.target.value)}><option>সব</option><option>নিয়মিত নামাজি</option><option>পর্দানশীন</option><option>হাফিজ/হাফিজা</option><option>আলেম</option></select></div>
              <button className="btn btn-gold" onClick={() => go("browse", { who: side, age: searchAge, dist: searchDist, divisionId: searchDivisionId, districtId: searchDistrictId, upazilaId: searchUpazilaId, thanaId: searchThanaId, unionId: searchUnionId, upazila: bn(selectedHomeUpazila), thana: bn(selectedHomeThana), union: bn(selectedHomeUnion), village: searchVillage, deen: searchDeen })}><Ic d={I.search} s={17} c={C.green900} /> খুঁজুন</button>
            </div>
            <div className="note"><Ic d={I.lock} s={15} c={C.muted} /> আপনার ছবি ও যোগাযোগের তথ্য সর্বদা গোপন থাকে।</div>
          </div>
          <div className="trust">
            <div><Ic d={I.shield} s={18} c={C.gold} /> যাচাইকৃত প্রোফাইল</div>
            <div><Ic d={I.lock} s={18} c={C.gold} /> সম্পূর্ণ গোপনীয়তা</div>
            <div><Ic d={I.users} s={18} c={C.gold} /> অভিভাবকের সম্পৃক্ততা</div>
          </div>
        </div>
      </section>

      <div className="stats"><div className="wrap">
        {[["৫০,০০০+", "নিবন্ধিত সদস্য"], ["১,২০০+", "সম্পন্ন বিবাহ"], ["৬৪", "জেলায় সদস্য"], ["১০০%", "যাচাইকৃত প্রোফাইল"]].map(([n, l]) => (
          <div className="stat" key={l}><div className="num serif">{n}</div><div className="lbl">{l}</div></div>))}
      </div></div>

      <section className="block" id="how"><div className="wrap">
        <div className="head"><div className="kicker">প্রক্রিয়া</div><h2 className="serif">মাত্র চারটি ধাপে</h2><p>সহজ, স্বচ্ছ ও শরীয়াহসম্মত একটি যাত্রা।</p></div>
        <div className="steps">{[
          { ic: I.doc, t: "বায়োডাটা তৈরি", d: "বিনামূল্যে অ্যাকাউন্ট খুলে বিস্তারিত বায়োডাটা যুক্ত করুন।" },
          { ic: I.search, t: "প্রোফাইল খুঁজুন", d: "বয়স, জেলা ও দ্বীনদারিতা অনুযায়ী প্রোফাইল দেখুন।" },
          { ic: I.chat, t: "নিরাপদে যোগাযোগ", d: "অভিভাবকের সম্মতিতে পর্দা রক্ষা করে যোগাযোগ করুন।" },
          { ic: I.ring, t: "শুভ পরিণয়", d: "পারিবারিক সম্মতিতে সম্পন্ন করুন পবিত্র নিকাহ।" },
        ].map((s, i) => (<div className="step" key={i}><div className="n serif">০{i + 1}</div><div className="ic"><Ic d={s.ic} /></div><h3>{s.t}</h3><p>{s.d}</p></div>))}</div>
      </div></section>

      <section className="block" style={{ background: "#EFEADD" }}><div className="wrap">
        <div className="head"><div className="kicker">সাম্প্রতিক</div><h2 className="serif">নতুন প্রোফাইল সমূহ</h2><p>গোপনীয়তা রক্ষার্থে ছবি গোপন; বিস্তারিত দেখতে কার্ডে ক্লিক করুন।</p></div>
        <div className="profiles">{PROFILES.slice(0, 4).map((p) => <PCard key={p.id} p={p} go={go} />)}</div>
        <div style={{ textAlign: "center", marginTop: 34 }}><button className="btn btn-green" onClick={() => go("browse")}>সব প্রোফাইল দেখুন</button></div>
      </div></section>

      <section className="block"><div className="wrap">
        <div className="head"><div className="kicker">কেন নূর নিকাহ</div><h2 className="serif">আস্থা, গোপনীয়তা ও দ্বীন</h2></div>
        <div className="values">{[
          { ic: I.shield, t: "যাচাইকৃত সদস্য", d: "প্রতিটি প্রোফাইল NID ও মোবাইলে যাচাই করা হয়।" },
          { ic: I.lock, t: "তথ্যের গোপনীয়তা", d: "ছবি ও যোগাযোগ আপনার অনুমতি ছাড়া কেউ দেখে না।" },
          { ic: I.users, t: "অভিভাবকের সম্পৃক্ততা", d: "ওয়ালি যুক্ত করে রাখুন পরিবারকে।" },
          { ic: I.moon, t: "দ্বীনি মানদণ্ড", d: "নামাজ, পর্দা ও আদর্শের ভিত্তিতে খুঁজুন।" },
          { ic: I.chat, t: "শরীয়াহসম্মত যোগাযোগ", d: "পর্দা রক্ষা করে মার্জিত যোগাযোগ।" },
          { ic: I.heart, t: "নিবেদিত সহায়তা", d: "প্রতিটি ধাপে আমাদের টিম পাশে থাকে।" },
        ].map((v, i) => (<div className="val" key={i}><div className="ic"><Ic d={v.ic} c={C.goldSoft} /></div><div><h3>{v.t}</h3><p>{v.d}</p></div></div>))}</div>
      </div></section>

      <section className="block"><div className="wrap">
        <div className="ctaband">
          <div style={{ display: "inline-flex", marginBottom: 14 }}><Ic d={I.users} s={40} c={C.goldSoft} /></div>
          <span className="tag" style={{ color: C.goldSoft, letterSpacing: 1.5, textTransform: "uppercase", fontSize: 11, fontWeight: 700 }}>সহায়ক ম্যাচমেকিং সেবা</span>
          <h2 className="serif">নিজে খুঁজতে সময় নেই? আমাদের উপদেষ্টা খুঁজে দেবেন</h2>
          <p>একজন অভিজ্ঞ ম্যাচমেকিং উপদেষ্টা আপনাকে বুঝে, হাজারো প্রোফাইল থেকে উপযুক্ত ম্যাচ বাছাই করে, আপনার হয়ে যোগাযোগ ও সাক্ষাৎ পর্যন্ত সব সামলান — ব্যক্তিগত ছোঁয়ায়।</p>
          <button className="btn btn-gold btn-lg" onClick={() => go("assisted")}>সহায়ক সেবা সম্পর্কে জানুন</button>
        </div>
      </div></section>

      <section className="block" id="plans" style={{ background: "#EFEADD" }}><div className="wrap">
        <div className="head"><div className="kicker">সদস্যপদ</div><h2 className="serif">আপনার জন্য উপযুক্ত প্যাকেজ</h2><p>বিনামূল্যে শুরু করুন, প্রয়োজনে আপগ্রেড করুন। (মূল্য ডেমো)</p></div>
        <div className="plans">{[...PLANS, BARAKAH_PLAN].map((p) => (<PlanCard key={p.id} p={p} go={go} />))}</div>
      </div></section>

      <section className="block" id="stories"><div className="wrap">
        <div className="head"><div className="kicker">আলহামদুলিল্লাহ</div><h2 className="serif">সফলতার গল্প</h2><p>(নিচের গল্পগুলো ডেমো)</p></div>
        <div className="stories">{STORIES.map((s) => <StoryCard key={s.n} s={s} />)}</div>
      </div></section>

      <section className="block" id="faq" style={{ background: "#EFEADD" }}><div className="wrap">
        <div className="head"><div className="kicker">সাধারণ জিজ্ঞাসা</div><h2 className="serif">প্রশ্ন ও উত্তর</h2></div>
        <div className="faq">{faqs.map((f, i) => (<div className="qa" key={i}><button onClick={() => setFaq(faq === i ? -1 : i)}>{f.q}<Ic d={faq === i ? <path d="M5 13l4 4L19 7" /> : <path d="M12 5v14M5 12h14" />} s={18} c={C.gold} /></button>{faq === i && <div className="ans">{f.a}</div>}</div>))}</div>
      </div></section>

      <section className="block" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="ctaband">
          <div style={{ display: "inline-flex", marginBottom: 14 }}><Ic d={I.moon} s={40} c={C.goldSoft} /></div>
          <h2 className="serif">আপনার পবিত্র যাত্রা শুরু হোক আজই</h2>
          <p>বিনামূল্যে বায়োডাটা তৈরি করুন এবং দ্বীনদার জীবনসঙ্গীর সন্ধানে প্রথম ধাপ নিন।</p>
          <button className="btn btn-gold btn-lg" onClick={() => go("register")}>বিনামূল্যে শুরু করুন</button>
        </div>
      </div></section>
    </>
  );
}

/* ---------- BROWSE ---------- */
function Browse({ go, prefs }) {
  const [who, setWho] = useState(prefs?.who || "সব");
  const [divisionId, setDivisionId] = useState(prefs?.divisionId || "");
  const [districtId, setDistrictId] = useState(prefs?.districtId || "");
  const [upazilaId, setUpazilaId] = useState(prefs?.upazilaId || "");
  const [thanaId, setThanaId] = useState(prefs?.thanaId || "");
  const [unionId, setUnionId] = useState(prefs?.unionId || "");
  const [dist, setDist] = useState(prefs?.dist || "সব");
  const [age, setAge] = useState(prefs?.age || "সব");
  const [deen, setDeen] = useState(prefs?.deen || "সব");
  const [village, setVillage] = useState(prefs?.village || "");
  const browseDistricts = divisionId ? getDistrictsByDivision(divisionId) : ALL_DISTRICTS;
  const browseUpazilas = districtId ? getUpazilasByDistrict(districtId) : [];
  const browseThanas = districtId ? getThanasByDistrict(districtId) : [];
  const browseUnions = upazilaId ? getUnionsByUpazila(upazilaId) : [];
  const selectedBrowseUpazila = browseUpazilas.find((u) => u.id === upazilaId);
  const selectedBrowseThana = browseThanas.find((t) => t.id === thanaId);
  const selectedBrowseUnion = browseUnions.find((u) => u.id === unionId);
  const matchesDeen = (p) => deen === "সব" || deen.split("/").some((term) => p.deen.includes(term) || p.religious.includes(term));
  const matchesArea = (p) => {
    const upazilaName = bn(selectedBrowseUpazila);
    const thanaName = bn(selectedBrowseThana);
    const unionName = bn(selectedBrowseUnion);
    const areaText = `${p.area || ""} ${p.village || ""}`;
    return (!upazilaName || areaText.includes(upazilaName)) &&
      (!thanaName || areaText.includes(thanaName)) &&
      (!unionName || areaText.includes(unionName)) &&
      (!village || areaText.includes(village));
  };
  const list = PROFILES.filter((p) =>
    (who === "সব" || p.who === who) &&
    (dist === "সব" || p.dist === dist) &&
    matchesArea(p) &&
    matchesDeen(p) &&
    (age === "সব" ||
      (age === "১৮-২৪" && p.age <= 24) ||
      (age === "২৫-৩০" && p.age >= 25 && p.age <= 30) ||
      (age === "৩১+" && p.age >= 31)));
  const matchFor = (p) => {
    const chosen = [who !== "সব", dist !== "সব", age !== "সব", deen !== "সব", Boolean(upazilaId || thanaId || unionId || village)].filter(Boolean).length;
    const seed = Number(p.id.replace(/\D/g, "")) % 9;
    const score = Math.min(98, 84 + chosen * 2 + seed);
    const perfect = Math.min(7, 3 + chosen + (seed > 4 ? 1 : 0));
    return { score, perfect, criteria: 7, label: score >= 93 ? "চমৎকার ম্যাচ" : score >= 88 ? "খুব ভালো ম্যাচ" : "ভালো ম্যাচ" };
  };
  return (
    <>
      <div className="pagehead"><div className="wrap">
        <div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <span>প্রোফাইল</span></div>
        <h1 className="serif">প্রোফাইল ব্রাউজ করুন</h1>
        <p>আপনার পছন্দ অনুযায়ী যাচাইকৃত প্রোফাইল খুঁজে নিন।</p>
      </div></div>
      <section className="block" style={{ paddingTop: 36 }}><div className="wrap">
        <div className="browse-grid">
          <aside className="filters">
            <h3>ফিল্টার</h3>
            <div className="field"><label>খুঁজছি</label><select value={who} onChange={(e) => setWho(e.target.value)}><option>সব</option><option>পাত্রী</option><option>পাত্র</option></select></div>
            <div className="field"><label>বিভাগ</label><select value={divisionId} onChange={(e) => { setDivisionId(e.target.value); setDistrictId(""); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist("সব"); }}><option value="">সব বিভাগ</option>{ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="field"><label>জেলা</label><select value={districtId} onChange={(e) => { const next = e.target.value; setDistrictId(next); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist(bn(browseDistricts.find((d) => d.id === next)) || "সব"); }}><option value="">সব জেলা</option>{browseDistricts.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="field"><label>উপজেলা</label><select value={upazilaId} onChange={(e) => { setUpazilaId(e.target.value); setUnionId(""); }} disabled={!districtId}><option value="">সব উপজেলা</option>{browseUpazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="field"><label>থানা</label><select value={thanaId} onChange={(e) => setThanaId(e.target.value)} disabled={!districtId}><option value="">সব থানা</option>{browseThanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
            <div className="field"><label>ইউনিয়ন</label><select value={unionId} onChange={(e) => setUnionId(e.target.value)} disabled={!upazilaId}><option value="">সব ইউনিয়ন</option>{browseUnions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="field"><label>গ্রাম</label><input value={village} onChange={(e) => setVillage(e.target.value)} placeholder="গ্রামের নাম" /></div>
            <div className="field"><label>বয়স</label><select value={age} onChange={(e) => setAge(e.target.value)}><option>সব</option><option>১৮-২৪</option><option>২৫-৩০</option><option>৩১+</option></select></div>
            <div className="field"><label>দ্বীনদারিতা</label><select value={deen} onChange={(e) => setDeen(e.target.value)}><option>সব</option><option>নিয়মিত নামাজি</option><option>পর্দানশীন</option><option>হাফিজ</option><option>আলেম</option></select></div>
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 6 }} onClick={() => { setWho("সব"); setDivisionId(""); setDistrictId(""); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist("সব"); setVillage(""); setAge("সব"); setDeen("সব"); }}>রিসেট</button>
          </aside>
          <div>
            <div className="result-meta"><span><b>{list.length}</b> টি প্রোফাইল পাওয়া গেছে</span><button className="btn btn-gold" onClick={() => go("register")}>বায়োডাটা তৈরি করুন</button></div>
            {list.length ? (
              <div className="grid3">{list.map((p) => <PCard key={p.id} p={p} go={go} match={matchFor(p)} />)}</div>
            ) : (
              <div className="empty"><Ic d={I.search} s={40} c={C.muted} /><p style={{ marginTop: 12 }}>এই ফিল্টারে কোনো প্রোফাইল পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।</p></div>
            )}
          </div>
        </div>
      </div></section>
    </>
  );
}

/* ---------- PROFILE DETAIL ---------- */
function ProfileDetail({ go, profile, fire }) {
  const p = profile || PROFILES[0];
  const Row = ({ k, v }) => (<div className="biorow"><span className="k">{k}</span><span className="v">{v}</span></div>);
  return (
    <>
      <div className="pagehead"><div className="wrap">
        <div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <a onClick={() => go("browse")}>প্রোফাইল</a> <span>›</span> <span>#{p.id}</span></div>
      </div></div>
      <section style={{ paddingBottom: 70 }}><div className="wrap">
        <div className="pd">
          <div className="pd-card">
            <div className="ava"><Ic d={p.who === "পাত্রী" ? I.moon : I.star} s={64} c="rgba(255,255,255,.35)" /></div>
            <div className="meta">
              <div className="pid">{p.who} · #{p.id} {p.verified && <span className="verified-badge" title="বারাকাহ ভেরিফায়েড">✓</span>}</div>
              <h2 className="serif">{p.age} বছর</h2>
              <div className="mini"><Ic d={I.pin} s={15} c={C.muted} /> {p.dist}, {p.area}</div>
              <div className="mini"><Ic d={I.briefcase} s={15} c={C.muted} /> {p.job}</div>
              <div className="mini"><Ic d={I.book} s={15} c={C.muted} /> {p.edu}</div>
              <span className="deen" style={{ display: "inline-block", marginTop: 8, fontSize: 12, background: "rgba(201,162,39,.14)", color: "#8a6d12", padding: "4px 10px", borderRadius: 999 }}>{p.deen}</span>
              {p.verified && <div className="guard" style={{ marginTop: 12, fontSize: 12 }}><span className="verified-badge">✓</span><span>বারাকাহ ভেরিফায়েড প্রোফাইল</span></div>}
              <button className="btn btn-gold" style={{ width: "100%", marginTop: 16 }} onClick={() => go("interest", { profile: p })}>আগ্রহ প্রকাশ করুন</button>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={() => go("browse")}><Ic d={I.back} s={16} c={C.green900} /> ফিরে যান</button>
            </div>
          </div>
          <div className="bio">
            <div className="bio-sec"><h3><Ic d={I.users} s={18} /> মৌলিক তথ্য</h3>
              <div className="biorows">
                <Row k="বয়স" v={`${p.age} বছর`} /><Row k="উচ্চতা" v={p.height} />
                <Row k="বৈবাহিক অবস্থা" v={p.marital} /><Row k="গায়ের রঙ" v={p.complexion} />
                <Row k="জেলা" v={p.dist} /><Row k="এলাকা" v={p.area} />
              </div>
            </div>
            <div className="bio-sec"><h3><Ic d={I.moon} s={18} /> ধর্মীয় তথ্য</h3>
              <p style={{ fontSize: 15, color: C.ink }}>{p.religious}</p>
            </div>
            <div className="bio-sec"><h3><Ic d={I.book} s={18} /> শিক্ষা ও পেশা</h3>
              <div className="biorows"><Row k="শিক্ষাগত যোগ্যতা" v={p.edu} /><Row k="পেশা" v={p.job} /></div>
            </div>
            <div className="bio-sec"><h3><Ic d={I.home} s={18} /> পারিবারিক তথ্য</h3>
              <p style={{ fontSize: 15, color: C.ink }}>{p.family}</p>
            </div>
            <div className="bio-sec"><h3><Ic d={I.heart} s={18} /> প্রত্যাশিত জীবনসঙ্গী</h3>
              <p style={{ fontSize: 15, color: C.ink }}>{p.about}</p>
            </div>
            <div className="guard"><Ic d={I.shield} s={20} c={C.gold} /> <span>যোগাযোগ ও আগ্রহ প্রকাশ অভিভাবকের (ওয়ালি) সম্পৃক্ততায় সম্পন্ন হয়। সরাসরি যোগাযোগের তথ্য গোপন রাখা হয়েছে।</span></div>
          </div>
        </div>
      </div></section>
    </>
  );
}

/* ---------- FOOTER PAGES ---------- */
function PageHead({ go, title, desc }) {
  return (
    <div className="pagehead"><div className="wrap">
      <div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <span>{title}</span></div>
      <h1 className="serif">{title}</h1>
      {desc && <p>{desc}</p>}
    </div></div>
  );
}

function ContactPage({ go, fire }) {
  const [done, setDone] = useState(false);
  const [ref] = useState(() => "SUP-" + Math.floor(10000 + Math.random() * 90000));
  const [form, setForm] = useState({ name: "", contact: "", subject: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name || !form.contact || !form.subject || !form.message) { fire("সব ঘর পূরণ করুন"); return; }
    setDone(true); window.scrollTo(0, 0);
  };
  if (done) return (
    <>
      <PageHead go={go} title="বার্তা গ্রহণ করা হয়েছে" desc="সহায়তা টিম আপনার বার্তাটি পর্যালোচনা করবে।" />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">ধন্যবাদ</h2>
        <p>আপনার বার্তা রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => go("home")}>হোমে ফিরুন</button>
          <button className="btn btn-ghost" onClick={() => setDone(false)}>আরেকটি বার্তা পাঠান</button>
        </div>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead go={go} title="যোগাযোগ" desc="প্রোফাইল, যাচাই বা সদস্যপদ সংক্রান্ত সহায়তার জন্য আমাদের সঙ্গে যোগাযোগ করুন।" />
      <section className="block"><div className="wrap"><div className="content-page contact-panel">
        <div className="info-card">
          <h3><Ic d={I.chat} s={18} /> সহায়তা ডেস্ক</h3>
          <ul>
            <li>ইমেইল: support@noornikah.example</li>
            <li>হেল্পলাইন: ০১৭০০-০০০০০০</li>
            <li>সময়: শনিবার থেকে বৃহস্পতিবার, সকাল ১০টা - সন্ধ্যা ৬টা</li>
            <li>জরুরি নিরাপত্তা অভিযোগে প্রোফাইল আইডি উল্লেখ করুন।</li>
          </ul>
        </div>
        <div className="formcard" style={{ marginBottom: 0 }}>
          <h3><Ic d={I.doc} s={18} /> বার্তা পাঠান</h3>
          <div className="frow">
            <div className="fgroup"><label>নাম</label><input value={form.name} onChange={set("name")} placeholder="আপনার নাম" /></div>
            <div className="fgroup"><label>মোবাইল / ইমেইল</label><input value={form.contact} onChange={set("contact")} placeholder="যোগাযোগের ঠিকানা" /></div>
            <div className="fgroup full"><label>বিষয়</label><input value={form.subject} onChange={set("subject")} placeholder="যেমন প্রোফাইল যাচাই" /></div>
            <div className="fgroup full"><label>বার্তা</label><textarea value={form.message} onChange={set("message")} placeholder="আপনার প্রশ্ন বা সমস্যাটি লিখুন" /></div>
          </div>
          <button className="btn btn-gold" onClick={submit}>বার্তা পাঠান</button>
        </div>
      </div></div></section>
    </>
  );
}

function SafetyPage({ go }) {
  return (
    <>
      <PageHead go={go} title="নিরাপত্তা টিপস" desc="নিরাপদ, শালীন ও অভিভাবক-সম্পৃক্ত যোগাযোগের জন্য গুরুত্বপূর্ণ নির্দেশনা।" />
      <section className="block"><div className="wrap"><div className="content-grid">
        {[
          ["পরিচয় যাচাই করুন", "প্রোফাইল আইডি, পারিবারিক পরিচয় ও শিক্ষাগত/পেশাগত তথ্য যাচাই না করে সিদ্ধান্ত নেবেন না।"],
          ["অভিভাবক যুক্ত রাখুন", "যোগাযোগের শুরু থেকেই ওয়ালি বা পরিবারের দায়িত্বশীল সদস্যকে যুক্ত রাখুন।"],
          ["ব্যক্তিগত তথ্য সীমিত রাখুন", "ঠিকানা, আর্থিক তথ্য, জাতীয় পরিচয়পত্র বা সংবেদনশীল ডকুমেন্ট অপ্রয়োজনীয়ভাবে শেয়ার করবেন না।"],
          ["সন্দেহজনক আচরণ রিপোর্ট করুন", "অর্থ দাবি, চাপ সৃষ্টি, অসংগত তথ্য বা অনৈতিক প্রস্তাব পেলে যোগাযোগ বন্ধ করে রিপোর্ট করুন।"],
        ].map(([title, text]) => (
          <div className="info-card" key={title}><h3><Ic d={I.shield} s={18} /> {title}</h3><p>{text}</p></div>
        ))}
      </div></div></section>
    </>
  );
}

function FaqPage({ go }) {
  const [open, setOpen] = useState(0);
  const items = [
    ["নূর নিকাহ কী?", "এটি একটি ডেমো হালাল ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে প্রোফাইল দেখা, বায়োডাটা তৈরি ও নিরাপদ যোগাযোগের ধারণা দেখানো হয়েছে।"],
    ["প্রোফাইল তথ্য কি প্রকাশ্য?", "ডেমো ডিজাইনে ব্যক্তিগত যোগাযোগের তথ্য গোপন রাখা হয়েছে এবং আগ্রহ প্রকাশের জন্য সদস্যপদ/যাচাই ধাপ দেখানো হয়েছে।"],
    ["বায়োডাটা জমা দিলে তথ্য সংরক্ষণ হয়?", "এই Vite ডেমোতে ব্যাকএন্ড নেই, তাই ফর্ম সাবমিট করলে বাস্তবে ডেটা সংরক্ষণ হয় না।"],
    ["সদস্যপদ কীভাবে কাজ করে?", "হোম পেজের সদস্যপদ অংশে ডেমো প্ল্যান দেখানো আছে। বাস্তব ব্যবহারে পেমেন্ট ও যাচাই ব্যাকএন্ড দরকার হবে।"],
  ];
  return (
    <>
      <PageHead go={go} title="প্রশ্ন ও উত্তর" desc="প্ল্যাটফর্ম ব্যবহার নিয়ে সাধারণ প্রশ্নের উত্তর।" />
      <section className="block"><div className="wrap"><div className="faq">
        {items.map((f, i) => (
          <div className="qa" key={f[0]}>
            <button onClick={() => setOpen(open === i ? -1 : i)}>{f[0]}<Ic d={open === i ? <path d="M5 13l4 4L19 7" /> : <path d="M12 5v14M5 12h14" />} s={18} c={C.gold} /></button>
            {open === i && <div className="ans">{f[1]}</div>}
          </div>
        ))}
      </div></div></section>
    </>
  );
}

function PrivacyPage({ go }) {
  return (
    <>
      <PageHead go={go} title="গোপনীয়তা নীতি" desc="ব্যবহারকারীর তথ্য কীভাবে নিরাপদ রাখা হবে তার ডেমো নীতিমালা।" />
      <section className="block"><div className="wrap"><div className="content-page">
        <div className="info-card">
          <h3><Ic d={I.lock} s={18} /> তথ্য সুরক্ষা</h3>
          <ul>
            <li>প্রোফাইলের ব্যক্তিগত যোগাযোগ তথ্য অনুমতি ছাড়া প্রকাশ করা হবে না।</li>
            <li>যাচাই, নিরাপত্তা ও ম্যাচিং সুবিধার জন্য প্রয়োজনীয় তথ্য ব্যবহার করা হতে পারে।</li>
            <li>অননুমোদিত অ্যাক্সেস প্রতিরোধে অ্যাকাউন্ট নিরাপত্তা, লগইন যাচাই ও রিপোর্টিং ব্যবস্থা প্রয়োজন।</li>
            <li>এই ডেমো অ্যাপে কোনো স্থায়ী ডেটাবেস সংযুক্ত নেই, তাই ফর্মের তথ্য সংরক্ষিত হয় না।</li>
          </ul>
        </div>
      </div></div></section>
    </>
  );
}

function TermsPage({ go }) {
  return (
    <>
      <PageHead go={go} title="ব্যবহারের শর্ত" desc="নূর নিকাহ ব্যবহারের সময় প্রত্যাশিত আচরণ ও দায়িত্ব।" />
      <section className="block"><div className="wrap"><div className="content-page">
        <div className="info-card">
          <h3><Ic d={I.doc} s={18} /> ব্যবহার নীতিমালা</h3>
          <ul>
            <li>সব তথ্য সত্য, শালীন ও যাচাইযোগ্য হতে হবে।</li>
            <li>অন্যের ছবি, পরিচয় বা প্রোফাইল তথ্য অনুমতি ছাড়া ব্যবহার করা যাবে না।</li>
            <li>যোগাযোগে ইসলামি আদব, পারিবারিক সম্পৃক্ততা ও স্থানীয় আইন মানতে হবে।</li>
            <li>প্রতারণা, হয়রানি, অর্থ দাবি বা অনৈতিক প্রস্তাবের ক্ষেত্রে অ্যাকাউন্ট সীমিত বা বাতিল করা হতে পারে।</li>
          </ul>
        </div>
      </div></div></section>
    </>
  );
}

function MembershipPage({ go }) {
  return (
    <>
      <PageHead go={go} title="সদস্যপদ" desc="আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন। ফ্রি প্রোফাইল তৈরি থেকে শুরু করে ভিআইপি ম্যাচমেকিং পর্যন্ত।" />
      <section className="block"><div className="wrap">
        <div className="plans">{[...PLANS, BARAKAH_PLAN].map((p) => <PlanCard key={p.id} p={p} go={go} />)}</div>
        <div className="info-card" style={{ marginTop: 22, borderColor: "rgba(22,137,229,.3)" }}>
          <h3><span className="verified-badge">✓</span> বারাকাহ ব্লু ব্যাজ</h3>
          <p style={{ color: C.muted, marginBottom: 16 }}>সাধারণ সদস্যপদের বাইরে এককালীন অতিরিক্ত পেমেন্টে প্রোফাইল যাচাই, ব্লু ব্যাজ এবং সার্চে অগ্রাধিকার নিন।</p>
          <button className="btn btn-green" onClick={() => go("barakah")}>বিস্তারিত দেখুন</button>
        </div>
        <div className="info-card" style={{ marginTop: 22 }}>
          <h3><Ic d={I.shield} s={18} /> সদস্যপদে যা পাবেন</h3>
          <ul>
            <li>যাচাইকৃত প্রোফাইল দেখার সুবিধা</li>
            <li>ওয়ালি-সম্পৃক্ত যোগাযোগ অনুরোধ</li>
            <li>নিরাপত্তা রিপোর্টিং ও সহায়তা</li>
            <li>প্রোফাইল হাইলাইট ও ম্যাচ সাজেশন</li>
          </ul>
        </div>
      </div></section>
    </>
  );
}

function BarakahPage({ go }) {
  return (
    <>
      <PageHead go={go} title="বারাকাহ ব্লু ব্যাজ" desc="আরও আস্থার সঙ্গে আপনার বায়োডাটা উপস্থাপন করুন।" />
      <section className="block"><div className="wrap">
        <div className="barakah-hero">
          <div>
            <span className="eyebrow"><span className="verified-badge">✓</span> প্রিমিয়াম ভেরিফিকেশন সেবা</span>
            <h2 className="serif" style={{ fontSize: 34, color: C.green900, marginTop: 16 }}>ব্লু ব্যাজে আপনার প্রোফাইল হবে আরও বিশ্বাসযোগ্য</h2>
            <p style={{ color: C.muted }}>আমাদের টিম তথ্য ও অভিভাবকের যোগাযোগ যাচাই করার পর যোগ্য প্রোফাইলে বারাকাহ ব্লু ব্যাজ দেবে। এটি সদস্যপদ থেকে আলাদা একটি ঐচ্ছিক সেবা।</p>
            <ul className="barakah-list">
              {BARAKAH_PLAN.items.map((item) => <li key={item}><Ic d={I.check} s={18} c="#1689e5" /> <span>{item}</span></li>)}
            </ul>
            <div className="guard"><Ic d={I.shield} s={20} c="#1689e5" /><span>পেমেন্ট করলেই ব্যাজ নিশ্চিত নয়—ম্যানুয়াল যাচাই সফল হলে ব্যাজ সক্রিয় হবে। যাচাই ব্যর্থ হলে আবেদনটি রিভিউ করা হবে।</span></div>
          </div>
          <div className="barakah-price">
            <span className="verified-badge" style={{ width: 42, height: 42, fontSize: 24 }}>✓</span>
            <h3 style={{ marginTop: 12 }}>বারাকাহ ভেরিফায়েড</h3>
            <div className="price serif" style={{ fontSize: 40, color: C.green900, margin: "8px 0" }}>{BARAKAH_PLAN.price}</div>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>{BARAKAH_PLAN.per}</p>
            <button className="btn btn-gold" style={{ width: "100%" }} onClick={() => go("checkout", { plan: BARAKAH_PLAN })}>ব্লু ব্যাজের জন্য আবেদন করুন</button>
          </div>
        </div>
      </div></section>
    </>
  );
}

function StoriesPage({ go }) {
  return (
    <>
      <PageHead go={go} title="সফলতার গল্প" desc="পরিবার, গোপনীয়তা ও দ্বীনি অগ্রাধিকারের মাধ্যমে তৈরি হওয়া কিছু ডেমো অভিজ্ঞতা।" />
      <section className="block"><div className="wrap">
        <div className="stories">{STORIES.map((s) => <StoryCard key={s.n} s={s} />)}</div>
        <div className="ctaband" style={{ marginTop: 30 }}>
          <h2 className="serif">আপনার গল্প শুরু করুন</h2>
          <p>বায়োডাটা তৈরি করুন এবং উপযুক্ত প্রোফাইল খুঁজে দেখুন।</p>
          <button className="btn btn-gold" onClick={() => go("register")}>বায়োডাটা তৈরি করুন</button>
        </div>
      </div></section>
    </>
  );
}

/* ---------- ASSISTED MATCHMAKING SERVICE ---------- */
function AssistedPage({ go, fire }) {
  const [done, setDone] = useState(false);
  const [ref] = useState(() => "AMS-" + Math.floor(10000 + Math.random() * 90000));
  const [form, setForm] = useState({ name: "", contact: "", looking: "পাত্রী", prefs: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name || !form.contact) { fire("নাম ও যোগাযোগ নম্বর দিন"); return; }
    setDone(true); window.scrollTo(0, 0);
  };
  const pillars = [
    { ic: I.users, t: "নিবেদিত ম্যাচমেকিং উপদেষ্টা", d: "একজন অভিজ্ঞ উপদেষ্টা আপনাকে বুঝে, ব্যক্তিগত পরামর্শের মাধ্যমে আপনার জীবনসঙ্গী অনুসন্ধানে পাশে থাকেন — শুরু থেকে শেষ পর্যন্ত।" },
    { ic: I.star, t: "বাছাইকৃত প্রস্তাব", d: "হাজারো যাচাইকৃত প্রোফাইল থেকে আপনার চাহিদা অনুযায়ী উপযুক্ত ম্যাচ হাতে বাছাই করা হয়; আপনার অনুমোদন নিয়ে বিষয়টি এগিয়ে নেওয়া হয়।" },
    { ic: I.chat, t: "দ্রুত সাড়া", d: "আপনার পক্ষ থেকে প্রস্তাবিত পরিবারের সাথে যোগাযোগ করা হয়, আপনার প্রোফাইল সুন্দরভাবে উপস্থাপন করা হয় এবং ফলোআপের মাধ্যমে সাড়া নিশ্চিত করা হয়।" },
    { ic: I.ring, t: "পরিচয় ও সাক্ষাৎ", d: "পারস্পরিক পছন্দের ম্যাচের মধ্যে অভিভাবক-সম্পৃক্ত সাক্ষাতের আয়োজন করা হয় এবং উভয় পক্ষের যোগাযোগ সহজ করা হয়।" },
  ];
  const steps = [
    { ic: I.doc, t: "চাহিদা বুঝে নেওয়া", d: "উপদেষ্টা আপনার পছন্দ, দ্বীনি অগ্রাধিকার ও পারিবারিক প্রত্যাশা বিস্তারিত বুঝে নেন।" },
    { ic: I.star, t: "প্রোফাইল বাছাই", d: "হাজারো প্রোফাইল থেকে হাতে বাছাই করা উপযুক্ত ম্যাচ আপনাকে দেখানো হয় ও অনুমোদন নেওয়া হয়।" },
    { ic: I.chat, t: "যোগাযোগ ও ফলোআপ", d: "আপনার হয়ে প্রস্তাবিত পরিবারের সাথে যোগাযোগ ও নিয়মিত ফলোআপ করা হয়।" },
    { ic: I.ring, t: "সাক্ষাৎ আয়োজন", d: "পারস্পরিক সম্মতিতে পর্দা ও আদব রক্ষা করে সাক্ষাতের ব্যবস্থা করা হয়।" },
  ];
  if (done) return (
    <>
      <PageHead go={go} title="অনুরোধ গ্রহণ করা হয়েছে" desc="আমাদের ম্যাচমেকিং উপদেষ্টা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।" />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">জাযাকাল্লাহ! অনুরোধ জমা হয়েছে</h2>
        <p>আপনার সেবা অনুরোধ রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <p style={{ marginBottom: 20 }}>একজন নিবেদিত উপদেষ্টা আপনার চাহিদা বুঝে বাছাইকৃত প্রস্তাব নিয়ে যোগাযোগ করবেন। (এটি একটি ডেমো — তথ্য সংরক্ষণ হয়নি।)</p>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => go("browse")}>প্রোফাইল দেখুন</button>
          <button className="btn btn-ghost" onClick={() => go("home")}>হোমে ফিরুন</button>
        </div>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead go={go} title="সহায়ক ম্যাচমেকিং সেবা" desc="আমাদের অভিজ্ঞ ম্যাচমেকিং উপদেষ্টা আপনার হয়ে উপযুক্ত জীবনসঙ্গী খুঁজে দেন — ব্যক্তিগত পরামর্শ, বাছাইকৃত প্রস্তাব ও ব্যক্তিগত ছোঁয়ায়।" />
      <section className="block"><div className="wrap">
        <div className="head"><div className="kicker">প্রিমিয়াম সেবা</div><h2 className="serif">আপনার হয়ে খুঁজে দেন আমাদের উপদেষ্টা</h2><p>নিজে খোঁজার সময় নেই? একজন নিবেদিত উপদেষ্টাকে দায়িত্ব দিন — তিনি আপনাকে বুঝে, উপযুক্ত ম্যাচ বেছে, যোগাযোগ ও সাক্ষাৎ পর্যন্ত সব সামলান।</p></div>
        <div className="content-grid">{pillars.map((v) => (
          <div className="info-card" key={v.t}><h3><Ic d={v.ic} s={18} /> {v.t}</h3><p>{v.d}</p></div>
        ))}</div>
      </div></section>

      <section className="block" style={{ background: "#EFEADD", paddingTop: 60 }}><div className="wrap">
        <div className="head"><div className="kicker">কীভাবে কাজ করে</div><h2 className="serif">মাত্র চারটি ধাপে</h2><p>স্বচ্ছ, শরীয়াহসম্মত ও অভিভাবক-সম্পৃক্ত একটি প্রক্রিয়া।</p></div>
        <div className="steps">{steps.map((s, i) => (
          <div className="step" key={i}><div className="n serif">০{i + 1}</div><div className="ic"><Ic d={s.ic} /></div><h3>{s.t}</h3><p>{s.d}</p></div>
        ))}</div>
      </div></section>

      <section className="block"><div className="wrap"><div className="contact-panel content-page">
        <div className="info-card">
          <h3><Ic d={I.shield} s={18} /> এই সেবায় যা পাবেন</h3>
          <ul>
            <li>আপনাকে বুঝে ব্যক্তিগত পরামর্শ ও ব্যক্তিগত ছোঁয়া</li>
            <li>হাজারো প্রোফাইল থেকে হাতে বাছাই করা উপযুক্ত ম্যাচ</li>
            <li>আপনার হয়ে যোগাযোগ ও নিয়মিত ফলোআপ</li>
            <li>পারস্পরিক ম্যাচের সাথে সাক্ষাৎ ও যোগাযোগ সহজীকরণ</li>
            <li>প্রতিটি ধাপে আপনার অনুমোদন ও অভিভাবকের সম্পৃক্ততা</li>
          </ul>
          <div className="guard" style={{ marginTop: 18 }}><Ic d={I.moon} s={20} c={C.gold} /> <span>সহায়ক ম্যাচমেকিং সেবা ভিআইপি সদস্যপদের অন্তর্ভুক্ত। <a style={{ color: C.green700, fontWeight: 600 }} onClick={() => go("membership")}>প্যাকেজ দেখুন</a></span></div>
        </div>
        <div className="formcard" style={{ marginBottom: 0 }}>
          <h3><Ic d={I.users} s={18} /> উপদেষ্টার জন্য অনুরোধ করুন</h3>
          <div className="frow">
            <div className="fgroup"><label>নাম *</label><input value={form.name} onChange={set("name")} placeholder="আপনার নাম" /></div>
            <div className="fgroup"><label>মোবাইল / প্রোফাইল আইডি *</label><input value={form.contact} onChange={set("contact")} placeholder="01XXXXXXXXX বা NN-XXXX" /></div>
            <div className="fgroup"><label>কী খুঁজছেন</label><select value={form.looking} onChange={set("looking")}><option>পাত্রী</option><option>পাত্র</option></select></div>
            <div className="fgroup full"><label>আপনার পছন্দ ও প্রত্যাশা</label><textarea value={form.prefs} onChange={set("prefs")} placeholder="বয়স, এলাকা, দ্বীনদারিতা, শিক্ষা ও পারিবারিক প্রত্যাশা সংক্ষেপে লিখুন" /></div>
          </div>
          <button className="btn btn-gold" onClick={submit}>উপদেষ্টার জন্য অনুরোধ করুন</button>
        </div>
      </div></div></section>
    </>
  );
}

function CheckoutPage({ go, plan, fire }) {
  const selected = plan || PLANS[1];
  const [done, setDone] = useState(false);
  const [ref] = useState(() => "PAY-" + Math.floor(10000 + Math.random() * 90000));
  const [form, setForm] = useState({ name: "", phone: "", method: "বিকাশ", trx: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name || !form.phone || !form.trx) { fire("নাম, মোবাইল ও ট্রানজেকশন আইডি দিন"); return; }
    setDone(true); window.scrollTo(0, 0);
  };
  if (done) return (
    <>
      <PageHead go={go} title="সদস্যপদ অনুরোধ সম্পন্ন" desc="আপনার পেমেন্ট তথ্য যাচাইয়ের জন্য জমা হয়েছে।" />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">{selected.tag} প্যাকেজ</h2>
        <p>রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <p style={{ marginBottom: 20 }}>যাচাই সম্পন্ন হলে ড্যাশবোর্ডে সদস্যপদ সক্রিয় দেখাবে।</p>
        <button className="btn btn-gold" onClick={() => go("dashboard", { id: form.phone, plan: selected.tag })}>ড্যাশবোর্ড দেখুন</button>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead go={go} title="সদস্যপদ নিন" desc={`${selected.tag} প্যাকেজের জন্য পেমেন্ট তথ্য জমা দিন।`} />
      <section className="block"><div className="wrap"><div className="contact-panel content-page">
        <div className={"plan" + (selected.feat ? " feat" : "")}>
          {selected.feat && <span className="ribbon">জনপ্রিয়</span>}
          <span className="tag">{selected.tag}</span>
          <div className="price serif">{selected.price}</div>
          <div className="per">{selected.per}</div>
          <ul>{selected.items.map((it) => (<li key={it}><Ic d={I.check} s={17} c={selected.feat ? C.goldSoft : C.green600} /> <span>{it}</span></li>))}</ul>
        </div>
        <div className="formcard" style={{ marginBottom: 0 }}>
          <h3><Ic d={I.lock} s={18} /> পেমেন্ট যাচাই</h3>
          <div className="frow">
            <div className="fgroup"><label>নাম *</label><input value={form.name} onChange={set("name")} placeholder="আপনার নাম" /></div>
            <div className="fgroup"><label>মোবাইল *</label><input value={form.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" /></div>
            <div className="fgroup"><label>পেমেন্ট মাধ্যম</label><select value={form.method} onChange={set("method")}><option>বিকাশ</option><option>নগদ</option><option>রকেট</option><option>ব্যাংক</option></select></div>
            <div className="fgroup"><label>ট্রানজেকশন আইডি *</label><input value={form.trx} onChange={set("trx")} placeholder="TRX123456" /></div>
          </div>
          <div className="guard" style={{ marginBottom: 16 }}><Ic d={I.shield} s={20} c={C.gold} /> <span>এটি ডেমো ফ্লো। বাস্তব পেমেন্ট গেটওয়ে যুক্ত করলে এখানে স্বয়ংক্রিয় যাচাই হবে।</span></div>
          <button className="btn btn-gold" onClick={submit}>যাচাইয়ের জন্য জমা দিন</button>
        </div>
      </div></div></section>
    </>
  );
}

function InterestPage({ go, profile, fire }) {
  const p = profile || PROFILES[0];
  const [done, setDone] = useState(false);
  const [ref] = useState(() => "INT-" + Math.floor(10000 + Math.random() * 90000));
  const [form, setForm] = useState({ guardian: "", phone: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.guardian || !form.phone) { fire("অভিভাবকের নাম ও মোবাইল দিন"); return; }
    setDone(true); window.scrollTo(0, 0);
  };
  if (done) return (
    <>
      <PageHead go={go} title="আগ্রহ প্রকাশ করা হয়েছে" desc={`প্রোফাইল #${p.id}-এর জন্য আপনার অনুরোধ জমা হয়েছে।`} />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">ওয়ালি যাচাইয়ের অপেক্ষায়</h2>
        <p>রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => go("browse")}>আরও প্রোফাইল দেখুন</button>
          <button className="btn btn-ghost" onClick={() => go("dashboard", { id: form.phone })}>ড্যাশবোর্ড দেখুন</button>
        </div>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead go={go} title="আগ্রহ প্রকাশ" desc={`প্রোফাইল #${p.id}-এর জন্য অভিভাবক-সম্পৃক্ত যোগাযোগ অনুরোধ পাঠান।`} />
      <section className="block"><div className="wrap"><div className="contact-panel content-page">
        <div className="info-card">
          <h3><Ic d={I.users} s={18} /> প্রোফাইল সারাংশ</h3>
          <ul>
            <li>{p.who} · {p.age} বছর</li>
            <li>{p.dist}, {p.area}</li>
            <li>{p.job}</li>
            <li>{p.deen}</li>
          </ul>
          <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => go("profile", p)}>প্রোফাইলে ফিরুন</button>
        </div>
        <div className="formcard" style={{ marginBottom: 0 }}>
          <h3><Ic d={I.shield} s={18} /> অভিভাবক তথ্য</h3>
          <div className="frow">
            <div className="fgroup"><label>অভিভাবকের নাম *</label><input value={form.guardian} onChange={set("guardian")} placeholder="ওয়ালির নাম" /></div>
            <div className="fgroup"><label>অভিভাবকের মোবাইল *</label><input value={form.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" /></div>
            <div className="fgroup full"><label>সংক্ষিপ্ত বার্তা</label><textarea value={form.message} onChange={set("message")} placeholder="পরিবারের পক্ষ থেকে আগ্রহের কারণ লিখুন" /></div>
          </div>
          <button className="btn btn-gold" onClick={submit}>অনুরোধ পাঠান</button>
        </div>
      </div></div></section>
    </>
  );
}

function DashboardPage({ go, user }) {
  return (
    <>
      <PageHead go={go} title="ড্যাশবোর্ড" desc="প্রোফাইল, আগ্রহ অনুরোধ ও সদস্যপদ এক জায়গায় দেখুন।" />
      <section className="block"><div className="wrap">
        <div className="dashboard-grid">
          <div className="dash-card"><strong>৭৮%</strong><span>প্রোফাইল সম্পন্ন</span></div>
          <div className="dash-card"><strong>৩</strong><span>আগ্রহ অনুরোধ</span></div>
          <div className="dash-card"><strong>{user?.plan || "ফ্রি"}</strong><span>সদস্যপদ</span></div>
        </div>
        <div className="content-grid" style={{ marginTop: 22 }}>
          <div className="info-card">
            <h3><Ic d={I.doc} s={18} /> পরবর্তী কাজ</h3>
            <ul>
              <li>প্রোফাইল যাচাই সম্পন্ন করুন</li>
              <li>অভিভাবকের তথ্য যোগ করুন</li>
              <li>পছন্দের প্রোফাইল ব্রাউজ করুন</li>
            </ul>
            <div className="actionbar">
              <button className="btn btn-gold" onClick={() => go("register")}>বায়োডাটা আপডেট</button>
              <button className="btn btn-ghost" onClick={() => go("browse")}>প্রোফাইল দেখুন</button>
            </div>
          </div>
          <div className="info-card">
            <h3><Ic d={I.chat} s={18} /> সাম্প্রতিক কার্যক্রম</h3>
            <div className="status-list">
              <div className="status-item"><span className="dot" /><span>প্রোফাইল যাচাই অপেক্ষমাণ</span></div>
              <div className="status-item"><span className="dot" /><span>একটি আগ্রহ অনুরোধ পর্যালোচনায় আছে</span></div>
              <div className="status-item"><span className="dot" /><span>নিরাপত্তা টিপস পড়া বাকি</span></div>
            </div>
          </div>
        </div>
      </div></section>
    </>
  );
}

/* ---------- REGISTER (biodata form) ---------- */
function Register({ go, fire }) {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ name: "", gender: "", age: "", height: "", divisionId: "", districtId: "", upazilaId: "", thanaId: "", unionId: "", dist: "", upazila: "", thana: "", union: "", village: "", marital: "", edu: "", job: "", deen: "", family: "", guardian: "", guardianPhone: "", about: "", phone: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const [newId] = useState(() => "NN-" + Math.floor(1000 + Math.random() * 9000));
  const formDistricts = f.divisionId ? getDistrictsByDivision(f.divisionId) : ALL_DISTRICTS;
  const formUpazilas = f.districtId ? getUpazilasByDistrict(f.districtId) : [];
  const formThanas = f.districtId ? getThanasByDistrict(f.districtId) : [];
  const formUnions = f.upazilaId ? getUnionsByUpazila(f.upazilaId) : [];
  const updateDivision = (e) => setF({ ...f, divisionId: e.target.value, districtId: "", upazilaId: "", thanaId: "", unionId: "", dist: "", upazila: "", thana: "", union: "" });
  const updateDistrict = (e) => {
    const next = e.target.value;
    setF({ ...f, districtId: next, upazilaId: "", thanaId: "", unionId: "", dist: bn(formDistricts.find((d) => d.id === next)), upazila: "", thana: "", union: "" });
  };
  const updateUpazila = (e) => {
    const next = e.target.value;
    setF({ ...f, upazilaId: next, unionId: "", upazila: bn(formUpazilas.find((u) => u.id === next)), union: "" });
  };
  const updateThana = (e) => {
    const next = e.target.value;
    setF({ ...f, thanaId: next, thana: bn(formThanas.find((t) => t.id === next)) });
  };
  const updateUnion = (e) => {
    const next = e.target.value;
    setF({ ...f, unionId: next, union: bn(formUnions.find((u) => u.id === next)) });
  };
  const submit = () => {
    if (!f.name || !f.gender || !f.age || !f.phone) { fire("নাম, লিঙ্গ, বয়স ও মোবাইল নম্বর পূরণ করুন"); return; }
    setDone(true); window.scrollTo(0, 0);
  };
  if (done) return (
    <><div className="pagehead"><div className="wrap"><div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <span>রেজিস্ট্রেশন</span></div><h1 className="serif">বায়োডাটা তৈরি</h1></div></div>
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">আলহামদুলিল্লাহ! বায়োডাটা তৈরি হয়েছে</h2>
        <p>আপনার ডেমো প্রোফাইল আইডি:</p>
        <div className="pid">#{newId}</div>
        <p style={{ marginBottom: 22 }}>পরবর্তী ধাপে প্রোফাইল যাচাই ও ছবি যোগ করতে পারবেন। (এটি একটি ডেমো — তথ্য সংরক্ষণ হয়নি।)</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-gold" onClick={() => go("browse")}>প্রোফাইল ব্রাউজ করুন</button>
          <button className="btn btn-ghost" onClick={() => go("home")}>হোমে ফিরুন</button>
        </div>
      </div></div></section></>
  );
  return (
    <>
      <div className="pagehead"><div className="wrap">
        <div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <span>রেজিস্ট্রেশন</span></div>
        <h1 className="serif">বায়োডাটা তৈরি করুন</h1><p>বিনামূল্যে আপনার প্রোফাইল তৈরি করুন। সব তথ্য গোপন থাকে।</p>
      </div></div>
      <section className="block" style={{ paddingTop: 40 }}><div className="wrap"><div className="formwrap">
        <div className="formcard"><h3><Ic d={I.users} s={18} /> ব্যক্তিগত তথ্য</h3>
          <div className="frow">
            <div className="fgroup"><label>পূর্ণ নাম *</label><input value={f.name} onChange={set("name")} placeholder="আপনার নাম" /></div>
            <div className="fgroup"><label>লিঙ্গ *</label><select value={f.gender} onChange={set("gender")}><option value="">নির্বাচন</option><option>পাত্র</option><option>পাত্রী</option></select></div>
            <div className="fgroup"><label>বয়স *</label><input value={f.age} onChange={set("age")} type="number" placeholder="যেমন ২৫" /></div>
            <div className="fgroup"><label>উচ্চতা</label><input value={f.height} onChange={set("height")} placeholder="যেমন ৫'৬&quot;" /></div>
            <div className="fgroup"><label>বিভাগ</label><select value={f.divisionId} onChange={updateDivision}><option value="">নির্বাচন</option>{ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="fgroup"><label>জেলা</label><select value={f.districtId} onChange={updateDistrict}><option value="">নির্বাচন</option>{formDistricts.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="fgroup"><label>উপজেলা</label><select value={f.upazilaId} onChange={updateUpazila} disabled={!f.districtId}><option value="">নির্বাচন</option>{formUpazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="fgroup"><label>থানা</label><select value={f.thanaId} onChange={updateThana} disabled={!f.districtId}><option value="">নির্বাচন</option>{formThanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
            <div className="fgroup"><label>ইউনিয়ন</label><select value={f.unionId} onChange={updateUnion} disabled={!f.upazilaId}><option value="">নির্বাচন</option>{formUnions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="fgroup"><label>গ্রাম</label><input value={f.village} onChange={set("village")} placeholder="গ্রামের নাম" /></div>
            <div className="fgroup"><label>বৈবাহিক অবস্থা</label><select value={f.marital} onChange={set("marital")}><option value="">নির্বাচন</option><option>অবিবাহিত</option><option>বিবাহবিচ্ছিন্ন</option><option>বিধবা/বিপত্নীক</option></select></div>
          </div>
        </div>
        <div className="formcard"><h3><Ic d={I.moon} s={18} /> ধর্মীয় তথ্য</h3>
          <div className="frow">
            <div className="fgroup full"><label>দ্বীনদারিতা</label><input value={f.deen} onChange={set("deen")} placeholder="যেমন নিয়মিত নামাজ, পর্দানশীন" /></div>
          </div>
        </div>
        <div className="formcard"><h3><Ic d={I.book} s={18} /> শিক্ষা ও পেশা</h3>
          <div className="frow">
            <div className="fgroup"><label>শিক্ষাগত যোগ্যতা</label><input value={f.edu} onChange={set("edu")} placeholder="যেমন স্নাতক" /></div>
            <div className="fgroup"><label>পেশা</label><input value={f.job} onChange={set("job")} placeholder="যেমন শিক্ষক" /></div>
          </div>
        </div>
        <div className="formcard"><h3><Ic d={I.home} s={18} /> পারিবারিক ও অভিভাবক</h3>
          <div className="frow">
            <div className="fgroup full"><label>পরিবার সম্পর্কে</label><textarea value={f.family} onChange={set("family")} placeholder="সংক্ষেপে পরিবারের তথ্য" /></div>
            <div className="fgroup"><label>অভিভাবকের নাম</label><input value={f.guardian} onChange={set("guardian")} placeholder="ওয়ালির নাম" /></div>
            <div className="fgroup"><label>অভিভাবকের মোবাইল</label><input value={f.guardianPhone} onChange={set("guardianPhone")} placeholder="01XXXXXXXXX" /></div>
          </div>
        </div>
        <div className="formcard"><h3><Ic d={I.heart} s={18} /> নিজের সম্পর্কে ও যোগাযোগ</h3>
          <div className="frow">
            <div className="fgroup full"><label>নিজের সম্পর্কে ও প্রত্যাশা</label><textarea value={f.about} onChange={set("about")} placeholder="আপনি কেমন সঙ্গী চান" /></div>
            <div className="fgroup full"><label>আপনার মোবাইল নম্বর * (গোপন থাকবে)</label><input value={f.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" /></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button className="btn btn-ghost" onClick={() => go("home")}>বাতিল</button>
          <button className="btn btn-gold btn-lg" onClick={submit}><Ic d={I.check} s={18} c={C.green900} /> বায়োডাটা জমা দিন</button>
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted }}>ইতিমধ্যে অ্যাকাউন্ট আছে? <a style={{ color: C.green700, fontWeight: 600 }} onClick={() => go("login")}>লগইন করুন</a></p>
      </div></div></section>
    </>
  );
}

/* ---------- LOGIN ---------- */
function Login({ go, fire }) {
  const [id, setId] = useState(""); const [pw, setPw] = useState("");
  const login = () => {
    if (!id || !pw) { fire("মোবাইল/প্রোফাইল আইডি ও পাসওয়ার্ড দিন"); return; }
    go("dashboard", { id });
  };
  return (
    <>
      <div className="pagehead"><div className="wrap"><div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <span>লগইন</span></div><h1 className="serif">লগইন করুন</h1></div></div>
      <section className="block"><div className="wrap"><div className="authcard">
        <div style={{ textAlign: "center", marginBottom: 18 }}>{Logo}</div>
        <h2 className="serif" style={{ textAlign: "center" }}>স্বাগতম</h2>
        <p className="sub" style={{ textAlign: "center" }}>আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        <div className="fgroup"><label>মোবাইল / প্রোফাইল আইডি</label><input value={id} onChange={(e) => setId(e.target.value)} placeholder="01XXXXXXXXX বা NN-XXXX" /></div>
        <div className="fgroup"><label>পাসওয়ার্ড</label><input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" /></div>
        <button className="btn btn-gold" style={{ width: "100%", marginTop: 6 }} onClick={login}>লগইন</button>
        <p style={{ textAlign: "center", marginTop: 18, fontSize: 14, color: C.muted }}>অ্যাকাউন্ট নেই? <a style={{ color: C.green700, fontWeight: 600 }} onClick={() => go("register")}>বায়োডাটা তৈরি করুন</a></p>
      </div></div></section>
    </>
  );
}

/* ---------- root router ---------- */
export default function NoorNikah() {
  const [page, setPage] = useState("home");
  const [data, setData] = useState(null);
  const [toast, setToast] = useState("");
  const fire = (m) => { setToast(m); setTimeout(() => setToast(""), 2600); };
  useEffect(() => {
    if (page === "home" && data?.scroll) {
      setTimeout(() => document.getElementById(data.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  }, [page, data]);
  const go = (pg, d = null) => {
    setPage(pg); setData(d);
    if (typeof window !== "undefined" && !d?.scroll) window.scrollTo(0, 0);
  };
  return (
    <div className="nn">
      <style>{styles}</style>
      <Header page={page} go={go} fire={fire} />
      {page === "home" && <Home go={go} fire={fire} />}
      {page === "browse" && <Browse go={go} prefs={data} />}
      {page === "profile" && <ProfileDetail go={go} profile={data} fire={fire} />}
      {page === "register" && <Register go={go} fire={fire} />}
      {page === "login" && <Login go={go} fire={fire} />}
      {page === "membership" && <MembershipPage go={go} />}
      {page === "barakah" && <BarakahPage go={go} />}
      {page === "assisted" && <AssistedPage go={go} fire={fire} />}
      {page === "stories" && <StoriesPage go={go} />}
      {page === "checkout" && <CheckoutPage go={go} plan={data?.plan} fire={fire} />}
      {page === "interest" && <InterestPage go={go} profile={data?.profile} fire={fire} />}
      {page === "dashboard" && <DashboardPage go={go} user={data} />}
      {page === "contact" && <ContactPage go={go} fire={fire} />}
      {page === "safety" && <SafetyPage go={go} />}
      {page === "faq" && <FaqPage go={go} />}
      {page === "privacy" && <PrivacyPage go={go} />}
      {page === "terms" && <TermsPage go={go} />}
      <Footer go={go} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
