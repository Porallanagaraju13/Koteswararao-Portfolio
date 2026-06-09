import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Mail, Instagram, Menu, X, ArrowRight, ChevronRight,
  Target, Search, Youtube, MapPin, Globe, Share2,
  TrendingUp, Users, Eye, MousePointerClick, BarChart3,
  CheckCircle2, Star, Sparkles, LineChart, Megaphone, Briefcase,
} from "lucide-react";
// heroImg deprecated in favor of brand logo in hero
import aboutImg from "@/assets/about-marketer.png";
import resultsImg from "@/assets/results-analytics.jpg";
import svrShot from "@/assets/screenshots/svr.jpg";
import vgrowShot from "@/assets/screenshots/vgrow.jpg";
import youtubeShot from "@/assets/screenshots/youtube.jpg";
import logoAsset from "@/assets/k-digital-logo-new.jpeg";
import heroCharacter from "@/assets/hero-character.png";
import { CountUp, Reveal, ROIChart } from "@/hooks/use-animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K Digital — Lead Generation & Performance Marketing | Koteswararao Poralla" },
      { name: "description", content: "K Digital by Koteswararao Poralla — Meta Ads, Google Ads, YouTube Ads, SEO, GMB & Websites that generate quality leads. 350+ leads delivered, CPL as low as ₹7.88." },
      { property: "og:title", content: "K Digital — Lead Generation & Performance Marketing" },
      { property: "og:description", content: "Meta Ads, Google Ads, SEO and websites built to generate quality leads for small businesses, real estate, finance and local services." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: logoAsset, fetchpriority: "high" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Koteswararao Poralla",
        jobTitle: "Digital Marketing Specialist",
        worksFor: { "@type": "Organization", name: "K Digital" },
        telephone: "+91 9912360547",
        email: "porallakoteswararao91215@gmail.com",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        sameAs: ["https://instagram.com/kdigital_9"],
      }),
    }],
  }),
  component: Portfolio,
});

const NAV = [
  ["Home", "#home"], ["About", "#about"], ["Services", "#services"],
  ["Portfolio", "#portfolio"], ["Results", "#results"],
  ["Testimonials", "#testimonials"], ["Contact", "#contact"],
] as const;

function Portfolio() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header open={open} setOpen={setOpen} />
      <main>
        <Hero />
        <Results />
        <Services />
        <About />
        <CampaignProof />
        <PortfolioGrid />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3 group">
      <span className="relative grid h-11 w-11 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full blur-md opacity-70 animate-pulse-glow"
          style={{ background: "conic-gradient(from 0deg,#22D3EE,#A78BFA,#F472B6,#22D3EE)" }} />
        <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-black ring-2 ring-[#A78BFA]/50">
          <img src={logoAsset} alt="K Digital logo" width={44} height={44} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-navy">K Digital</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Performance Marketing</span>
      </span>
    </a>
  );
}

function CTAButton({ children, href = "#contact", variant = "primary", className = "" }:
  { children: React.ReactNode; href?: string; variant?: "primary" | "ghost"; className?: string }) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all";
  const styles = variant === "primary"
    ? "bg-gradient-brand text-white shadow-cta hover:translate-y-[-1px] hover:shadow-[0_14px_36px_-10px_rgba(37,99,235,0.65)]"
    : "border border-border bg-white text-navy hover:bg-sky-soft";
  return <a href={href} className={`${base} ${styles} ${className}`}>{children}<ArrowRight className="h-4 w-4" /></a>;
}

