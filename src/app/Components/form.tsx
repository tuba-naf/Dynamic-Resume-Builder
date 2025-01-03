import React, { useState } from "react";

// Define types for the state
type EducationItem = { degree: string; institute: string };
type WorkExperienceItem = { jobTitle: string; company: string };
type StringArrayState = string[];

type ResumeData = {
  personalInfo: { name: string; email: string };
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: string[];
  digitalLiteracy: string[];
  languages: string[];
};

const ResumeBuilder: React.FC<{ onSubmit: (data: ResumeData) => void }> = ({ onSubmit }) => {
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "" });
  const [education, setEducation] = useState<EducationItem[]>([{ degree: "", institute: "" }]);
  const [workExperience, setWorkExperience] = useState<WorkExperienceItem[]>([{ jobTitle: "", company: "" }]);
  const [skills, setSkills] = useState<StringArrayState>([]);
  const [digitalLiteracy, setDigitalLiteracy] = useState<StringArrayState>([]);
  const [languages, setLanguages] = useState<StringArrayState>([]);

  

  // Add and Remove Functions
  const handleAddEducation = () => setEducation((prev) => [...prev, { degree: "", institute: "" }]);
  const handleAddWorkExperience = () => setWorkExperience((prev) => [...prev, { jobTitle: "", company: "" }]);
  const handleAddItem = (setter: React.Dispatch<React.SetStateAction<StringArrayState>>, item: string) =>
    setter((prev) => [...prev, item]);

  const handleRemove = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number) =>
    setter((prev: T[]) => prev.filter((_, i) => i !== index));

  const handleEdit = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, key: keyof T, value: string) =>
    setter((prev: T[]) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );

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

  // Function to handle image changes
  
  return (
    <form onSubmit={handleFormSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-8">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
        
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

      {/* Educational Details Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Educational Details</h2>
        {education.map((edu, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleEdit(setEducation, index, "degree", e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Institute"
              value={edu.institute}
              onChange={(e) => handleEdit(setEducation, index, "institute", e.target.value)}
              className="input-field"
            />
            <button
              type="button"
              onClick={() => handleRemove(setEducation, index)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          className="btn"
        >
          Add Education
        </button>
      </div>

      {/* Work Experience Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
        {workExperience.map((work, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Job Title"
              value={work.jobTitle}
              onChange={(e) => handleEdit(setWorkExperience, index, "jobTitle", e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Company"
              value={work.company}
              onChange={(e) => handleEdit(setWorkExperience, index, "company", e.target.value)}
              className="input-field"
            />
            <button
              type="button"
              onClick={() => handleRemove(setWorkExperience, index)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddWorkExperience}
          className="btn"
        >
          Add Work Experience
        </button>
      </div>

      {/* Skills, Digital Literacy, and Languages */}
      {[{ title: "Skills", state: skills, setState: setSkills },
        { title: "Digital Literacy", state: digitalLiteracy, setState: setDigitalLiteracy },
        { title: "Languages", state: languages, setState: setLanguages }].map(
        ({ title, state, setState }, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            {state.map((item, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder={title.slice(0, -1)}
                  value={item}
                  onChange={(e) => setState(state.map((s, i) => (i === index ? e.target.value : s)))}
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(setState, index)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem(setState, "")}
              className="btn"
            >
              Add {title.slice(0, -1)}
            </button>
          </div>
        ))}

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
