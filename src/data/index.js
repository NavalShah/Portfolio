import {
  algorithms,
  devnotes,
  oscs,
} from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Hero",
  },
  {
    id: "portfolio",
    title: "Portfolio",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "Director of Coding",
    company_name: "Unsway",
    date: "April 2024 - Present",
    details: [
      "Led a team of developers to craft creative curriculums",
      "Led a team to fous for programming outreach and development <span style='color: white;'>Programming</span>.",
    ],
  },
  {
    title: "Software Developer Intern",
    company_name: "Klinn",
    date: "Nov 2024 - Oct 2024",
    details: [
      "Developer for Klinn, worked on development of <span style='color: white;'> <a href='https://klinn.works/'> klinn.works<a></span>.",
      "<span style='color: white;'>Developed innovative</span> innovative and interactive websites.",
        ],
  },
  // {
  //   title: "Software Engineer",
  //   company_name: "Prime 3",
  //   date: "2018 - 2019",
  //   details: [
  //     "Built custom enterprise applications for a <span style='color: white;'>Fortune 500 company</span> as a full-stack software engineer.",
  //     "Developed and maintained <span style='color: white;'>scalable backend services</span>, ensuring high availability for critical business applications.",
  //     "<span style='color: white;'>Collaborated with a team</span> to design and implement front-end interfaces.",
  //   ],
  // },
  // {
  //   title: "Computer Science",
  //   company_name: "ODU",
  //   date: "2015 - 2018",
  //   details: [
  //     "Built a <span style='color: white;'>computer science foundation</span> learning theory, computer architecture, and software engineering.",
  //     "Worked and interned at <span style='color: white;'>NASA and Norfolk Southern Railway</span> to gain practical experience in the field of data analysis.",
  //     "Acted as a member of the <span style='color: white;'>Association for Computing Machinery</span> (ACM).",
  //   ],
  // },
];

const portfolio = [
  {
    name: "Voca",
    description:
      "A Machine Learning Application that empowers people who stutter to lead better, more fluent lives",
    image: oscs,
  },
  {
    name: "Carbon Canopy",
    description:
      "Made during BRHacks, an app that emphasizes personal responsibility in the fight against climate change.",
    image: devnotes,
  },

];

export { experiences, portfolio };

