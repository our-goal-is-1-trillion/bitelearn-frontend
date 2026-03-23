import * as z from 'zod';
import { passwordFieldSchema } from './signupSchema';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일 주소를 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),

  password: passwordFieldSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
