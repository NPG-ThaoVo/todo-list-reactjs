const TodoItem = ({ title, isDone }) => {
  const bgColor = isDone ? "bg-green-300" : "bg-orange-300";
  const textStyle = isDone ? "line-through text-gray-700" : "text-black";
  const icon = isDone ? (
    <svg
      width={"30"}
      fill="#008336"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
    >
      <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z" />
    </svg>
  ) : (
    <svg
      width={"30"}
      fill="#ca3500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
    >
      <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" />
    </svg>
  );
  const shadowColor = isDone ? "rgba(34,197,94,0.5)" : "rgba(251,146,60,0.5)";
  return (
    <div
      className={`${bgColor} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none p-4 transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>

        <div className="flex-1">
          <p className={`text-xl font-bold ${textStyle}`}>{title}</p>

          {isDone && (
            <p className="text-sm font-bold text-green-700 mt-1">
              Task completed!
            </p>
          )}

          {!isDone && (
            <p className="text-sm font-bold text-orange-700 mt-1">
              In progress...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
