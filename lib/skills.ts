import {
  siArchlinux,
  siBurpsuite,
  siCisco,
  siCss,
  siElastic,
  siGnubash,
  siHtml5,
  siKalilinux,
  siMetasploit,
  siMysql,
  siPython,
  siSnort,
  siVirtualbox,
  siVmware,
  siWireshark,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list below for the static skills grid that replaces the
// hover-driven keyboard interaction. Icons map to the security toolkit on the
// résumé. Taglines live in the i18n dictionary under `keyboard.taglines.<slug>`.
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [siPython, siGnubash, siMysql, siHtml5, siCss],
  [siMetasploit, siBurpsuite, siWireshark, siSnort, siElastic],
  [siKalilinux, siArchlinux, siCisco, siVmware, siVirtualbox],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();
