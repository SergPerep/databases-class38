// 30 papers
const papers = [
  {
    id: 1,
    title:
      "Single-step method of RNA isolation by acid guanidinium thiocyanate-phenol-chloroform extraction",
    publish_date: "2002-10-18",
    conference: "ICPAS 2012: Pure and Applied Sciences Conference",
  },
  {
    id: 2,
    title: "Protein measurement with the folin phenol reagent.",
    publish_date: "2011-02-06",
    conference:
      "ICDSAAAI 2012: Data Science, Analytics and Artificial Intelligence Conference",
  },
  {
    id: 3,
    title: "A short history of SHELX.",
    publish_date: "1993-04-24",
    conference:
      "ICMCMA 2012: Mathematical, Computational Methods and Algorithms Conference",
  },
  {
    id: 4,
    title: "Generalized gradient approximation made simple.",
    publish_date: "1990-09-06",
    conference:
      "ICMCMA 2012: Mathematical, Computational Methods and Algorithms Conference",
  },
  {
    id: 5,
    title:
      "Analysis of relative gene expression data using real-time quantitative PCR and the 2(T)(-Delta Delta C) method.",
    publish_date: "2008-05-05",
    conference: "ICSSC 2012: Science, Society and Culture Conference",
  },
  {
    id: 6,
    title:
      "Processing of X-ray diffraction data collected in oscillation mode.",
    publish_date: "2021-06-24",
    conference:
      "ICMCMA 2012: Mathematical, Computational Methods and Algorithms Conference",
  },
  {
    id: 7,
    title:
      "Density-functional exchange-energy approximation with correct asymptotic-behavior.",
    publish_date: "2012-11-29",
    conference:
      "ICMCMA 2012: Mathematical, Computational Methods and Algorithms Conference",
  },
  {
    id: 8,
    title:
      "Colorimetric method for determination of sugars and related substances.",
    publish_date: "2010-03-06",
    conference:
      "ICESIEA 2012: Engineering, Science and Industrial Engineering Applications Conference",
  },
  {
    id: 9,
    title:
      "Use of lead citrate at high pH as an electron-opaque stain in electron microscopy.",
    publish_date: "2012-08-28",
    conference: "ICSSC 2012: Science, Society and Culture Conference",
  },
  {
    id: 10,
    title:
      "The CLUSTAL_X Windows interface: Flexible strategies for multiple sequence alignment aided by quality analysis tools.",
    publish_date: "2000-06-24",
    conference:
      "ICTCM 2012: Technology in Computing and Mathematics Conference",
  },
  {
    id: 11,
    title:
      "Statistical methods for assessing agreement between two methods of clinical measurement.",
    publish_date: "2000-02-29",
    conference:
      "ICTCM 2012: Technology in Computing and Mathematics Conference",
  },
  {
    id: 12,
    title:
      "Reliability of molecular weight determinations by dodecyl sulfate-polyacrylamide gel electrophoresis.",
    publish_date: "2019-04-21",
    conference: "ICSSC 2012: Science, Society and Culture Conference",
  },
  {
    id: 13,
    title:
      "Isolation of biologically-active ribonucleic-acid from sources enriched in ribonuclease.",
    publish_date: "2012-11-10",
    conference: "ICMA 2012: Media and Art Conference",
  },
  {
    id: 14,
    title: "The attractions of proteins for small molecules and ions.",
    publish_date: "2020-04-01",
    conference: "ICMA 2012: Media and Art Conference",
  },
  {
    id: 15,
    title:
      "The moderator–mediator variable distinction in social psychological-research — conceptual, strategic, and statistical considerations.",
    publish_date: "2002-02-20",
    conference:
      "ICTCM 2012: Technology in Computing and Mathematics Conference",
  },
  {
    id: 16,
    title:
      "Self-consistent equations including exchange and correlation effects",
    publish_date: "1997-08-31",
    conference:
      "ICESIEA 2012: Engineering, Science and Industrial Engineering Applications Conference",
  },
  {
    id: 17,
    title:
      "Rapid colorimetric assay for cellular growth and survival — application to proliferation and cyto-toxicity assays",
    publish_date: "2004-12-04",
    conference: "ICPAS 2012: Pure and Applied Sciences Conference",
  },
  {
    id: 18,
    title: "Helical microtubules of graphitic carbon",
    publish_date: "1992-04-05",
    conference: "ICMA 2012: Media and Art Conference",
  },
  {
    id: 19,
    title: "The colorimetric determination of phosphorus",
    publish_date: "2004-02-19",
    conference: "ICPAS 2012: Pure and Applied Sciences Conference",
  },
  {
    id: 20,
    title:
      "Disc electrophoresis — II. Method and application to human serum proteins",
    publish_date: "1992-07-10",
    conference: "ICPAS 2012: Pure and Applied Sciences Conference",
  },
  {
    id: 21,
    title: "Inhomogeneous electron gas",
    publish_date: "2001-07-29",
    conference:
      "ICTCM 2012: Technology in Computing and Mathematics Conference",
  },
  {
    id: 22,
    title:
      "A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity",
    publish_date: "2015-01-23",
    conference:
      "ICTCM 2012: Technology in Computing and Mathematics Conference",
  },
  {
    id: 23,
    title:
      "A new generation of Ca2+ indicators with greatly improved fluorescence properties",
    publish_date: "2020-10-17",
    conference: "ICPAS 2012: Pure and Applied Sciences Conference",
  },
  {
    id: 24,
    title:
      "Efficient iterative schemes for ab initio total-energy calculations using a plane-wave basis set",
    publish_date: "2021-10-18",
    conference:
      "ICESIEA 2012: Engineering, Science and Industrial Engineering Applications Conference",
  },
  {
    id: 25,
    title: "High-resolution 2-dimensional electrophoresis of proteins",
    publish_date: "2013-03-31",
    conference:
      "ICESIEA 2012: Engineering, Science and Industrial Engineering Applications Conference",
  },
  {
    id: 26,
    title:
      "MEGA4: Molecular Evolutionary Genetics Analysis (MEGA) software version 4.0",
    publish_date: "2003-07-30",
    conference: "ICMA 2012: Media and Art Conference",
  },
  {
    id: 27,
    title: "Fuzzy sets",
    publish_date: "2002-01-05",
    conference:
      "ICESIEA 2012: Engineering, Science and Industrial Engineering Applications Conference",
  },
  {
    id: 28,
    title: "Phase annealing in SHELX-90: direct methods for larger structures",
    publish_date: "2008-06-12",
    conference: "ICSSC 2012: Science, Society and Culture Conference",
  },
  {
    id: 29,
    title:
      "Clinical diagnosis of Alzheimer’s disease: Report of the NINCDS-ADRDA Work Group under the auspices of Department of Health and Human Services Task Force on Alzheimer’s Disease",
    publish_date: "2014-03-28",
    conference: "ICSSC 2012: Science, Society and Culture Conference",
  },
  {
    id: 30,
    title: "Special points for Brillouin-zone integrations",
    publish_date: "1999-04-12",
    conference: "ICMA 2012: Media and Art Conference",
  },
];

// console.log(papers.length);
export default papers;
