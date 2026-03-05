import OnboardingModal from "@/components/features/onboarding/OnboardingModal"

export default function OnboardingPage() {
  return (
    <div className="relative mx-auto h-[812px] w-[375px] bg-slate-900">
      <OnboardingModal isOpen={true} onClose={() => window.history.back()} />
    </div>
  )
}
