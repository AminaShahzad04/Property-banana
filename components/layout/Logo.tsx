export function PropertyManagersLogo() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-16 h-16">
        <img
          src="/banana.png"
          alt="Property Banana Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-bold text-gray-900">Property</span>
        <span className="text-2xl font-bold text-gray-900">Banana</span>
      </div>
    </div>
  );
}
