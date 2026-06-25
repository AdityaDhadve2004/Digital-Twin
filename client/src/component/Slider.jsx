export default function Slider(prop) {
    return (
        <>
            <div>
                
                <p className="text-sm text-neutral-400 mt-1">
                    Predict your Internal Assessment marks
                </p>
            </div>

            <div
                className={`text-orange-500 transition-transform duration-300 ${prop.open ? "rotate-180" : ""
                    }`}
            >
                <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </>
    )
}