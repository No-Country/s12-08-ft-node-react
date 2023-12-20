function Option({ color }) {
  return (
    <svg
      width="20"
      height="8"
      viewBox="0 0 13 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="rotate(180 1.5 1.5)"
        fill={color}
      />
      <circle
        cx="6.5"
        cy="1.5"
        r="1.5"
        transform="rotate(180 6.5 1.5)"
        fill={color}
      />
      <circle
        cx="11.5"
        cy="1.5"
        r="1.5"
        transform="rotate(180 11.5 1.5)"
        fill={color}
      />
    </svg>
  );
}

export default Option;
