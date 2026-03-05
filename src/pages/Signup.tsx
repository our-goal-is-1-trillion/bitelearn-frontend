import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Zod를 사용한 유효성 검사 규칙
const signupSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
    email: z
      .string()
      .trim()
      .email({ message: '유효한 이메일 주소를 입력해 주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해 주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

// Zod 스키마를 바탕으로 타입 추론
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();

  // react-hook-form 설정
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (_data: SignupFormValues) => {
    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    navigate('/login');
  };

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">
        <header className="shrink-0 px-6 pb-3 pt-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mb-3 h-9 w-9 rounded-full bg-white text-slate-600 shadow-sm"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">홈으로 돌아가기</span>
          </Button>
          <h2 className="text-xl font-semibold text-slate-900">회원가입</h2>
          <p className="mt-1 text-sm text-slate-500">새 계정을 만들고 학습을 시작하세요.</p>
        </header>

        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-6 pt-6">
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
                        autoComplete="new-password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="멋진개발자" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-6 h-11 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? '가입 처리 중...' : '가입하기'}
              </Button>
            </form>
          </Form>
        </section>

        <footer className="shrink-0 px-6 pb-6 pt-3 text-center text-sm text-slate-600">
          이미 계정이 있으신가요?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            로그인하기
          </Link>
        </footer>
      </div>
    </main>
  );
}
