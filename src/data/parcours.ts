export type ParcoursStatus = "targeted" | "current" | "past";

export interface ParcoursEntry {
  title: string;
  place: string;
  dates: string;
  status: ParcoursStatus;
  description?: string;
  bullets?: string[];
}

export const cvUrl = "/CV_Darkhansukh_Ganburel_Alternance_AIS_Dark.pdf";

export const formation: ParcoursEntry[] = [

  {
    title: "Technicien Supérieur Systèmes, Réseaux et Cybersécurité",
    place: "Studi · e-learning",
    dates: "03/2026 – en cours(examen pervu en novembre 2026)",
    status: "current",

    description:
      "Formation Graduate en systèmes, réseaux et cybersécurité.",
  },
  {
    title: "Apple Foundation Program (iOS)",
    place: "Simplon.co · Lyon",
    dates: "01/2026 – 02/2026",
    status: "past",
    description:
      "Programme intensif de découverte du développement iOS.",
  },
  {
    title: "Développeur Web Full Stack (BAC+2)",
    place: "Wild Code School · présentiel",
    dates: "09/2024 – 04/2025",
    status: "past",
    description:
      "Formation intensive full-stack JavaScript/TypeScript.",
  },
  {
    title: "Licence Archéologie et Anthropologie",
    place: "Université nationale de Mongolie",
    dates: "2010 – 2014",
    status: "past",
  },
];

export const experience: ParcoursEntry[] = [
  {
    title: "Transmetteur",
    place: "Armée de Terre · Légion étrangère, Nîmes",
    dates: "08/2019 – 08/2024",
    status: "past",
    bullets: [
      "Administration et sécurisation de systèmes de communication en environnements opérationnels",
      "Mise en place, configuration et maintenance de postes Windows",
      "Support utilisateur de premier niveau",
    ],
  },
  {
    title: "Opérateur montage d'ordinateurs serveurs",
    place: "Foxconn · République tchèque",
    dates: "04/2016 – 08/2019",
    status: "past",
    bullets: [
      "Assemblage, tests, contrôle qualité et diagnostic matériel (serveurs)",
      "Respect des standards, traçabilité, procédures qualité",
    ],
  },
];
