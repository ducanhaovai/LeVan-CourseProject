import React from "react";

const PageLearn = () => {
  const learnItemsLeft = [
    "Prepare for Industry Certification Exam",
    "Hours and Hours of Video Instruction",
    "Over 25 Engaging Lab Exercises",
    "Instructor Available by Email or on the Forums",
    "Comprehensive Coverage of HTML and CSS",
    "Server Side Development with PHP",
  ];

  const learnItemsRight = [
    "Earn Certification that is Proof of your Competence",
    "Dozens of Code Examples to Download and Study",
    "All Lab Solutions",
    "All Free Tools",
    "Client Side Programming with Javascript",
    "Learn Database Development with mySQL",
  ];

  return (
    <div className="container whitespace-nowrap ">
      <h2 className="text-xl font-medium mb-6">What you will learn</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <ul className="flex-1 space-y-2">
          {learnItemsLeft.map((item, index) => (
            <li key={index} className="text-base text-gray-800 flex items-center">
              <i className="fa-solid fa-check mr-2"></i>
              {item}
            </li>
          ))}
        </ul>
        <ul className="flex-1 space-y-2">
          {learnItemsRight.map((item, index) => (
            <li key={index} className="text-base text-gray-800 flex items-center">
              <i className="fa-solid fa-check mr-2 "></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageLearn;
