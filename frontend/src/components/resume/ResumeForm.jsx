import { FiPlus, FiTrash2 } from "react-icons/fi";

// ─── Reusable Input ───────────────────────────────────────────────────────────
function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-[#141414]/75 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#FAF9F5] border border-[#DCD7CB] text-[#141414] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-[#141414] focus:bg-white transition-all placeholder-[#141414]/30"
      />
    </div>
  );
}

// ─── Reusable Textarea ────────────────────────────────────────────────────────
function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-[#141414]/75 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="bg-[#FAF9F5] border border-[#DCD7CB] text-[#141414] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-[#141414] focus:bg-white transition-all placeholder-[#141414]/30 resize-none leading-relaxed"
      />
    </div>
  );
}

// ─── Add / Remove Entry Card ──────────────────────────────────────────────────
function EntryCard({ children, onRemove }) {
  return (
    <div className="relative bg-[#FDFBF7] border border-[#E6E2D8] rounded-2xl p-4 sm:p-5 shadow-sm">
      <button
        onClick={onRemove}
        type="button"
        title="Remove Entry"
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-lg border border-[#E6E2D8] bg-white flex items-center justify-center text-[#141414]/40 hover:text-red-600 hover:border-red-200 transition-all"
      >
        <FiTrash2 size={13} />
      </button>
      <div className="flex flex-col gap-3 pr-6">{children}</div>
    </div>
  );
}

// ─── Main ResumeForm ──────────────────────────────────────────────────────────
export default function ResumeForm({ step, data, setData }) {
  // ── Step 1: Personal Info ──
  if (step === 1) {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            value={data.name}
            onChange={(v) => setData({ ...data, name: v })}
            placeholder="e.g. Rahul Sharma"
          />
        </div>
        <Input
          label="Email Address"
          value={data.email}
          onChange={(v) => setData({ ...data, email: v })}
          placeholder="rahul@example.com"
        />
        <Input
          label="Phone Number"
          value={data.phone}
          onChange={(v) => setData({ ...data, phone: v })}
          placeholder="+91 98765 43210"
        />
        <div className="sm:col-span-2">
          <Input
            label="Location"
            value={data.location}
            onChange={(v) => setData({ ...data, location: v })}
            placeholder="Bengaluru, Karnataka, India"
          />
        </div>
        <Input
          label="LinkedIn Profile"
          value={data.linkedin}
          onChange={(v) => setData({ ...data, linkedin: v })}
          placeholder="linkedin.com/in/rahulsharma"
        />
        <Input
          label="GitHub Profile"
          value={data.github}
          onChange={(v) => setData({ ...data, github: v })}
          placeholder="github.com/rahulsharma"
        />
      </div>
    );
  }

  // ── Step 2: Summary ──
  if (step === 2) {
    return (
      <div className="flex flex-col gap-3">
        <Textarea
          label="Professional Summary"
          value={data.summary}
          onChange={(v) => setData({ ...data, summary: v })}
          placeholder="Full Stack Software Engineer with 2+ years of experience designing scalable microservices, RESTful APIs, and distributed event architectures using Node.js, Express, React, and MongoDB. Passionate about system latency optimization and cloud infrastructure..."
          rows={6}
        />
        <p className="text-[11px] text-[#141414]/45">
          Tip: Highlight your core specialty, years of experience, and a notable metric or system you've shipped.
        </p>
      </div>
    );
  }

  // ── Step 3: Skills ──
  if (step === 3) {
    return (
      <div className="flex flex-col gap-3">
        <Textarea
          label="Technical Skills & Competencies (Comma-Separated)"
          value={data.skills}
          onChange={(v) => setData({ ...data, skills: v })}
          placeholder="JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, Redis, PostgreSQL, Docker, AWS (EC2, S3), Git, CI/CD"
          rows={5}
        />
        <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[11px] text-[#141414]/60">
          Separate each skill with a comma. These will be parsed into clean ATS-compatible skill groupings in your generated resume.
        </div>
      </div>
    );
  }

  // ── Step 4: Experience ──
  if (step === 4) {
    const addExp = () => {
      setData({
        ...data,
        experience: [
          ...data.experience,
          { company: "", role: "", duration: "", description: "" },
        ],
      });
    };

    const updateExp = (index, field, value) => {
      const updated = data.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      );
      setData({ ...data, experience: updated });
    };

    const removeExp = (index) => {
      setData({
        ...data,
        experience: data.experience.filter((_, i) => i !== index),
      });
    };

    return (
      <div className="flex flex-col gap-4">
        {data.experience.length === 0 && (
          <div className="text-center py-8 px-4 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D8]">
            <p className="text-xs font-semibold text-[#141414]">No work experience added yet.</p>
            <p className="text-[11px] text-[#141414]/50 mt-0.5">
              Add internships, co-ops, full-time engineering roles, or freelance work.
            </p>
          </div>
        )}

        {data.experience.map((exp, index) => (
          <EntryCard key={index} onRemove={() => removeExp(index)}>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Company / Organization"
                value={exp.company}
                onChange={(v) => updateExp(index, "company", v)}
                placeholder="Google / Tech Corp"
              />
              <Input
                label="Job Title / Role"
                value={exp.role}
                onChange={(v) => updateExp(index, "role", v)}
                placeholder="Software Engineer Intern"
              />
            </div>
            <Input
              label="Employment Period"
              value={exp.duration}
              onChange={(v) => updateExp(index, "duration", v)}
              placeholder="Jun 2023 – Present"
            />
            <Textarea
              label="Key Responsibilities & Measurable Impact"
              value={exp.description}
              onChange={(v) => updateExp(index, "description", v)}
              placeholder={"• Architected Redis caching layer, decreasing endpoint response times by 38%.\n• Designed automated CI/CD pipeline reducing deployment cycle by 15 mins."}
              rows={4}
            />
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addExp}
          className="flex items-center justify-center gap-2 w-full py-3.5 border border-dashed border-[#DCD7CB] hover:border-[#141414] bg-[#FAF9F5] hover:bg-white rounded-2xl text-xs font-semibold text-[#141414] transition-all shadow-sm"
        >
          <FiPlus size={14} />
          <span>Add Position</span>
        </button>
      </div>
    );
  }

  // ── Step 5: Projects ──
  if (step === 5) {
    const addProject = () => {
      setData({
        ...data,
        projects: [
          ...data.projects,
          { name: "", techStack: "", github: "", description: "" },
        ],
      });
    };

    const updateProject = (index, field, value) => {
      const updated = data.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      );
      setData({ ...data, projects: updated });
    };

    const removeProject = (index) => {
      setData({
        ...data,
        projects: data.projects.filter((_, i) => i !== index),
      });
    };

    return (
      <div className="flex flex-col gap-4">
        {data.projects.length === 0 && (
          <div className="text-center py-8 px-4 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D8]">
            <p className="text-xs font-semibold text-[#141414]">No projects listed yet.</p>
            <p className="text-[11px] text-[#141414]/50 mt-0.5">
              Highlight production or portfolio projects demonstrating end-to-end technical execution.
            </p>
          </div>
        )}

        {data.projects.map((proj, index) => (
          <EntryCard key={index} onRemove={() => removeProject(index)}>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Project Title"
                value={proj.name}
                onChange={(v) => updateProject(index, "name", v)}
                placeholder="SkillForge AI Platform"
              />
              <Input
                label="Tech Stack"
                value={proj.techStack}
                onChange={(v) => updateProject(index, "techStack", v)}
                placeholder="React, Node.js, Redis, Docker"
              />
            </div>
            <Input
              label="GitHub Repository / Live Demo URL"
              value={proj.github}
              onChange={(v) => updateProject(index, "github", v)}
              placeholder="github.com/rahul/skillforge"
            />
            <Textarea
              label="Project Overview & Outcomes"
              value={proj.description}
              onChange={(v) => updateProject(index, "description", v)}
              placeholder="Engineered an AI-driven career interview simulator supporting real-time voice recognition, code synthesis, and automated scoring for 500+ active users."
              rows={3}
            />
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addProject}
          className="flex items-center justify-center gap-2 w-full py-3.5 border border-dashed border-[#DCD7CB] hover:border-[#141414] bg-[#FAF9F5] hover:bg-white rounded-2xl text-xs font-semibold text-[#141414] transition-all shadow-sm"
        >
          <FiPlus size={14} />
          <span>Add Project</span>
        </button>
      </div>
    );
  }

  // ── Step 6: Education ──
  if (step === 6) {
    const addEdu = () => {
      setData({
        ...data,
        education: [
          ...data.education,
          { college: "", degree: "", branch: "", cgpa: "", year: "" },
        ],
      });
    };

    const updateEdu = (index, field, value) => {
      const updated = data.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      );
      setData({ ...data, education: updated });
    };

    const removeEdu = (index) => {
      setData({
        ...data,
        education: data.education.filter((_, i) => i !== index),
      });
    };

    return (
      <div className="flex flex-col gap-4">
        {data.education.length === 0 && (
          <div className="text-center py-8 px-4 rounded-2xl bg-[#FAF9F5] border border-[#E6E2D8]">
            <p className="text-xs font-semibold text-[#141414]">No education credentials added.</p>
          </div>
        )}

        {data.education.map((edu, index) => (
          <EntryCard key={index} onRemove={() => removeEdu(index)}>
            <Input
              label="Institution / University"
              value={edu.college}
              onChange={(v) => updateEdu(index, "college", v)}
              placeholder="Indian Institute of Information Technology"
            />
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(v) => updateEdu(index, "degree", v)}
                placeholder="Bachelor of Technology"
              />
              <Input
                label="Major / Branch"
                value={edu.branch}
                onChange={(v) => updateEdu(index, "branch", v)}
                placeholder="Computer Science & Engineering"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="CGPA / Percentage"
                value={edu.cgpa}
                onChange={(v) => updateEdu(index, "cgpa", v)}
                placeholder="8.8 / 10.0"
              />
              <Input
                label="Graduation Year"
                value={edu.year}
                onChange={(v) => updateEdu(index, "year", v)}
                placeholder="2021 – 2025"
              />
            </div>
          </EntryCard>
        ))}

        <button
          type="button"
          onClick={addEdu}
          className="flex items-center justify-center gap-2 w-full py-3.5 border border-dashed border-[#DCD7CB] hover:border-[#141414] bg-[#FAF9F5] hover:bg-white rounded-2xl text-xs font-semibold text-[#141414] transition-all shadow-sm"
        >
          <FiPlus size={14} />
          <span>Add Degree</span>
        </button>
      </div>
    );
  }

  return null;
}
