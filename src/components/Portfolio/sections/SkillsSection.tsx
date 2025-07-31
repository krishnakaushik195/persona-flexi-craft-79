import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="space-y-8">
        <h2 className="text-5xl font-bold text-foreground text-center">Skills</h2>
        <div className="bg-portfolio-card rounded-2xl p-8 text-center">
          <p className="text-portfolio-text-muted text-lg">No skills data available yet.</p>
        </div>
      </div>
    );
  }
  
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="space-y-8">
      <h2 className="text-5xl font-bold text-foreground text-center">Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div key={category} className="bg-portfolio-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">{category}</h3>
            <div className="space-y-4">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};