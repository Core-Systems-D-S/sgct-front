import { forwardRef, type InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: FieldError;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, ...inputProps }, ref) => {
    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          className={[
            'w-full px-3 py-2 border rounded-lg text-sm shadow-sm bg-white',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300',
          ].join(' ')}
          {...inputProps}
        />
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-xs text-red-600 flex items-center gap-1"
          >
            <span aria-hidden="true">⚠</span> {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
