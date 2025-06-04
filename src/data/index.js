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
    name: "Step 1",
    description:
      "Go to the Google Drive Link https://drive.google.com/file/d/1fp5voobGazIM8B6N9DrbpgYpoUp4unWm/view?usp=drive_link" ,
    image: oscs,
  },
  {
    name: "Step 2",
    description:
      "Install and Unzip the file",
    image: devnotes,
  },
  {
    name: "Step 3",
    description:
      "Run and take a peek!",
    image: devnotes,
  },

];

export { experiences, portfolio };

