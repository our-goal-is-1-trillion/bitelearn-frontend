import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { loginSchema, type LoginFormValues } from '@/schemas/loginSchema';

export type LoginFormSubmitHelpers = Pick<
  UseFormReturn<LoginFormValues>,
  'setError' | 'clearErrors'
>;

type LoginFormProps = {
  onSubmit: (
    data: LoginFormValues,
    helpers: LoginFormSubmitHelpers
  ) => Promise<void> | void;
  onSocialLogin?: (provider: 'GOOGLE' | 'NAVER') => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          onSubmit(data, {
            setError: form.setError,
            clearErrors: form.clearErrors,
          })
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder="이메일"
                      className={cn(
                        'h-10 rounded-md bg-popover px-3 py-2 text-sm text-foreground shadow-sm',
                        'placeholder:text-placeholder focus-visible:ring-0 focus-visible:ring-offset-0',
                        fieldState.error
                          ? 'border-destructive focus-visible:border-destructive'
                          : 'border-input'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="비밀번호"
                      className={cn(
                        'h-10 rounded-md border-input bg-popover px-3 py-2 text-sm text-foreground shadow-sm',
                        'placeholder:text-placeholder focus-visible:ring-0 focus-visible:ring-offset-0',
                        fieldState.error
                          ? 'border-destructive focus-visible:border-destructive'
                          : 'border-input'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                  {!fieldState.error && (
                    <p className="text-placeholder text-sm leading-normal">
                      8~20자의 영문, 숫자, 특수문자 조합
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={cn(
              'relative inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-base font-semibold text-foreground transition-transform',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
          >
            <LogIn className="mr-2 h-6 w-6" strokeWidth={2.2} />
            <span>로그인</span>
          </button>
        </div>
      </form>
    </Form>
  );
}
