"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "msackran@umich.edu";
const PHONE = "734.883.2142";
const PHONE_HREF = "tel:+17348832142";

// Localised content lives in `{ es, en }` objects inside these arrays so the
// page can be a straightforward array.map() at render time. Tool and brand
// names stay as plain strings (they're not localised).
type Localised = { es: string; en: string };

type Project = ProjectDetail & {
  align: "left" | "right";
  section:
    | "project1"
    | "project2"
    | "project3"
    | "project4"
    | "project5";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      es: "Investigación de vulnerabilidad en UnRAR.dll de WinRAR",
      en: "WinRAR UnRAR.dll Vulnerability Research",
    },
    stack: [
      "C / C++",
      "UnRAR.dll",
      "IDA Pro",
      "WinDbg",
      "Binary Ninja",
      "Python",
      "RAR",
    ],
    desc: {
      es: "Descubrí una vulnerabilidad de agotamiento de pila (CVSS 8.7, alta) en UnRAR.dll de WinRAR y la divulgué de forma responsable a RARLAB.",
      en: "Discovered a high-severity (CVSS 8.7) stack-exhaustion vulnerability in WinRAR's UnRAR.dll and responsibly disclosed it to RARLAB.",
    },
    details: {
      es: "Mediante ingeniería inversa de UnRAR.dll (IDA Pro, WinDbg y Binary Ninja) encontré una vulnerabilidad de agotamiento de pila (CVSS 8.7, alta) que se dispara con archivos RAR manipulados. Construí una prueba de concepto reproducible que provoca el crash de forma fiable y realicé una divulgación responsable a RARLAB, que confirmó el problema. Asignación de CVE pendiente.",
      en: "By reverse-engineering UnRAR.dll (IDA Pro, WinDbg, and Binary Ninja) I found a stack-exhaustion vulnerability (CVSS 8.7, High) triggered by crafted RAR archives. I built a reproducible proof-of-concept that crashes the parser reliably and responsibly disclosed it to RARLAB, who confirmed the issue. CVE assignment pending.",
    },
    media: ["/projects/winrar/cover.png"],
    highlights: ["python", "gnubash", "virtualbox"],
    badge: { es: "CVE pendiente", en: "CVE pending" },
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      es: "Angel Dust — Fuzzer asistido por IA",
      en: "Angel Dust — AI-Assisted Fuzzer",
    },
    stack: [
      "Python",
      "Fuzzing",
      "AFL++",
      "7-Zip",
      "VLC",
      "Crash Triage",
    ],
    desc: {
      es: "Herramienta de fuzzing asistida por IA que destapó crashes reproducibles en 7-Zip y VLC, confirmados por sus mantenedores.",
      en: "An AI-assisted fuzzing tool that surfaced reproducible crashes in 7-Zip and VLC, confirmed by their maintainers.",
    },
    details: {
      es: "Angel Dust combina fuzzing tradicional con heurísticas asistidas por IA para generar entradas mutadas más interesantes y priorizar los casos que probablemente rompan el parser. Encontró crashes reproducibles en 7-Zip y VLC, que fueron confirmados por sus mantenedores tras el triaje y la reducción de los casos de prueba.",
      en: "Angel Dust pairs traditional fuzzing with AI-assisted heuristics to generate more interesting mutated inputs and prioritise the cases most likely to break a parser. It surfaced reproducible crashes in 7-Zip and VLC, which were confirmed by their maintainers after triage and test-case minimisation.",
    },
    media: ["/projects/angel-dust/cover.png"],
    highlights: ["python", "gnubash", "wireshark"],
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      es: "Wolvsec — 1er puesto, CTF de MISEC",
      en: "Wolvsec — 1st Place, MISEC CTF",
    },
    stack: [
      "CTF",
      "Metasploit",
      "Burp Suite",
      "Wireshark",
      "Kali Linux",
    ],
    desc: {
      es: "Competí con Wolvsec y ganamos el 1er puesto en la competición de MISEC, conectando con profesionales en conferencias como DEFCON.",
      en: "Competed with Wolvsec to win 1st place at the MISEC competition, connecting with professionals at conferences like DEFCON.",
    },
    details: {
      es: "Como parte de Wolvsec conseguimos el primer puesto en la competición de MISEC gracias a un trabajo en equipo sólido y a la resolución de problemas bajo presión, cubriendo web, forense, redes y explotación. La comunidad también me llevó a conectar con profesionales del sector en conferencias como DEFCON.",
      en: "As part of Wolvsec, we took first place at the MISEC competition through strong teamwork and problem-solving under pressure, spanning web, forensics, networking, and exploitation challenges. The community also connected me with industry professionals at conferences like DEFCON.",
    },
    media: ["/projects/wolvsec/cover.png"],
    highlights: ["metasploit", "burpsuite", "wireshark", "kalilinux"],
    badge: { es: "1er puesto", en: "1st place" },
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      es: "Zerobit Crypto Bot",
      en: "Zerobit Crypto Bot",
    },
    stack: [
      "Python",
      "Machine Learning",
      "pandas",
      "Perpetual Futures",
      "Backtesting",
    ],
    desc: {
      es: "Bot de trading que usa ML para filtrar más de 600 estrategias e indicadores y operar futuros perpetuos.",
      en: "A trading bot that uses ML to filter through 600+ strategies and indicators to trade perpetual futures.",
    },
    details: {
      es: "Zerobit aplica machine learning para cribar más de 600 estrategias e indicadores y quedarse con las señales con expectativa positiva, ejecutando después operaciones de futuros perpetuos. Incluye backtesting sobre datos históricos y gestión de riesgo para acotar el drawdown.",
      en: "Zerobit applies machine learning to sift through 600+ strategies and indicators, keeping only the signals with positive expectancy before executing perpetual-futures trades. It includes backtesting over historical data and risk management to cap drawdown.",
    },
    media: ["/projects/zerobit/cover.png"],
    highlights: ["python", "elastic"],
    align: "right",
    section: "project4",
  },
  {
    num: "05",
    name: {
      es: "Hackathon 2marines — Agente de IA",
      en: "2marines Hackathon — AI Agent",
    },
    stack: ["Python", "AI Agent", "LLMs", "Data Security"],
    desc: {
      es: "Construí, en equipo, un agente de IA en Python y asesoré sobre la seguridad de los datos del proyecto.",
      en: "Built a Python-based AI agent with a team and advised on the project's data security.",
    },
    details: {
      es: "En el hackathon 2marines trabajé en equipo para construir un agente de IA en Python bajo restricciones de tiempo, además de asesorar al grupo sobre el manejo seguro de los datos: minimización, control de accesos y buenas prácticas al integrar servicios de terceros.",
      en: "At the 2marines hackathon I worked on a team to build a Python-based AI agent under time pressure, and advised the group on secure data handling: minimisation, access control, and best practices when integrating third-party services.",
    },
    media: ["/projects/2marines/cover.png"],
    highlights: ["python", "gnubash"],
    align: "left",
    section: "project5",
  },
];

