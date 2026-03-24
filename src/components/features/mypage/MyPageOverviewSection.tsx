import { ChevronRight, ExternalLink, LogOut } from 'lucide-react';

import type { ProviderType } from '@/api/auth/auth.types';
import googleIcon from '@/assets/icons/social/google.svg';
import naverIcon from '@/assets/icons/social/naver.svg';

type MyPageOverviewSectionProps = {
  email: string;
  providerType?: ProviderType;
  version: string;
  onLogoutClick?: () => void;
  onNicknameClick?: () => void;
  onPasswordClick?: () => void;
  onFaqClick?: () => void;
  onNoticeClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
};

type SectionItem = {
  label: string;
  value?: string;
  icon?: ProviderType;
  actionIcon?: 'chevron' | 'external';
  onClick?: () => void;
};

type SectionGroup = {
  title: string;
  items: SectionItem[];
};

function SectionRow({ item }: { item: SectionItem }) {
  const providerIconSrc =
    item.icon === 'GOOGLE'
      ? googleIcon
      : item.icon === 'NAVER'
        ? naverIcon
        : null;

  const content = (
    <div className="flex min-h-8 items-center justify-between gap-4">
      <p className="text-sm font-medium leading-5 text-slate-600">
        {item.label}
      </p>

      <div className="flex items-center gap-2 text-sm leading-5 text-slate-400">
        {providerIconSrc && (
          <img
            src={providerIconSrc}
            alt=""
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
          />
        )}

        {item.value ? <span>{item.value}</span> : null}

        {item.actionIcon === 'chevron' ? (
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
        ) : null}

        {item.actionIcon === 'external' ? (
          <ExternalLink className="h-5 w-5 shrink-0 text-slate-600" />
        ) : null}
      </div>
    </div>
  );

  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}

export default function MyPageOverviewSection({
  email,
  providerType = 'LOCAL',
  version,
  onLogoutClick,
  onNicknameClick,
  onPasswordClick,
  onFaqClick,
  onNoticeClick,
  onTermsClick,
  onPrivacyClick,
}: MyPageOverviewSectionProps) {
  const sections: SectionGroup[] = [
    {
      title: '내 정보',
      items: [
        {
          label: '이메일',
          value: email,
          icon: providerType,
        },
        {
          label: '닉네임 변경',
          actionIcon: 'chevron',
          onClick: onNicknameClick,
        },
        {
          label: '비밀번호 변경',
          actionIcon: 'chevron',
          onClick: onPasswordClick,
        },
      ],
    },
    {
      title: '서비스 약관',
      items: [
        {
          label: '이용 약관',
          actionIcon: 'external',
          onClick: onTermsClick,
        },
        {
          label: '개인정보 처리방침',
          actionIcon: 'external',
          onClick: onPrivacyClick,
        },
      ],
    },
    {
      title: '고객센터',
      items: [
        {
          label: '자주 묻는 질문',
          actionIcon: 'chevron',
          onClick: onFaqClick,
        },
        {
          label: '공지사항',
          actionIcon: 'chevron',
          onClick: onNoticeClick,
        },
      ],
    },
    {
      title: '정보',
      items: [
        {
          label: '버전',
          value: version,
        },
      ],
    },
  ];

  return (
    <section className="flex min-h-full flex-col overflow-hidden rounded-t-3xl bg-popover px-5 pt-3 shadow-bl-popover">
      <div className="flex-1">
        {sections.map((section, index) => (
          <div
            key={section.title}
            className={`p-4 ${index < sections.length - 1 ? 'border-b border-slate-200' : ''}`}
          >
            <div className="py-2">
              <h2 className="text-base font-semibold leading-6 text-foreground-muted">
                {section.title}
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                {section.items.map((item) => (
                  <SectionRow
                    key={`${section.title}-${item.label}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start justify-center pb-16 pt-6">
        <button
          type="button"
          onClick={onLogoutClick}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-1 text-sm font-bold leading-5 text-slate-600"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          로그아웃
        </button>
      </div>
    </section>
  );
}
