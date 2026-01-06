interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar = ({
  value,
  max,
  color = '#3B82F6',
  height = 'h-2',
  showPercentage = false,
  className = '',
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-100 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-300`}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs text-gray-500 mt-1 block">{percentage.toFixed(0)}%</span>
      )}
    </div>
  );
};
