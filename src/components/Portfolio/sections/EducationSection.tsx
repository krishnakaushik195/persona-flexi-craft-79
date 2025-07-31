interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  if (!education || education.length === 0) {
    return (
      <div className="space-y-8">
        <h2 className="text-5xl font-bold text-foreground text-center">Education</h2>
        <div className="bg-portfolio-card rounded-2xl p-8 text-center">
          <p className="text-portfolio-text-muted text-lg">No education data available yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h2 className="text-5xl font-bold text-foreground text-center">Education</h2>
      
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-portfolio-card rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
              <span className="text-primary font-semibold bg-primary/20 px-3 py-1 rounded-full">
                {edu.year}
              </span>
            </div>
            <p className="text-lg text-portfolio-text-muted">{edu.institution}</p>
            <p className="text-portfolio-text-muted">{edu.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};