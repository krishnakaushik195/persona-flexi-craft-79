interface AboutSectionProps {
  about: string;
  achievements: string[];
}

export const AboutSection = ({ about, achievements }: AboutSectionProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
        <p className="text-portfolio-text-muted leading-relaxed text-lg">
          {about}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Key Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-portfolio-text-muted">{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};