const experiences: Array<{
  role: Localised;
  company: string;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
}> = [
  {
    role: { es: "Aprendiz de Ciberseguridad", en: "Cyber Security Apprentice" },
    company: "Pearl Consulting Group",
    period: { es: "Sep 2026 — Presente", en: "Sep 2026 — Present" },
    location: { es: "Chicago, IL", en: "Chicago, IL" },
    summary: {
      es: "Evalúo cómo las empresas pueden adoptar herramientas de IA sin abrir nuevas superficies de ataque, alineando los controles con marcos reconocidos.",
      en: "Assessing how enterprises can adopt AI tooling without opening new attack surface, aligning controls to recognised frameworks.",
    },
    bullets: [
      {
        es: "Evalué herramientas de IA empresariales (Copilot, Claude, Wrike) frente a inyección de prompts, fuga de datos y riesgos de permisos/agentes.",
        en: "Assessed enterprise AI tools (Copilot, Claude, Wrike) for prompt injection, data leakage, and permission/agent risks.",
      },
      {
        es: "Recomendé controles de seguridad alineados con NIST AI RMF, ISO 42001 y OWASP.",
        en: "Recommended security controls aligned with NIST AI RMF, ISO 42001, and OWASP.",
      },
    ],
    stack: [
      "NIST AI RMF",
      "ISO 42001",
      "OWASP",
      "Prompt Injection",
      "Copilot",
      "Claude",
    ],
  },
  {
    role: { es: "Fundador", en: "Founder" },
    company: "Dementia & Parkinson's Home Care",
    period: { es: "Ene 2022 — Presente", en: "Jan 2022 — Present" },
    location: { es: "Michigan", en: "Michigan" },
    summary: {
      es: "Fundé una agencia de cuidado a domicilio no médica y construí el software que la hace funcionar.",
      en: "Founded a non-medical home care agency and built the software that runs it.",
    },
    bullets: [
      {
        es: "Fundé una agencia de cuidado a domicilio no médica.",
        en: "Founded a non-medical home care agency.",
      },
      {
        es: "Diseñé y desarrollé de principio a fin su aplicación en Flutter.",
        en: "Designed and built its custom Flutter application end to end.",
      },
    ],
    stack: ["Flutter", "Dart", "Operations"],
  },
];

