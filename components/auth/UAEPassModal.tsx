"use client"

import { Button } from "@/components/ui/Button"

export function UAEPassLoginModal() {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground text-center mb-2">Login With UAE Pass</h1>
        <p className="text-sm text-muted-foreground text-center">
          Click the button below to securely sign in with your UAE Pass account
        </p>
      </div>

      {/* Login Button */}
      <Button
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 h-auto text-base"
        onClick={() => console.log("Initiating UAE Pass login")}
      >
        Login
      </Button>

      {/* Cancel Button */}
      <Button
        variant="outline"
        className="w-full bg-black text-white hover:bg-black/80 border-black font-semibold py-2 h-auto text-base"
        onClick={() => window.history.back()}
      >
        Cancel
      </Button>

      {/* Additional Info */}
      <p className="text-xs text-muted-foreground text-center">
        UAE Pass is a secure authentication method provided by UAE Government
      </p>
    </div>
  )
}
