interface HomeSectionProps {
  name: string;
  role: string;
}

export const HomeSection = ({ name, role }: HomeSectionProps) => {
  return (
    <div className="w-full">
      {/* Home section now only contains AI Assistant - content moved to Portfolio component */}
    </div>
  );
};