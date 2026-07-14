import React from "react";
import { PageHead, PLANS, BARAKAH_PLAN, PlanCard } from "./shared";

export default function MembershipPage({ go }) {
  return (
    <div className="page">
      <PageHead go={go} title="সদস্যপদ" desc="আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন।" />
      <section className="block"><div className="wrap">
        <div className="plans">{[...PLANS, BARAKAH_PLAN].map((p) => <PlanCard key={p.id} p={p} go={go} />)}</div>
      </div></section>
    </div>
  );
}
