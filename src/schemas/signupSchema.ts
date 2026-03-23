import * as z from 'zod';

export const passwordFieldSchema = z
  .string()
  .min(1, '비밀번호를 입력해주세요.')
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
    message: '비밀번호는 8~20자의 영문, 숫자, 특수문자 조합이어야 합니다.',
  });

export const nicknameFieldSchema = z
  .string()
  .trim()
  .min(1, '닉네임을 입력해주세요.')
  .regex(/^[a-zA-Z0-9가-힣]{2,10}$/, {
    message: '닉네임은 특수문자 제외 2~10자리여야 합니다.',
  });

export const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, '이메일 주소를 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),

    password: passwordFieldSchema,

    nickname: nicknameFieldSchema,

    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
