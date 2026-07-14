import React, { useEffect, useRef, useState } from "react";
import "./NoorNikah.css";
import { Logo, C, Ic, I, ProfileAvatar, VerifiedBadge, PROFILES, PLANS, BARAKAH_PLAN, STORIES, PageHead, PCard, PlanCard, StoryCard, bn, ALL_DISTRICTS, ALL_DIVISIONS, getDistrictsByDivisionSafe, getUpazilasByDistrictSafe, getThanasByDistrictSafe, getUnionsByUpazilaSafe } from "./pages/shared";
import { Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import AiAssistant from "./components/AiAssistant";

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

function Header({ theme, toggleTheme }) {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pathname.split('/')[1] || 'home';

  return (
    <>
      <div className="announce">১০০% হালাল পদ্ধতিতে আপনার দ্বীনদার জীবনসঙ্গী খুঁজুন — আজই বিনামূল্যে শুরু করুন</div>
      <header>
        <div className="wrap nav">
          <Link to="/" className="brand">{Logo}
            <span><span className="bn serif">নূর নিকাহ</span><br /><span className="en">NoorNikah</span></span>
          </Link>
          <nav className="navlinks">
            <Link to="/" className={page === 'home' ? "active" : ""}>হোম</Link>
            <Link to="/browse" className={page === 'browse' ? "active" : ""}>প্রোফাইল</Link>
            <Link to="/assisted" className={page === 'assisted' ? "active" : ""}>সহায়ক সেবা</Link>
            <Link to="/membership" className={page === 'membership' ? "active" : ""}>সদস্যপদ</Link>
            <Link to="/stories" className={page === 'stories' ? "active" : ""}>সফলতার গল্প</Link>
          </nav>
          <div className="nav-cta">
            <LanguageSwitcher />
            <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? "লাইট মোড" : "লো-লাইট মোড"}>{theme === "dark" ? "☀" : "☾"}</button>
            <button className="btn btn-ghost" onClick={() => navigate("/login")}>লগইন</button>
            <button className="btn btn-gold" onClick={() => navigate("/register")}>বায়োডাটা তৈরি করুন</button>
            <button className="btn btn-ghost hamburger" style={{ padding: "10px 12px" }} aria-label="মেনু" onClick={() => setMenu(!menu)}>
              <Ic d={<path d="M4 7h16M4 12h16M4 17h16" />} c={C.green900} />
            </button>
          </div>
        </div>
        {menu && <button className="menu-backdrop" aria-label="মেনু বন্ধ করুন" onClick={() => setMenu(false)} />}
        <div className={"mobile-menu" + (menu ? " open" : "")}>
          <div className="mobile-menu-head"><b>মেনু</b><button aria-label="মেনু বন্ধ করুন" onClick={() => setMenu(false)}>×</button></div>
          <Link to="/" onClick={() => setMenu(false)}>হোম</Link>
          <Link to="/browse" onClick={() => setMenu(false)}>প্রোফাইল</Link>
          <Link to="/assisted" onClick={() => setMenu(false)}>সহায়ক সেবা</Link>
          <Link to="/membership" onClick={() => setMenu(false)}>সদস্যপদ</Link>
          <Link to="/stories" onClick={() => setMenu(false)}>সফলতার গল্প</Link>
          <Link to="/login" onClick={() => setMenu(false)}>লগইন</Link>
          <button className="btn btn-gold" style={{ marginTop: 12 }} onClick={() => { navigate("/register"); setMenu(false); }}>বায়োডাটা তৈরি করুন</button>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link to="/" className="brand" style={{ marginBottom: 12 }}>{Logo}
              <span><span className="bn serif" style={{ color: "#fff" }}>নূর নিকাহ</span><br /><span className="en">NoorNikah</span></span></Link>
            <p style={{ fontSize: 14, opacity: .75, maxWidth: 280 }}>হালাল পথে দ্বীনদার জীবনসঙ্গী খুঁজে পাওয়ার নিরাপদ ও বিশ্বস্ত প্ল্যাটফর্ম।</p>
          </div>
          <div><h5>প্ল্যাটফর্ম</h5><Link to="/">হোম</Link><Link to="/browse">প্রোফাইল</Link><Link to="/register">বায়োডাটা তৈরি</Link><Link to="/assisted">সহায়ক সেবা</Link><Link to="/membership">সদস্যপদ</Link><Link to="/stories">সফলতার গল্প</Link><Link to="/login">লগইন</Link></div>
          <div><h5>সহায়তা</h5><Link to="/contact">যোগাযোগ</Link><Link to="/safety">নিরাপত্তা টিপস</Link><Link to="/faq">প্রশ্ন ও উত্তর</Link></div>
          <div><h5>আইনি</h5><Link to="/privacy">গোপনীয়তা নীতি</Link><Link to="/terms">ব্যবহারের শর্ত</Link></div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} নূর নিকাহ (ডেমো)। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>বাংলাদেশ · halal · privacy-first</span>
        </div>
      </div>
    </footer>
  );
}



/* ---------- HOME ---------- */
function Home() {
  const navigate = useNavigate();
  const go = (page, data) => navigate(page === "home" ? "/" : `/${page}${page === "profile" && data?.id ? `/${data.id}` : ""}`, { state: data });
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
  const homeDistricts = searchDivisionId ? getDistrictsByDivisionSafe(searchDivisionId) : ALL_DISTRICTS;
  const homeUpazilas = searchDistrictId ? getUpazilasByDistrictSafe(searchDistrictId) : [];
  const homeThanas = searchDistrictId ? getThanasByDistrictSafe(searchDistrictId) : [];
  const homeUnions = searchUpazilaId ? getUnionsByUpazilaSafe(searchUpazilaId) : [];
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
              <div className="field"><label>দ্বীনদারিতা</label><select value={searchDeen} onChange={(e) => setSearchDeen(e.target.value)}><option>সব</option><option>নিয়মিত নামাজি</option><option>পর্দানশীন</option><option>হাফিজ</option><option>আলেম</option></select></div>
              <button className="btn btn-gold" onClick={() => navigate("/browse", { state: { who: side, age: searchAge, dist: searchDist, divisionId: searchDivisionId, districtId: searchDistrictId, upazilaId: searchUpazilaId, thanaId: searchThanaId, unionId: searchUnionId, upazila: bn(selectedHomeUpazila), thana: bn(selectedHomeThana), union: bn(selectedHomeUnion), village: searchVillage, deen: searchDeen } })}><Ic d={I.search} s={17} c={C.green900} /> খুঁজুন</button>
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
        <div style={{ textAlign: "center", marginTop: 34 }}><button className="btn btn-green" onClick={() => navigate("/browse")}>সব প্রোফাইল দেখুন</button></div>
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
          <button className="btn btn-gold btn-lg" onClick={() => navigate("/assisted")}>সহায়ক সেবা সম্পর্কে জানুন</button>
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
          <button className="btn btn-gold btn-lg" onClick={() => navigate("/register")}>বিনামূল্যে শুরু করুন</button>
        </div>
      </div></section>
    </>
  );
}

