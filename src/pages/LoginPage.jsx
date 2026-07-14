import React from "react";
import { PageHead } from "./shared";

export default function LoginPage({ go }) {
  return (
    <div className="page">
      <PageHead go={go} title="লগইন" desc="আপনার অ্যাকাউন্টে প্রবেশ করুন।" />
      <section className="block"><div className="wrap">
        <div className="card-box">
          <h2 className="serif">লগইন</h2>
          <form className="stack-form">
            <input placeholder="মোবাইল/ইমেইল" />
            <input type="password" placeholder="পাসওয়ার্ড" />
            <button className="btn btn-green" type="button">লগইন</button>
          </form>
        </div>
      </div></section>
    </div>
  );
}
