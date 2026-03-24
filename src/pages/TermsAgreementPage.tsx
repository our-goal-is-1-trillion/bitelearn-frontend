import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/Header';
import TermsAgreementForm from '@/components/features/auth/TermsAgreementForm';
import { SIGNUP_TERMS_AGREED_STORAGE_KEY } from '@/constants/auth';
import {
  PRIVACY_TERMS_URL,
  SERVICE_TERMS_URL,
} from '@/constants/terms';

export default function TermsAgreementPage() {
  const navigate = useNavigate();
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-dvh bg-background pt-[60px]">
      <Header
        showBackButton
        title="약관동의"
        onBackClick={() => navigate(-1)}
        backgroundVariant="transparent"
      />

      <TermsAgreementForm
        onNext={() => {
          sessionStorage.setItem(SIGNUP_TERMS_AGREED_STORAGE_KEY, 'true');
          navigate('/signup');
        }}
        onOpenServiceTerms={() => openExternalLink(SERVICE_TERMS_URL)}
        onOpenPrivacyTerms={() => openExternalLink(PRIVACY_TERMS_URL)}
      />
    </div>
  );
}
