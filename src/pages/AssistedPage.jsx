import React from "react";
import { C, Ic, I, PageHead } from "./shared";

export default function AssistedPage({ go }) {
  return (
    <div className="page">
      <PageHead go={go} title="সহায়ক সেবা" desc="আপনার জন্য ব্যক্তিগত ম্যাচমেকিং সহায়তা।" />
      <section className="block"><div className="wrap">
        <div className="ctaband">
          <div style={{ display: 'inline-flex', marginBottom: 14 }}><Ic d={I.users} s={40} c={C.goldSoft} /></div>
          <h2 className="serif">একজন অভিজ্ঞ উপদেষ্টা আপনার হয়ে কাজ করবেন</h2>
          <p>আপনার পছন্দ, অভিভাবকের অগ্রাধিকার, ও ধর্মীয় মানদণ্ড বুঝে আমরা উপযুক্ত প্রোফাইল বেছে দেব।</p>
          <button className="btn btn-gold btn-lg" onClick={() => go('register')}>এখনই আবেদনের জন্য</button>
        </div>
      </div></section>
    </div>
  );
}
