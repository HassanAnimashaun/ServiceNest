import Modal from '@/components/ui/Modal'
import LoginForm from '@/components/auth/LoginForm'
import ProviderSignupForm from '@/components/auth/ProviderSignupForm'
import ClientSignupForm from '@/components/auth/ClientSignupForm'

function AuthPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center px-4">
      {/* LOGO */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium text-[#1A6FD4] tracking-tight">ServiceNest</h1>
        <p className="text-sm text-[#888780] mt-1">Local services, simplified</p>
      </div>

      {/* CARD */}
      <div className="bg-white border border-[#D3D1C7] rounded-xl p-8 w-full max-w-md">
        <LoginForm />

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#D3D1C7]" />
          <span className="text-xs text-[#888780]">Don't have an account?</span>
          <div className="flex-1 h-px bg-[#D3D1C7]" />
        </div>

        {/* SIGN UP TRIGGERS */}
        <div className="flex flex-col gap-5">
          <Modal trigger="Sign up as a provider">
            <ProviderSignupForm />
          </Modal>
          <Modal trigger="Sign up as a client">
            <ClientSignupForm />
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
