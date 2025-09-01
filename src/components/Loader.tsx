

interface LoaderProps {
    progress: number;
}

const Loader: React.FC<LoaderProps> = ({ progress }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#303F9F] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-500 tracking-wider">LOADING...</p>
        </div>
    );
};

export default Loader;
