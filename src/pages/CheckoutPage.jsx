import React from "react";
import { PageHead } from "./shared";

export default function CheckoutPage({ go, routeState }) {
  const plan = routeState?.plan || null;
  return (
    <div className="page">
      <PageHead go={go} title="চেকআউট" desc="পছন্দের সদস্যপদ নিশ্চিত করুন।" />
      <section className="block"><div className="wrap">
        <div className="card-box">
          <h2 className="serif">পেমেন্ট কনফার্মেশন</h2>
          {plan ? <p>আপনি <b>{plan.tag}</b> প্যাকেজটি বেছে নিয়েছেন।</p> : <p>কোনো প্যাকেজ নির্বাচন করা হয়নি।</p>}
          <button className="btn btn-green" onClick={() => go('home')}>ফিরে যান</button>
        </div>
      </div></section>
    </div>
  );
}
