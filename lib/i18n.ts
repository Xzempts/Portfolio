// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ES and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "es" | "en";

export const LANGUAGES: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).es === "string";
}

export const DICT = {
  picker: {
    season: { es: "Estación", en: "Season" },
    language: { es: "Idioma", en: "Language" },
  },
  seasons: {
    spring: { es: "Primavera", en: "Spring" },
    summer: { es: "Verano", en: "Summer" },
    autumn: { es: "Otoño", en: "Autumn" },
    winter: { es: "Invierno", en: "Winter" },
  },
  nav: {
    aria: { es: "Secciones", en: "Sections" },
    home: { es: "Inicio", en: "Home" },
    stack: { es: "Stack", en: "Stack" },
    experience: { es: "Experiencia", en: "Experience" },
    education: { es: "Educación", en: "Education" },
    project: { es: "Proyecto", en: "Project" },
    contact: { es: "Contacto", en: "Contact" },
  },
  header: {
    availability: {
      es: "Open to opportunities",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I am" },
    roleLine: {
      es: "Investigador de Ciberseguridad.",
      en: "Cyber Security Researcher.",
    },
    tagline: {
      es: "Investigación de vulnerabilidades, ingeniería inversa y seguridad ofensiva.",
      en: "Vulnerability research, reverse engineering, and offensive security.",
    },
    cv: { es: "Descargar CV", en: "Download résumé" },
    hire: { es: "Contactarme", en: "Contact me" },
    scroll: { es: "Scroll para explorar", en: "Scroll to explore" },
    keysHint: {
      es: "· hover sobre las teclas",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { es: "Security Stack", en: "Security Stack" },
    hint: {
      es: "(hint: pasa el ratón por una tecla)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      es: "Las herramientas con las que investigo y ataco.",
      en: "The tools I research and attack with.",
    },
  },
  experience: {
    title: { es: "Experience", en: "Experience" },
    subtitle: {
      es: "Donde he puesto la seguridad en práctica.",
      en: "Where I put security into practice.",
    },
  },
  education: {
    title: { es: "Education", en: "Education" },
    subtitle: {
      es: "Titulaciones, certificaciones y asignaturas.",
      en: "Degrees, certifications, and coursework.",
    },
    courseworkTitle: {
      es: "Asignaturas destacadas",
      en: "Relevant coursework",
    },
  },
  projects: {
    kicker: { es: "proyecto", en: "project" },
    viewMore: { es: "Ver más", en: "View more" },
    openSite: { es: "Abrir sitio", en: "Visit site" },
    viewCode: { es: "Ver código", en: "View code" },
    close: { es: "Cerrar", en: "Close" },
    stackLabel: { es: "Stack", en: "Stack" },
    overview: { es: "Resumen", en: "Overview" },
  },
  contact: {
    kicker: { es: "contacto", en: "contact" },
    title: { es: "¿Hablamos?", en: "Let's talk?" },
    body: {
      es: "¿Investigando una vulnerabilidad, montando un laboratorio o buscando talento en seguridad? Mi bandeja está abierta.",
      en: "Researching a vulnerability, building a lab, or hiring for security work? My inbox is open.",
    },
    copyEmail: { es: "Copiar email", en: "Copy email" },
    openMail: { es: "Abrir mail", en: "Open mailto" },
    call: { es: "Llamar", en: "Call" },
    emailToast: { es: "Email copiado", en: "Email copied" },
    footer: {
      es: "© 2026 Mohammad Ebrahim. Todos los derechos reservados.",
      en: "© 2026 Mohammad Ebrahim. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      python: {
        es: "Mi herramienta para PoCs, tooling y automatización.",
        en: "My go-to for PoCs, tooling, and automation.",
      },
      gnubash: {
        es: "El pegamento de cada laboratorio y cadena de exploits.",
        en: "Glue for every lab and exploit chain.",
      },
      mysql: {
        es: "Donde viven las consultas inyectables.",
        en: "Where the injectable queries live.",
      },
      html5: {
        es: "La superficie de ataque que todos olvidan.",
        en: "The attack surface everyone forgets.",
      },
      css: {
        es: "Hasta los estilos esconden trucos de clickjacking.",
        en: "Even styling hides clickjacking tricks.",
      },
      metasploit: {
        es: "Del proof-of-concept a la shell.",
        en: "From proof-of-concept to shell.",
      },
      burpsuite: {
        es: "Interceptar, manipular, repetir.",
        en: "Intercept, tamper, repeat.",
      },
      wireshark: {
        es: "Ante la duda, lee los paquetes.",
        en: "When in doubt, read the packets.",
      },
      snort: {
        es: "Reglas que cazan la intrusión.",
        en: "Rules that catch the intrusion.",
      },
      elastic: {
        es: "Cazando amenazas entre los logs (ELK & Security Onion).",
        en: "Hunting threats across the logs (ELK & Security Onion).",
      },
      kalilinux: {
        es: "La caja de herramientas ofensiva, todo incluido.",
        en: "The offensive toolbox, batteries included.",
      },
      archlinux: {
        es: "Uso Arch, por cierto — y es mi día a día.",
        en: "I use Arch, btw — and I daily-drive it.",
      },
      cisco: {
        es: "Donde aprendí cómo se enrutan los paquetes (Packet Tracer).",
        en: "Where I learned how packets really route (Packet Tracer).",
      },
      vmware: {
        es: "Cámara de detonación para muestras peligrosas.",
        en: "Detonation chamber for nasty samples.",
      },
      virtualbox: {
        es: "Snapshot, rómpelo, revierte.",
        en: "Snapshot, break it, roll back.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.es ?? path;
  return path;
}
