import React from "react";
import { C, Ic, I, PageHead } from "./shared";

export default function ProfilePage({ go, profile, routeState }) {
  const p = profile || routeState || null;
  return (
    <div className="page">
      <PageHead go={go} title="প্রোফাইল ডিটেইল" desc="বায়োডাটা, ধর্মীয় পরিচয় ও পারিবারিক তথ্য দেখুন।" />
      <section className="block"><div className="wrap">
        {!p ? <div className="empty">কোনো প্রোফাইল নির্বাচন করা হয়নি।</div> : (
          <div className="profile-detail">
            <div className="profile-top">
              <div className="avatar-card">
                <div className="avatar-big"><Ic d={p.who === "পাত্রী" ? I.bride : I.groom} s={140} c={C.green700} fill="none" /></div>
                <div className="meta"><div className="pid">{p.who} · #{p.id}</div><h2 className="serif">{p.age} বছর · {p.dist}</h2><p>{p.about}</p></div>
              </div>
              <div className="actions"><button className="btn btn-green" onClick={() => go("register")}>সরাসরি যোগাযোগ</button><button className="btn" onClick={() => go("home")}>হোমে ফিরুন</button></div>
            </div>
            <div className="detail-grid">
              <div className="detail-card"><h3>প্রাথমিক তথ্য</h3><ul>{[["বয়স", p.age], ["উচ্চতা", p.height], ["জেলা", p.dist], ["এলাকা", p.area], ["পেশা", p.job], ["শিক্ষা", p.edu], ["বৈবাহিক অবস্থা", p.marital]].map(([l, v]) => <li key={l}><span>{l}</span><b>{v}</b></li>)}</ul></div>
              <div className="detail-card"><h3>ধর্মীয় পরিচয়</h3><ul>{[["দ্বীন", p.deen], ["ধর্মীয় পরিচয়", p.religious], ["রঙ", p.complexion]].map(([l, v]) => <li key={l}><span>{l}</span><b>{v}</b></li>)}</ul></div>
              <div className="detail-card full"><h3>পারিবারিক পরিচয়</h3><p>{p.family}</p></div>
            </div>
          </div>
        )}
      </div></section>
    </div>
  );
}
