import React, { useState } from "react";
// Defer loading of heavy geo data to reduce initial bundle size.
let _geo = null;
let _getAllDistricts = null;
let _getAllDivisions = null;
let _getDistrictsByDivision = null;
let _getThanasByDistrict = null;
let _getUnionsByUpazila = null;
let _getUpazilasByDistrict = null;

// Exported arrays will be populated asynchronously; consumers should tolerate empty initial state.
export let ALL_DIVISIONS = [];
export let ALL_DISTRICTS = [];

(async function loadGeo() {
  try {
    _geo = await import("bangladesh-geo-data");
    _getAllDistricts = _geo.getAllDistricts;
    _getAllDivisions = _geo.getAllDivisions;
    _getDistrictsByDivision = _geo.getDistrictsByDivision;
    _getThanasByDistrict = _geo.getThanasByDistrict;
    _getUnionsByUpazila = _geo.getUnionsByUpazila;
    _getUpazilasByDistrict = _geo.getUpazilasByDistrict;
    ALL_DIVISIONS = _getAllDivisions();
    ALL_DISTRICTS = _getAllDistricts();
  } catch (err) {
    // Fail silently — app will still work with demo data and manual selects.
    // console.warn('Could not load bangladesh-geo-data', err);
  }
})();

export { PROFILES, PLANS, BARAKAH_PLAN, STORIES } from "../data/demoData";

export const C = {
  green900: "#0B3D2E", green700: "#15604A", green600: "#1C7A5E",
  gold: "#C9A227", goldSoft: "#E6CE84", cream: "#F6F2E9",
  card: "#FFFFFF", ink: "#16241F", muted: "#5C6B63", line: "rgba(11,61,46,.12)",
};

