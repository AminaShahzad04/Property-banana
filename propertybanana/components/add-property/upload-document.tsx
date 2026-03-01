interface StepTwoProps {
  titleDeedFile: File | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StepTwo({
  titleDeedFile,
  handleFileUpload,
}: StepTwoProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Upload Document
      </h2>

      <div className="max-w-lg mx-auto">
        <label className="block text-medium font-semibold mb-4">
          Title Deed Document
        </label>

        <div className="border-2 border-1 border-gray-300 rounded-lg p-12 text-center bg-white hover:border-teal-400 transition-colors">
          <input
            type="file"
            id="titleDeed"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="titleDeed" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="w-30 h-15 flex items-center justify-center">
                <img
                  src="/upload.png"
                  alt="Upload"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {titleDeedFile ? titleDeedFile.name : "Title Deed Document"}
                </p>
                {!titleDeedFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Click to upload or drag and drop
                  </p>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
