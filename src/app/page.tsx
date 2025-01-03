'use client';  // Add 'use client' directive

import { useState } from "react";
import Form from "./Components/form";
import Resume from "./Components/resume";

// Updated resumeData structure to match ResumeData type
const Home = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: "John Doe", email: "john.doe@example.com" },
    education: [{ degree: "B.Sc", institute: "University XYZ" }],
    workExperience: [{ jobTitle: "Software Developer", company: "TechCorp" }],
    skills: ["JavaScript", "React", "Node.js"],
    digitalLiteracy: ["MS Office", "Google Suite"],
    languages: ["English", "Spanish"],
  });

  const handleBack = () => {
    console.log("Back button clicked");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Form onSubmit={setResumeData} />
        <Resume data={resumeData} onBack={handleBack} />
      </div>
    </div>
  );
};

export default Home;
