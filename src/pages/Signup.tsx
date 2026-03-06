import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

const signupSchema = z
  .object({
    nickname: z.string().trim().min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
    email: z.string().trim().email({ message: '유효한 이메일 주소를 입력해 주세요.' }),
    password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    passwordConfirm: z.string().min(1, { message: '비밀번호 확인을 입력해 주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type SignupFormValues = z.infer<typeof signupSchema>;

type SignupProps = {
  onLogin?: () => void;
  onSuccess?: () => void;
};

export default function Signup({ onLogin, onSuccess }: SignupProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    const { passwordConfirm, ...submitData } = data;
    console.log('회원가입 입력값:', submitData);
    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

    if (onSuccess) {
      onSuccess();
      return;
    }
  };

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-y-auto border border-slate-100 bg-white px-6 py-8 text-slate-900 shadow-sm">
      <button
        type="button"
        aria-label="닫기"
        className="absolute right-4 top-4 text-xl font-medium text-slate-400"
      >
        ✕
      </button>
      <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="example@mail.com" {...field} />
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
                  <Input type="password" autoComplete="new-password" placeholder="********" {...field} />
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
                  <Input type="password" autoComplete="new-password" placeholder="********" {...field} />
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

          <Button type="submit" className="mt-6 w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? '가입 처리 중...' : '가입하기'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{' '}
        {onLogin ? (
          <button type="button" onClick={onLogin} className="font-semibold text-blue-600 hover:underline">
            로그인하기
          </button>
        ) : (
          <a href="/login" className="font-semibold text-blue-600 hover:underline">
            로그인하기
          </a>
        )}
      </div>
    </main>
  );
}
