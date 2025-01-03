import React, { useState } from "react";
import UploadPicture from "./Uploadpicture"; 
import Image from "next/image";

// Define types for the state
type EducationItem = { degree: string; institute: string };
type WorkExperienceItem = { jobTitle: string; company: string };
type StringArrayState = string[];

type ResumeData = {
  personalInfo: { name: string; email: string; profilePicture: string | null };
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: string[];
  digitalLiteracy: string[];
  languages: string[];
};

const ResumeBuilder: React.FC<{ onSubmit: (data: ResumeData) => void }> = ({ onSubmit }) => {
  const [personalInfo, setPersonalInfo] = useState<{ name: string; email: string; profilePicture: string | null }>({
    name: "",
    email: "",
    profilePicture: null,
  });
  const [education, setEducation] = useState<EducationItem[]>([{ degree: "", institute: "" }]);
  const [workExperience, setWorkExperience] = useState<WorkExperienceItem[]>([{ jobTitle: "", company: "" }]);
  const [skills, setSkills] = useState<StringArrayState>([]);
  const [digitalLiteracy, setDigitalLiteracy] = useState<StringArrayState>([]);
  const [languages, setLanguages] = useState<StringArrayState>([]);

  // Function to handle image change from UploadPicture
  const handleImageChange = (image: string | null) => {
    setPersonalInfo((prev) => ({ ...prev, profilePicture: image }));
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      personalInfo,
      education,
      workExperience,
      skills,
      digitalLiteracy,
      languages,
    });
  };

  // Handle adding/removing education and work experience items
  const addEducation = () => setEducation([...education, { degree: "", institute: "" }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));

  const addWorkExperience = () => setWorkExperience([...workExperience, { jobTitle: "", company: "" }]);
  const removeWorkExperience = (index: number) => setWorkExperience(workExperience.filter((_, i) => i !== index));

  return (
    <form onSubmit={handleFormSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-8">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
        <UploadPicture onImageChange={handleImageChange} />
        {personalInfo.profilePicture && (
          <div className="mt-4">
            <Image src={personalInfo.profilePicture} alt="Profile Preview" className="h-32 w-32 rounded-full object-cover" />
          </div>
        )}
        <input
          type="text"
          placeholder="Name"
          value={personalInfo.name}
          onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
          className="input-field"
        />
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                setEducation(education.map((item, i) => (i === index ? { ...item, degree: e.target.value } : item)))
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Institute"
              value={edu.institute}
              onChange={(e) =>
                setEducation(education.map((item, i) => (i === index ? { ...item, institute: e.target.value } : item)))
              }
              className="input-field"
            />
            <button type="button" onClick={() => removeEducation(index)} className="text-red-500">
              Remove Education
            </button>
          </div>
        ))}
        <button type="button" onClick={addEducation} className="btn-primary">
          Add Education
        </button>
      </div>

      {/* Work Experience Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
        {workExperience.map((work, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              placeholder="Job Title"
              value={work.jobTitle}
              onChange={(e) =>
                setWorkExperience(workExperience.map((item, i) => (i === index ? { ...item, jobTitle: e.target.value } : item)))
              }
              className="input-field"
            />
            <input
              type="text"
              placeholder="Company"
              value={work.company}
              onChange={(e) =>
                setWorkExperience(workExperience.map((item, i) => (i === index ? { ...item, company: e.target.value } : item)))
              }
              className="input-field"
            />
            <button type="button" onClick={() => removeWorkExperience(index)} className="text-red-500">
              Remove Work Experience
            </button>
          </div>
        ))}
        <button type="button" onClick={addWorkExperience} className="btn-primary">
          Add Work Experience
        </button>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
        <input
          type="text"
          placeholder="Add a skill"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
              setSkills([...skills, (e.target as HTMLInputElement).value]);
              (e.target as HTMLInputElement).value = "";
            }
          }}
          className="input-field"
        />
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Digital Literacy Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Digital Literacy</h2>
        <input
          type="text"
          placeholder="Add digital skill"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
              setDigitalLiteracy([...digitalLiteracy, (e.target as HTMLInputElement).value]);
              (e.target as HTMLInputElement).value = "";
            }
          }}
          className="input-field"
        />
        <div className="flex flex-wrap gap-2">
          {digitalLiteracy.map((skill, index) => (
            <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Languages</h2>
        <input
          type="text"
          placeholder="Add a language"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
              setLanguages([...languages, (e.target as HTMLInputElement).value]);
              (e.target as HTMLInputElement).value = "";
            }
          }}
          className="input-field"
        />
        <div className="flex flex-wrap gap-2">
          {languages.map((language, index) => (
            <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              {language}
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button type="submit" className="btn-primary">
          Preview Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeBuilder;
