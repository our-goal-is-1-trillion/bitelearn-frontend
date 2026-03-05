import { useNavigate } from "react-router-dom"
import OnboardingModal from "@/components/features/onboarding/OnboardingModal"

export default function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative mx-auto h-[812px] w-[375px] bg-slate-900">
      <OnboardingModal isOpen={true} onClose={() => navigate("/")} />
    </div>
  )
}
