import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from './registerSchema';
import type { RegisterFormValues } from '../../types/auth';
import { registerUser, loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { AuthCard } from '../../components/ui/AuthCard';
import { FormField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';

type StrengthLevel = 'weak' | 'fair' | 'strong';

function getPasswordStrength(password: string): StrengthLevel | null {
  if (!password) return null;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const score = [password.length >= 8, hasLetter, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  if (score <= 2) return 'weak';
  if (score === 3) return 'fair';
  return 'strong';
}

const strengthConfig: Record<
  StrengthLevel,
  { label: string; color: string; width: string }
> = {
  weak: { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' },
  fair: { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/3' },
  strong: { label: 'Strong', color: 'bg-green-600', width: 'w-full' },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch('password', '');
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    const { confirmPassword, ...payload } = data;
    void confirmPassword;

    try {
      const result = await registerUser(payload);

      if (!result.success) {
        const fieldMap: Array<keyof RegisterFormValues> = [
          'username',
          'first_name',
          'last_name',
          'email',
          'password',
        ];

        let hasFieldError = false;
        for (const field of fieldMap) {
          if (result.fieldErrors[field]?.length) {
            setError(field, { message: result.fieldErrors[field][0] });
            hasFieldError = true;
          }
        }

        if (!hasFieldError) {
          const nonFieldErrors =
            result.fieldErrors['non_field_errors'] ??
            result.fieldErrors['detail'];
          setServerError(
            nonFieldErrors?.[0] ?? 'Registration failed. Please try again.'
          );
        }
        return;
      }

      const tokens = await loginUser(data.username, data.password);
      login(tokens, { username: data.username });
      navigate('/dashboard');
    } catch {
      setServerError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <AuthCard>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">SGCT — Task Management</p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center gap-2"
        >
          <span aria-hidden="true">⚠</span> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="first_name"
            label="First name"
            autoComplete="given-name"
            error={errors.first_name}
            {...register('first_name')}
          />
          <FormField
            id="last_name"
            label="Last name"
            autoComplete="family-name"
            error={errors.last_name}
            {...register('last_name')}
          />
        </div>

        <FormField
          id="username"
          label="Username"
          autoComplete="username"
          error={errors.username}
          {...register('username')}
        />

        <FormField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          error={errors.email}
          {...register('email')}
        />

        <div className="space-y-1">
          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            error={errors.password}
            {...register('password')}
          />
          {strength && (
            <div className="space-y-0.5">
              <div className="h-1.5 w-full rounded-full bg-gray-200">
                <div
                  className={`h-1.5 rounded-full transition-all ${strengthConfig[strength].color} ${strengthConfig[strength].width}`}
                />
              </div>
              <p
                className={`text-xs font-medium ${
                  strength === 'weak'
                    ? 'text-red-600'
                    : strength === 'fair'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                Password strength: {strengthConfig[strength].label}
              </p>
            </div>
          )}
        </div>

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          {...register('confirmPassword')}
        />

        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
