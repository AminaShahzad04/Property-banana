import { Button } from "@/components/ui/Button";

interface StepFourProps {
  showImageValidation: boolean;
  titleImage: File | null;
  setTitleImage: (file: File | null) => void;
  propertyImages: File[];
  setPropertyImages: (files: File[]) => void;
}

export default function StepFour({
  showImageValidation,
  titleImage,
  setTitleImage,
  propertyImages,
  setPropertyImages,
}: StepFourProps) {
  if (showImageValidation) {
    return (
      <div className="space-y-6 px-12">
        <div className="flex flex-col items-center  mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Image Quality Validation
          </h2>
          <Button className="bg-[#FBDE02] hover:bg-yellow-500  text-black font-medium px-6 py-2 rounded-[1px]">
            Reupload Images
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Title Image</h3>

          {/* Sample validation cards - replace with actual uploaded images */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-3"
              >
                <div className="relative mb-2">
                  <img
                    src="/house.png"
                    alt="Property"
                    className="w-full h-32 object-cover rounded"
                  />
                  <span
                    className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-full ${
                      index === 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {index === 0 ? "Approved" : "Rejected"}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-2">photo_001.jpg</p>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolution</span>
                    <span
                      className={
                        index === 0
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {index === 0 ? "1980× 1080" : "198× 108"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">File size</span>
                    <span
                      className={
                        index === 0
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      2.4 Mb
                    </span>
                  </div>
                  {index === 0 ? (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quality</span>
                      <span className="text-green-600 font-medium">
                        Excellent
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-gray-600">Issue</span>
                      <p className="text-red-600 text-sm mt-1">
                        Image quality below threshold. Please upload a higher
                        resolution, focused image.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Guidelines */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Photo Guidelines</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-600 font-semibold mb-3">
                Requirements
              </h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Minimum resolution: 1280×720 pixels</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Maximum file size: 5 MB per image</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Supported formats: JPG, PNG, WebP</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Professional, well-lit photography</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Clear focus and proper framing</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-600 font-semibold mb-3">Not Allowed</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Blurry or out-of-focus images</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Watermarks or logos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Low resolution photos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Heavily filtered or edited images</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Stock photos or renderings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Upload Images</h2>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Upload Title Image */}
        <div>
          <label className="block text-sm font-semibold mb-4">
            Upload Title Image
          </label>
          <div className="border-2 border-1 border-gray-300 rounded-lg p-12 text-center bg-white hover:border-teal-400 transition-colors">
            <input
              type="file"
              id="titleImage"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setTitleImage(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <label htmlFor="titleImage" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 flex items-center justify-center">
                  <img
                    src="/upload.png"
                    alt="Upload"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    {titleImage ? titleImage.name : "Upload Title image"}
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Upload All property Image */}
        <div>
          <label className="block text-sm font-semibold mb-4">
            Upload All property Image
          </label>
          <div className="border-2 border-1 border-gray-300 rounded-lg p-12 text-center bg-white hover:border-teal-400 transition-colors">
            <input
              type="file"
              id="propertyImages"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setPropertyImages(Array.from(e.target.files));
                }
              }}
              className="hidden"
            />
            <label htmlFor="propertyImages" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 flex items-center justify-center">
                  <img
                    src="/upload.png"
                    alt="Upload"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    {propertyImages.length > 0
                      ? `${propertyImages.length} images selected`
                      : "Upload property image"}
                  </p>
                  <p className="text-xs text-[#008BBC] mt-1">
                    Up to 5 images upload at once
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
