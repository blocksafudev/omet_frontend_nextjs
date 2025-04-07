
const CircleChart = ({ percentChart }) => {
    const circumference = 2 * 22 / 7 * 15;
    let colorTrust;
    if (percentChart >= 0 && percentChart <= 50) {
        colorTrust = 'text-[#CB2F2F]'
    } else if (percentChart > 50 && percentChart <= 60) {
        colorTrust = 'text-[#CB712F]'
    } else if (percentChart > 60 && percentChart <= 70) {
        colorTrust = 'text-[#CB962F]'
    } else if (percentChart > 70 && percentChart <= 80) {
        colorTrust = 'text-[#CBB02F]'
    } else if (percentChart > 80 && percentChart <= 90) {
        colorTrust = 'text-[#86B067]'
    } else if (percentChart > 90 && percentChart <= 100) {
        colorTrust = 'text-[#3EB885]'
    }

    return (
        <div className="relative flex items-center justify-center">
            <svg className="transform -rotate-90 w-9 h-9">
                <circle
                    cx="18.125"
                    cy="18.125"
                    r="15"
                    stroke="currentColor"
                    strokeWidth="3.75"
                    fill="transparent"
                    className="text-gray-300 dark:text-gray-800"
                />

                <circle
                    cx="18.125"
                    cy="18.125"
                    r="15"
                    stroke="currentColor"
                    strokeWidth="3.75"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (percentChart || 0) / 100 * circumference}
                    className={colorTrust}
                />
            </svg>
            <span className="absolute text-xs text-black dark:text-white">{percentChart === null ? 'N/A' : percentChart}</span>
        </div>
    )
}

export default CircleChart;