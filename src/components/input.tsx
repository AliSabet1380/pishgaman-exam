import { forwardRef } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  type?: "text" | "password";
  value?: string;
  disabled?: boolean;
  onChange?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { onChange, value, disabled, label, placeholder, type, dir = "rtl" },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full space-y-1.5">
        {label && (
          <label className="text-gray-400 font-semibold text-sm self-end pr-2">
            {label}
          </label>
        )}
        <input
          disabled={disabled}
          dir={dir}
          placeholder={placeholder}
          ref={ref}
          type={type}
          onChange={onChange}
          value={value}
          className="border-blue-200 bg-blue-100 focus:outline-none rounded-full px-3 py-1.5 text-sm font-semibold disabled:cursor-not-allowed"
        />
      </div>
    );
  }
);

Input.displayName = "Input";
