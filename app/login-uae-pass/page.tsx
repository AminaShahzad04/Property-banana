import { UAEPassLoginModal } from "@/components/auth/UAEPassModal"

export const metadata = {
  title: "Login With UAE Pass - Property Managers",
  description: "Sign in with your UAE Pass account",
}

export default function UAEPassLoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{
        backgroundImage: `url('/modern-luxury-building-mansion-architecture.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md">
        <UAEPassLoginModal />
      </div>
    </div>
  )
}
