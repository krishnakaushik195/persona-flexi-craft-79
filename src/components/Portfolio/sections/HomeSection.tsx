interface HomeSectionProps {
  name: string;
  role: string;
}

export const HomeSection = ({ name, role }: HomeSectionProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            {name}
          </h1>
          <div className="inline-flex items-center px-6 py-3 bg-primary/20 rounded-full">
            <span className="text-primary font-semibold text-xl">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};