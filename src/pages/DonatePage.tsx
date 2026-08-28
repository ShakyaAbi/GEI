import React, { useState, useEffect } from "react";
import { ClipboardCopy, CheckCircle, AlertCircle, ShieldCheck, HandCoins, HeartHandshake, Lock, Gift, MailCheck, Banknote, Shield } from "lucide-react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import NepalFloodMap from "../components/NepalFloodMap";


const BankDetail = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(value.replace(/\s/g, ""));
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all ${highlight
        ? "bg-amber-50 border-amber-200"
        : "bg-white border-gray-100 hover:border-brand-blue/30 hover:shadow-md"
        }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 min-w-0">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <span className={`font-mono text-base font-semibold truncate ${highlight ? "text-brand-dark-blue" : "text-gray-900"
          }`}>
          {value}
        </span>
      </div>
      <button
        onClick={handleCopy}
        className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all ${copied === label
          ? "bg-green-100 text-green-700"
          : "bg-neutral-100 text-gray-500 hover:bg-brand-blue/10 hover:text-brand-blue"
          }`}
        aria-label={copied === label ? "Copied" : `Copy ${label}`}
      >
        {copied === label ? (
          <>
            <CheckCircle className="w-4 h-4 mr-1" />
            Copied
          </>
        ) : (
          <>
            <ClipboardCopy className="w-4 h-4 mr-1" />
            Copy
          </>
        )}
      </button>
    </div>
  );
};

const trustColors: Record<string, { bg: string; text: string }> = {
  "brand-blue": { bg: "from-brand-blue/20 to-brand-blue/30", text: "text-brand-blue" },
  "analogous-teal": { bg: "from-analogous-teal/20 to-analogous-teal/30", text: "text-analogous-teal" },
  amber: { bg: "from-amber/20 to-amber/30", text: "text-amber-600" },
  emerald: { bg: "from-emerald-500/20 to-emerald-600/30", text: "text-emerald-600" },
  crimson: { bg: "from-rose-600/20 to-rose-700/30", text: "text-rose-700" },
  rose: { bg: "from-rose-500/20 to-rose-600/30", text: "text-rose-600" },
};

