import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Signup from '@/pages/Signup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: '유효한 이메일 주소를 입력해 주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginProps = {
  onBack?: () => void;
  onSignup?: () => void;
  onSuccess?: () => void;
};

export default function Login({ onSignup, onSuccess }: LoginProps) {
  const [showSignup, setShowSignup] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('로그인 입력값:', data);
    alert('로그인이 완료되었습니다!');
    onSuccess?.();
  };

  if (showSignup) {
    return (
      <Signup
        onLogin={() => setShowSignup(false)}
        onSuccess={() => setShowSignup(false)}
      />
    );
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-y-auto border border-slate-100 bg-white px-6 py-8 text-slate-900 shadow-sm">
      <button
        type="button"
        aria-label="닫기"
        className="absolute right-4 top-4 text-xl font-medium text-slate-400"
      >
        ✕
      </button>
      <h2 className="mb-6 text-center text-2xl font-bold">로그인</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-6 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Form>

      <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center text-sm text-gray-500">또는</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full text-gray-700">
          구글로 시작하기
        </Button>
        <Button className="w-full bg-[#03C75A] text-white hover:bg-[#02b350]">
          네이버로 시작하기
        </Button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <button
          type="button"
          onClick={() => {
            if (onSignup) {
              onSignup();
              return;
            }
            setShowSignup(true);
          }}
          className="font-semibold text-blue-600 hover:underline"
        >
          회원가입하기
        </button>
      </div>
    </main>
  );
}
