import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-0.5 duration-300">
      <div className="p-3 bg-blue-50/50 text-brand-primary w-fit rounded-xl mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
