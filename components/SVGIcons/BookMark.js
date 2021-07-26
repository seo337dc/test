const BookMark = ({ marked, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      onClick={onClick}
    >
      <g transform="translate(-884.308 -421.308)">
        <circle
          fill="#eeeeee"
          cx="16"
          cy="16"
          r="16"
          transform="translate(884.308 421.308)"
        />
        <path
          fill={marked === "Y" ? "#DA291C" : "#DDDDDD"}
          d="M314.84,328.678a.582.582,0,0,1-.4-.161l-5.474-5.255-5.474,5.255a.579.579,0,0,1-.977-.418V314.594a.579.579,0,0,1,.578-.579H314.84a.579.579,0,0,1,.578.579V328.1a.582.582,0,0,1-.578.579Z"
          transform="translate(591.451 116.045)"
        />
      </g>
    </svg>
  );
};

export default BookMark;
