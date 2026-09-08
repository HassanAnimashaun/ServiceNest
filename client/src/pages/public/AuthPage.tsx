import AuthModal from '@/components/ui/AuthModal'
import LoginForm from '@/components/auth/LoginForm'
import ProviderSignupForm from '@/components/auth/ProviderSignupForm'
import ClientSignupForm from '@/components/auth/ClientSignupForm'

function AuthPage() {
  return (
    <div className="min-h-screen bg-page-bg flex flex-col justify-center items-center px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium text-brand-blue tracking-tight">ServiceNest</h1>
        <p className="text-sm text-text-secondary mt-1">Local services, simplified</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-8 w-full max-w-md">
        <LoginForm />

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-secondary">Don't have an account?</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex flex-col gap-5">
          <AuthModal trigger="Sign up as a provider">
            <ProviderSignupForm />
          </AuthModal>
          <AuthModal trigger="Sign up as a client">
            <ClientSignupForm />
          </AuthModal>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
