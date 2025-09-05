const TodoHeader = ({ total, completed }) => {
  // Kiểm tra xem tất cả task đã hoàn thành chưa
  const isAllCompleted = completed === total;

  // Tính % tiến độ (số task hoàn thành / tổng số task * 100)
  const progressPercentage = (completed / total) * 100;
  return (
    <div className="bg-cyan-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none p-6 mb-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-black mb-4">
          MISSION PROGRESS
        </h2>

        <div className="text-3xl font-black text-black mb-4">
          {isAllCompleted ? (
            <span className="text-green-600">ALL MISSIONS COMPLETE!</span>
          ) : (
            <span>
              You've completed {completed}/{total} tasks
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none h-8 overflow-hidden">
          <div
            className="bg-green-400 h-full border-r-3 border-black transition-all duration-500 flex items-center justify-center"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 20 && (
              <span className="text-black font-black text-sm">
                {Math.round(progressPercentage)}%
              </span>
            )}
          </div>
        </div>

        <p className="text-lg font-bold text-black mt-4">
          {isAllCompleted
            ? "Ready for launch!"
            : `${total - completed} missions remaining`}
        </p>
      </div>
    </div>
  );
};

export default TodoHeader;
