export function Navigation({ onPrevious, onNext }: { onPrevious: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onPrevious}
        aria-label="Previous product"
        className="group w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-200 ease-in-out active:scale-95"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-800 transition-transform duration-200 ease-in-out group-hover:scale-125"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={onNext}
        aria-label="Next product"
        className="group w-16 h-16 flex items-center justify-center bg-[#303F9F] text-white rounded-full hover:bg-indigo-800 transition-all duration-200 ease-in-out active:scale-95"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 transition-transform duration-200 ease-in-out group-hover:scale-125"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