export const Ic = ({ d, s = 22, c = C.green700, fill = "none", sw = 1.7 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const I = {
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
  groom: <><path d="M8.5 6.2h7l-1.2-2.7h-4.6L8.5 6.2z" /><circle cx="12" cy="9.2" r="3.1" /><path d="M9.7 12.5c.4 1.6 1.2 2.5 2.3 2.5s1.9-.9 2.3-2.5M5.5 21v-1.8c0-3.4 2.9-5.7 6.5-5.7s6.5 2.3 6.5 5.7V21M9 17.2l3 3 3-3" /></>,
  bride: <><path d="M8.2 10.5C8.2 6.5 9.7 3 12 3s3.8 3.5 3.8 7.5" /><circle cx="12" cy="9.2" r="3" /><path d="M8.7 11.2c-1.7 1.7-2.7 4.5-2.7 8.8h12c0-4.3-1-7.1-2.7-8.8M9.2 13.3c.4 1.5 1.4 2.4 2.8 2.4s2.4-.9 2.8-2.4M9.5 20v-2.8M14.5 20v-2.8" /></>,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  back: <path d="M15 5l-7 7 7 7" />,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M19 3v18" /></>,
  briefcase: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 10v9h12v-9" /></>,
};

export const GroomAvatar = ({ s = 64 }) => (
  <svg width={s} height={s} viewBox="0 0 64 64" role="img" aria-label="পাত্রের গোপন প্রোফাইল">
    <defs><clipPath id="groom-avatar"><circle cx="32" cy="32" r="30" /></clipPath></defs>
    <circle cx="32" cy="32" r="30" fill="#eeeef0" />
    <g clipPath="url(#groom-avatar)">
      <path d="M4 61c2-16 12-24 28-24s26 8 28 24" fill="#710078" />
      <path d="M19 64V46c3 4 7 6 13 6s10-2 13-6v18" fill="#d7d7d9" />
      <path d="M21 19c0-8 4-13 11-13s11 5 11 13v10c0 8-5 14-11 14S21 37 21 29V19z" fill="#d8bda2" />
      <path d="M20 24c2 3 4 4 6 4h12c2 0 4-1 6-4v8c-2 10-7 15-12 15s-10-5-12-15v-8z" fill="#1d1d1f" />
      <path d="M25 29c1.5 1.2 3.8 1.8 7 1.8s5.5-.6 7-1.8v-8H25v8z" fill="#d8bda2" />
      <path d="M19 17c2-7 6-11 13-11s11 4 13 11c-8-3-18-3-26 0z" fill="#fafafa" stroke="#d8d8dc" strokeWidth="1" />
      <path d="M21 18c7-2 15-2 22 0" fill="none" stroke="#cfcfd3" strokeWidth="1" />
    </g>
    <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
  </svg>
);

export const BrideAvatar = ({ s = 64 }) => (
  <svg width={s} height={s} viewBox="0 0 64 64" role="img" aria-label="পাত্রীর গোপন প্রোফাইল">
    <defs>
      <clipPath id="bride-avatar"><circle cx="32" cy="32" r="30" /></clipPath>
      <linearGradient id="bride-bg" x1="8" y1="5" x2="54" y2="59" gradientUnits="userSpaceOnUse"><stop stopColor="#211b3c" /><stop offset="1" stopColor="#0e0d1b" /></linearGradient>
      <linearGradient id="bride-veil" x1="23" y1="15" x2="45" y2="61" gradientUnits="userSpaceOnUse"><stop stopColor="#29292b" /><stop offset=".55" stopColor="#111113" /><stop offset="1" stopColor="#303033" /></linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#bride-bg)" />
    <g clipPath="url(#bride-avatar)">
      <path d="M12 66c4-10 8-20 10-34 1-11 4-17 10-17s9 6 10 17c2 14 6 24 10 34H12z" fill="url(#bride-veil)" />
      <path d="M21 34c0-12 3-20 11-20s11 8 11 20" fill="none" stroke="#08080a" strokeWidth="5" />
      <path d="M22 27c2-7 5-10 10-10s8 3 10 10c-7-3-13-3-20 0z" fill="#18181a" stroke="#3b3b3d" strokeWidth="1" />
      <path d="M22.5 27.5c6-2.2 13-2.2 19 0v12c-6 2.5-13 2.5-19 0v-12z" fill="#050506" />
      <path d="M23.8 28.8c5.3-1.6 11.1-1.6 16.4 0v5.8c-5.3 1.4-11.1 1.4-16.4 0v-5.8z" fill="#c99572" />
      <path d="M25 29.8c1.5-.8 3.3-.9 5.1-.1M33.9 29.7c1.8-.8 3.6-.7 5.1.1" fill="none" stroke="#3a2721" strokeWidth=".9" strokeLinecap="round" />
      <path d="M25.3 32c1.3-1.2 3.2-1.2 4.5 0-1.3 1.2-3.2 1.2-4.5 0zM34.2 32c1.3-1.2 3.2-1.2 4.5 0-1.3 1.2-3.2 1.2-4.5 0z" fill="#f7f3ee" stroke="#171719" strokeWidth=".55" />
      <circle cx="27.55" cy="32" r=".85" fill="#2a1d18" /><circle cx="36.45" cy="32" r=".85" fill="#2a1d18" />
      <circle cx="27.3" cy="31.75" r=".2" fill="#fff" /><circle cx="36.2" cy="31.75" r=".2" fill="#fff" />
      <path d="M23 35c5.8-1.5 12.2-1.5 18 0v7c-6 2-12 2-18 0v-7z" fill="#050506" />
      <path d="M20 43c4 3 8 4.5 12 4.5S40 46 44 43M18 53c5 3 9.7 4.5 14 4.5S41 56 46 53" fill="none" stroke="#3a3a3d" strokeWidth="1" opacity=".55" />
    </g>
    <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="2" />
  </svg>
);

export const ProfileAvatar = ({ p, s = 64, color = "rgba(255,255,255,.55)", sw = 1.5 }) =>
  p.who === "পাত্রী" ? <BrideAvatar s={s} /> : <GroomAvatar s={s} />;

export const Logo = (
  <img className="mark" src="/assets/noornikah-logo-ui.png" alt="" aria-hidden="true" />
);

export const VerifiedBadge = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1689e5">
    <defs>
      <filter id="badge-shadow"><feDropShadow dx="0" dy="1.5" stdDeviation="1" floodOpacity="0.4" /></filter>
    </defs>
    <g filter="url(#badge-shadow)">
      {/* 12-point star */}
      <path d="M12 1.5l2.39 7.36h7.72l-6.24 4.53 2.39 7.36L12 16.22l-6.26 4.53 2.39-7.36-6.24-4.53h7.72L12 1.5z" fill="#1689e5" />
      {/* White checkmark */}
      <g transform="translate(12, 12)">
        <path d="M-3 0.5L-1 2.5L3 -2" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  </svg>
);



export const bn = (item) => item?.nameBn || item?.name || "";
export const getDistrictsByDivisionSafe = (divisionId) => (divisionId ? (_getDistrictsByDivision ? _getDistrictsByDivision(divisionId) : ALL_DISTRICTS) : ALL_DISTRICTS);
export const getUpazilasByDistrictSafe = (districtId) => (districtId ? (_getUpazilasByDistrict ? _getUpazilasByDistrict(districtId) : []) : []);
export const getThanasByDistrictSafe = (districtId) => (districtId ? (_getThanasByDistrict ? _getThanasByDistrict(districtId) : []) : []);
export const getUnionsByUpazilaSafe = (upazilaId) => (upazilaId ? (_getUnionsByUpazila ? _getUnionsByUpazila(upazilaId) : []) : []);

export const PCard = ({ p, go, match }) => {
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("noornikah-shortlist") || "[]").includes(p.id); } catch { return false; }
  });
  const toggleSaved = (event) => {
    event.stopPropagation();
    let ids = [];
    try { ids = JSON.parse(localStorage.getItem("noornikah-shortlist") || "[]"); } catch { ids = []; }
    ids = saved ? ids.filter((id) => id !== p.id) : [...new Set([...ids, p.id])];
    localStorage.setItem("noornikah-shortlist", JSON.stringify(ids));
    setSaved(!saved);
  };
  return match ? (
  <div className="pcard match-card">
    <div className="match-head">
      <div className="match-ring" style={{ "--score": match.score }}><span>{match.score}<small>ম্যাচ</small></span></div>
      <div className="match-title"><b>✧ {match.label}</b><span>{match.criteria}টি মানদণ্ডের ভিত্তিতে</span></div>
      <div className="match-quality"><div className="quality"><b>{match.perfect}</b>পারফেক্ট</div><div className="quality good"><b>{match.good}</b>ভালো</div></div>
    </div>
    <div className="avatar">
      <span className="type">{p.who}</span><span className="views"><Ic d={I.eye} s={15} c={C.ink} /> {p.views}</span>
      <button className={`shortlist${saved ? " saved" : ""}`} onClick={toggleSaved} aria-label={saved ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় রাখুন"} title="পছন্দের তালিকা">{saved ? "♥" : "♡"}</button>
      <span className="avatar-icon"><ProfileAvatar p={p} s={88} color="rgba(255,255,255,.72)" /></span>
      <span className="bio-no">বায়ো নং — {p.id.replace("NN-", "")} {p.verified && <VerifiedBadge size={18} />}</span>
    </div>
    <div className="body">
      <div className="match-facts"><span>◷ {(new Date().getFullYear() - p.age).toLocaleString("bn-BD", { useGrouping: false })}</span><span><Ic d={I.briefcase} s={14} c={C.ink} /> {p.job}</span><span><Ic d={I.heart} s={14} c={C.ink} /> {p.marital}</span><span><Ic d={I.pin} s={14} c={C.ink} /> {p.dist}</span></div>
      <button className="btn full-bio" onClick={() => go("profile", p)}>সম্পূর্ণ বায়োডাটা দেখুন <span>→</span></button>
    </div>
  </div>
) : (
  <div className="pcard" onClick={() => go("profile", p)}>
    <div className="avatar">
      <ProfileAvatar p={p} s={116} color="rgba(255,255,255,.48)" sw={1.35} />
      <span className="priv"><Ic d={I.lock} s={12} c="#fff" /> গোপন</span><button className={`shortlist${saved ? " saved" : ""}`} onClick={toggleSaved}>{saved ? "♥" : "♡"}</button>
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
};

export const PlanCard = ({ p, go }) => (
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

export const StoryCard = ({ s }) => (
  <div className="story">
    <Ic d={I.star} s={18} c={C.gold} fill={C.gold} />
    <p>“{s.t}”</p>
    <div className="who"><span className="ava">{s.a}</span><span><b>{s.n}</b><span>{s.c}</span></span></div>
  </div>
);

export const PageHead = ({ go, title, desc }) => (
  <div className="pagehead"><div className="wrap">
    <div className="crumb"><a onClick={() => go("home")}>হোম</a> <span>›</span> <span>{title}</span></div>
    <h1 className="serif">{title}</h1>
    {desc && <p>{desc}</p>}
  </div></div>
);
