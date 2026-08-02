"use client";
import { motion } from "framer-motion";
import { Frame, mono, monoLower, useTicker } from "./shared";

const TABS = ["tab A", "tab B", "tab C"];

// 0 tabs open · 1 lock acquired · 2 leader polls · 3 server short-circuits · 4 broadcast
const STAGES = 5;

export default function MnRealtime() {
  const { ref, i } = useTicker(STAGES, 950);
  const on = (n: number) => i >= n;

  return (
    <Frame
      innerRef={ref}
      label="Realtime without a websocket"
      note="Supabase Realtime was removed deliberately. At hundreds of stores the constraint is not query cost — it is connection and round-trip volume against a serverless pool. Dropping the interval from 3s to 5s alone cut about 40% of the platform's requests."
    >
      <div className="flex flex-col gap-4">
        {/* tabs + leader election */}
        <div>
          <p className={`${mono} text-ink/46 mb-2`}>1 · one tab wins the lock</p>
          <div className="grid grid-cols-3 gap-2">
            {TABS.map((t, n) => {
              const leader = n === 0;
              const lit = on(1);
              return (
                <motion.div
                  key={t}
                  animate={{
                    borderColor:
                      lit && leader ? "rgba(52,211,153,.5)" : "rgba(255,255,255,.12)",
                    opacity: lit && !leader ? 0.55 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className="border rounded-md px-3 py-2"
                >
                  <p
                    className={`${mono} ${
                      lit && leader ? "text-accent" : "text-ink/72"
                    }`}
                  >
                    {t}
                  </p>
                  <p className={`${monoLower} text-ink/42`}>
                    {lit ? (leader ? "leader · polls" : "follower · listens") : "idle"}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <p className={`${monoLower} text-ink/42 mt-2`}>
            navigator.locks.request(&apos;meunu:orders-polling-leader&apos;) — the handler
            returns a promise that never resolves, so the lock is held until the tab
            unloads. No locks API, no lock: everyone polls, exactly the old behaviour.
          </p>
        </div>

        {/* poll */}
        <motion.div
          animate={{ opacity: on(2) ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
          className="border border-ink/12 rounded-md p-3"
        >
          <p className={`${mono} text-ink/85`}>
            2 · GET /orders/changes?since=cursor
          </p>
          <p className={`${monoLower} text-ink/45 mt-1`}>
            every 5s, leader only · the cursor lives in module scope so both hooks share
            one SWR cache entry
          </p>
        </motion.div>

        {/* server short circuit */}
        <motion.div
          animate={{ opacity: on(3) ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
          className="border border-accent/40 rounded-md p-3 bg-surface"
        >
          <p className={`${mono} text-accent`}>3 · server short-circuits</p>
          <div className={`${monoLower} text-ink/72 mt-1.5 space-y-1`}>
            <p>MAX(updatedAt) ≤ since → {"{ changed: false }"}, no snapshot query</p>
            <p className="text-ink/45">
              empty result echoes `since` back instead of now — advancing the cursor past
              data that does not exist loops forever on changed:true, orders:[]
            </p>
            <p className="text-ink/45">
              orderBy desc, not asc — with asc + take:limit, a store sitting on many old
              pending orders would never see today&apos;s
            </p>
          </div>
        </motion.div>

        {/* broadcast */}
        <motion.div
          animate={{ opacity: on(4) ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
          className="border border-ink/12 rounded-md p-3"
        >
          <p className={`${mono} text-ink/85`}>4 · BroadcastChannel fan-out</p>
          <p className={`${monoLower} text-ink/45 mt-1`}>
            followers write the delta straight into the SWR cache with revalidate:false —
            one network request feeds every open tab. The leader tags each message with
            its own TAB_ID so it ignores its own echo.
          </p>
        </motion.div>
      </div>
    </Frame>
  );
}
