interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  className,
  onClick,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <button
      className={`${
        className && className
      } bg-amber-300 rounded-2xl text-gray-600 font-semibold px-4 py-1.5 text-center shadow-md shadow-black/40 hover:bg-amber-300/80 transition disabled:bg-amber-300/80 disabled:cursor-not-allowed`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
