export default function SuccessScreen() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="text-7xl">🎉</div>
        </div>
        <h2 className="text-3xl font-bold">Property Add successfully</h2>
        <p className="text-gray-600">
          Your property has been added successfully completed.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-semibold text-center">
          Listing Quality Score
        </h3>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Overall Quality Score
              </p>
              <p className="text-4xl font-bold text-green-600">
                87<span className="text-2xl">/100</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Excellent quality listing
              </p>
            </div>
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#fbbf24"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.87)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">87%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: "Image Quality",
              score: 92,
              message:
                "All images meet resolution standards. High-quality, professional photos detected.",
            },
            {
              title: "Description Quality",
              score: 95,
              message:
                "Comprehensive, accurate with good keyword density and detail level.",
            },
            {
              title: "Amenities Completeness",
              score: 65,
              message:
                "Most amenities listed. Consider adding pool and security details.",
            },
            {
              title: "Permit Validation",
              score: 100,
              message:
                "Valid permit number confirmed. All regulatory requirements met.",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <span
                  className={`text-sm font-bold ${
                    item.score >= 90
                      ? "text-green-600"
                      : item.score >= 70
                        ? "text-yellow-600"
                        : "text-orange-600"
                  }`}
                >
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    item.score >= 90
                      ? "bg-green-500"
                      : item.score >= 70
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-600">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