function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-3.5 py-2 text-sm font-medium text-navy/80 hover:text-navy hover:bg-sky-soft transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CTAButton>Get Free Consultation</CTAButton>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
          className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-border bg-white">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-5 py-3 flex flex-col gap-1">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-sky-soft">{label}</a>
            ))}
            <CTAButton className="mt-2 justify-center">Get Free Consultation</CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white text-navy">
      {/* Soft sky blobs for a light, airy feel */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-[24rem] w-[24rem] rounded-full bg-indigo-50/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:gap-10 sm:py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
        {/* Mobile-first: character renders first (top) on small screens, beside text on lg */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative mx-auto w-56 sm:w-72 lg:w-full">
            <div aria-hidden className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-60 animate-pulse-glow"
              style={{ background: "conic-gradient(from 0deg,#22D3EE,#A78BFA,#F472B6,#22D3EE)" }} />
            <div className="relative aspect-square grid place-items-center animate-float-soft">
              <img src={heroCharacter} alt="K Digital marketer character" width={1024} height={1024}
                loading="eager" decoding="async" fetchPriority="high"
                className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(124,58,237,0.35)]" />
            </div>
            <div className="hidden lg:block">
              <FloatingCard className="absolute -left-6 top-8" icon={<Target className="h-4 w-4" />} title="Meta Ads" value="89 Leads" sub="CPL ₹17.79" />
              <FloatingCard className="absolute -right-4 top-1/3" icon={<LineChart className="h-4 w-4" />} title="Reach" value="93.2K" sub="+184% MoM" />
              <FloatingCard className="absolute bottom-6 left-6" icon={<Youtube className="h-4 w-4" />} title="YouTube" value="6K Views" sub="56.9% VR" />
            </div>
          </div>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-sky-700">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              Digital Marketing Specialist · 2+ Yrs Experience
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 font-display text-[30px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              I Help Businesses{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#0EA5E9 0%, #7C3AED 50%, #EC4899 100%)" }}>
                Generate Quality Leads
              </span>{" "}
              <span className="text-navy/95">& Grow Online</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy/65 sm:mt-6 sm:text-lg">
              I am <strong className="text-navy">Koteswararao Poralla</strong> — running Meta Ads, Google Ads, YouTube Ads,
              SEO, GMB & Websites that turn ad spend into measurable leads.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:mt-8">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 bg-gradient-brand">
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#results" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3.5 text-sm font-semibold text-navy shadow-sm hover:bg-sky-50 transition-colors">
                View Results <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
            {[
              { end: 350, suffix: "+", label: "Leads", color: "#0EA5E9", prefix: "" },
              { end: 7.88, decimals: 2, prefix: "₹", suffix: "", label: "Lowest CPL", color: "#7C3AED" },
              { end: 93, suffix: "K+", label: "Reach", color: "#EC4899", prefix: "" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={420 + i * 120} className="rounded-2xl border border-sky-100 bg-white px-3 py-3 shadow-card">
                <CountUp end={s.end} decimals={s.decimals ?? 0} prefix={s.prefix} suffix={s.suffix}
                  className="font-display text-lg font-extrabold sm:text-xl" />
                <div className="text-[11px]" style={{ color: s.color }}>{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function FloatingCard({ icon, title, value, sub, className = "" }:
  { icon: React.ReactNode; title: string; value: string; sub: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white">{icon}</span>
      <div className="leading-tight">
        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="font-display text-sm font-bold text-navy">{value}</div>
        <div className="text-[10px] text-[#0EA5E9] font-semibold">{sub}</div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, center = false }:
  { eyebrow: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-block rounded-full bg-sky-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0EA5E9]">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-base text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Results() {
  const stats = [
    { icon: <Users className="h-5 w-5" />, end: 350, suffix: "+", prefix: "", decimals: 0, label: "Leads Generated", sub: "Across multiple industries" },
    { icon: <MousePointerClick className="h-5 w-5" />, end: 7.88, prefix: "₹", suffix: "", decimals: 2, label: "Lowest CPL Achieved", sub: "On Meta Lead Ads" },
    { icon: <Eye className="h-5 w-5" />, end: 93, prefix: "", suffix: "K+", decimals: 0, label: "Audience Reached", sub: "Awareness campaigns" },
    { icon: <Youtube className="h-5 w-5" />, end: 6, prefix: "", suffix: "K+", decimals: 0, label: "YouTube Views", sub: "TrueView, CPV ₹0.13" },
  ];
  return (
    <section id="results" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeader eyebrow="Results" title="Performance Marketing Results" sub="Real numbers from real campaigns I have run for clients across India." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="group relative rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-cta">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-cta">{s.icon}</span>
                <TrendingUp className="h-4 w-4 text-[#0EA5E9]" />
              </div>
              <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals}
                className="mt-5 block font-display text-4xl font-extrabold tracking-tight text-navy" />
              <div className="mt-1 text-sm font-semibold text-navy">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150} className="mt-12 rounded-3xl border border-border bg-white p-5 sm:p-8 shadow-card">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">ROI Performance Trend</h3>
              <p className="text-sm text-muted-foreground">Monthly return on ad spend across managed campaigns.</p>
            </div>
            <div className="text-sm font-semibold text-[#0EA5E9]">+184% MoM growth</div>
          </div>
          <div className="mt-5">
            <ROIChart
              data={[110, 145, 180, 210, 260, 320, 410]}
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              height={240}
            />
          </div>
        </Reveal>
        <Reveal delay={250} className="mt-10 overflow-hidden rounded-3xl border border-border">
          <img src={resultsImg} alt="Marketing analytics dashboard visualisation" loading="lazy" width={1920} height={1080} className="w-full" />
        </Reveal>

      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: <Target />, title: "Meta Ads & Lead Generation", desc: "Facebook & Instagram lead campaigns engineered to lower CPL and bring qualified leads." },
    { icon: <Search />, title: "Google Ads & YouTube Ads", desc: "Search, Performance Max & TrueView campaigns that capture high-intent buyers." },
    { icon: <Share2 />, title: "Social Media Management", desc: "Content calendars, reels, posters and community growth for consistent brand presence." },
    { icon: <LineChart />, title: "SEO Optimization", desc: "On-page, technical & local SEO to grow organic traffic and Google rankings." },
    { icon: <MapPin />, title: "Google Business Profile", desc: "GMB setup, posts, reviews & local SEO to drive calls and direction requests." },
    { icon: <Globe />, title: "Website Development", desc: "High-converting, mobile-first websites and landing pages built to capture leads." },
  ];
  return (
    <section id="services" className="bg-sky-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeader center eyebrow="Services" title="Digital Marketing Services I Provide" sub="End-to-end performance marketing — from strategy and creatives to tracking and optimisation." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cta">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-soft text-[#0EA5E9] transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <span className="[&_svg]:h-5 [&_svg]:w-5">{s.icon}</span>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0EA5E9]">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function About() {
  const points = [
    "Paid ads across Meta, Google & YouTube",
    "SEO, GMB & local visibility",
    "Lead funnels, landing pages & websites",
    "Transparent reporting & ROI tracking",
  ];
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-brand opacity-10 blur-2xl" />
          <div className="rounded-[2rem] bg-gradient-soft p-6 border border-border">
            <img src={aboutImg} alt="Performance marketer analysing campaign dashboards" loading="lazy" width={1024} height={1024} className="w-full" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeader eyebrow="About Me" title="A results-driven performance marketer." />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            I am a results-driven Digital Marketing Specialist and Performance Marketer helping businesses grow online
            through paid ads, websites, SEO, social media content, and lead generation campaigns. I have worked across
            financial services, software companies, real estate, and local businesses.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            My focus is simple: <strong className="text-navy">generate quality leads, improve brand visibility, and deliver measurable business growth.</strong>
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-navy">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0EA5E9]" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8"><CTAButton>Let's Talk Growth</CTAButton></div>
        </div>
      </div>
    </section>
  );
}

function CampaignProof() {
  const cases = [
    {
      tag: "Financial Services",
      title: "SVR AtoZ Services",
      img: svrShot,
      results: [
        ["89", "Leads Generated"],
        ["₹17.79", "Cost Per Lead"],
        ["43", "Additional Leads"],
        ["₹7.88", "Lowest CPL"],
      ],
      footer: "Overall: 220+ Leads Generated",
    },
    {
      tag: "Software Company",
      title: "Vgrow.ai",
      img: vgrowShot,
      results: [
        ["140+", "Leads Generated"],
        ["93K+", "Audience Reached"],
        ["18", "GMB Leads"],
        ["₹1.82", "Awareness CPM"],
      ],
      footer: "Multi-channel performance + brand awareness",
    },
    {
      tag: "Video Ads",
      title: "Google Ads & YouTube Ads",
      img: youtubeShot,
      results: [
        ["10.5K", "Impressions"],
        ["6K", "TrueView Views"],
        ["56.9%", "View Rate"],
        ["₹0.13", "Average CPV"],
      ],
      footer: "Industry-leading view rate at micro CPV",
    },
  ];
  return (
    <section className="bg-sky-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeader center eyebrow="Campaign Proof" title="Real Campaign Results" sub="Screenshots straight from the Ads Manager. No filters, no fluff — only real performance data." /></Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 130}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cta">
                <div className="relative aspect-[4/3] overflow-hidden bg-sky-soft">
                  <img src={c.img} alt={`${c.title} campaign results`} loading="lazy" className="h-full w-full object-cover object-top" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0EA5E9] shadow-sm">{c.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-navy">{c.title}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {c.results.map(([v, l]) => (
                      <div key={l} className="rounded-xl bg-sky-soft p-3">
                        <div className="font-display text-lg font-extrabold text-navy">{v}</div>
                        <div className="text-[11px] text-muted-foreground">{l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-[#0EA5E9]/40 bg-sky-soft px-3 py-2 text-xs font-semibold text-[#0EA5E9]">
                    <BarChart3 className="h-4 w-4" /> {c.footer}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function PortfolioGrid() {
  const items = [
    { icon: <Target />, title: "Meta Ads Lead Generation", desc: "89 leads at ₹17.79 CPL for SVR AtoZ financial services." },
    { icon: <Search />, title: "Google Ads Campaign", desc: "High-intent search & PMax campaigns for service businesses." },
    { icon: <Youtube />, title: "YouTube Ads Campaign", desc: "6K TrueView views at ₹0.13 CPV, 56.9% view rate." },
    { icon: <Share2 />, title: "Social Media Posters & Reels", desc: "Brand calendars and reels for steady audience growth." },
    { icon: <Globe />, title: "Website Design Projects", desc: "Conversion-focused landing pages & business websites." },
    { icon: <MapPin />, title: "GMB Optimization", desc: "18 GMB leads + improved local visibility for Vgrow.ai." },
  ];
  return (
    <section id="portfolio" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeader center eyebrow="Portfolio" title="My Work Portfolio" sub="A snapshot of campaigns, creatives and websites delivered for clients." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cta">
                <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-soft">
                  <div aria-hidden className="absolute inset-0 opacity-60" style={{
                    backgroundImage: "radial-gradient(circle at 20% 20%, #38BDF8 0%, transparent 40%), radial-gradient(circle at 80% 80%, #2563EB 0%, transparent 45%)",
                    opacity: 0.18,
                  }} />
                  <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-cta transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <span className="[&_svg]:h-7 [&_svg]:w-7">{p.icon}</span>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-navy">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                  <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0EA5E9]">
                    View Project <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { t: "Business Audit", d: "Deep dive into your business, audience, offer & past campaigns." },
    { t: "Marketing Strategy", d: "Channel mix, budgets, funnels and KPIs mapped to your goals." },
    { t: "Creative & Campaign Setup", d: "Ad creatives, copy, landing pages & pixel tracking ready to launch." },
    { t: "Lead Tracking", d: "CRM/Sheet integration so every lead is captured and measurable." },
    { t: "Optimization & Scaling", d: "Weekly reviews, A/B tests and budget scaling for lower CPL." },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-20 lg:py-28">
      <div aria-hidden className="absolute -top-24 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#38BDF8]/25 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeader center eyebrow="Process" title="My Simple Growth Process" sub="A proven 5-step system that turns marketing spend into measurable leads." />
        <ol className="mt-14 relative">
          <span aria-hidden className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#0EA5E9] via-[#38BDF8] to-transparent md:left-1/2" />
          {steps.map((s, i) => (
            <li key={s.t} className={`relative grid gap-4 pb-10 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <div className="md:text-right">
                <span className="relative inline-grid h-12 w-12 place-items-center rounded-full bg-gradient-brand font-display text-lg font-extrabold text-white shadow-cta md:absolute md:left-1/2 md:-translate-x-1/2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3 md:mt-0 md:hidden">
                  <h3 className="font-display text-lg font-bold text-navy">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
                  <h3 className="font-display text-lg font-bold text-navy">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { tag: "Financial Services Client", name: "Operations Head", initials: "SR",
      quote: "Transparent reporting and weekly optimisation. Lead cost dropped to ₹7.88 — by far the best Meta Ads results we have ever had." },
    { tag: "Software Company Client", name: "Marketing Manager", initials: "VG",
      quote: "Strong creative strategy plus disciplined campaign management. 140+ quality leads and a clear lift in brand awareness." },
    { tag: "Local Business Client", name: "Business Owner", initials: "LB",
      quote: "GMB, ads and website all handled end-to-end. Walk-in enquiries and calls went up within the first month." },
  ];
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeader center eyebrow="Testimonials" title="Why Clients Trust Me"
            sub="Transparent reporting · campaign optimisation · creative strategy · lead-quality focus · ROI-driven." />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.map((x, i) => (
            <Reveal key={x.tag} delay={i * 130}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cta">
                <div className="flex gap-1 text-[#0EA5E9]">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy">"{x.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white">{x.initials}</span>
                  <span>
                    <span className="block font-semibold text-navy text-sm">{x.name}</span>
                    <span className="block text-xs text-muted-foreground">{x.tag}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden className="absolute inset-0 bg-gradient-brand" />
      <div aria-hidden className="absolute inset-0 opacity-40" style={{
        backgroundImage: "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.35) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.25) 0%, transparent 45%)",
      }} />
      <div className="relative mx-auto max-w-5xl px-5 text-center text-white lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
          <Megaphone className="h-3.5 w-3.5" /> Free 30-minute strategy call
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Ready to Grow Your Business Online?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          Let's build your online presence with ads, websites, SEO, and lead generation strategies designed for measurable growth.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="tel:+919912360547" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy shadow-cta transition-transform hover:-translate-y-0.5">
            <Phone className="h-4 w-4" /> Contact K Digital
          </a>
          <a href="https://wa.me/919912360547" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
            Chat on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3 text-left">
          <ContactPill icon={<Phone className="h-4 w-4" />} label="Phone" value="+91 9912360547" href="tel:+919912360547" />
          <ContactPill icon={<Mail className="h-4 w-4" />} label="Email" value="porallakoteswararao91215@gmail.com" href="mailto:porallakoteswararao91215@gmail.com" />
          <ContactPill icon={<Instagram className="h-4 w-4" />} label="Instagram" value="@kdigital_9" href="https://instagram.com/kdigital_9" />
        </div>
      </div>
    </section>
  );
}

function ContactPill({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white/20">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 text-white">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-wider text-white/70">{label}</span>
        <span className="block truncate text-sm font-semibold">{value}</span>
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Digital Marketing Specialist & Performance Marketer — helping businesses across India generate leads with
            Meta Ads, Google Ads, SEO, GMB and high-converting websites.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a href="https://instagram.com/kdigital_9" aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-sky-soft text-[#0EA5E9] hover:bg-gradient-brand hover:text-white transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="tel:+919912360547" aria-label="Call"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-sky-soft text-[#0EA5E9] hover:bg-gradient-brand hover:text-white transition-colors">
              <Phone className="h-4 w-4" />
            </a>
            <a href="mailto:porallakoteswararao91215@gmail.com" aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-sky-soft text-[#0EA5E9] hover:bg-gradient-brand hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Quick Links</h4>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {[["Home","#home"],["Services","#services"],["Portfolio","#portfolio"],["Results","#results"],["About","#about"],["Contact","#contact"]].map(([l,h]) => (
              <li key={l}><a href={h} className="text-muted-foreground hover:text-[#0EA5E9]">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Get in Touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#0EA5E9]" /><span>+91 9912360547</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#0EA5E9]" /><span className="break-all">porallakoteswararao91215@gmail.com</span></li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-[#0EA5E9]" /><span>@kdigital_9</span></li>
            <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#0EA5E9]" /><span>Based in India · Working Worldwide</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} K Digital — Koteswararao Poralla. All rights reserved.</p>
          <p>Built for businesses that want measurable growth.</p>
        </div>
      </div>
    </footer>
  );
}
