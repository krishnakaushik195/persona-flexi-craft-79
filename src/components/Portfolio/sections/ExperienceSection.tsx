interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  if (!experience || experience.length === 0) {
    return (
      <div className="space-y-8">
        <h2 className="text-5xl font-bold text-foreground text-center">Experience</h2>
        <div className="bg-portfolio-card rounded-2xl p-8 text-center">
          <p className="text-portfolio-text-muted text-lg">No experience data available yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h2 className="text-5xl font-bold text-foreground text-center">Experience</h2>
      
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="bg-portfolio-card rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
                <p className="text-lg text-primary font-medium">{exp.company}</p>
              </div>
              <span className="text-portfolio-text-muted font-medium bg-secondary/30 px-3 py-1 rounded-full">
                {exp.duration}
              </span>
            </div>
            <p className="text-portfolio-text-muted leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};