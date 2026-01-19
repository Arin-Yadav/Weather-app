import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HourlyForecast = (props) => {
  const scrollRef = useRef(null); // reference to the scrollbar container
  // console.log(props.response);

  // scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-6 relative">
      {/* scrollable container */}
      <div
        ref={scrollRef}
        className="mx-10 py-2 flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}>
        {/* one hour */}
        <div className="flex flex-col shrink-0 items-center shadow-lg bg-gray-50 py-2 rounded px-4">
          <p>12 PM</p>
          <img
            src={props.response.icon}
            alt="icon"
            className="w-10 mx-auto"
          />
          <p>{props.response.temp}°C</p>
        </div>

        {/* repeat more hourly blocks */}
      </div>

      {/* scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center">
        <FaChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center">
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HourlyForecast;