const education: Array<{
  degree: Localised;
  school: string;
  period: Localised;
  detail: Localised;
}> = [
  {
    degree: {
      es: "Grado en Ciberseguridad",
      en: "B.S. in Cybersecurity",
    },
    school: "Eastern Michigan University",
    period: { es: "Graduado May 2025", en: "Graduated May 2025" },
    detail: { es: "GPA 3.94", en: "GPA 3.94" },
  },
  {
    degree: {
      es: "Técnico Superior en Ciberseguridad",
      en: "A.A.S. in Cybersecurity",
    },
    school: "Washtenaw Community College",
    period: { es: "Graduado Ene 2024", en: "Graduated Jan 2024" },
    detail: { es: "GPA 3.83", en: "GPA 3.83" },
  },
  {
    degree: {
      es: "Licencia de Piloto Privado FAA (monomotor terrestre)",
      en: "FAA Private Pilot Certificate (Single Engine Land)",
    },
    school: "Federal Aviation Administration",
    period: { es: "Emitida Abr 2026", en: "Issued Apr 2026" },
    detail: { es: "Certificación", en: "Certification" },
  },
];

const coursework: Localised[] = [
  { es: "Operaciones de Ciberseguridad — CCNA Cyber Ops", en: "Cybersecurity Operations — CCNA Cyber Ops" },
  { es: "Informática Forense I", en: "Digital Forensics I" },
  { es: "Análisis de Malware e Ingeniería Inversa", en: "Malware Analysis & Reverse Engineering" },
  { es: "Hacking Ético y Seguridad Ofensiva", en: "Ethical Hacking & Offensive Security" },
  { es: "Introducción al Criptoanálisis y Ataques Genéricos", en: "Intro to Cryptanalysis & Generic Attacks" },
  { es: "Fundamentos de Pentesting de Redes", en: "Essentials of Network Penetration Testing" },
  { es: "Linux/UNIX I: Fundamentos", en: "Linux/UNIX I: Fundamentals" },
  { es: "Gestión y Seguridad de Bases de Datos", en: "Database Management & Security" },
  { es: "Protección del Perímetro de Red — CCNA Security", en: "Network Perimeter Protection — CCNA Security" },
  { es: "Introducción a la Seguridad de Redes — Security+", en: "Introduction to Network Security — Security+" },
];

function pick<T>(loc: { es: T; en: T }, lang: Lang): T {
  return loc[lang];
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. On mobile
            the canvas lives inside the hero instead (see below) so it scrolls
            away and the rest of the page is clean, fast 2D. */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              Mohammad Ebrahim
            </span>
            {/* Wrapper (not the pill itself) carries the hide: .status-pill
                hard-sets display:inline-flex, which beats Tailwind's .hidden
                due to CSS source order, so hiding must happen on a parent. */}
            <span className="hidden md:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="hover"
              className="frost-btn !py-1.5 !px-3 !text-xs"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span>Email</span>
            </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {/* Mobile-only 3D centerpiece. Lives inside the hero (scrolls away
                with it) and takes pointer events so keycaps are tappable. */}
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">
                <HeroWord text="Mohammad" delay={120} />
                <br />
                <HeroWord text="Ebrahim" delay={260} className="text-ice-400" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href={lang === "en" ? "/cv_en.pdf" : "/cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                {/* Mobile-only full-width break: forces the social icons onto
                    their own row below the two primary buttons. Hidden on md+
                    so desktop keeps everything on a single line. */}
                <div className="basis-full h-0 md:hidden" aria-hidden />
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </a>
                <a
                  href={PHONE_HREF}
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="Phone"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack — desktop relies on the 200vh scroll + sticky title while
              the keyboard does the talking on hover. On mobile (md:) that
              choreography is gone, so we drop the tall scroll and render a
              real, legible skills grid with the same taglines. */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid (recovers the hover interaction as static
                  content the keyboard can't surface on touch). */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Experience — title is sticky at top-24 (feels anchored) but sits
              BEHIND the cards (z-0 vs. card wrapper's z-10), so as you scroll
              the card slides over the title. The section has no extra filler
              beyond the cards, so when you scroll past the last card the
              section ends and the title un-pins and exits the viewport at the
              same time — giving the "anchored then both disappear" feel. */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {pick(exp.summary, lang)}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Education & certifications — same sticky-title treatment as the
              experience section, followed by degree cards and a coursework
              chip cloud. */}
          <section
            data-kb-section="education"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("education.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("education.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {education.map((ed, idx) => (
                <Reveal
                  key={`${ed.school}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-ice-50 tracking-tight">
                        {pick(ed.degree, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {ed.school}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                        {pick(ed.period, lang)}
                      </span>
                      <p className="text-ice-300 text-sm mt-2">
                        {pick(ed.detail, lang)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={education.length * 120} as="article" className="pointer-events-auto">
                <p className="text-[11px] uppercase tracking-[0.25em] text-ice-400 mb-3 mt-2">
                  {t("education.courseworkTitle")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {coursework.map((c, i) => (
                    <span key={i} data-cursor="hover" className="frost-chip">
                      {pick(c, lang)}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("Ver más") don't sit under the
                      // fixed SectionNav dots on the right edge. On mobile they
                      // collapse to a normal left-aligned full-width card.
                      "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href={PHONE_HREF}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {t("contact.call")} · {PHONE}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}
