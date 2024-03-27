const Logo = ({ ...props }) => {
  return (
    <svg
      width={80}
      height={55}
      {...props}
      viewBox="0 0 80 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.00431932 0V17.1349C0.00431932 17.1349 -0.332945 22.5302 4.9523 27.0971L34.228 54.9911L49.4523 54.7953L47.0104 24.7062L41.2378 17.9322L23.095 0H0.00431932Z"
        fill="#7367F0"
      />
      <path
        opacity="0.06"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2456 41.0911L31.2997 8.09244L41.3852 18.1399L19.2456 41.0911Z"
        fill="#161616"
      />
      <path
        opacity="0.06"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1937 39.7938L34.8546 11.5997L41.4622 18.2118L20.1937 39.7938Z"
        fill="#161616"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4323 40.8916L59.1407 0H80V17.2096C80 17.2096 79.5655 22.9459 76.6476 26.0143L49.4559 55H34.2344L19.4323 40.8916Z"
        fill="#7367F0"
      />
    </svg>
  )
}
const Sections = ({ ...props }) => {
  return (
    <svg
      width={22}
      height={22}
      {...props}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.66663"
        y="3.66666"
        width="14.6667"
        height="3.66667"
        rx={1}
        stroke={props.active ? 'white' : '#4B465C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.66663"
        y="3.66666"
        width="14.6667"
        height="3.66667"
        rx={1}
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.66663"
        y={11}
        width="5.5"
        height="7.33333"
        rx={1}
        stroke={props.active ? 'white' : '#4B465C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.66663"
        y={11}
        width="5.5"
        height="7.33333"
        rx={1}
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8334 11H18.3334"
        stroke={props.active ? 'white' : '#4B465C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8334 11H18.3334"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8334 14.6667H18.3334"
        stroke={props.active ? 'white' : '#4B465C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8334 14.6667H18.3334"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8334 18.3333H18.3334"
        stroke={props.active ? 'white' : '#4B465C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8334 18.3333H18.3334"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
const BottomShapeLogin = ({ ...props }) => {
  return (
    <svg
      width={180}
      height={171}
      {...props}
      viewBox="0 0 180 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={1}
        y={1}
        width={178}
        height="168.667"
        rx={19}
        stroke="#7367F0"
        strokeOpacity="0.16"
        strokeWidth={2}
        strokeDasharray="8 8"
      />
      <rect
        x="22.5"
        y="21.3334"
        width={135}
        height={128}
        rx={10}
        fill="#7367F0"
        fillOpacity="0.08"
      />
    </svg>
  )
}
const TopShapeLogin = ({ ...props }) => {
  return (
    <svg
      {...props}
      width={238}
      height={222}
      viewBox="0 0 238 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="87.9395"
        y="0.5"
        width={149}
        height="141.222"
        rx="19.5"
        stroke="#7367F0"
        strokeOpacity="0.16"
      />
      <rect
        y="31.8207"
        width={200}
        height="189.63"
        rx={10}
        fill="#7367F0"
        fillOpacity="0.08"
      />
    </svg>
  )
}
export { Logo, Sections, BottomShapeLogin, TopShapeLogin }
