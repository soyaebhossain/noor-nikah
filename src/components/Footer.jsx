import React from "react";
import { Logo } from "../pages/shared";

export default function Footer({ go }) {
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