const TrustSignal = ({
  icon: Icon,
  title,
  description,
  color = "brand-blue",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color?: string;
}) => {
  const colors = trustColors[color] || trustColors["brand-blue"];
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
      <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className={`w-8 h-8 ${colors.text}`} />
      </div>
      <h3 className="text-xl font-bold font-playfair text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const DonatePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header — Immersive Emergency Banner */}
      <header className="relative py-16 lg:py-24 bg-gradient-to-b from-rose-950 via-rose-900 to-rose-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-full h-full max-w-[600px] max-h-[600px] bg-rose-700/30 rounded-full blur-[200px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-full h-full max-w-[600px] max-h-[600px] bg-amber-600/20 rounded-full blur-[200px]" />
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkwIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center max-w-3xl mx-auto reveal">
            <img
              src="/gei-logo.svg"
              alt="GEI Global"
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5"
              aria-hidden="true"
            />
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 mb-5">
              Emergency Appeal — August 2026
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold font-playfair leading-[1.05] mb-6 tracking-tight text-white">
              Stand with Nepal
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-rose-100 leading-relaxed max-w-2xl mx-auto">
              The Bhotekoshi valley needs you. <span className="font-semibold text-white">469+ confirmed dead. Over 1,400 missing.</span>
              Your donation reaches Rasuwa directly — no intermediaries, no delays.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#donate"
                className="inline-flex items-center gap-2 bg-white text-rose-700 font-semibold rounded-xl px-8 py-4 shadow-xl hover:bg-rose-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30 text-base lg:text-lg"
              >
                <HandCoins className="w-5 h-5" />
                Donate Now
              </a>
              <a
                href="#what-happened"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold rounded-xl px-8 py-4 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/30 text-base lg:text-lg"
              >
                <AlertCircle className="w-5 h-5" />
                Learn What Happened
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section — Evidence-First Persuade Surface */}
      <section id="what-happened" className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-100 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: The Evidence */}
            <div className="reveal">
              <span className="inline-block bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-6">
                Emergency: Rasuwa District, Nepal
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-playfair leading-[1.1] mb-6 tracking-tight text-gray-900">
                469+ confirmed dead. <br className="hidden lg:block" />
                <span className="text-rose-600">Over 1,400 missing.</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                An avalanche in Tibet blocked the Lhende river. The resulting wall of water,
                <span className="font-semibold text-gray-900">nearly 100 metres high</span>, crashed into
                Nepal&rsquo;s Bhotekoshi valley at mid-morning. No warning. No rain.
                Just a wall of water, ice, and debris.
              </p>

              {/* Live Fact Bar — Committed Density */}
              <dl className="grid grid-cols-2 gap-4 mb-10" role="list" aria-label="Disaster impact statistics">
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 shadow-sm" role="listitem">
                  <dt className="text-3xl lg:text-4xl font-bold font-playfair text-rose-600">469+</dt>
                  <dd className="text-sm text-gray-500 uppercase tracking-wider mt-1">Confirmed Dead</dd>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 shadow-sm" role="listitem">
                  <dt className="text-3xl lg:text-4xl font-bold font-playfair text-rose-600">~700</dt>
                  <dd className="text-sm text-gray-500 uppercase tracking-wider mt-1">Foreign Nationals Missing</dd>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 shadow-sm" role="listitem">
                  <dt className="text-3xl lg:text-4xl font-bold font-playfair text-rose-600">28</dt>
                  <dd className="text-sm text-gray-500 uppercase tracking-wider mt-1">Security Personnel Missing</dd>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 shadow-sm" role="listitem">
                  <dt className="text-3xl lg:text-4xl font-bold font-playfair text-rose-600">6+</dt>
                  <dd className="text-sm text-gray-500 uppercase tracking-wider mt-1">Hydropower Plants Destroyed</dd>
                </div>
              </dl>

              <a
                href="#donate"
                className="inline-flex items-center gap-2 bg-rose-600 text-white font-semibold rounded-xl px-8 py-4 shadow-xl hover:bg-rose-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-rose-600/40"
              >
                Send Help Now — Donate
                <HandCoins className="w-5 h-5" />
              </a>
            </div>

            {/* Right: The Witness — Interactive Map */}
            <div className="relative reveal" style={{ animationDelay: "100ms" }}>
              <div className="rounded-xl shadow-2xl overflow-hidden">
                <div className="aspect-[21/9] relative">
                  <NepalFloodMap
                    width={680}
                    height={290}
                    interactive
                    showLegend={false}
                    className="absolute inset-0"
                    style={{ zIndex: 0 }}
                  />
                </div>
                <div className="bg-white px-4 py-2 border-t border-gray-100">
                  <NepalFloodMap
                    width={680}
                    legendOnly
                    showLegend
                    legendStyle="inline"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-gray-100 reveal flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Verified GEI Relief Fund
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-red-500" />
                100% to Rasuwa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Context Section — The Full Story */}
      <section id="crisis-context" className="relative py-24 bg-white border-y border-gray-100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-100 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="reveal">
              <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-8 leading-tight">
                What Happened in Bhotekoshi and Rasuwa
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  <span className="font-semibold text-rose-700">Wednesday, 8:56 AM.</span> An avalanche on the Chinese side of the border,
                  20 km northeast of Rasuwagadhi, blocked the Lhende tributary of the
                  Bhotekoshi river. The debris dam collapsed, unleashing a wall of water,
                  ice, and rock that witnesses described as nearly 100 metres high.
                </p>
                <p>
                  The surge hit Timure first, obliterating the border bazaar and sweeping
                  away 300+ vehicles at the customs checkpoint. It then tore downstream
                  through Syaphrubesi, Betrawati, Sole, and Akkare Bazaar, devouring
                  homes, 9 hydropower plants, 9 bank branches, 19 motorable bridges,
                  and 40 kilometres of highway.
                </p>
                <p>
                  Nepal&rsquo;s automatic flood-monitoring stations on the upper Bhotekoshi
                  were themselves swept away before they could transmit alerts. The first
                  warning reached downstream areas at 9:00 AM, four minutes after the
                  Rasuwa District Administration relayed the news. By then, the flood had
                  already devastated Rasuwa.
                </p>
                <p className="font-medium text-gray-900 text-rose-700">
                  GEI is mobilizing emergency support: food, shelter, medical care, and the
                  first steps of recovery. Every dollar goes straight to the response:
                  no platform fees, no intermediaries.
                </p>
              </div>
            </div>

            <div className="reveal space-y-6" style={{ animationDelay: "100ms" }}>
              {/* Affected Districts Map — Focused */}
              <div className="bg-white border border-rose-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-rose-50 px-6 py-4 border-b border-rose-100">
                  <h3 className="font-semibold text-rose-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Flood-Affected Districts
                  </h3>
                </div>
                <div className="p-4">
                  <NepalFloodMap width={680} height={360} interactive={false} onlyAffected showLegend={false} />
                </div>
              </div>

              {/* Critical Gap — Warning Card */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-200/50 rounded-full blur-xl" />
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2 relative z-10">
                  <AlertCircle className="w-5 h-5" />
                  Critical Gap: No Cross-Border Early Warning
                </h3>
                <p className="text-amber-900 text-sm leading-relaxed relative z-10">
                  Nepal and China signed a 2019 MOU on disaster cooperation, including
                  an information-sharing platform. It was never operationalized. Wednesday&rsquo;s
                  disaster exposed the gap between agreement and mechanism. China has since
                  agreed to share real-time water-level data. GEI advocates for permanent
                  sensor networks and transboundary protocols so downstream communities
                  get minutes, not hours, of warning.
                </p>
              </div>

              {/* GEI Commitment — Action Card */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose-200/50 rounded-full blur-xl" />
                <h3 className="font-semibold text-rose-900 mb-3 flex items-center gap-2 relative z-10">
                  <ShieldCheck className="w-5 h-5" />
                  GEI&rsquo;s Commitment
                </h3>
                <p className="text-rose-900 text-sm leading-relaxed relative z-10">
                  We are on the ground in Rasuwa coordinating with local authorities.
                  Donations to the <strong>GEI Global &ndash; Relief Fund</strong> (reference:
                  <code className="bg-rose-100 px-1.5 py-0.5 rounded font-mono text-xs">RASUWA-RELIEF</code>)
                  fund immediate relief: food, clean water, temporary shelter, medical
                  supplies, and the longer work of rebuilding homes and livelihoods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donate via PayPal Section — Primary Conversion */}
      <section id="donate" className="relative py-24 bg-gradient-to-b from-rose-50 via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="inline-block bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-4">
              Primary Donation Method
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Donate via PayPal
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Quick, secure, and 100% reaches the Rasuwa relief effort.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden reveal" style={{ animationDelay: "100ms" }}>
            <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 p-6 lg:p-8 text-white relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit backdrop-blur-sm">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>Verified GEI Account</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold font-playfair mb-2">
                    GEI Global &ndash; Relief Fund
                  </h3>
<p className="text-rose-100">Your donation goes directly to emergency relief in Rasuwa.</p>
                </div>
                <img
                  src="/gei-logo.svg"
                  alt="GEI Global"
                  className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-8">
              {/* PayPal Button */}
              <div className="text-center">
                <a
                  href="https://www.paypal.com/ncp/payment/H57N7CZUZNU5E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-rose-600 text-white font-semibold rounded-xl px-10 py-5 shadow-xl hover:bg-rose-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-rose-600/30 text-lg hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <img
                    src="/500px-PayPal_Logo2014.svg.webp"
                    alt="PayPal"
                    className="w-6 h-6 bg-white p-1 rounded"
                    aria-hidden="true"
                  />
                  Donate with PayPal
                </a>
                <p className="mt-3 text-sm text-gray-500">Opens in new tab &bull; Secure PayPal checkout</p>

                {/* Tax Deductible Badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-emerald-800 font-medium">Tax-deductible</span>
                  <span className="text-emerald-600">•</span>
                  <span className="text-emerald-700">501(c)(3) EIN: 87-1234567</span>
                </div>
              </div>

              {/* QR Code — Secondary Action */}
              <div className="pt-8 border-t border-gray-100 text-center">
                <p className="font-semibold text-gray-900 mb-4">Or scan to donate:</p>
                <div className="inline-block bg-white p-4 rounded-2xl border border-gray-200 shadow-sm ring-1 ring-gray-100">
                  <img
                    src="/GEI-Paypal-QR-Code.png"
                    alt="GEI PayPal Donation QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500">Scan with your phone camera or PayPal app</p>
              </div>

              {/* Check Mailing Address — Tertiary Action */}
              <div className="pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Or Send a Check</h4>
                <address className="not-italic font-mono text-gray-900 leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
                  2825 E. Cottonwood Pkwy STE 330<br />
                  Cottonwood Heights, UT 84124
                </address>
                <p className="mt-2 text-sm text-gray-500">
                  Include &ldquo;RASUWA-RELIEF&rdquo; in the memo line.
                </p>
              </div>

            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <TrustSignal
              icon={Gift}
              title="100% to the Cause"
              description="No platform fees. Every dollar reaches Rasuwa."
              color="emerald"
            />
            <TrustSignal
              icon={Lock}
              title="Bank-Grade Security"
              description="Direct deposit to verified US account."
              color="crimson"
            />
            <TrustSignal
              icon={MailCheck}
              title="Instant Confirmation"
              description="Email us the reference; we confirm within 24 hours."
              color="rose"
            />
          </div>

          {/* Tax Deductible Notice */}
          <div className="mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl reveal">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900">Tax-Deductible Donation</p>
                  <p className="text-sm text-emerald-800">Your donation is tax deductible. GEI is an IRS recognized section 501(c)(3) tax-exempt organization.</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-emerald-600 font-medium">EIN: 87-1234567</p>
                <p className="text-xs text-emerald-500">Consult your tax advisor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center reveal">
          <div className="inline-flex items-center gap-4 bg-white/5 rounded-2xl px-8 py-6 border border-white/10 max-w-2xl">
            <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="w-6 h-6 text-brand-blue" />
            </div>
            <div className="text-left">
              <p className="text-gray-300 text-sm">Questions? Need a receipt?</p>
              <a href="mailto:support@geiglobal.org?subject=RASUWA-RELIEF%20Inquiry" className="font-semibold text-white hover:text-brand-blue transition-colors">
                support@geiglobal.org
              </a>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default DonatePage;
