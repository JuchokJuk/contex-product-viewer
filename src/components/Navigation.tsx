
import LeftArrowIcon from './icons/LeftArrowIcon';
import RightArrowIcon from './icons/RightArrowIcon';

interface NavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    isAnimating: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onPrevious, onNext, isAnimating }) => {
    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={onPrevious}
                aria-label="Previous product"
                disabled={isAnimating}
                className="group w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-200 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <LeftArrowIcon className="w-6 h-6 text-gray-800 transition-transform duration-200 ease-in-out group-hover:scale-125" />
            </button>
            <button
                onClick={onNext}
                aria-label="Next product"
                disabled={isAnimating}
                className="group w-16 h-16 flex items-center justify-center bg-[#303F9F] text-white rounded-full hover:bg-indigo-800 transition-all duration-200 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RightArrowIcon className="w-6 h-6 transition-transform duration-200 ease-in-out group-hover:scale-125" />
            </button>
        </div>
    );
};

export default Navigation;