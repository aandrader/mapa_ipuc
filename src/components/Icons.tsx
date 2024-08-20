import { SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export const CloseIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={twMerge("size-9 cursor-pointer", className)}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
};

export const BackIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={twMerge("size-8 cursor-pointer", className)}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#5577B3"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
};

export const YoutubeIcon = () => {
  return (
    <svg viewBox="0 0 1024 1024" fill="white" height="20px" width="20px">
      <path d="M941.3 296.1a112.3 112.3 0 00-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0082.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z" />
    </svg>
  );
};

export const FacebookIcon = () => {
  return (
    <svg viewBox="0 0 1024 1024" fill="white" height="20px" width="20px">
      <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z" />
    </svg>
  );
};

export const WebIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="white" height="20px" width="20px">
      <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 019.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 015.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 00-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" />
    </svg>
  );
};

export const MapsIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      className={twMerge("size-[20px]", className)}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 6v.01M18 13l-3.5-5a4 4 0 117 0L18 13" />
      <path d="M10.5 4.75L9 4 3 7v13l6-3 6 3 6-3v-2M9 4v13M15 15v5" />
    </svg>
  );
};

export const SearchIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" fill="#00338d" height="30px" width="30px" className="cursor-pointer" {...props}>
      <path
        // fill="currentColor"
        d="M15.504 13.616l-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 10-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 110-8 4 4 0 010 8z"
      />
    </svg>
  );
};

export const ShareIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge("size-8", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
  );
};

export const FeedbackIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge("size-8", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
};

export const InfoIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={twMerge("size-6 shrink-0", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  );
};

export const LocationIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge("size-6 shrink-0", className)}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
};

export const IconInstagram = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={twMerge("size-5 shrink-0", className)}
      {...props}
    >
      <radialGradient
        id="yOrnnhliCrdS2gy~4tD8ma"
        cx="19.38"
        cy="42.035"
        r="44.899"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fd5" />
        <stop offset=".328" stopColor="#ff543f" />
        <stop offset=".348" stopColor="#fc5245" />
        <stop offset=".504" stopColor="#e64771" />
        <stop offset=".643" stopColor="#d53e91" />
        <stop offset=".761" stopColor="#cc39a4" />
        <stop offset=".841" stopColor="#c837ab" />
      </radialGradient>
      <path
        fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
        d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"
      />
      <radialGradient
        id="yOrnnhliCrdS2gy~4tD8mb"
        cx="11.786"
        cy="5.54"
        r="29.813"
        gradientTransform="matrix(1 0 0 .6663 0 1.849)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4168c9" />
        <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
        d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"
      />
      <path
        fill="#fff"
        d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
      />
      <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
      <path
        fill="#fff"
        d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12 C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
      />
    </svg>
  );
};

export const IconLinkedin = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={twMerge("size-7 shrink-0", className)}
      {...props}
    >
      <path
        fill="#0288D1"
        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
      />
      <path
        fill="#FFF"
        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
      />
    </svg>
  );
};

export const IconChurch = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 35 35"
      className="inline mx-2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m402.70862,299.82525l-2.10862,-1.26525l0,-0.96l0.9,0c0.16575,0 0.3,-0.13425 0.3,-0.3l0,-0.6c0,-0.16575 -0.13425,-0.3 -0.3,-0.3l-0.9,0l0,-0.9c0,-0.16575 -0.13425,-0.3 -0.3,-0.3l-0.6,0c-0.16575,0 -0.3,0.13425 -0.3,0.3l0,0.9l-0.9,0c-0.16575,0 -0.3,0.13425 -0.3,0.3l0,0.6c0,0.16575 0.13425,0.3 0.3,0.3l0.9,0l0,0.96l-2.10862,1.26525a0.59994,0.59994 0 0 0 -0.29138,0.5145l0,4.46025l1.8,0l0,-1.8c0,-0.66281 0.53719,-1.2 1.2,-1.2c0.66281,0 1.2,0.53719 1.2,1.2l0,1.8l1.8,0l0,-4.46025c0,-0.21075 -0.11063,-0.40613 -0.29138,-0.5145zm-8.70862,2.799l0,1.87575c0,0.16575 0.13425,0.3 0.3,0.3l2.1,0l0,-3.6l-2.03644,0.87262a0.60045,0.60045 0 0 0 -0.36356,0.55163zm11.63644,-0.55163l-2.03644,-0.87262l0,3.6l2.1,0c0.16575,0 0.3,-0.13425 0.3,-0.3l0,-1.87575c0,-0.24 -0.14306,-0.45694 -0.36356,-0.55163z" />

      <path
        fill="#1a2c4b"
        stroke="null"
        d="m25.04935,11.7514l-5.48083,-3.83271c-1.43222,-0.5099 -1.39533,-0.8236 -3.1191,0l-5.48081,3.83271a1.55939,1.81735 0 0 0 -0.75738,1.55853l0,13.51109l4.67865,0l0,-5.45261c0,-2.00779 1.39629,-3.63505 3.1191,-3.63505c1.7228,0 3.11909,1.62726 3.11909,3.63505l0,5.45261l4.67865,0l0,-13.51109c0,-0.3192 -0.07189,-0.62676 -0.2025,-0.89555c-0.13061,-0.26881 -0.31996,-0.49883 -0.55486,-0.66298zm-22.63586,8.47878l0,5.68206c0,0.5021 0.34895,0.90878 0.77977,0.90878l5.45842,0l0,-10.9052l-5.29321,2.64335a1.56072,1.8189 0 0 0 -0.94499,1.67101zm30.24599,-1.67101l-5.29322,-2.64335l0,10.9052l5.45842,0c0.43083,0 0.77977,-0.40668 0.77977,-0.90878l0,-5.68206c0,-0.72701 -0.37184,-1.38417 -0.94497,-1.67101z"
      />
    </svg>
  );
};

export const IconUserLocation = () => {
  return (
    <svg
      width="15"
      height="15"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      xmlSpace="preserve"
      className="inline mx-2"
      enableBackground="new 0 0 64 64"
      viewBox="0 0 30 30"
    >
      <g>
        <title>Layer 1</title>
        <g strokeWidth="0" id="SVGRepo_bgCarrier" />
        <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
        <g stroke="null" id="SVGRepo_iconCarrier">
          <path
            stroke="null"
            id="svg_1"
            d="m14.86715,2.331c-5.46586,0 -9.89745,4.32721 -9.89745,9.66435c0,2.10159 0.70561,4.03003 1.87845,5.60935c0.02103,0.03785 0.02433,0.08013 0.04825,0.11637l6.5983,9.66435c0.306,0.44818 0.82149,0.71718 1.37245,0.71718s1.06645,-0.26899 1.37245,-0.71718l6.5983,-9.66435c0.02433,-0.03624 0.02722,-0.07852 0.04825,-0.11637c1.17285,-1.57932 1.87845,-3.50776 1.87845,-5.60935c0,-5.33714 -4.43158,-9.66435 -9.89745,-9.66435zm0,12.8858c-1.82195,0 -3.29915,-1.4424 -3.29915,-3.22145s1.47719,-3.22145 3.29915,-3.22145s3.29915,1.4424 3.29915,3.22145s-1.47719,3.22145 -3.29915,3.22145z"
            fill="#f0ab00"
          />
        </g>
      </g>
    </svg>
  );
};
