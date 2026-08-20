export const portfolioProjects = [
  { id: "engiora", name: "Engiora" },
  { id: "splitquest", name: "Splitquest" },
  { id: "compass83", name: "83 Compass" },
  { id: "fitxn", name: "Fitxn" },
  { id: "youverify-os", name: "Youverify OS" },
  { id: "amnid", name: "AMNID" },
  { id: "gowa", name: "Gowa" },
  { id: "loiztours", name: "LoizTours" },
  { id: "aprotime", name: "Aprotime" },
  { id: "tms", name: "Traffic Management Solutions" },
  { id: "hrx", name: "HRX" },
  { id: "monager", name: "Monager" },
];

export const portfolioProjectMap = portfolioProjects.reduce((acc, project) => {
  acc[project.id] = project;
  return acc;
}, {});
