interface HomeSectionProps {
  name: string;
  role: string;
}

export const HomeSection = ({ name, role }: HomeSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          {name}
        </h1>
        <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full">
          <span className="text-primary font-semibold text-lg">{role}</span>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-portfolio-text-muted leading-relaxed text-lg">
          Welcome to my digital portfolio. I'm passionate about creating intelligent, 
          scalable solutions that bridge the gap between complex technology and 
          exceptional user experiences. Explore my work, skills, and journey in 
          platform engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-portfolio-card rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">5+</div>
          <div className="text-portfolio-text-muted">Years Experience</div>
        </div>
        <div className="bg-portfolio-card rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">50+</div>
          <div className="text-portfolio-text-muted">Projects Completed</div>
        </div>
        <div className="bg-portfolio-card rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">10+</div>
          <div className="text-portfolio-text-muted">Technologies Mastered</div>
        </div>
      </div>
    </div>
  );
};