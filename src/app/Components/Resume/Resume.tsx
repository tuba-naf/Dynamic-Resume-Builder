import React from "react";
import { ResumeData } from "@/app/types"; // Import the ResumeData type to ensure correct data structure
import Link from "next/link"; // Import Link for navigation

interface ResumeProps {
  data: ResumeData; // Data passed down from the parent component
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl w-full space-y-8">
        {/* Personal Information Section */}
        <section className="space-y-4">
          <h2 className="text-4xl font-semibold text-black">{data.personalInfo.name}</h2>
          <p className="text-lg text-gray-800">{data.personalInfo.email}</p>
          <p className="text-lg text-gray-800">{data.personalInfo.phone}</p>
        </section>

        {/* Education Section */}
        <section>
          <h3 className="text-2xl font-semibold text-black border-b-2 border-gray-300 pb-2 mb-6">
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-medium text-black">{edu.degree}</p>
                <p className="text-gray-800">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section>
          <h3 className="text-2xl font-semibold text-black border-b-2 border-gray-300 pb-2 mb-6">
            Work Experience
          </h3>
          <div className="space-y-4">
            {data.workExperience.map((work, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-medium text-black">{work.position}</p>
                <p className="text-gray-800">{work.company}</p>
                <p className="text-sm text-gray-600">{work.duration}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h3 className="text-2xl font-semibold text-black border-b-2 border-gray-300 pb-2 mb-6">
            Skills
          </h3>
          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 text-black rounded-full text-sm shadow-md transition-all hover:bg-gray-300"
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
