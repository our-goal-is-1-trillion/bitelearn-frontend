import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { updateNickname } from '@/api/auth/auth.api';
import { authQueryKeys, useMeQuery } from '@/api/auth/auth.query';
import { isAppError } from '@/api/error/appError';
import { API_ERROR_MESSAGE } from '@/api/error/errorMessages';
import Header from '@/components/common/Header';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logError } from '@/lib/logError';
import {
  nicknameSchema,
  type NicknameFormValues,
} from '@/schemas/nicknameSchema';

const NICKNAME_UPDATE_ERROR_FALLBACK_MESSAGE =
  '닉네임 변경에 실패했습니다. 다시 시도해주세요.';

export default function NicknamePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useMeQuery();
  const form = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname ?? '',
    },
  });

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      });
    },
  });

  useEffect(() => {
    if (!user?.nickname) {
      return;
    }

    form.reset({
      nickname: user.nickname,
    });
  }, [form, user?.nickname]);

  const currentNickname = form.watch('nickname');
  const isSubmitDisabled =
    form.formState.isSubmitting ||
    !form.formState.isValid ||
    currentNickname.trim() === (user?.nickname ?? '').trim();

  const moveToMyPage = () => {
    navigate('/mypage');
  };

  const handleSubmit = async (data: NicknameFormValues) => {
    form.clearErrors();

    try {
      await updateNicknameMutation.mutateAsync({
        nickname: data.nickname.trim(),
      });
      toast.success('닉네임이 변경되었습니다.');
      moveToMyPage();
    } catch (error) {
      if (isAppError(error)) {
        if (error.message === API_ERROR_MESSAGE.NICKNAME_DUPLICATION) {
          form.setError('nickname', {
            type: 'server',
            message: error.message,
          });
          return;
        }

        toast.error(error.message);
        return;
      }

      logError('NicknamePage', '닉네임 변경 실패', error);
      toast.error(NICKNAME_UPDATE_ERROR_FALLBACK_MESSAGE);
    }
  };

  return (
    <div className="min-h-dvh bg-background pt-[60px]">
      <Header
        title="닉네임 변경"
        showCloseButton
        onCloseClick={moveToMyPage}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex min-h-[calc(100dvh-60px)] flex-col"
        >
          <div className="flex-1 px-5 pb-8 pt-5">
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
                    닉네임
                  </p>

                  <FormControl>
                    <Input
                      placeholder="닉네임을 입력해주세요"
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
                    <FormDescription className="text-sm leading-6 text-slate-600">
                      특수문자 제외 2~10자리 이내
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="sticky bottom-0 bg-popover px-5 pb-8 pt-4">
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="h-14 w-full rounded-2xl text-base font-bold text-foreground disabled:opacity-40"
            >
              저장하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
