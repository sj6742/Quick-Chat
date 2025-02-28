const AuthImagePattern = ({ title, subtitle }) => {
return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-700 to-fuchsia-500 p-12 text-gray-100">
    <div className="max-w-md text-center transform transition duration-500 hover:scale-105">
        <div className="grid grid-cols-3 gap-3 mb-8">
        {[...Array(9)].map((_, i) => (
            <div
            key={i}
            className={`aspect-square rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-500 ${
                i % 2 === 0 ? "animate-bounce" : "animate-pulse"
            }`}
            />
        ))}
        </div>
        <h2 className="text-3xl font-extrabold mb-4 drop-shadow-md">{title}</h2>
        <p className="text-gray-300 text-lg font-light drop-shadow-sm">{subtitle}</p>
    </div>
    </div>
);
};

export default AuthImagePattern;