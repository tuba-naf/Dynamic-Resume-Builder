// page.tsx
"use client"; // Ensure the page is rendered on the client-side in Next.js

import React, { useState } from "react";
import Form from "./Form/Form"; // Import the Form component
import Resume from "./Components/Resume/Resume"; // Import the Resume component
import { ResumeData } from "./types"; // Import the ResumeData type for type safety

const MainPage: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Handle the form submission to update resumeData state
  const handleFormSubmit = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Build Your Resume</h1>

      {/* Display Form if resumeData is null, otherwise show the Resume */}
      {resumeData === null ? (
        <Form onSubmit={handleFormSubmit} />
      ) : (
        <Resume data={resumeData} />
      )}
    </div>
  );
};

export default MainPage;
