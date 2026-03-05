import QuizFooter from "@/components/layout/QuizFooter"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

type ConversationQuestionPassageProps = {
  questionData: ChoiceQuestionItem
  onSolve: () => void
}

/**
 * 대화형 퀴즈의 지문(채팅) 화면.
 */
export default function ConversationQuestionPassage({
  questionData,
  onSolve,
}: ConversationQuestionPassageProps) {
  const conversations = questionData.conversations || []
  const conversationInfoBox = questionData.conversationInfoBox

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 bg-slate-100" data-mode="conversation">
        <div className="flex flex-col gap-4 mt-6 pb-6">
          {conversations.length > 0 ? (
            conversations.map((conv) => {
              const isMe = conv.sender === "me"
              return (
                <div
                  key={conv.id}
                  className={`flex w-full ${isMe ? "justify-end" : "justify-start"} items-start gap-2`}
                >
                  {!isMe && conv.profileImageUrl && (
                    <img 
                      src={conv.profileImageUrl} 
                      alt="profile" 
                      className="w-10 h-10 rounded-full object-cover shrink-0" 
                    />
                  )}
                  {/* 말풍선 */}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-[15px] leading-[1.4] ${
                      isMe
                        ? "bg-[#64748B] text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                    }`}
                  >
                    {conv.message.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>

                  {/* "나"의 프로필 이미지 (우측) */}
                  {isMe && conv.profileImageUrl && (
                    <img 
                      src={conv.profileImageUrl} 
                      alt="profile" 
                      className="w-10 h-10 rounded-full object-cover shrink-0" 
                    />
                  )}
                </div>
              )
            })
          ) : (
            <div className="text-center text-sm text-slate-500 my-10">대화 데이터가 없습니다.</div>
          )}

          {/* 대화 하단 안내 박스 */}
          {conversationInfoBox && (
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-2">
                <span className="text-lg">💡</span> {conversationInfoBox.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {conversationInfoBox.content}
              </p>
            </div>
          )}
        </div>
      </section>

      <QuizFooter onClick={onSolve}>
        문제 풀기
      </QuizFooter>
    </>
  )
}
