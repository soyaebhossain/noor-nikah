import React, { useMemo, useState } from "react";
import { PROFILES, ALL_DIVISIONS, ALL_DISTRICTS, getDistrictsByDivisionSafe, getUpazilasByDistrictSafe, getThanasByDistrictSafe, getUnionsByUpazilaSafe, PCard, PageHead, bn } from "./shared";

export default function BrowsePage({ go, routeState }) {
  const [who, setWho] = useState(routeState?.who || "পাত্রী");
  const [age, setAge] = useState(routeState?.age || "সব");
  const [divisionId, setDivisionId] = useState(routeState?.divisionId || "");
  const [districtId, setDistrictId] = useState(routeState?.districtId || "");
  const [upazilaId, setUpazilaId] = useState(routeState?.upazilaId || "");
  const [thanaId, setThanaId] = useState(routeState?.thanaId || "");
  const [unionId, setUnionId] = useState(routeState?.unionId || "");
  const [village, setVillage] = useState(routeState?.village || "");
  const [deen, setDeen] = useState(routeState?.deen || "সব");
  const [sort, setSort] = useState("match");
  const districts = divisionId ? getDistrictsByDivisionSafe(divisionId) : ALL_DISTRICTS;
  const upazilas = districtId ? getUpazilasByDistrictSafe(districtId) : [];
  const thanas = districtId ? getThanasByDistrictSafe(districtId) : [];
  const unions = upazilaId ? getUnionsByUpazilaSafe(upazilaId) : [];
  const filtered = useMemo(() => PROFILES.filter((p) => {
    const sameWho = !who || p.who === who;
    const ageOk = age === "সব" || (age === "১৮-২৪" ? p.age <= 24 : age === "২৫-৩০" ? p.age >= 25 && p.age <= 30 : p.age >= 31);
    const districtOk = !districtId || p.dist === bn(districts.find((d) => d.id === districtId));
    const deenOk = deen === "সব" || (deen === "নিয়মিত নামাজি" ? p.deen.includes("নিয়মিত নামাজ") : deen === "পর্দানশীন" ? p.deen.includes("পর্দা") : deen === "হাফিজ/হাফিজা" ? p.deen.includes("হাফিজ") : p.deen.includes("আলেম"));
    const villageOk = !village || p.area.toLowerCase().includes(village.toLowerCase());
    return sameWho && ageOk && districtOk && deenOk && villageOk;
  }), [who, age, districtId, deen, village, districts]);
  const sorted = useMemo(() => [...filtered].sort((a, b) => sort === "match" ? (b.views - a.views) : (a.age - b.age)), [filtered, sort]);
  return (
    <div className="page">
      <PageHead go={go} title="প্রোফাইল ব্রাউজ" desc="আপনার পছন্দ অনুযায়ী গোপনীয়তা রক্ষা করে প্রোফাইল দেখুন।" />
      <section className="block"><div className="wrap">
        <div className="searchbar">
          <div className="field"><label>কাদের জন্য</label><select value={who} onChange={(e) => setWho(e.target.value)}><option>পাত্রী</option><option>পাত্র</option></select></div>
          <div className="field"><label>বয়স</label><select value={age} onChange={(e) => setAge(e.target.value)}><option>সব</option><option>১৮-২৪</option><option>২৫-৩০</option><option>৩১+</option></select></div>
          <div className="field"><label>বিভাগ</label><select value={divisionId} onChange={(e) => { setDivisionId(e.target.value); setDistrictId(""); setUpazilaId(""); setThanaId(""); setUnionId(""); }}><option value="">সব বিভাগ</option>{ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
          <div className="field"><label>জেলা</label><select value={districtId} onChange={(e) => { setDistrictId(e.target.value); setUpazilaId(""); setThanaId(""); setUnionId(""); }} disabled={!divisionId}><option value="">সব জেলা</option>{districts.map((d) => <option key={d.id} value={d.id}>{bn(d)}</option>)}</select></div>
          <div className="field"><label>উপজেলা</label><select value={upazilaId} onChange={(e) => { setUpazilaId(e.target.value); setThanaId(""); setUnionId(""); }} disabled={!districtId}><option value="">সব উপজেলা</option>{upazilas.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
          <div className="field"><label>থানা</label><select value={thanaId} onChange={(e) => setThanaId(e.target.value)} disabled={!districtId}><option value="">সব থানা</option>{thanas.map((t) => <option key={t.id} value={t.id}>{bn(t)}</option>)}</select></div>
          <div className="field"><label>ইউনিয়ন</label><select value={unionId} onChange={(e) => setUnionId(e.target.value)} disabled={!upazilaId}><option value="">সব ইউনিয়ন</option>{unions.map((u) => <option key={u.id} value={u.id}>{bn(u)}</option>)}</select></div>
          <div className="field"><label>গ্রাম</label><input value={village} onChange={(e) => setVillage(e.target.value)} placeholder="গ্রামের নাম" /></div>
          <div className="field"><label>দ্বীন</label><select value={deen} onChange={(e) => setDeen(e.target.value)}><option>সব</option><option>নিয়মিত নামাজি</option><option>পর্দানশীন</option><option>হাফিজ/হাফিজা</option><option>আলেম</option></select></div>
        </div>
        <div className="toolbar"><div className="pill">ফিল্টার: {sorted.length}টি প্রোফাইল</div><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="match">সেরা ম্যাচ</option><option value="age">বয়স</option></select></div>
        <div className="profiles">{sorted.map((p) => <PCard key={p.id} p={p} go={go} />)}</div>
      </div></section>
    </div>
  );
}
