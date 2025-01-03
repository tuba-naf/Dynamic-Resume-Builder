import React from "react";
import jsPDF from "jspdf";

// Define types for data structure
interface PersonalInfo {
  name: string;
  email: string;
}

interface EducationItem {
  degree: string;
  institute: string;
}

interface WorkExperienceItem {
  jobTitle: string;
  company: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: string[];
  digitalLiteracy: string[];
  languages: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
  onBack: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onBack }) => {
  const generatePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" }); // Set to A4 size
    const margin = 10; // Define margin for text positioning

    // Add custom font and style
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Add personal info with styling
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102); // Dark blue for the header
    doc.text(`Resume of ${data.personalInfo.name}`, margin, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black for text
    doc.text(`Email: ${data.personalInfo.email}`, margin, 30);

    // Add Education section with a header style
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102); // Dark blue for section header
    doc.text(`Education`, margin, 40);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black for list items
    data.education.forEach((edu, index) => {
      doc.text(`${index + 1}. ${edu.degree} at ${edu.institute}`, margin, 50 + index * 10);
    });

    // Add Work Experience section with a header style
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text(`Work Experience`, margin, 60 + data.education.length * 10);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    data.workExperience.forEach((work, index) => {
      doc.text(`${index + 1}. ${work.jobTitle} at ${work.company}`, margin, 70 + index * 10 + data.education.length * 10);
    });

    // Add Skills section with styling
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text(`Skills`, margin, 80 + data.education.length * 10 + data.workExperience.length * 10);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(data.skills.join(", "), margin, 90 + data.education.length * 10 + data.workExperience.length * 10);

    // Add Digital Literacy section with styling
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text(`Digital Literacy`, margin, 100 + data.education.length * 10 + data.workExperience.length * 10);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(data.digitalLiteracy.join(", "), margin, 110 + data.education.length * 10 + data.workExperience.length * 10);

    // Add Languages section with styling
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102);
    doc.text(`Languages`, margin, 120 + data.education.length * 10 + data.workExperience.length * 10);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(data.languages.join(", "), margin, 130 + data.education.length * 10 + data.workExperience.length * 10);

    // Save the PDF
    doc.save("resume.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Resume Preview</h2>
      <p className="text-lg"><strong>Name:</strong> {data.personalInfo.name}</p>
      <p className="text-lg"><strong>Email:</strong> {data.personalInfo.email}</p>
      <div className="border-t-2 border-gray-200"></div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Education</h3>
        <ul className="list-disc pl-6 space-y-2">
          {data.education.map((edu, index) => (
            <li key={index} className="text-gray-700">{edu.degree} at {edu.institute}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Work Experience</h3>
        <ul className="list-disc pl-6 space-y-2">
          {data.workExperience.map((work, index) => (
            <li key={index} className="text-gray-700">{work.jobTitle} at {work.company}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Skills</h3>
        <ul className="list-disc pl-6 space-y-2">
          {data.skills.map((skill, index) => (
            <li key={index} className="text-gray-700">{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Digital Literacy</h3>
        <ul className="list-disc pl-6 space-y-2">
          {data.digitalLiteracy.map((literacy, index) => (
            <li key={index} className="text-gray-700">{literacy}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Languages</h3>
        <ul className="list-disc pl-6 space-y-2">
          {data.languages.map((language, index) => (
            <li key={index} className="text-gray-700">{language}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4 justify-center mt-6">
        <button
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800 font-semibold"
          onClick={onBack}
        >
          To edit info, Click on preview
        </button>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
