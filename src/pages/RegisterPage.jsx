import React from "react";
import { PageHead } from "./shared";

export default function RegisterPage({ go }) {
  return (
    <div className="page">
      <PageHead go={go} title="রেজিস্টার" desc="একটি নিশ্চয়তা-ভিত্তিক অ্যাকাউন্ট তৈরি করুন।" />
      <section className="block"><div className="wrap">
        <div className="card-box">
          <h2 className="serif">একটি অ্যাকাউন্ট তৈরি করুন</h2>
          <p>নতুন সদস্য হিসেবে সাইন আপ করুন। (ডেমো ফর্ম)</p>
          <form className="stack-form">
            <input placeholder="পূর্ণ নাম" />
            <input placeholder="মোবাইল নম্বর" />
            <input placeholder="ইমেইল" />
            <input type="password" placeholder="পাসওয়ার্ড" />
            <button className="btn btn-green" type="button">রেজিস্টার</button>
          </form>
        </div>
      </div></section>
    </div>
  );
}
