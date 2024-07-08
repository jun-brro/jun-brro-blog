import React from "react";

const projects = [
  {
    title: "Sunny Braille",
    team: "Team HAEBARAGI (Yonsei Univ.)",
    period: "2023.09 ~ 2024.04",
    achievements: [
      "Grand Prize, 2023 D-TECH Competition (Minister of Health and Welfare Award ) and the EDUTECH Special Prize",
      "Grand Prize, 2024 3rd Disabled and Non-disabled Startup Contest (Minister of Education Award)",
      "2023 International Capstone Design Fair 2nd Prize",
      "2023 Yonsei AI Entrepreneurship Competition 3rd Prize",
    ],
    contributions:
      "Contribution 35% (FE 100%, BE 25%, DL 70%) | Developed web/app UI to deploy SUNNY Brailler in the online environment. Connected with previously developed Django-based server to web/app UI.",
    details: [
      "Selected as preliminary start-up package (2024, Yonsei University)",
      "Front-End (React), Back-End (Django) Engineer",
      "DL (Math OCR) developer",
      "SUNNY Brailler is an educational online braille service that can handle most mathematical problems in PDF format. Dramatically decreasing the time of brailling towards BRF format.",
      "Conducted 5 User Tests with totally blind students and a teacher in Hanbit School for blinds (한빛 맹학교)",
      "DL Vision: Adopting own OCR system for detecting math problems + BERT encoding system to handle several different languages.",
    ],
    link: "https://www.yonsei.ac.kr/sc/intro/pressrel.jsp?article_no=226223&mode=view",
  },
  {
    title: "AJTKS 알잘딱깔센 | My Own Music Recommendations by MU-LLaMA & MERT",
    team: "YAI (Yonsei AI)",
    period: "2024.04 ~ 2024.05",
    achievements: ["2024 Spring 4th YAICON 2nd Prize"],
    contributions: "",
    details: [""],
    link: "",
  },
];

const Portfolio = () => {
  return (
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      <span className="font-semibold text-lg sm:text-3xl md:text-4xl text-accent dark:text-accentDark">
        My Portfolio
      </span>
      <div className="mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="mb-12 p-4 sm:p-6 md:p-8 dark:bg-gray-700 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
          >
            <div className="flex items-center">
              <div className="flex items-baseline mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mr-2">
                  {project.title}
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-200">
                  {project.team}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
              {project.period}
            </p>
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">
              <span role="img" aria-label="trophy">
                🏆
              </span>{" "}
              Achievements
            </h4>
            <ul className="list-disc list-inside mb-8">
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className="text-xs sm:text-sm md:text-base mb-1">
                  {achievement}
                </li>
              ))}
            </ul>
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">
              Contributions
            </h4>
            <p className="text-xs sm:text-sm md:text-base mb-4">
              <strong>{project.contributions.split(" | ")[0]}</strong> |{" "}
              {project.contributions.split(" | ")[1]}
            </p>

            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">
              Details
            </h4>
            <ul className="list-disc list-inside mb-4">
              {project.details.map((detail, idx) => (
                <li key={idx} className="text-xs sm:text-sm md:text-base mb-1">
                  {detail}
                </li>
              ))}
            </ul>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Project Link
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
