import React, { useState } from "react";
import { C, Ic, I, PROFILES, PLANS, BARAKAH_PLAN, STORIES, bn, ALL_DIVISIONS, ALL_DISTRICTS, getDistrictsByDivisionSafe, getUpazilasByDistrictSafe, getThanasByDistrictSafe, getUnionsByUpazilaSafe, PCard, PlanCard, StoryCard } from "./shared";

export default function HomePage({ go, fire }) {
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
  const [advancedSearch, setAdvancedSearch] = useState(false);
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
              {advancedSearch && <><div className="field advanced-field"><label>উপজেলা</label><select value={searchUpazilaId} onChange={(e) => { setSearchUpazilaId(e.target.value); setSearchUnionId(""); }} disabled={!searchDistrictId}><option value="">সব উপজেলা</option>{homeUpazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
              <div className="field"><label>থানা</label><select value={searchThanaId} onChange={(e) => setSearchThanaId(e.target.value)} disabled={!searchDistrictId}><option value="">সব থানা</option>{homeThanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
              <div className="field"><label>ইউনিয়ন</label><select value={searchUnionId} onChange={(e) => setSearchUnionId(e.target.value)} disabled={!searchUpazilaId}><option value="">সব ইউনিয়ন</option>{homeUnions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
              <div className="field"><label>গ্রাম</label><input value={searchVillage} onChange={(e) => setSearchVillage(e.target.value)} placeholder="গ্রামের নাম" /></div>
              <div className="field"><label>দ্বীনদারিতা</label><select value={searchDeen} onChange={(e) => setSearchDeen(e.target.value)}><option>সব</option><option>নিয়মিত নামাজি</option><option>পর্দানশীন</option><option>হাফিজ/হাফিজা</option><option>আলেম</option></select></div></>}
              <button className="btn btn-gold" onClick={() => go("browse", { who: side, age: searchAge, dist: searchDist, divisionId: searchDivisionId, districtId: searchDistrictId, upazilaId: searchUpazilaId, thanaId: searchThanaId, unionId: searchUnionId, upazila: bn(selectedHomeUpazila), thana: bn(selectedHomeThana), union: bn(selectedHomeUnion), village: searchVillage, deen: searchDeen })}><Ic d={I.search} s={17} c={C.green900} /> খুঁজুন</button>
            </div>
            <button className="advanced-toggle" onClick={() => setAdvancedSearch((value) => !value)}>{advancedSearch ? "কম ফিল্টার দেখুন" : "আরও ফিল্টার দেখুন"} <span>{advancedSearch ? "−" : "+"}</span></button>
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
        {[['৫০,০০০+', 'নিবন্ধিত সদস্য'], ['১,২০০+', 'সম্পন্ন বিবাহ'], ['৬৪', 'জেলায় সদস্য'], ['১০০%', 'যাচাইকৃত প্রোফাইল']].map(([n, l]) => (
          <div className="stat" key={l}><div className="num serif">{n}</div><div className="lbl">{l}</div></div>))}
      </div></div>

      <section className="block" id="how"><div className="wrap">
        <div className="head"><div className="kicker">প্রক্রিয়া</div><h2 className="serif">মাত্র চারটি ধাপে</h2><p>সহজ, স্বচ্ছ ও শরীয়াহসম্মত একটি যাত্রা।</p></div>
        <div className="steps">{[
          { ic: I.doc, t: 'বায়োডাটা তৈরি', d: 'বিনামূল্যে অ্যাকাউন্ট খুলে বিস্তারিত বায়োডাটা যুক্ত করুন।' },
          { ic: I.search, t: 'প্রোফাইল খুঁজুন', d: 'বয়স, জেলা ও দ্বীনদারিতা অনুযায়ী প্রোফাইল দেখুন।' },
          { ic: I.chat, t: 'নিরাপদে যোগাযোগ', d: 'অভিভাবকের সম্মতিতে পর্দা রক্ষা করে যোগাযোগ করুন।' },
          { ic: I.ring, t: 'শুভ পরিণয়', d: 'পারিবারিক সম্মতিতে সম্পন্ন করুন পবিত্র নিকাহ।' },
        ].map((s, i) => (<div className="step" key={i}><div className="n serif">০{i + 1}</div><div className="ic"><Ic d={s.ic} /></div><h3>{s.t}</h3><p>{s.d}</p></div>))}</div>
      </div></section>

      <section className="block" style={{ background: '#EFEADD' }}><div className="wrap">
        <div className="head"><div className="kicker">সাম্প্রতিক</div><h2 className="serif">নতুন প্রোফাইল সমূহ</h2><p>গোপনীয়তা রক্ষার্থে ছবি গোপন; বিস্তারিত দেখতে কার্ডে ক্লিক করুন।</p></div>
        <div className="profiles">{PROFILES.slice(0, 4).map((p) => <PCard key={p.id} p={p} go={go} />)}</div>
        <div style={{ textAlign: 'center', marginTop: 34 }}><button className="btn btn-green" onClick={() => go('browse')}>সব প্রোফাইল দেখুন</button></div>
      </div></section>

      <section className="block"><div className="wrap">
        <div className="head"><div className="kicker">কেন নূর নিকাহ</div><h2 className="serif">আস্থা, গোপনীয়তা ও দ্বীন</h2></div>
        <div className="values">{[
          { ic: I.shield, t: 'যাচাইকৃত সদস্য', d: 'প্রতিটি প্রোফাইল NID ও মোবাইলে যাচাই করা হয়।' },
          { ic: I.lock, t: 'তথ্যের গোপনীয়তা', d: 'ছবি ও যোগাযোগ আপনার অনুমতি ছাড়া কেউ দেখে না।' },
          { ic: I.users, t: 'অভিভাবকের সম্পৃক্ততা', d: 'ওয়ালি যুক্ত করে রাখুন পরিবারকে।' },
          { ic: I.moon, t: 'দ্বীনি মানদণ্ড', d: 'নামাজ, পর্দা ও আদর্শের ভিত্তিতে খুঁজুন।' },
          { ic: I.chat, t: 'শরীয়াহসম্মত যোগাযোগ', d: 'পর্দা রক্ষা করে মার্জিত যোগাযোগ।' },
          { ic: I.heart, t: 'নিবেদিত সহায়তা', d: 'প্রতিটি ধাপে আমাদের টিম পাশে থাকে।' },
        ].map((v, i) => (<div className="val" key={i}><div className="ic"><Ic d={v.ic} c={C.goldSoft} /></div><div><h3>{v.t}</h3><p>{v.d}</p></div></div>))}</div>
      </div></section>

      <section className="block"><div className="wrap">
        <div className="ctaband">
          <div style={{ display: 'inline-flex', marginBottom: 14 }}><Ic d={I.users} s={40} c={C.goldSoft} /></div>
          <span className="tag" style={{ color: C.goldSoft, letterSpacing: 1.5, textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>সহায়ক ম্যাচমেকিং সেবা</span>
          <h2 className="serif">নিজে খুঁজতে সময় নেই? আমাদের উপদেষ্টা খুঁজে দেবেন</h2>
          <p>একজন অভিজ্ঞ ম্যাচমেকিং উপদেষ্টা আপনাকে বুঝে, হাজারো প্রোফাইল থেকে উপযুক্ত ম্যাচ বাছাই করে, আপনার হয়ে যোগাযোগ ও সাক্ষাৎ পর্যন্ত সব সামলান — ব্যক্তিগত ছোঁয়ায়।</p>
          <button className="btn btn-gold btn-lg" onClick={() => go('assisted')}>সহায়ক সেবা সম্পর্কে জানুন</button>
        </div>
      </div></section>

      <section className="block" id="plans" style={{ background: '#EFEADD' }}><div className="wrap">
        <div className="head"><div className="kicker">সদস্যপদ</div><h2 className="serif">আপনার জন্য উপযুক্ত প্যাকেজ</h2><p>বিনামূল্যে শুরু করুন, প্রয়োজনে আপগ্রেড করুন। (মূল্য ডেমো)</p></div>
        <div className="plans">{[...PLANS, BARAKAH_PLAN].map((p) => (<PlanCard key={p.id} p={p} go={go} />))}</div>
      </div></section>

      <section className="block" id="stories"><div className="wrap">
        <div className="head"><div className="kicker">আলহামদুলিল্লাহ</div><h2 className="serif">সফলতার গল্প</h2><p>(নিচের গল্পগুলো ডেমো)</p></div>
        <div className="stories">{STORIES.map((s) => <StoryCard key={s.n} s={s} />)}</div>
      </div></section>

      <section className="block" id="faq" style={{ background: '#EFEADD' }}><div className="wrap">
        <div className="head"><div className="kicker">সাধারণ জিজ্ঞাসা</div><h2 className="serif">প্রশ্ন ও উত্তর</h2></div>
        <div className="faq">{faqs.map((f, i) => (<div className="qa" key={i}><button onClick={() => setFaq(faq === i ? -1 : i)}>{f.q}<Ic d={faq === i ? <path d="M5 13l4 4L19 7" /> : <path d="M12 5v14M5 12h14" />} s={18} c={C.gold} /></button>{faq === i && <div className="ans">{f.a}</div>}</div>))}</div>
      </div></section>

      <section className="block" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="ctaband">
          <div style={{ display: 'inline-flex', marginBottom: 14 }}><Ic d={I.moon} s={40} c={C.goldSoft} /></div>
          <h2 className="serif">আপনার পবিত্র যাত্রা শুরু হোক আজই</h2>
          <p>বিনামূল্যে বায়োডাটা তৈরি করুন এবং দ্বীনদার জীবনসঙ্গীর সন্ধানে প্রথম ধাপ নিন।</p>
          <button className="btn btn-gold btn-lg" onClick={() => go('register')}>বিনামূল্যে শুরু করুন</button>
        </div>
      </div></section>
    </>
  );
}
