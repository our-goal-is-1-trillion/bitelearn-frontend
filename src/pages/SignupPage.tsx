import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '@/components/common/Header';
import type { SignupFormValues } from '@/schemas/signupSchema';
import SignupForm, {
  type SignupFormSubmitHelpers,
} from '@/components/features/auth/SignupForm';
import { signup } from '@/api/auth/auth.api';
import { isAppError } from '@/api/error/appError';
import { API_ERROR_MESSAGE } from '@/api/error/errorMessages';
import { logError } from '@/lib/logError';
import { SIGNUP_TERMS_AGREED_STORAGE_KEY } from '@/constants/auth';

const SIGNUP_ERROR_FALLBACK_MESSAGE =
  '회원가입에 실패했습니다. 다시 시도해주세요.';

export default function SignupPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasAgreedTerms =
      sessionStorage.getItem(SIGNUP_TERMS_AGREED_STORAGE_KEY) === 'true';

    if (!hasAgreedTerms) {
      toast.error('약관 동의 후 회원가입을 진행해주세요.');
      navigate('/signup/terms', { replace: true });
    }
  }, [navigate]);

  // 회원가입 제출 핸들러
  const handleSignupSubmit = async (
    data: SignupFormValues,
    { clearErrors, setError }: SignupFormSubmitHelpers
  ) => {
    clearErrors();

    try {
      const submitData = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      };
      await signup(submitData);
      sessionStorage.removeItem(SIGNUP_TERMS_AGREED_STORAGE_KEY);

      toast.success('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      if (isAppError(error)) {
        if (error.message === API_ERROR_MESSAGE.EMAIL_DUPLICATION) {
          setError('email', {
            type: 'server',
            message: error.message,
          });
          return;
        }

        if (error.message === API_ERROR_MESSAGE.NICKNAME_DUPLICATION) {
          setError('nickname', {
            type: 'server',
            message: error.message,
          });
          return;
        }
      }

      logError('SignupPage', '회원가입 실패', error);
      toast.error(
        isAppError(error) ? error.message : SIGNUP_ERROR_FALLBACK_MESSAGE
      );
    }
  };

  return (
    <div className="min-h-dvh bg-background pt-[60px]">
      <Header
        showBackButton
        title="회원가입"
        onBackClick={() => navigate(-1)}
        backgroundVariant="transparent"
      />
      <SignupForm onSubmit={handleSignupSubmit} />
    </div>
  );
}
