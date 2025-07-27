interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div key={index} className="bg-portfolio-card rounded-2xl p-6 flex items-center space-x-4">
            <div className="w-16 h-16 bg-secondary/30 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={cert.image} 
                alt={cert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
              <p className="text-portfolio-text-muted">{cert.issuer}</p>
              <p className="text-primary font-medium">{cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};