/* ---------- BROWSE ---------- */
function Browse() {
  const navigate = useNavigate();
  const go = (page, data) => navigate(page === "profile" && data?.id ? `/profile/${data.id}` : `/${page}`, { state: data });
  const location = useLocation();
  const prefs = location.state || {};

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [who, setWho] = useState(prefs.who || "সব");
  const [divisionId, setDivisionId] = useState(prefs.divisionId || "");
  const [districtId, setDistrictId] = useState(prefs.districtId || "");
  const [upazilaId, setUpazilaId] = useState(prefs.upazilaId || "");
  const [thanaId, setThanaId] = useState(prefs.thanaId || "");
  const [unionId, setUnionId] = useState(prefs.unionId || "");
  const [dist, setDist] = useState(prefs.dist || "সব");
  const [age, setAge] = useState(prefs.age || "সব");
  const [deen, setDeen] = useState(prefs.deen || "সব");
  const [village, setVillage] = useState(prefs.village || "");
  const browseDistricts = divisionId ? getDistrictsByDivisionSafe(divisionId) : ALL_DISTRICTS;
  const browseUpazilas = districtId ? getUpazilasByDistrictSafe(districtId) : [];
  const browseThanas = districtId ? getThanasByDistrictSafe(districtId) : [];
  const browseUnions = upazilaId ? getUnionsByUpazilaSafe(upazilaId) : [];
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
    const perfect = Math.min(6, 3 + chosen + (seed > 4 ? 1 : 0));
    const criteria = 7;
    const good = criteria - perfect;
    return { score, perfect, good, criteria, label: score >= 93 ? "চমৎকার ম্যাচ" : score >= 88 ? "খুব ভালো ম্যাচ" : "ভালো ম্যাচ" };
  };
  const resetFilters = () => { setWho("সব"); setDivisionId(""); setDistrictId(""); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist("সব"); setVillage(""); setAge("সব"); setDeen("সব"); };
  const activeFilters = [
    who !== "সব" && { label: who, clear: () => setWho("সব") },
    dist !== "সব" && { label: dist, clear: () => { setDistrictId(""); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist("সব"); } },
    age !== "সব" && { label: `${age} বছর`, clear: () => setAge("সব") },
    deen !== "সব" && { label: deen, clear: () => setDeen("সব") },
    village && { label: village, clear: () => setVillage("") },
  ].filter(Boolean);
  return (
    <>
      <div className="pagehead"><div className="wrap">
        <div className="crumb"><Link to="/">হোম</Link> <span>›</span> <span>প্রোফাইল</span></div>
        <h1 className="serif">প্রোফাইল ব্রাউজ করুন</h1>
        <p>আপনার পছন্দ অনুযায়ী যাচাইকৃত প্রোফাইল খুঁজে নিন।</p>
      </div></div>
      <section className="block" style={{ paddingTop: 36 }}><div className="wrap">
        <div className="browse-mobile-tools">
          <button className="btn btn-green" onClick={() => setFiltersOpen(true)} aria-expanded={filtersOpen}><Ic d={I.search} s={17} c="#fff" /> ফিল্টার {activeFilters.length ? `(${activeFilters.length})` : ""}</button>
          <span>{list.length}টি ফলাফল</span>
        </div>
        {activeFilters.length > 0 && <div className="filter-chips" aria-label="সক্রিয় ফিল্টার">
          {activeFilters.map((filter) => <button key={filter.label} onClick={filter.clear}>{filter.label}<span aria-hidden="true">×</span></button>)}
          <button className="clear-all" onClick={resetFilters}>সব মুছুন</button>
        </div>}
        <div className="browse-grid">
          {filtersOpen && <button className="filter-backdrop" aria-label="ফিল্টার বন্ধ করুন" onClick={() => setFiltersOpen(false)} />}
          <aside className={`filters${filtersOpen ? " open" : ""}`}>
            <div className="filter-title"><h3>ফিল্টার</h3><button aria-label="ফিল্টার বন্ধ করুন" onClick={() => setFiltersOpen(false)}>×</button></div>
            <div className="field"><label>খুঁজছি</label><select value={who} onChange={(e) => setWho(e.target.value)}><option>সব</option><option>পাত্রী</option><option>পাত্র</option></select></div>
            <div className="field"><label>বিভাগ</label><select value={divisionId} onChange={(e) => { setDivisionId(e.target.value); setDistrictId(""); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist("সব"); }}><option value="">সব বিভাগ</option>{ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="field"><label>জেলা</label><select value={districtId} onChange={(e) => { const next = e.target.value; setDistrictId(next); setUpazilaId(""); setThanaId(""); setUnionId(""); setDist(bn(browseDistricts.find((d) => d.id === next)) || "সব"); }}><option value="">সব জেলা</option>{browseDistricts.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="field"><label>উপজেলা</label><select value={upazilaId} onChange={(e) => { setUpazilaId(e.target.value); setUnionId(""); }} disabled={!districtId}><option value="">সব উপজেলা</option>{browseUpazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="field"><label>থানা</label><select value={thanaId} onChange={(e) => setThanaId(e.target.value)} disabled={!districtId}><option value="">সব থানা</option>{browseThanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
            <div className="field"><label>ইউনিয়ন</label><select value={unionId} onChange={(e) => setUnionId(e.target.value)} disabled={!upazilaId}><option value="">সব ইউনিয়ন</option>{browseUnions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="field"><label>গ্রাম</label><input value={village} onChange={(e) => setVillage(e.target.value)} placeholder="গ্রামের নাম" /></div>
            <div className="field"><label>বয়স</label><select value={age} onChange={(e) => setAge(e.target.value)}><option>সব</option><option>১৮-২৪</option><option>২৫-৩০</option><option>৩১+</option></select></div>
            <div className="field"><label>দ্বীনদারিতা</label><select value={deen} onChange={(e) => setDeen(e.target.value)}><option>সব</option><option>নিয়মিত নামাজি</option><option>পর্দানশীন</option><option>হাফিজ</option><option>আলেম</option></select></div>
            <div className="filter-actions"><button className="btn btn-ghost" onClick={resetFilters}>রিসেট</button><button className="btn btn-gold" onClick={() => setFiltersOpen(false)}>ফলাফল দেখুন</button></div>
          </aside>
          <div>
            <div className="result-meta"><span><b>{list.length}</b> টি প্রোফাইল পাওয়া গেছে</span><button className="btn btn-gold" onClick={() => navigate("/register")}>বায়োডাটা তৈরি করুন</button></div>
            {list.length ? (
              <div className="grid3">{list.map((p) => <PCard key={p.id} p={p} match={matchFor(p)} go={go} />)}</div>
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
function encodeSharedProfile(profile) {
  const bytes = new TextEncoder().encode(JSON.stringify(profile));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeSharedProfile(value) {
  if (!value) return null;
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
    const profile = JSON.parse(new TextDecoder().decode(bytes));
    return profile?.id ? profile : null;
  } catch { return null; }
}

function getStoredProfile(id) {
  try { return JSON.parse(localStorage.getItem(`noornikah-profile-${id}`) || "null"); }
  catch { return null; }
}

function shareUrlFor(profile) {
  return `${window.location.origin}/profile/${encodeURIComponent(profile.id)}?bio=${encodeSharedProfile(profile)}`;
}

export function buildPublicProfile(f, id) {
  const rows = (...items) => items.filter(([, value]) => value !== undefined && value !== null && String(value).trim());
  const sections = [
    { title: "মৌলিক তথ্য", rows: rows(
      ["লিঙ্গ", f.gender], ["বয়স", f.age && `${f.age} বছর`], ["জন্মসাল", f.birthYear],
      ["উচ্চতা", f.height], ["ওজন", f.weight], ["রক্তের গ্রুপ", f.bloodGroup],
      ["গায়ের রং", f.complexion], ["বৈবাহিক অবস্থা", f.marital], ["জাতীয়তা", f.nationality],
    ) },
    { title: "ঠিকানা", rows: rows(
      ["জেলা", f.dist], ["উপজেলা", f.upazila], ["থানা", f.thana], ["ইউনিয়ন", f.union],
      ["গ্রাম/এলাকা", f.village], ["বর্তমান ঠিকানা", f.currentAddress], ["বেড়ে ওঠা", f.grewUp],
    ) },
    { title: "শিক্ষা ও পেশা", rows: rows(
      ["শিক্ষার মাধ্যম", f.educationMedium], ["শিক্ষাগত যোগ্যতা", f.edu], ["শিক্ষাপ্রতিষ্ঠান", f.institute],
      ["দ্বীনি শিক্ষা", f.religiousStudy], ["পেশা", f.job],
    ) },
    { title: "দ্বীনি তথ্য", rows: rows(
      ["দ্বীনদারিতা", f.deen], ["নামাজ", f.prayer], ["কুরআন তিলাওয়াত", f.quran],
      ["ফিকহ/মাযহাব", f.fiqh], ["মাহরাম-নন মাহরাম", f.mahram],
    ) },
    { title: "পারিবারিক তথ্য", rows: rows(
      ["বাবা", f.fatherStatus], ["বাবার পেশা", f.fatherJob], ["মা", f.motherStatus],
      ["মায়ের পেশা", f.motherJob], ["ভাই-বোন", f.siblings], ["অর্থনৈতিক অবস্থা", f.economicStatus],
      ["পরিবার সম্পর্কে", f.family], ["পরিবারের দ্বীনি অবস্থা", f.familyDeen], ["অভিভাবকের নাম", f.guardian],
    ) },
    { title: "বিয়ে সম্পর্কিত পরিকল্পনা", rows: rows(
      ["বিয়ের কারণ", f.marriageReason], ["জীবনসঙ্গীর পড়াশোনা", f.spouseStudy],
      ["জীবনসঙ্গীর চাকরি", f.spouseJob], ["বিয়ের পর বাসস্থান", f.residenceAfterMarriage],
    ) },
    { title: "প্রত্যাশিত জীবনসঙ্গী", rows: rows(
      ["প্রত্যাশিত বয়স", f.expectedAge], ["প্রত্যাশিত উচ্চতা", f.expectedHeight],
      ["প্রত্যাশিত শিক্ষা", f.expectedEducation], ["প্রত্যাশিত জেলা", f.expectedDistrict],
      ["প্রত্যাশিত বৈবাহিক অবস্থা", f.expectedMarital], ["প্রত্যাশিত গুণাবলি", f.expectedQualities],
    ) },
    { title: "নিজের সম্পর্কে", rows: rows(["শখ ও জীবনের লক্ষ্য", f.hobbies], ["বিস্তারিত", f.about]) },
  ].filter((section) => section.rows.length);

  return {
    id,
    who: f.gender === "নারী" || f.gender === "পাত্রী" ? "পাত্রী" : "পাত্র",
    age: f.age || "—",
    height: f.height || "—",
    marital: f.marital || "—",
    complexion: f.complexion || "—",
    dist: f.dist || "—",
    area: [f.upazila, f.thana, f.union, f.village].filter(Boolean).join(", ") || "—",
    job: f.job || "—",
    edu: [f.edu, f.institute].filter(Boolean).join(" · ") || "—",
    deen: f.deen || "—",
    sections,
    verified: false,
  };
}

function ProfileDetail({ fire }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const sharedProfile = decodeSharedProfile(new URLSearchParams(location.search).get("bio"));
  const p = PROFILES.find(prof => prof.id === id) || getStoredProfile(id) || (sharedProfile?.id === id ? sharedProfile : null);
  const Row = ({ k, v }) => (<div className="biorow"><span className="k">{k}</span><span className="v">{v || "—"}</span></div>);

  const copyProfileLink = async () => {
    if (!p) return;
    try { await navigator.clipboard.writeText(shareUrlFor(p)); fire("বায়োডাটার লিংক কপি করা হয়েছে!"); }
    catch { fire("লিংক কপি করা যায়নি।", "error"); }
  };

  const downloadPdf = async () => {
    if (!profileRef.current || !p) return;
    fire("PDF তৈরি হচ্ছে…", "info");
    try {
      const [{ default: html2canvas }, { default: JsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(profileRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        onclone: (documentClone) => documentClone.querySelectorAll(".print-hide").forEach((node) => { node.style.display = "none"; }),
      });
      const pdf = new JsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const margin = 28;
      const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;
      const imageHeight = canvas.height * pageWidth / canvas.width;
      const image = canvas.toDataURL("image/jpeg", 0.92);
      let remaining = imageHeight;
      let y = margin;
      pdf.addImage(image, "JPEG", margin, y, pageWidth, imageHeight);
      remaining -= pageHeight;
      while (remaining > 0) {
        pdf.addPage();
        y = margin - (imageHeight - remaining);
        pdf.addImage(image, "JPEG", margin, y, pageWidth, imageHeight);
        remaining -= pageHeight;
      }
      pdf.save(`NoorNikah-${p.id}.pdf`);
      fire("PDF ডাউনলোড হয়েছে।", "success");
    } catch { fire("PDF তৈরি করা যায়নি। আবার চেষ্টা করুন।", "error"); }
  };

  useEffect(() => {
    if (location.state?.downloadPdf && p) {
      const timer = setTimeout(() => {
        downloadPdf();
        navigate(location.pathname + location.search, { replace: true, state: {} });
      }, 500);
      return () => clearTimeout(timer);
    }
    if (location.state?.print) {
      const timer = setTimeout(() => {
        window.print();
        navigate(location.pathname, { replace: true, state: {} });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, location.search, navigate]);

  const PrintStyles = () => (
    <style type="text/css" media="print">{`
      @page { size: A4; margin: 20mm; }
      body { background-color: #fff !important; color: #000; }
      .nn { background: none !important; }
      .nn.dark { color-scheme: light; --bg: #fff; --ink: #000; --card: #fff; --line: #eee; }
      header, footer, .ai-assistant, .pagehead .crumb, .mobile-profile-actions, .interest-cta, .pd-card .btn-ghost, .pd-card .btn-gold, .guard, .print-hide { display: none !important; }
      .print-only-title { display: block; text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 1rem; margin-bottom: 1.5rem; }
      .print-only-title h1 { font-size: 24px; margin-bottom: 4px; }
      .print-only-title p { font-size: 12px; color: #666; }
      .pd { display: block; gap: 0; }
      .pd-card { box-shadow: none; border: 1px solid #ddd; padding: 1rem; margin-bottom: 1.5rem; display: flex; flex-direction: row; align-items: center; gap: 1.5rem; }
      .pd-card .ava { width: 100px; height: 100px; flex-shrink: 0; }
      .pd-card .meta { text-align: left; }
      .bio { padding: 0; }
      .biorow { border-bottom: 1px solid #eee; }
      .biorow .k { width: 150px; }
      h1, h2, h3 { color: #000 !important; }
      .deen { background: #eee !important; color: #000 !important; border: 1px solid #ddd; }
    `}</style>
  );

  if (!p) return (
    <section className="block"><div className="wrap"><div className="empty">
      <h2>বায়োডাটা পাওয়া যায়নি</h2>
      <p>লিংকটি অসম্পূর্ণ অথবা বায়োডাটাটি আর উপলভ্য নেই।</p>
      <button className="btn btn-gold" style={{ marginTop: 16 }} onClick={() => navigate("/browse")}>প্রোফাইল দেখুন</button>
    </div></div></section>
  );

  return (
    <>
      <PrintStyles />
      <div className="print-only-title" style={{ display: 'none' }}><h1>বায়োডাটা: #{p.id}</h1><p>noornikah-demo.vercel.app থেকে তৈরি</p></div>
      <div className="pagehead print-hide"><div className="wrap">
        <div className="crumb"><Link to="/">হোম</Link> <span>›</span> <Link to="/browse">প্রোফাইল</Link> <span>›</span> <span>#{p.id}</span></div>
      </div></div>
      <section style={{ paddingBottom: 70 }}><div className="wrap">
        <div className="pd" ref={profileRef}>
          <div className="pd-card">
            <div className="ava"><ProfileAvatar p={p} s={122} color="rgba(255,255,255,.52)" sw={1.3} /></div>
            <div className="meta">
              <div className="pid">{p.who} · #{p.id} {p.verified && <VerifiedBadge size={18} />}</div>
              <h2 className="serif">{p.age} বছর</h2>
              <div className="mini"><Ic d={I.pin} s={15} c={C.muted} /> {p.dist}, {p.area}</div>
              <div className="mini"><Ic d={I.briefcase} s={15} c={C.muted} /> {p.job}</div>
              <div className="mini"><Ic d={I.book} s={15} c={C.muted} /> {p.edu}</div>
              <span className="deen" style={{ display: "inline-block", marginTop: 8, fontSize: 12, background: "rgba(201,162,39,.14)", color: "#8a6d12", padding: "4px 10px", borderRadius: 999 }}>{p.deen}</span>
              {p.verified && <div className="guard" style={{ marginTop: 12, fontSize: 12 }}><VerifiedBadge size={18} /><span>বারাকাহ ভেরিফায়েড প্রোফাইল</span></div>}
              <button className="btn btn-gold interest-cta print-hide" onClick={() => navigate("/interest", { state: { profile: p } })}><Ic d={I.heart} s={18} c={C.green900} /> আগ্রহ পাঠান</button>
              <div className="print-hide" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => navigate("/browse")}><Ic d={I.back} s={16} c={C.green900} /> ফিরে যান</button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={copyProfileLink}>লিংক কপি</button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={downloadPdf}>PDF ডাউনলোড</button>
              </div>
            </div>
          </div>
          <div className="bio">
            {p.sections?.length ? p.sections.map((section) => (
              <div className="bio-sec" key={section.title}>
                <h3><Ic d={I.doc} s={18} /> {section.title}</h3>
                <div className="biorows">
                  {section.rows.map(([label, value]) => <Row key={label} k={label} v={value} />)}
                </div>
              </div>
            )) : <>
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
            </>}
            <div className="guard"><Ic d={I.shield} s={20} c={C.gold} /> <span>যোগাযোগ ও আগ্রহ প্রকাশ অভিভাবকের (ওয়ালি) সম্পৃক্ততায় সম্পন্ন হয়। সরাসরি যোগাযোগের তথ্য গোপন রাখা হয়েছে।</span></div>
          </div>
        </div>
      </div></section>
      <div className="mobile-profile-actions print-hide"><button className="btn btn-ghost" onClick={() => navigate("/browse")}><Ic d={I.back} s={17} /> ফিরে যান</button><button className="btn btn-gold" onClick={() => navigate("/interest", { state: { profile: p } })}><Ic d={I.heart} s={18} c={C.green900} /> আগ্রহ পাঠান</button></div>
    </>
  );
}

/* ---------- FOOTER PAGES ---------- */


function ContactPage({ fire }) {
  const navigate = useNavigate();
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
      <PageHead title="বার্তা গ্রহণ করা হয়েছে" desc="সহায়তা টিম আপনার বার্তাটি পর্যালোচনা করবে।" />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">ধন্যবাদ</h2>
        <p>আপনার বার্তা রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => navigate("/")}>হোমে ফিরুন</button>
          <button className="btn btn-ghost" onClick={() => setDone(false)}>আরেকটি বার্তা পাঠান</button>
        </div>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead title="যোগাযোগ" desc="প্রোফাইল, যাচাই বা সদস্যপদ সংক্রান্ত সহায়তার জন্য আমাদের সঙ্গে যোগাযোগ করুন।" />
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

function SafetyPage() {
  return (
    <>
      <PageHead title="নিরাপত্তা টিপস" desc="নিরাপদ, শালীন ও অভিভাবক-সম্পৃক্ত যোগাযোগের জন্য গুরুত্বপূর্ণ নির্দেশনা।" />
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

function FaqPage() {
  const [open, setOpen] = useState(0);
  const items = [
    ["নূর নিকাহ কী?", "এটি একটি ডেমো হালাল ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে প্রোফাইল দেখা, বায়োডাটা তৈরি ও নিরাপদ যোগাযোগের ধারণা দেখানো হয়েছে।"],
    ["প্রোফাইল তথ্য কি প্রকাশ্য?", "ডেমো ডিজাইনে ব্যক্তিগত যোগাযোগের তথ্য গোপন রাখা হয়েছে এবং আগ্রহ প্রকাশের জন্য সদস্যপদ/যাচাই ধাপ দেখানো হয়েছে।"],
    ["বায়োডাটা জমা দিলে তথ্য সংরক্ষণ হয়?", "এই Vite ডেমোতে ব্যাকএন্ড নেই, তাই ফর্ম সাবমিট করলে বাস্তবে ডেটা সংরক্ষণ হয় না।"],
    ["সদস্যপদ কীভাবে কাজ করে?", "হোম পেজের সদস্যপদ অংশে ডেমো প্ল্যান দেখানো আছে। বাস্তব ব্যবহারে পেমেন্ট ও যাচাই ব্যাকএন্ড দরকার হবে।"],
  ];
  return (
    <>
      <PageHead title="প্রশ্ন ও উত্তর" desc="প্ল্যাটফর্ম ব্যবহার নিয়ে সাধারণ প্রশ্নের উত্তর।" />
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

function PrivacyPage() {
  return (
    <>
      <PageHead title="গোপনীয়তা নীতি" desc="ব্যবহারকারীর তথ্য কীভাবে নিরাপদ রাখা হবে তার ডেমো নীতিমালা।" />
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

function TermsPage() {
  return (
    <>
      <PageHead title="ব্যবহারের শর্ত" desc="নূর নিকাহ ব্যবহারের সময় প্রত্যাশিত আচরণ ও দায়িত্ব।" />
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

function LegacyMembershipPage() {
  const navigate = useNavigate();
  const go = (page, data) => navigate(`/${page}`, { state: data });
  return (
    <>
      <PageHead title="সদস্যপদ" desc="আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন। ফ্রি প্রোফাইল তৈরি থেকে শুরু করে ভিআইপি ম্যাচমেকিং পর্যন্ত।" />
      <section className="block"><div className="wrap">
        <div className="plans">{[...PLANS, BARAKAH_PLAN].map((p) => <PlanCard key={p.id} p={p} go={go} />)}</div>
        <div className="info-card" style={{ marginTop: 22, borderColor: "rgba(22,137,229,.3)" }}>
          <h3><VerifiedBadge size={20} /> বারাকাহ ব্লু ব্যাজ</h3>
          <p style={{ color: C.muted, marginBottom: 16 }}>সাধারণ সদস্যপদের বাইরে এককালীন অতিরিক্ত পেমেন্টে প্রোফাইল যাচাই, ব্লু ব্যাজ এবং সার্চে অগ্রাধিকার নিন।</p>
          <button className="btn btn-green" onClick={() => navigate("/barakah")}>বিস্তারিত দেখুন</button>
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

function BarakahPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHead title="বারাকাহ ব্লু ব্যাজ" desc="আরও আস্থার সঙ্গে আপনার বায়োডাটা উপস্থাপন করুন।" />
      <section className="block"><div className="wrap">
        <div className="barakah-hero">
          <div>
            <span className="eyebrow"><VerifiedBadge size={18} /> প্রিমিয়াম ভেরিফিকেশন সেবা</span>
            <h2 className="serif" style={{ fontSize: 34, color: C.green900, marginTop: 16 }}>ব্লু ব্যাজে আপনার প্রোফাইল হবে আরও বিশ্বাসযোগ্য</h2>
            <p style={{ color: C.muted }}>আমাদের টিম তথ্য ও অভিভাবকের যোগাযোগ যাচাই করার পর যোগ্য প্রোফাইলে বারাকাহ ব্লু ব্যাজ দেবে। এটি সদস্যপদ থেকে আলাদা একটি ঐচ্ছিক সেবা।</p>
            <ul className="barakah-list">
              {BARAKAH_PLAN.items.map((item) => <li key={item}><Ic d={I.check} s={18} c="#1689e5" /> <span>{item}</span></li>)}
            </ul>
            <div className="guard"><Ic d={I.shield} s={20} c="#1689e5" /><span>পেমেন্ট করলেই ব্যাজ নিশ্চিত নয়—ম্যানুয়াল যাচাই সফল হলে ব্যাজ সক্রিয় হবে। যাচাই ব্যর্থ হলে আবেদনটি রিভিউ করা হবে।</span></div>
          </div>
          <div className="barakah-price">
            <VerifiedBadge size={42} />
            <h3 style={{ marginTop: 12 }}>বারাকাহ ভেরিফায়েড</h3>
            <div className="price serif" style={{ fontSize: 40, color: C.green900, margin: "8px 0" }}>{BARAKAH_PLAN.price}</div>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>{BARAKAH_PLAN.per}</p>
            <button className="btn btn-gold" style={{ width: "100%" }} onClick={() => navigate("/checkout", { state: { plan: BARAKAH_PLAN } })}>ব্লু ব্যাজের জন্য আবেদন করুন</button>
          </div>
        </div>
      </div></section>
    </>
  );
}

function StoriesPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHead title="সফলতার গল্প" desc="পরিবার, গোপনীয়তা ও দ্বীনি অগ্রাধিকারের মাধ্যমে তৈরি হওয়া কিছু ডেমো অভিজ্ঞতা।" />
      <section className="block"><div className="wrap">
        <div className="stories">{STORIES.map((s) => <StoryCard key={s.n} s={s} />)}</div>
        <div className="ctaband" style={{ marginTop: 30 }}>
          <h2 className="serif">আপনার গল্প শুরু করুন</h2>
          <p>বায়োডাটা তৈরি করুন এবং উপযুক্ত প্রোফাইল খুঁজে দেখুন।</p>
          <button className="btn btn-gold" onClick={() => navigate("/register")}>বায়োডাটা তৈরি করুন</button>
        </div>
      </div></section>
    </>
  );
}

/* ---------- ASSISTED MATCHMAKING SERVICE ---------- */
function LegacyAssistedPage({ fire }) {
  const navigate = useNavigate();
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
      <PageHead title="অনুরোধ গ্রহণ করা হয়েছে" desc="আমাদের ম্যাচমেকিং উপদেষ্টা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।" />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">জাযাকাল্লাহ! অনুরোধ জমা হয়েছে</h2>
        <p>আপনার সেবা অনুরোধ রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <p style={{ marginBottom: 20 }}>একজন নিবেদিত উপদেষ্টা আপনার চাহিদা বুঝে বাছাইকৃত প্রস্তাব নিয়ে যোগাযোগ করবেন। (এটি একটি ডেমো — তথ্য সংরক্ষণ হয়নি।)</p>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => navigate("/browse")}>প্রোফাইল দেখুন</button>
          <button className="btn btn-ghost" onClick={() => navigate("/")}>হোমে ফিরুন</button>
        </div>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead title="সহায়ক ম্যাচমেকিং সেবা" desc="আমাদের অভিজ্ঞ ম্যাচমেকিং উপদেষ্টা আপনার হয়ে উপযুক্ত জীবনসঙ্গী খুঁজে দেন — ব্যক্তিগত পরামর্শ, বাছাইকৃত প্রস্তাব ও ব্যক্তিগত ছোঁয়ায়।" />
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
          <div className="guard" style={{ marginTop: 18 }}><Ic d={I.moon} s={20} c={C.gold} /> <span>সহায়ক ম্যাচমেকিং সেবা ভিআইপি সদস্যপদের অন্তর্ভুক্ত। <a style={{ color: C.green700, fontWeight: 600 }} onClick={() => navigate("/membership")}>প্যাকেজ দেখুন</a></span></div>
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

function LegacyCheckoutPage({ fire }) {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;
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
      <PageHead title="সদস্যপদ অনুরোধ সম্পন্ন" desc="আপনার পেমেন্ট তথ্য যাচাইয়ের জন্য জমা হয়েছে।" />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">{selected.tag} প্যাকেজ</h2>
        <p>রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <p style={{ marginBottom: 20 }}>যাচাই সম্পন্ন হলে ড্যাশবোর্ডে সদস্যপদ সক্রিয় দেখাবে।</p>
        <button className="btn btn-gold" onClick={() => navigate("/dashboard", { state: { id: form.phone, plan: selected.tag } })}>ড্যাশবোর্ড দেখুন</button>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead title="সদস্যপদ নিন" desc={`${selected.tag} প্যাকেজের জন্য পেমেন্ট তথ্য জমা দিন।`} />
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

function InterestPage({ fire }) {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;
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
      <PageHead title="আগ্রহ প্রকাশ করা হয়েছে" desc={`প্রোফাইল #${p.id}-এর জন্য আপনার অনুরোধ জমা হয়েছে।`} />
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">ওয়ালি যাচাইয়ের অপেক্ষায়</h2>
        <p>রেফারেন্স নম্বর:</p>
        <div className="pid">{ref}</div>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => navigate("/browse")}>আরও প্রোফাইল দেখুন</button>
          <button className="btn btn-ghost" onClick={() => navigate("/dashboard", { state: { id: form.phone } })}>ড্যাশবোর্ড দেখুন</button>
        </div>
      </div></div></section>
    </>
  );
  return (
    <>
      <PageHead title="আগ্রহ প্রকাশ" desc={`প্রোফাইল #${p.id}-এর জন্য অভিভাবক-সম্পৃক্ত যোগাযোগ অনুরোধ পাঠান।`} />
      <section className="block"><div className="wrap"><div className="contact-panel content-page">
        <div className="info-card">
          <h3><Ic d={I.users} s={18} /> প্রোফাইল সারাংশ</h3>
          <ul>
            <li>{p.who} · {p.age} বছর</li>
            <li>{p.dist}, {p.area}</li>
            <li>{p.job}</li>
            <li>{p.deen}</li>
          </ul>
          <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => navigate(`/profile/${p.id}`)}>প্রোফাইলে ফিরুন</button>
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

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state || {};
  const completion = 78;
  return (
    <>
      <PageHead title="ড্যাশবোর্ড" desc="প্রোফাইল, আগ্রহ অনুরোধ ও সদস্যপদ এক জায়গায় দেখুন।" />
      <section className="block"><div className="wrap">
        <div className="dashboard-grid">
          <div className="dash-card completion-card"><div className="completion-ring" style={{ "--completion": completion }}><strong>{completion}%</strong></div><div><b>প্রোফাইল সম্পন্ন</b><span>আরও ৩টি তথ্য যোগ করুন</span></div></div>
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
              <button className="btn btn-gold" onClick={() => navigate("/register")}>বায়োডাটা আপডেট</button>
              <button className="btn btn-ghost" onClick={() => navigate("/browse")}>প্রোফাইল দেখুন</button>
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
function Register({ fire }) {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [f, setF] = useState({
    name: "", gender: "", age: "", birthYear: "", height: "", weight: "", bloodGroup: "", complexion: "", marital: "", nationality: "বাংলাদেশী",
    divisionId: "", districtId: "", upazilaId: "", thanaId: "", unionId: "", dist: "", upazila: "", thana: "", union: "", village: "", currentAddress: "", grewUp: "",
    educationMedium: "", edu: "", institute: "", religiousStudy: "", job: "", monthlyIncome: "",
    deen: "", prayer: "", quran: "", fiqh: "", mahram: "", health: "", hobbies: "",
    fatherStatus: "", fatherJob: "", motherStatus: "", motherJob: "", siblings: "", economicStatus: "", family: "", familyDeen: "",
    marriageReason: "", spouseStudy: "", spouseJob: "", residenceAfterMarriage: "",
    expectedAge: "", expectedHeight: "", expectedEducation: "", expectedDistrict: "", expectedMarital: "", expectedQualities: "",
    guardian: "", guardianPhone: "", about: "", phone: "", consent: false,
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  useEffect(() => {
    try { const draft = JSON.parse(localStorage.getItem("noornikah-biodata-draft") || "null"); if (draft) setF((current) => ({ ...current, ...draft, consent: false })); } catch { /* ignore an invalid draft */ }
  }, []);
  const saveDraft = () => { localStorage.setItem("noornikah-biodata-draft", JSON.stringify({ ...f, consent: false })); fire("খসড়া নিরাপদে সংরক্ষিত হয়েছে"); };
  const [newId] = useState(() => "NN-" + Math.floor(1000 + Math.random() * 9000));
  const formDistricts = f.divisionId ? getDistrictsByDivisionSafe(f.divisionId) : ALL_DISTRICTS;
  const formUpazilas = f.districtId ? getUpazilasByDistrictSafe(f.districtId) : [];
  const formThanas = f.districtId ? getThanasByDistrictSafe(f.districtId) : [];
  const formUnions = f.upazilaId ? getUnionsByUpazilaSafe(f.upazilaId) : [];
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
  const publicProfile = buildPublicProfile(f, newId);
  const copyCreatedLink = async () => {
    try { await navigator.clipboard.writeText(shareUrlFor(publicProfile)); fire("বায়োডাটার লিংক কপি করা হয়েছে!"); }
    catch { fire("লিংক কপি করা যায়নি।", "error"); }
  };
  const shareCreatedProfile = async () => {
    const url = shareUrlFor(publicProfile);
    if (navigator.share) {
      try { await navigator.share({ title: `নূর নিকাহ বায়োডাটা #${newId}`, text: "এই বায়োডাটাটি দেখুন", url }); }
      catch (error) { if (error?.name !== "AbortError") fire("শেয়ার করা যায়নি।", "error"); }
    } else copyCreatedLink();
  };
  const submit = () => {
    const nextErrors = { phone: !f.phone ? "মোবাইল নম্বর আবশ্যক" : "", consent: !f.consent ? "সম্মতি দেওয়া আবশ্যক" : "" };
    setErrors(nextErrors);
    if (nextErrors.phone || nextErrors.consent) { fire("আবশ্যক তথ্যগুলো পূরণ করুন"); return; }
    localStorage.removeItem("noornikah-biodata-draft");
    localStorage.setItem(`noornikah-profile-${newId}`, JSON.stringify(publicProfile));
    setDone(true); window.scrollTo(0, 0);
  };
  const nextStep = () => {
    const firstStepErrors = step === 1 ? { name: !f.name ? "পূর্ণ নাম আবশ্যক" : "", gender: !f.gender ? "লিঙ্গ নির্বাচন করুন" : "", age: !f.age ? "বয়স আবশ্যক" : "" } : {};
    setErrors(firstStepErrors);
    if (step === 1 && Object.values(firstStepErrors).some(Boolean)) {
      fire("নাম, লিঙ্গ ও বয়স পূরণ করুন");
      return;
    }
    setStep((current) => Math.min(current + 1, 6));
    window.scrollTo({ top: 180, behavior: "smooth" });
  };
  const stepLabels = ["সাধারণ", "দ্বীন ও শিক্ষা", "পরিবার", "বিয়ে পরিকল্পনা", "প্রত্যাশা", "যোগাযোগ"];
  if (done) return (
    <>
      <div className="pagehead"><div className="wrap"><div className="crumb"><Link to="/">হোম</Link> <span>›</span> <span>রেজিস্ট্রেশন</span></div><h1 className="serif">বায়োডাটা তৈরি</h1></div></div>
      <section className="block"><div className="wrap"><div className="success">
        <div className="badge"><Ic d={I.check} s={36} c={C.green600} sw={2.2} /></div>
        <h2 className="serif">আলহামদুলিল্লাহ! বায়োডাটা তৈরি হয়েছে</h2>
        <p>আপনার ডেমো প্রোফাইল আইডি:</p>
        <div className="pid">#{newId}</div>
        <p style={{ marginBottom: 22 }}>আপনার বায়োডাটা শেয়ার করুন অথবা PDF হিসেবে ডাউনলোড করুন।</p>
        <div className="actionbar" style={{ justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => navigate(`/profile/${newId}`)}>প্রোফাইল দেখুন</button>
          <button className="btn btn-green" onClick={shareCreatedProfile}>শেয়ার করুন</button>
          <button className="btn btn-ghost" onClick={copyCreatedLink}>লিংক কপি করুন</button>
          <button className="btn btn-ghost" onClick={() => navigate(`/profile/${newId}`, { state: { downloadPdf: true } })}>PDF ডাউনলোড</button>
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: C.muted }}>অন্যান্য প্রোফাইল দেখতে <a onClick={() => navigate('/browse')} style={{ cursor: 'pointer', color: C.green700, fontWeight: 600 }}>ব্রাউজ করুন</a> অথবা <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: C.green700, fontWeight: 600 }}>হোমে ফিরুন</a>।</p>
      </div></div></section>
    </>
  );
  return (
    <>
      <div className="pagehead"><div className="wrap">
        <div className="crumb"><Link to="/">হোম</Link> <span>›</span> <span>রেজিস্ট্রেশন</span></div>
        <h1 className="serif">বায়োডাটা তৈরি করুন</h1><p>বিনামূল্যে আপনার প্রোফাইল তৈরি করুন। সব তথ্য গোপন থাকে।</p>
      </div></div>
      <section className="block" style={{ paddingTop: 40 }}><div className="wrap"><div className="formwrap">
        <div className="form-progress" aria-label={`ধাপ ${step} / ৬`}>
          <div className="progress-head"><b>বায়োডাটা তৈরির ধাপ</b><span>{step} / ৬</span></div>
          <div className="progress-track"><span style={{ width: `${step * (100 / 6)}%` }} /></div>
          <div className="step-tabs">{stepLabels.map((label, index) => (
            <button type="button" key={label} className={step === index + 1 ? "active" : step > index + 1 ? "done" : ""} onClick={() => index + 1 < step && setStep(index + 1)}>
              <span>{step > index + 1 ? "✓" : index + 1}</span>{label}
            </button>
          ))}</div>
        </div>
        {step === 1 && <div className="formcard step-panel"><h3><Ic d={I.users} s={18} /> ব্যক্তিগত তথ্য</h3>
          <div className="frow">
            <div className={`fgroup${errors.name ? " has-error" : ""}`}><label>পূর্ণ নাম *</label><input value={f.name} onChange={set("name")} placeholder="আপনার নাম" aria-invalid={Boolean(errors.name)} />{errors.name && <small className="field-error">{errors.name}</small>}</div>
            <div className={`fgroup${errors.gender ? " has-error" : ""}`}><label>লিঙ্গ *</label><select value={f.gender} onChange={set("gender")} aria-invalid={Boolean(errors.gender)}><option value="">নির্বাচন</option><option>পাত্র</option><option>পাত্রী</option></select>{errors.gender && <small className="field-error">{errors.gender}</small>}</div>
            <div className={`fgroup${errors.age ? " has-error" : ""}`}><label>বয়স *</label><input value={f.age} onChange={set("age")} type="number" placeholder="যেমন ২৫" aria-invalid={Boolean(errors.age)} />{errors.age && <small className="field-error">{errors.age}</small>}</div>
            <div className="fgroup"><label>জন্মসন</label><input value={f.birthYear} onChange={set("birthYear")} type="number" placeholder="যেমন ২০০০" /></div>
            <div className="fgroup"><label>উচ্চতা</label><input value={f.height} onChange={set("height")} placeholder="যেমন ৫'৬&quot;" /></div>
            <div className="fgroup"><label>ওজন</label><input value={f.weight} onChange={set("weight")} placeholder="যেমন ৬০ কেজি" /></div>
            <div className="fgroup"><label>রক্তের গ্রুপ</label><select value={f.bloodGroup} onChange={set("bloodGroup")}><option value="">নির্বাচন</option>{["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((v) => <option key={v}>{v}</option>)}</select></div>
            <div className="fgroup"><label>গাত্রবর্ণ</label><select value={f.complexion} onChange={set("complexion")}><option value="">নির্বাচন</option><option>শ্যামলা</option><option>উজ্জ্বল শ্যামলা</option><option>ফর্সা</option><option>উজ্জ্বল ফর্সা</option></select></div>
            <div className="fgroup"><label>বিভাগ</label><select value={f.divisionId} onChange={updateDivision}><option value="">নির্বাচন</option>{ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="fgroup"><label>জেলা</label><select value={f.districtId} onChange={updateDistrict}><option value="">নির্বাচন</option>{formDistricts.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
            <div className="fgroup"><label>উপজেলা</label><select value={f.upazilaId} onChange={updateUpazila} disabled={!f.districtId}><option value="">নির্বাচন</option>{formUpazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="fgroup"><label>থানা</label><select value={f.thanaId} onChange={updateThana} disabled={!f.districtId}><option value="">নির্বাচন</option>{formThanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
            <div className="fgroup"><label>ইউনিয়ন</label><select value={f.unionId} onChange={updateUnion} disabled={!f.upazilaId}><option value="">নির্বাচন</option>{formUnions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
            <div className="fgroup"><label>গ্রাম</label><input value={f.village} onChange={set("village")} placeholder="গ্রামের নাম" /></div>
            <div className="fgroup full"><label>বর্তমান ঠিকানা</label><input value={f.currentAddress} onChange={set("currentAddress")} placeholder="বর্তমানে যেখানে বসবাস করছেন" /></div>
            <div className="fgroup"><label>কোথায় বড় হয়েছেন?</label><input value={f.grewUp} onChange={set("grewUp")} placeholder="জেলা বা এলাকার নাম" /></div>
            <div className="fgroup"><label>জাতীয়তা</label><input value={f.nationality} onChange={set("nationality")} /></div>
            <div className="fgroup"><label>বৈবাহিক অবস্থা</label><select value={f.marital} onChange={set("marital")}><option value="">নির্বাচন</option><option>অবিবাহিত</option><option>বিবাহবিচ্ছিন্ন</option><option>বিধবা/বিপত্নীক</option></select></div>
          </div>
        </div>}
        {step === 2 && <><div className="formcard step-panel"><h3><Ic d={I.moon} s={18} /> ধর্মীয় তথ্য</h3>
          <div className="frow">
            <div className="fgroup full"><label>দ্বীনদারিতা</label><input value={f.deen} onChange={set("deen")} placeholder="যেমন নিয়মিত নামাজ, পর্দানশীন" /></div>
            <div className="fgroup"><label>পাঁচ ওয়াক্ত নামাজ</label><select value={f.prayer} onChange={set("prayer")}><option value="">নির্বাচন</option><option>নিয়মিত</option><option>অধিকাংশ সময়</option><option>অনিয়মিত</option></select></div>
            <div className="fgroup"><label>শুদ্ধ কুরআন তিলাওয়াত</label><select value={f.quran} onChange={set("quran")}><option value="">নির্বাচন</option><option>পারি</option><option>শিখছি</option><option>পারি না</option></select></div>
            <div className="fgroup"><label>ফিকহ অনুসরণ</label><select value={f.fiqh} onChange={set("fiqh")}><option value="">নির্বাচন</option><option>হানাফি</option><option>শাফিঈ</option><option>মালিকি</option><option>হাম্বলি</option><option>আহলে হাদীস / সালাফি</option></select></div>
            <div className="fgroup"><label>মাহরাম/নন-মাহরাম মেনে চলেন?</label><select value={f.mahram} onChange={set("mahram")}><option value="">নির্বাচন</option><option>হ্যাঁ</option><option>চেষ্টা করছি</option><option>না</option></select></div>
            <div className="fgroup full"><label>স্বাস্থ্যগত গুরুত্বপূর্ণ তথ্য <span className="private-label">গোপনীয়</span></label><input value={f.health} onChange={set("health")} placeholder="প্রয়োজনীয় হলে সংক্ষেপে লিখুন" /></div>
            <div className="fgroup full"><label>শখ, রুচিবোধ ও জীবনের লক্ষ্য</label><textarea value={f.hobbies} onChange={set("hobbies")} placeholder="আপনার আগ্রহ ও স্বপ্ন সম্পর্কে লিখুন" /></div>
          </div>
        </div>
        <div className="formcard"><h3><Ic d={I.book} s={18} /> শিক্ষা ও পেশা</h3>
          <div className="frow">
            <div className="fgroup"><label>শিক্ষার মাধ্যম</label><select value={f.educationMedium} onChange={set("educationMedium")}><option value="">নির্বাচন</option><option>জেনারেল</option><option>কওমি</option><option>আলিয়া</option><option>অন্যান্য</option></select></div>
            <div className="fgroup"><label>শিক্ষাগত যোগ্যতা</label><input value={f.edu} onChange={set("edu")} placeholder="যেমন স্নাতক" /></div>
            <div className="fgroup"><label>শিক্ষাপ্রতিষ্ঠান</label><input value={f.institute} onChange={set("institute")} placeholder="প্রতিষ্ঠানের নাম" /></div>
            <div className="fgroup"><label>দ্বীনি শিক্ষাগত যোগ্যতা</label><input value={f.religiousStudy} onChange={set("religiousStudy")} placeholder="যেমন হাফেজ, আলেম বা কোর্স" /></div>
          </div>
        </div></>}
        {step === 3 && <div className="formcard step-panel"><h3><Ic d={I.home} s={18} /> পারিবারিক ও অভিভাবক</h3>
          <div className="frow">
            <div className="fgroup"><label>পিতা জীবিত?</label><select value={f.fatherStatus} onChange={set("fatherStatus")}><option value="">নির্বাচন</option><option>জী, জীবিত</option><option>মৃত</option></select></div>
            <div className="fgroup"><label>পিতার পেশা</label><input value={f.fatherJob} onChange={set("fatherJob")} placeholder="পেশার বিবরণ" /></div>
            <div className="fgroup"><label>মাতা জীবিত?</label><select value={f.motherStatus} onChange={set("motherStatus")}><option value="">নির্বাচন</option><option>জী, জীবিত</option><option>মৃত</option></select></div>
            <div className="fgroup"><label>মাতার পেশা</label><input value={f.motherJob} onChange={set("motherJob")} placeholder="পেশার বিবরণ" /></div>
            <div className="fgroup full"><label>ভাই-বোনের তথ্য</label><textarea value={f.siblings} onChange={set("siblings")} placeholder="কতজন এবং সংক্ষেপে তাদের সম্পর্কে" /></div>
            <div className="fgroup"><label>পারিবারিক অর্থনৈতিক অবস্থা</label><select value={f.economicStatus} onChange={set("economicStatus")}><option value="">নির্বাচন</option><option>উচ্চবিত্ত</option><option>উচ্চ মধ্যবিত্ত</option><option>মধ্যবিত্ত</option><option>নিম্ন মধ্যবিত্ত</option><option>নিম্নবিত্ত</option></select></div>
            <div className="fgroup full"><label>পরিবার সম্পর্কে</label><textarea value={f.family} onChange={set("family")} placeholder="সংক্ষেপে পরিবারের তথ্য" /></div>
            <div className="fgroup full"><label>পারিবারিক দ্বীনি পরিবেশ</label><textarea value={f.familyDeen} onChange={set("familyDeen")} placeholder="পরিবারে দ্বীন পালনের পরিবেশ সম্পর্কে" /></div>
          </div>
        </div>}
        {step === 4 && <div className="formcard step-panel"><h3><Ic d={I.briefcase} s={18} /> পেশা ও বিয়ে-পরবর্তী পরিকল্পনা</h3>
          <div className="frow">
            <div className="fgroup"><label>পেশা</label><input value={f.job} onChange={set("job")} placeholder="যেমন শিক্ষক" /></div>
            <div className="fgroup"><label>মাসিক আয় <span className="private-label">গোপনীয়</span></label><input value={f.monthlyIncome} onChange={set("monthlyIncome")} placeholder="আনুমানিক পরিমাণ" /></div>
            <div className="fgroup full"><label>কেন বিয়ে করতে চান?</label><textarea value={f.marriageReason} onChange={set("marriageReason")} placeholder="বিয়ে সম্পর্কে আপনার চিন্তা লিখুন" /></div>
            <div className="fgroup"><label>বিয়ের পর জীবনসঙ্গীর পড়াশোনা</label><select value={f.spouseStudy} onChange={set("spouseStudy")}><option value="">নির্বাচন</option><option>চালিয়ে যেতে পারবেন</option><option>আলোচনা সাপেক্ষে</option><option>চাই না</option></select></div>
            <div className="fgroup"><label>বিয়ের পর জীবনসঙ্গীর চাকরি</label><select value={f.spouseJob} onChange={set("spouseJob")}><option value="">নির্বাচন</option><option>সম্মতি আছে</option><option>আলোচনা সাপেক্ষে</option><option>চাই না</option></select></div>
            <div className="fgroup full"><label>বিয়ের পর কোথায় থাকবেন?</label><input value={f.residenceAfterMarriage} onChange={set("residenceAfterMarriage")} placeholder="বাসস্থানের পরিকল্পনা" /></div>
          </div>
        </div>}
        {step === 5 && <div className="formcard step-panel"><h3><Ic d={I.heart} s={18} /> প্রত্যাশিত জীবনসঙ্গী</h3>
          <div className="frow">
            <div className="fgroup"><label>প্রত্যাশিত বয়স</label><input value={f.expectedAge} onChange={set("expectedAge")} placeholder="যেমন ২২–২৮" /></div>
            <div className="fgroup"><label>প্রত্যাশিত উচ্চতা</label><input value={f.expectedHeight} onChange={set("expectedHeight")} placeholder="যেমন ৫'২&quot;–৫'৬&quot;" /></div>
            <div className="fgroup"><label>শিক্ষাগত যোগ্যতা</label><input value={f.expectedEducation} onChange={set("expectedEducation")} placeholder="ন্যূনতম বা পছন্দের যোগ্যতা" /></div>
            <div className="fgroup"><label>পছন্দের জেলা</label><input value={f.expectedDistrict} onChange={set("expectedDistrict")} placeholder="যেকোনো জেলা হলে তা লিখুন" /></div>
            <div className="fgroup"><label>বৈবাহিক অবস্থা</label><select value={f.expectedMarital} onChange={set("expectedMarital")}><option value="">নির্বাচন</option><option>অবিবাহিত</option><option>বিবাহবিচ্ছিন্ন</option><option>বিধবা/বিপত্নীক</option><option>আলোচনা সাপেক্ষে</option></select></div>
            <div className="fgroup full"><label>প্রত্যাশিত গুণাবলি</label><textarea value={f.expectedQualities} onChange={set("expectedQualities")} placeholder="দ্বীন, চরিত্র, পরিবার ও জীবনবোধ সম্পর্কে প্রত্যাশা" /></div>
          </div>
        </div>}
        {step === 6 && <div className="formcard step-panel"><h3><Ic d={I.lock} s={18} /> নিজের পরিচয়, অভিভাবক ও অঙ্গীকার</h3>
          <div className="frow">
            <div className="fgroup full"><label>নিজের সম্পর্কে বিস্তারিত</label><textarea value={f.about} onChange={set("about")} placeholder="নিজের স্বভাব, লক্ষ্য ও গুরুত্বপূর্ণ বিষয় লিখুন" /></div>
            <div className="fgroup"><label>অভিভাবকের নাম</label><input value={f.guardian} onChange={set("guardian")} placeholder="ওয়ালির নাম" /></div>
            <div className="fgroup"><label>অভিভাবকের মোবাইল <span className="private-label">গোপনীয়</span></label><input value={f.guardianPhone} onChange={set("guardianPhone")} placeholder="01XXXXXXXXX" /></div>
            <div className={`fgroup full${errors.phone ? " has-error" : ""}`}><label>আপনার মোবাইল নম্বর * <span className="private-label">গোপনীয়</span></label><input value={f.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="field-error">{errors.phone}</small>}</div>
            <label className={`consent-box full${errors.consent ? " has-error" : ""}`}><input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} /><span><b>অঙ্গীকার</b> — প্রদত্ত তথ্য সত্য, অভিভাবক অবগত এবং যাচাইয়ের প্রয়োজনে কর্তৃপক্ষ যোগাযোগ করতে পারবে।{errors.consent && <small className="field-error">{errors.consent}</small>}</span></label>
          </div>
        </div>}
        <div className="step-actions">
          <button className="btn btn-ghost" onClick={() => step === 1 ? navigate("/") : setStep(step - 1)}>{step === 1 ? "বাতিল" : "← পেছনে"}</button>
          <button className="btn draft-btn" onClick={saveDraft}>খসড়া রাখুন</button>
          {step < 6
            ? <button className="btn btn-gold btn-lg" onClick={nextStep}>পরবর্তী ধাপ →</button>
            : <button className="btn btn-gold btn-lg" onClick={submit}><Ic d={I.check} s={18} c={C.green900} /> বায়োডাটা জমা দিন</button>}
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted }}>ইতিমধ্যে অ্যাকাউন্ট আছে? <a style={{ color: C.green700, fontWeight: 600 }} onClick={() => navigate("/login")}>লগইন করুন</a></p>
      </div></div></section>
    </>
  );
}

/* ---------- LOGIN ---------- */
function Login({ fire }) {
  const navigate = useNavigate();
  const [id, setId] = useState(""); const [pw, setPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = () => {
    if (!id || !pw) { fire("মোবাইল/প্রোফাইল আইডি ও পাসওয়ার্ড দিন"); return; }
    navigate("/dashboard", { state: { id } });
  };
  return (
    <>
      <div className="pagehead"><div className="wrap"><div className="crumb"><Link to="/">হোম</Link> <span>›</span> <span>লগইন</span></div><h1 className="serif">লগইন করুন</h1></div></div>
      <section className="block"><div className="wrap"><div className="authcard">
        <div style={{ textAlign: "center", marginBottom: 18 }}>{Logo}</div>
        <h2 className="serif" style={{ textAlign: "center" }}>স্বাগতম</h2>
        <p className="sub" style={{ textAlign: "center" }}>আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        <div className="fgroup"><label>মোবাইল / প্রোফাইল আইডি</label><input value={id} onChange={(e) => setId(e.target.value)} placeholder="01XXXXXXXXX বা NN-XXXX" /></div>
        <div className="fgroup"><label>পাসওয়ার্ড</label><div className="password-field"><input type={showPassword ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}>{showPassword ? "লুকান" : "দেখুন"}</button></div></div>
        <button className="btn btn-gold" style={{ width: "100%", marginTop: 6 }} onClick={login}>লগইন</button>
        <p style={{ textAlign: "center", marginTop: 18, fontSize: 14, color: C.muted }}>অ্যাকাউন্ট নেই? <a style={{ color: C.green700, fontWeight: 600 }} onClick={() => navigate("/register")}>বায়োডাটা তৈরি করুন</a></p>
      </div></div></section>
    </>
  );
}

/* ---------- root router ---------- */
const HomeView = (props) => <Home {...props} />;
const BrowseView = (props) => <Browse {...props} />;
const ProfileView = (props) => <ProfileDetail {...props} />;
const RegisterView = (props) => <Register {...props} />;
const LoginView = (props) => <Login {...props} />;
const MembershipView = (props) => <LegacyMembershipPage {...props} />;
const AssistedView = (props) => <LegacyAssistedPage {...props} />;
const CheckoutView = (props) => <LegacyCheckoutPage {...props} />;

export default function NoorNikah() {
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("noornikah-theme") || "light");
  const location = useLocation();

  const fire = (message, type) => {
    const inferredType = type || (/সংরক্ষিত|সফল|হয়েছে/.test(message) ? "success" : /পূরণ|আবশ্যক|দিন|সম্মতি/.test(message) ? "error" : "info");
    setToast({ message, type: inferredType });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location]);

  const toggleTheme = () => setTheme((current) => { const next = current === "dark" ? "light" : "dark"; localStorage.setItem("noornikah-theme", next); return next; });

  return (
    <div className={`nn${theme === "dark" ? " dark" : ""}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <React.Suspense fallback={<div className="wrap page-skeleton" aria-label="পেজ লোড হচ্ছে"><span /><span /><span /></div>}>
        <Routes>
          <Route path="/" element={<HomeView fire={fire} />} />
          <Route path="/browse" element={<BrowseView fire={fire} />} />
          <Route path="/profile/:id" element={<ProfileView fire={fire} />} />
          <Route path="/register" element={<RegisterView fire={fire} />} />
          <Route path="/login" element={<LoginView fire={fire} />} />
          <Route path="/membership" element={<MembershipView />} />
          <Route path="/barakah" element={<BarakahPage />} />
          <Route path="/assisted" element={<AssistedView fire={fire} />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/checkout" element={<CheckoutView fire={fire} />} />
          <Route path="/interest" element={<InterestPage fire={fire} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact" element={<ContactPage fire={fire} />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </React.Suspense>
      <Footer />
      <AiAssistant />
      {toast && <div className={`toast ${toast.type}`} role="status" aria-live="polite"><span>{toast.type === "success" ? "✓" : toast.type === "error" ? "!" : "i"}</span>{toast.message}</div>}
    </div>
  );
}
