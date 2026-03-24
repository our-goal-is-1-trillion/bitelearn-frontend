import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { signupSchema, type SignupFormValues } from '@/schemas/signupSchema';

export type SignupFormSubmitHelpers = Pick<
  UseFormReturn<SignupFormValues>,
  'setError' | 'clearErrors'
>;

type SignupFormProps = {
  onSubmit: (
    data: SignupFormValues,
    helpers: SignupFormSubmitHelpers
  ) => Promise<void> | void;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const isSubmitDisabled =
    form.formState.isSubmitting || !form.formState.isValid;

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col px-5 pb-8 pt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            onSubmit(data, {
              setError: form.setError,
              clearErrors: form.clearErrors,
            })
          )}
          className="flex flex-1 flex-col"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <p
                    className={cn(
                      'text-sm font-medium leading-6',
                      fieldState.error ? 'text-destructive' : 'text-foreground'
                    )}
                  >
                    이메일 <span className="text-primary">*</span>
                  </p>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="이메일 주소를 입력해주세요"
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
                  <p
                    className={cn(
                      'text-sm font-medium leading-6',
                      fieldState.error ? 'text-destructive' : 'text-foreground'
                    )}
                  >
                    비밀번호 <span className="text-primary">*</span>
                  </p>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="비밀번호를 입력해주세요"
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
              name="passwordConfirm"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <p
                    className={cn(
                      'text-sm font-medium leading-6',
                      fieldState.error ? 'text-destructive' : 'text-foreground'
                    )}
                  >
                    비밀번호 확인 <span className="text-primary">*</span>
                  </p>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="비밀번호를 다시 입력해 주세요"
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
              name="nickname"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <p
                    className={cn(
                      'text-sm font-medium leading-6',
                      fieldState.error ? 'text-destructive' : 'text-foreground'
                    )}
                  >
                    닉네임 <span className="text-primary">*</span>
                  </p>
                  <FormControl>
                    <Input
                      placeholder="사용하실 이름을 입력해 주세요"
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
                  {!fieldState.error && (
                    <p className="text-placeholder text-sm leading-6">
                      특수문자 제외 2~10자리 이내
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="mt-auto pt-16">
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="relative h-14 w-full rounded-2xl text-base font-medium text-foreground disabled:opacity-25"
            >
              가입하기
              <ChevronRight className="absolute right-4 h-6 w-6" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
