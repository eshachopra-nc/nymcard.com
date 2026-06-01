/* ============================================================
   NymCard dashboards — data layer
   Realistic, on-system placeholder data. No real third-party
   brand or merchant names. Currencies: USD / AED / EUR / SGD /
   USDC / USDT. Attached to window.DATA.
   ============================================================ */
(function () {
  // deterministic pseudo-random so charts are stable across renders
  function seed(s) { return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  function series(n, base, vol, rng) {
    const out = []; let v = base;
    for (let i = 0; i < n; i++) { v = Math.max(base * 0.4, v + (rng() - 0.48) * vol); out.push(Math.round(v)); }
    return out;
  }

  const r = seed(42);
  const days14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(2026, 4, 16 + i); // May 2026
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  const months6 = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  const DATA = {
    days14, months6,

    /* ───────── 1. Card Program Management ───────── */
    cards: {
      kpis: {
        activeCards: { value: '2.84', unit: 'M', delta: +4.2, note: 'vs last 30d' },
        approval: { value: '98.6', unit: '%', delta: +0.3, note: 'auth approval' },
        volume: { value: '$48.2', unit: 'M', delta: +6.1, note: 'today' },
        programs: { value: '37', unit: '', delta: +2, note: 'live programs', flat: false },
      },
      authVolume: series(14, 41, 9, r),       // $M authorized per day
      declines: series(14, 0.9, 0.4, r),      // $M declined per day
      states: [
        { label: 'Active', value: 2612400, color: 'var(--color-success)' },
        { label: 'Frozen', value: 124800, color: 'var(--color-warning)' },
        { label: 'Expired', value: 78200, color: 'var(--text-muted)' },
        { label: 'Blocked', value: 24600, color: 'var(--color-danger)' },
      ],
      programs: [
        { name: 'Consumer Debit', type: 'Debit', net: 'Visa', cards: '1.42M', spend: '$21.4M', auth: '98.9%', status: 'Active' },
        { name: 'SME Commercial', type: 'Credit', net: 'Visa', cards: '186K', spend: '$12.8M', auth: '98.1%', status: 'Active' },
        { name: 'Payroll Prepaid', type: 'Prepaid', net: 'Mastercard', cards: '642K', spend: '$6.2M', auth: '99.2%', status: 'Active' },
        { name: 'Youth Wallet', type: 'Prepaid', net: 'Mastercard', cards: '388K', spend: '$3.1M', auth: '98.7%', status: 'Active' },
        { name: 'Premium Credit', type: 'Credit', net: 'Visa', cards: '74K', spend: '$4.0M', auth: '97.6%', status: 'Active' },
        { name: 'Gift & Disbursement', type: 'Prepaid', net: 'Visa', cards: '128K', spend: '$0.7M', auth: '99.0%', status: 'Paused' },
      ],
      controls: [
        { label: 'Freeze / unfreeze', sub: '1,204 actions today', on: true },
        { label: 'Per-transaction limits', sub: 'Applied across 37 programs', on: true },
        { label: 'Merchant category blocks', sub: '18 MCC rules active', on: true },
        { label: 'KYC & AML in auth', sub: 'Inline on every authorization', on: true },
      ],
    },

    /* ───────── 2. Loan Management ───────── */
    lending: {
      kpis: {
        outstanding: { value: '$312.6', unit: 'M', delta: +3.4, note: 'principal outstanding' },
        active: { value: '184.2', unit: 'K', delta: +5.8, note: 'active loans' },
        collection: { value: '96.4', unit: '%', delta: +0.6, note: 'on-time collection' },
        delinquency: { value: '2.18', unit: '%', delta: -0.21, note: '30+ DPD', goodDown: true },
      },
      balance: series(6, 268, 26, r),         // $M outstanding by month
      originations: [18.4, 21.2, 19.8, 24.6, 26.1, 28.9], // $M new per month
      aging: [
        { label: 'Current', value: 305800000, color: 'var(--color-success)' },
        { label: '1–30 DPD', value: 3920000, color: 'var(--accent-cyan)' },
        { label: '31–60 DPD', value: 1640000, color: 'var(--color-warning)' },
        { label: '61–90 DPD', value: 740000, color: 'var(--accent-violet)' },
        { label: '90+ DPD', value: 500000, color: 'var(--color-danger)' },
      ],
      book: [
        { ref: 'Revolving — Consumer', struct: 'Revolving', principal: '$128.4M', out: '$96.2M', util: 0.62, status: 'Performing' },
        { ref: 'Installment — Retail', struct: 'Installment', principal: '$74.6M', out: '$58.1M', util: 0.44, status: 'Performing' },
        { ref: 'BNPL — Marketplace', struct: 'BNPL', principal: '$52.2M', out: '$31.8M', util: 0.71, status: 'Performing' },
        { ref: 'Working capital — SME', struct: 'Working capital', principal: '$41.8M', out: '$34.6M', util: 0.55, status: 'Watch' },
        { ref: 'Device financing', struct: 'Installment', principal: '$15.6M', out: '$9.4M', util: 0.38, status: 'Performing' },
      ],
    },

    /* ───────── 3. Risk Management (AML / typologies) ───────── */
    risk: {
      kpis: {
        alerts: { value: '342', unit: '', delta: +12, note: 'open alerts' },
        highRisk: { value: '1,884', unit: '', delta: +3.1, note: 'high-risk customers' },
        cases: { value: '47', unit: '', delta: -6, note: 'cases in review', goodDown: true },
        filed: { value: '23', unit: '', delta: +4, note: 'SAR/STR filed MTD' },
      },
      typologies: [
        { label: 'Structuring', value: 96, color: 'var(--brand-primary)' },
        { label: 'Rapid movement', value: 74, color: 'var(--accent-indigo)' },
        { label: 'Sanctions hit', value: 41, color: 'var(--color-danger)' },
        { label: 'High-risk geo', value: 58, color: 'var(--accent-violet)' },
        { label: 'Velocity', value: 47, color: 'var(--accent-cyan)' },
        { label: 'Dormant reactivation', value: 26, color: 'var(--accent-teal)' },
      ],
      distribution: [
        { label: 'Low', value: 412000, color: 'var(--color-success)' },
        { label: 'Medium', value: 58400, color: 'var(--accent-cyan)' },
        { label: 'High', value: 1884, color: 'var(--color-warning)' },
        { label: 'Very high', value: 308, color: 'var(--color-danger)' },
      ],
      rules: [
        { id: 'structuring_v3', type: 'AML typology', thr: '$9,500 · 24h · ≥3', risk: 'MED+', status: 'Active' },
        { id: 'sanctions_screen_v5', type: 'Sanctions', thr: 'Every beneficiary', risk: 'ALL', status: 'Active' },
        { id: 'velocity_burst_v2', type: 'Velocity', thr: '12 txn · 10m', risk: 'MED+', status: 'Active' },
        { id: 'geo_corridor_v4', type: 'Geo risk', thr: 'High-risk list', risk: 'HIGH+', status: 'Active' },
        { id: 'dormant_react_v1', type: 'Behavioral', thr: '>180d idle', risk: 'ALL', status: 'Draft' },
      ],
      watch: [
        { cust: 'Customer ····4471', seg: 'Commercial', from: 'MEDIUM', to: 'HIGH', why: 'Structuring alert posted', t: '2m ago' },
        { cust: 'Customer ····9182', seg: 'Consumer', from: 'LOW', to: 'MEDIUM', why: 'Velocity threshold', t: '14m ago' },
        { cust: 'Customer ····2055', seg: 'Commercial', from: 'HIGH', to: 'VERY HIGH', why: 'Sanctions proximity', t: '38m ago' },
      ],
    },

    /* ───────── 4. Fraud Monitoring ───────── */
    fraud: {
      kpis: {
        decisions: { value: '1.92', unit: 'M', delta: +2.4, note: 'decisions today' },
        block: { value: '0.84', unit: '%', delta: -0.12, note: 'block rate', goodDown: true },
        challenge: { value: '3.10', unit: '%', delta: +0.2, note: '3DS challenge rate' },
        caught: { value: '$1.46', unit: 'M', delta: +8.4, note: 'fraud prevented today' },
      },
      decisionTrend: {
        approve: series(14, 96, 1.5, seed(7)),
        challenge: series(14, 3, 0.8, seed(9)),
        block: series(14, 0.9, 0.4, seed(11)),
      },
      engines: [
        'Geographic physics', 'Temporal context', 'Session context', 'Device trust',
        'Behavioral baseline', 'Transition anomaly', 'Merchant familiarity',
        'Registry metadata', 'Entity state',
      ],
      stream: [
        { ref: 'AUTH ····7741', amt: '$248.00', kind: 'CNP · Online retail', score: 12, dec: 'APPROVE' },
        { ref: 'AUTH ····5520', amt: '$1,940.00', kind: 'CNP · Electronics', score: 68, dec: 'CHALLENGE' },
        { ref: 'AUTH ····8830', amt: '$92.40', kind: 'CP · Fuel', score: 8, dec: 'APPROVE' },
        { ref: 'AUTH ····2214', amt: '$3,500.00', kind: 'CNP · Cross-border', score: 91, dec: 'BLOCK' },
        { ref: 'AUTH ····6657', amt: '$54.10', kind: 'CP · Grocery', score: 5, dec: 'APPROVE' },
        { ref: 'AUTH ····1109', amt: '$780.00', kind: 'CNP · Travel', score: 73, dec: 'CHALLENGE' },
      ],
      shap: [
        { sig: 'Geographic physics', w: 0.34, dir: 'risk' },
        { sig: 'Device trust', w: 0.27, dir: 'risk' },
        { sig: 'Transition anomaly', w: 0.19, dir: 'risk' },
        { sig: 'Behavioral baseline', w: 0.12, dir: 'safe' },
        { sig: 'Merchant familiarity', w: 0.08, dir: 'safe' },
      ],
    },

    /* ───────── 5. Stablecoin Settlements ───────── */
    settlements: {
      kpis: {
        settled: { value: '$84.6', unit: 'M', delta: +9.2, note: 'settled today' },
        corridors: { value: '14', unit: '', delta: +1, note: 'active corridors' },
        avgTime: { value: '38', unit: 's', delta: -7.0, note: 'avg settlement', goodDown: true },
        prefunding: { value: '$22.4', unit: 'M', delta: +2.1, note: 'pre-funding deployed' },
      },
      byRail: {
        stablecoin: series(14, 52, 8, seed(21)),
        scheme: series(14, 33, 6, seed(23)),
      },
      corridors: [
        { from: 'USD', to: 'EUR', rail: 'stablecoin', coin: 'USDC', amt: '$24.8M', state: 3, t: '32s' },
        { from: 'USD', to: 'AED', rail: 'stablecoin', coin: 'USDT', amt: '$18.2M', state: 3, t: '29s' },
        { from: 'EUR', to: 'SGD', rail: 'scheme', coin: null, amt: '$9.4M', state: 2, t: '—' },
        { from: 'USD', to: 'SGD', rail: 'stablecoin', coin: 'USDC', amt: '$12.1M', state: 3, t: '41s' },
        { from: 'AED', to: 'EUR', rail: 'scheme', coin: null, amt: '$6.8M', state: 1, t: '—' },
        { from: 'USD', to: 'INR', rail: 'stablecoin', coin: 'USDT', amt: '$13.3M', state: 3, t: '36s' },
      ],
      liquidity: [
        { corridor: 'USD → EUR', bal: '$8.4M', pre: '$2.5M', deployed: 0.72 },
        { corridor: 'USD → AED', bal: '$6.1M', pre: '$1.8M', deployed: 0.64 },
        { corridor: 'USD → SGD', bal: '$4.2M', pre: '$1.2M', deployed: 0.55 },
        { corridor: 'EUR → SGD', bal: '$3.7M', pre: '$0.9M', deployed: 0.48 },
      ],
      capitalFreed: { value: '$31.2M', vs: 'vs correspondent baseline' },
    },

    /* ───────── 6. Reconciliation ───────── */
    recon: {
      kpis: {
        matchRate: { value: '99.4', unit: '%', delta: +0.2, note: 'auto-match rate' },
        matched: { value: '4.18', unit: 'M', delta: +3.0, note: 'entries matched today' },
        exceptions: { value: '212', unit: '', delta: -18, note: 'open exceptions', goodDown: true },
        sources: { value: '11', unit: '', delta: 0, note: 'connected sources', flat: true },
      },
      byProduct: [
        { product: 'Cards', matched: 0.996, vol: '2.41M' },
        { product: 'Lending', matched: 0.991, vol: '0.62M' },
        { product: 'Money Movement', matched: 0.988, vol: '0.74M' },
        { product: 'Settlement', matched: 0.997, vol: '0.31M' },
        { product: 'Financial Crime', matched: 0.999, vol: '0.10M' },
      ],
      streams: {
        nym: ['Card auth ····7741', 'Settlement leg USDC', 'Payout ····2031', 'Credit repayment', 'Chargeback ····88'],
        ext: ['Bank record ····7741', 'External rail USDC', 'Partner system ····2031', 'Bank record', 'Scheme file ····88'],
      },
      exceptions: [
        { id: 'EXC-20455', type: 'Amount mismatch', src: 'External rail', diff: '$12.40', age: '2h', status: 'Investigating' },
        { id: 'EXC-20451', type: 'Missing counterpart', src: 'Partner system', diff: '$1,204.00', age: '5h', status: 'Open' },
        { id: 'EXC-20448', type: 'Duplicate entry', src: 'Bank record', diff: '$0.00', age: '8h', status: 'Open' },
        { id: 'EXC-20440', type: 'Timing break', src: 'Scheme file', diff: '$48.10', age: '1d', status: 'Resolved' },
        { id: 'EXC-20431', type: 'FX rounding', src: 'External rail', diff: '$3.02', age: '1d', status: 'Resolved' },
      ],
    },

    /* ───────── 7. Credit Decisioning ───────── */
    credit: {
      kpis: {
        apps: { value: '8,412', unit: '', delta: +6.7, note: 'applications today' },
        approval: { value: '71.4', unit: '%', delta: +1.2, note: 'approval rate' },
        avgTime: { value: '1.2', unit: 's', delta: -0.3, note: 'avg decision time', goodDown: true },
        queue: { value: '128', unit: '', delta: +14, note: 'manual review queue' },
      },
      funnel: [
        { label: 'Applications', value: 8412, color: 'var(--brand-primary)' },
        { label: 'Passed KYC', value: 7960, color: 'var(--accent-indigo)' },
        { label: 'Scored', value: 7780, color: 'var(--accent-violet)' },
        { label: 'Approved', value: 6010, color: 'var(--color-success)' },
      ],
      outcome: { approved: 6010, declined: 1642, review: 128 },
      scoreDist: series(12, 40, 30, seed(31)).map((v, i) => ({ band: 480 + i * 30, count: Math.abs(Math.round(v * (i > 6 ? 1.4 : 0.8))) + 40 })),
      threshold: 720,
      queue: [
        { ref: 'APP ····3041', seg: 'Consumer', score: 712, limit: '$8,000', dec: 'Manual review', why: 'Below threshold (720)' },
        { ref: 'APP ····3038', seg: 'Commercial', score: 781, limit: '$25,000', dec: 'Approved', why: 'Bureau + open banking' },
        { ref: 'APP ····3035', seg: 'Consumer', score: 648, limit: '—', dec: 'Declined', why: 'Thin file · high DTI' },
        { ref: 'APP ····3032', seg: 'Consumer', score: 805, limit: '$12,000', dec: 'Approved', why: 'Strong repayment history' },
        { ref: 'APP ····3029', seg: 'Commercial', score: 698, limit: '—', dec: 'Manual review', why: 'Income verification pending' },
        { ref: 'APP ····3026', seg: 'Consumer', score: 754, limit: '$10,000', dec: 'Approved', why: 'Risk-based pricing tier 2' },
      ],
      sources: ['Credit bureau', 'Open banking', 'Transaction history', 'Partner model v2'],
    },
  };

  window.DATA = DATA;
})();
