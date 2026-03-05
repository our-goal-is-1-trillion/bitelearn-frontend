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

// Zod를 사용한 로그인 유효성 검사 규칙
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

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_data: LoginFormValues) => {
    alert('로그인이 완료되었습니다! 홈 페이지로 이동합니다.');
    navigate('/home-logined');
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
          <h2 className="text-xl font-semibold text-slate-900">로그인</h2>
          <p className="mt-1 text-sm text-slate-500">계정으로 계속 학습을 이어가세요.</p>
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
                className="mt-6 h-11 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
              </Button>
            </form>
          </Form>

          <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-slate-300 after:mt-0.5 after:flex-1 after:border-t after:border-slate-300">
            <p className="mx-4 mb-0 text-center text-sm text-slate-500">또는</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline" className="h-11 w-full text-slate-700">
              구글로 시작하기
            </Button>
            <Button className="h-11 w-full bg-[#03C75A] text-white hover:bg-[#02b350]">
              네이버로 시작하기
            </Button>
          </div>
        </section>

        <footer className="shrink-0 px-6 pb-6 pt-3 text-center text-sm text-slate-600">
          계정이 없으신가요?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            회원가입하기
          </Link>
        </footer>
      </div>
    </main>
  );
}
