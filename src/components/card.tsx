interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`${className} border border-gray-200 rounded-2xl px-4 py-6 shadow-lg`}
    >
      {children}
    </div>
  );
};
