// Form.tsx
import React, { useState } from "react";
import { ResumeData } from "../types"; // Importing the type for resume data

interface FormProps {
  onSubmit: (data: ResumeData) => void; // Prop to handle form submission
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  // Initial state for the form, including sections for personal info, education, work experience, and skills
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: { name: "", email: "", phone: "" },
    education: [{ degree: "", institution: "", year: "" }],
    workExperience: [{ position: "", company: "", duration: "" }],
    skills: [{ skillName: "" }],
  });

  // Handle changes to form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: "personalInfo" | "education" | "workExperience" | "skills", // Restricted type for sections
    index: number
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const updatedData = { ...prevState };

      // Handling updates to personalInfo
      if (section === "personalInfo") {
        updatedData.personalInfo[name as keyof typeof updatedData.personalInfo] = value;
      } else if (section === "education" || section === "workExperience" || section === "skills") {
        // Handling updates to arrays like education, workExperience, and skills
        const sectionArray = updatedData[section as keyof typeof updatedData] as Array<any>;
        sectionArray[index][name as keyof typeof sectionArray[0]] = value;
      }

      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Submit the form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Personal Information Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <input
          type="text"
          name="name"
          value={formData.personalInfo.name}
          onChange={(e) => handleChange(e, "personalInfo", 0)}
          placeholder="Your Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.personalInfo.email}
          onChange={(e) => handleChange(e, "personalInfo", 0)}
          placeholder="Your Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          name="phone"
          value={formData.personalInfo.phone}
          onChange={(e) => handleChange(e, "personalInfo", 0)}
          placeholder="Your Phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        {formData.education.map((education, index) => (
          <div key={index} className="space-y-3">
            <input
              type="text"
              name="degree"
              value={education.degree}
              onChange={(e) => handleChange(e, "education", index)}
              placeholder="Degree"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="institution"
              value={education.institution}
              onChange={(e) => handleChange(e, "education", index)}
              placeholder="Institution"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="year"
              value={education.year}
              onChange={(e) => handleChange(e, "education", index)}
              placeholder="Year"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Work Experience Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
        {formData.workExperience.map((work, index) => (
          <div key={index} className="space-y-3">
            <input
              type="text"
              name="position"
              value={work.position}
              onChange={(e) => handleChange(e, "workExperience", index)}
              placeholder="Position"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="company"
              value={work.company}
              onChange={(e) => handleChange(e, "workExperience", index)}
              placeholder="Company"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="duration"
              value={work.duration}
              onChange={(e) => handleChange(e, "workExperience", index)}
              placeholder="Duration"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        {formData.skills.map((skill, index) => (
          <div key={index} className="space-y-3">
            <input
              type="text"
              name="skillName"
              value={skill.skillName}
              onChange={(e) => handleChange(e, "skills", index)}
              placeholder="Skill"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
