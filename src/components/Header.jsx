import React, { useEffect, useState } from "react";
import { Logo, C, Ic } from "../pages/shared";

export default function Header({ page, go }) {
  const [menu, setMenu] = useState(false);
  const languages = [["bn", "বাংলা"], ["en", "English"], ["ar", "العربية"], ["hi", "हिन्दी"], ["ur", "اردو"], ["id", "Bahasa"], ["ms", "Melayu"], ["tr", "Türkçe"], ["fr", "Français"]];
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
            <div className="language-switch notranslate"><span aria-hidden="true">🌐</span>
              <select aria-label="ভাষা নির্বাচন" value={language} onChange={(e) => changeLanguage(e.target.value)}>
                {languages.map(([code, label]) => <option value={code} key={code}>{label}</option>)}
              </select>
              <div id="google_translate_element" />
            </div>
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
