export const CommonSvg = {
  menuBurger: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  ),
  close: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  startFilled: () => (
    <svg
      className="h-5 w-5 flex-shrink-0 text-primary"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  cart: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
    </svg>
  ),
  subtract: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14"></path>
    </svg>
  ),
  add: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
  ),
  threedot: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="white" />
      <circle cx="6" cy="12" r="2" fill="#515151" />
      <circle cx="12" cy="12" r="2" fill="#515151" />
      <circle cx="18" cy="12" r="2" fill="#515151" />
    </svg>
  ),
  plus: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
        fill="white"
      />
    </svg>
  ),
  dashicon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M4.09998 18H20.9V15.6H4.09998V18ZM4.09998 6V8.4H20.9V6H4.09998ZM4.09998 13.2H20.9V10.8H4.09998V13.2Z"
        fill="#4A4A68"
      />
    </svg>
  ),
  dropdown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <g filter="url(#filter0_d_817_8203)">
        <circle cx="13" cy="13" r="9" fill="white" />
        <circle cx="8.5" cy="13" r="1.5" fill="#515151" />
        <circle cx="13" cy="13" r="1.5" fill="#515151" />
        <circle cx="17.5" cy="13" r="1.5" fill="#515151" />
      </g>
      <defs>
        <filter
          id="filter0_d_817_8203"
          x="0"
          y="0"
          width="26"
          height="26"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_817_8203"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_817_8203"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  searchIcon: ({ className }) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className={className}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ),
  address: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 8.625C8.50272 8.625 8.02581 8.42746 7.67417 8.07583C7.32254 7.72419 7.125 7.24728 7.125 6.75C7.125 6.25272 7.32254 5.77581 7.67417 5.42417C8.02581 5.07254 8.50272 4.875 9 4.875C9.49728 4.875 9.97419 5.07254 10.3258 5.42417C10.6775 5.77581 10.875 6.25272 10.875 6.75C10.875 6.99623 10.8265 7.24005 10.7323 7.46753C10.638 7.69502 10.4999 7.90172 10.3258 8.07583C10.1517 8.24994 9.94502 8.38805 9.71753 8.48227C9.49005 8.5765 9.24623 8.625 9 8.625ZM9 1.5C7.60761 1.5 6.27226 2.05312 5.28769 3.03769C4.30312 4.02226 3.75 5.35761 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 5.35761 13.6969 4.02226 12.7123 3.03769C11.7277 2.05312 10.3924 1.5 9 1.5Z"
        fill="#F35555"
      />
    </svg>
  ),
  floor: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M15.75 14.25H17.25V15.75H0.75V14.25H2.25V3C2.25 2.80109 2.32902 2.61032 2.46967 2.46967C2.61032 2.32902 2.80109 2.25 3 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V14.25H12.75V6.75H15C15.1989 6.75 15.3897 6.82902 15.5303 6.96967C15.671 7.11032 15.75 7.30109 15.75 7.5V14.25ZM5.25 8.25V9.75H8.25V8.25H5.25ZM5.25 5.25V6.75H8.25V5.25H5.25Z"
        fill="#F35555"
      />
    </svg>
  ),
  room: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M2.25 15.75V14.25H3.75V2.25H11.25V3H14.25V14.25H15.75V15.75H12.75V4.5H11.25V15.75H2.25ZM8.25 9.75C8.4625 9.75 8.64075 9.678 8.78475 9.534C8.92875 9.39 9.0005 9.212 9 9C9 8.7875 8.928 8.60925 8.784 8.46525C8.64 8.32125 8.462 8.2495 8.25 8.25C8.0375 8.25 7.85925 8.322 7.71525 8.466C7.57125 8.61 7.4995 8.788 7.5 9C7.5 9.2125 7.572 9.39075 7.716 9.53475C7.86 9.67875 8.038 9.7505 8.25 9.75Z"
        fill="#F35555"
      />
    </svg>
  ),
  edit: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <g clipPath="url(#clip0_1025_3931)">
        <path
          d="M6.61886 15.2379L1.26172 16.7379L2.76172 11.3808L12.5712 1.61893C12.6821 1.50554 12.8146 1.41544 12.9606 1.35394C13.1068 1.29243 13.2639 1.26074 13.4224 1.26074C13.581 1.26074 13.738 1.29243 13.8842 1.35394C14.0303 1.41544 14.1628 1.50554 14.2736 1.61893L16.3808 3.73797C16.4923 3.84864 16.5809 3.98032 16.6414 4.12538C16.7018 4.27045 16.7329 4.42606 16.7329 4.58321C16.7329 4.74037 16.7018 4.89597 16.6414 5.04104C16.5809 5.18612 16.4923 5.31778 16.3808 5.42845L6.61886 15.2379Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1025_3931">
          <rect
            width="16.6667"
            height="16.6667"
            fill="white"
            transform="translate(0.666504 0.666504)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  delete: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M2.85693 5.83325H17.1426"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.64282 5.83325H15.3571V16.5475C15.3571 16.8633 15.2316 17.1661 15.0084 17.3893C14.7852 17.6125 14.4823 17.738 14.1666 17.738H5.8333C5.51756 17.738 5.21476 17.6125 4.9915 17.3893C4.76825 17.1661 4.64282 16.8633 4.64282 16.5475V5.83325Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.02368 5.83339V5.23815C7.02368 4.44882 7.33724 3.69181 7.89538 3.13367C8.45353 2.57552 9.21054 2.26196 9.99987 2.26196C10.7892 2.26196 11.5462 2.57552 12.1044 3.13367C12.6625 3.69181 12.9761 4.44882 12.9761 5.23815V5.83339"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.21411 9.40649V14.1702"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7856 9.40649V14.1702"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  manage: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <g clipPath="url(#clip0_1053_4650)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.57143 1.42857V6.42857C6.57143 7.21754 7.21103 7.85714 8 7.85714H9.42857V9.64286H4.78571C3.405 9.64286 2.28571 10.7621 2.28571 12.1429V14.2857H1.92857C1.13959 14.2857 0.5 14.9253 0.5 15.7143V18.5714C0.5 19.3604 1.13959 20 1.92857 20H4.78571C5.57469 20 6.21429 19.3604 6.21429 18.5714V15.7143C6.21429 14.9253 5.57469 14.2857 4.78571 14.2857H4.42857V12.1429C4.42857 11.9456 4.58847 11.7857 4.78571 11.7857H9.42857V14.2857H9.07143C8.28246 14.2857 7.64286 14.9253 7.64286 15.7143V18.5714C7.64286 19.3604 8.28246 20 9.07143 20H11.9286C12.7175 20 13.3571 19.3604 13.3571 18.5714V15.7143C13.3571 14.9253 12.7175 14.2857 11.9286 14.2857H11.5714V11.7857H16.2143C16.4116 11.7857 16.5714 11.9456 16.5714 12.1429V14.2857H16.2143C15.4253 14.2857 14.7857 14.9253 14.7857 15.7143V18.5714C14.7857 19.3604 15.4253 20 16.2143 20H19.0714C19.8604 20 20.5 19.3604 20.5 18.5714V15.7143C20.5 14.9253 19.8604 14.2857 19.0714 14.2857H18.7143V12.1429C18.7143 10.7621 17.595 9.64286 16.2143 9.64286H11.5714V7.85714H13C13.789 7.85714 14.4286 7.21754 14.4286 6.42857V1.42857C14.4286 0.639593 13.789 0 13 0H8C7.21103 0 6.57143 0.639593 6.57143 1.42857Z"
          fill="#222222"
        />
      </g>
      <defs>
        <clipPath id="clip0_1053_4650">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  dashboard: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <g clipPath="url(#clip0_1053_4725)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.5 10C20.5 12.6812 19.4447 15.116 17.727 16.9117C15.9127 18.8081 13.3596 19.9917 10.5298 20C10.5199 20 10.51 20 10.5 20C10.49 20 10.4801 20 10.4702 20C7.64043 19.9917 5.08723 18.8081 3.27304 16.9117C1.55523 15.116 0.5 12.6812 0.5 10C0.5 4.47716 4.97716 0 10.5 0C16.0229 0 20.5 4.47716 20.5 10ZM16.5611 15C15.1201 13.255 12.9399 12.1428 10.5 12.1428C8.06009 12.1428 5.87991 13.255 4.43879 15C5.87991 16.745 8.06009 17.8571 10.5 17.8571C12.9399 17.8571 15.1201 16.745 16.5611 15ZM10.5002 10.7142C12.4726 10.7142 14.0716 9.11526 14.0716 7.14281C14.0716 5.17037 12.4726 3.57139 10.5002 3.57139C8.52773 3.57139 6.92874 5.17037 6.92874 7.14281C6.92874 9.11526 8.52773 10.7142 10.5002 10.7142Z"
          fill="#4A4A68"
        />
      </g>
      <defs>
        <clipPath id="clip0_1053_4725">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  stack: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <g clipPath="url(#clip0_1053_4882)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5 0.00341797C10.1711 0.00341797 9.84575 0.0710142 9.54408 0.20201L1.38366 4.00992L1.36405 4.01943C1.11376 4.14568 0.903432 4.3389 0.756474 4.57762C0.609519 4.81633 0.531708 5.09116 0.531708 5.37148C0.531708 5.6518 0.609519 5.92662 0.756474 6.16533C0.90343 6.40405 1.11376 6.59728 1.36405 6.72352L1.38553 6.7339L9.5283 10.5055L9.54408 10.5124C9.84575 10.6434 10.1711 10.711 10.5 10.711C10.8289 10.711 11.1544 10.6436 11.456 10.5126L19.6163 6.70446L19.636 6.69495C19.8863 6.5687 20.0966 6.37548 20.2436 6.13676C20.3904 5.89805 20.4683 5.62323 20.4683 5.3429C20.4683 5.06259 20.3904 4.78776 20.2436 4.54905C20.0966 4.31033 19.8863 4.1171 19.636 3.99086L19.6144 3.98048L11.4717 0.208862L11.4559 0.20201C11.1543 0.0710142 10.8289 0.00341797 10.5 0.00341797ZM20.4017 9.85176C20.6493 10.3892 20.4143 11.0256 19.8769 11.2732L11.4977 15.1331L11.4941 15.1348C11.1756 15.2801 10.8295 15.3552 10.4794 15.3552C10.1293 15.3552 9.78326 15.2801 9.46472 15.1347L9.45925 15.1322L1.12133 11.2723C0.584349 11.0238 0.350557 10.3869 0.599145 9.84995C0.847733 9.31296 1.48456 9.07916 2.02155 9.32775L10.3558 13.1859C10.3946 13.2034 10.4368 13.2124 10.4794 13.2124C10.5222 13.2124 10.5646 13.2033 10.6036 13.1857L18.9803 9.3269C19.5177 9.07933 20.1542 9.31432 20.4017 9.85176ZM19.8769 15.9161C20.4143 15.6685 20.6493 15.0321 20.4017 14.4947C20.1542 13.9572 19.5177 13.7222 18.9803 13.9698L10.6048 17.828C10.5658 17.8455 10.5222 17.8552 10.4794 17.8552C10.4368 17.8552 10.3946 17.8462 10.3558 17.8288L2.02155 13.9706C1.48456 13.722 0.847732 13.9558 0.599145 14.4928C0.350557 15.0298 0.584349 15.6667 1.12133 15.9152L9.45925 19.7751L9.46472 19.7775C9.78326 19.923 10.1293 19.9981 10.4794 19.9981C10.8295 19.9981 11.1756 19.923 11.4941 19.7777L11.4977 19.776L19.8769 15.9161Z"
          fill="#4A4A68"
        />
      </g>
      <defs>
        <clipPath id="clip0_1053_4882">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  circle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <circle cx="4" cy="4" r="4" fill="#2458C6" />
    </svg>
  ),
  export: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 22C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V15L15 19V16H8V14H15V11L20 15V8L14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18ZM13 4L18 9H13V4Z"
        fill="white"
      />
    </svg>
  ),
  cancleBill: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <g clipPath="url(#clip0_1118_1486)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.33329 0.666626C6.57554 0.666626 5.8488 0.967645 5.31299 1.50346C4.77718 2.03928 4.47615 2.76602 4.47615 3.52377V14.8543C4.58425 14.941 4.68872 15.0345 4.78899 15.1348L6.13335 16.4792L7.47771 15.1348C8.96543 13.6471 11.3775 13.6471 12.8652 15.1348C14.3529 16.6225 14.3529 19.0346 12.8652 20.5222L11.5208 21.8666L12.8652 23.211C13.9796 24.3255 14.2592 25.9586 13.704 27.3333H24.4762C25.2339 27.3333 25.9607 27.0323 26.4965 26.4965C27.0323 25.9607 27.3333 25.2339 27.3333 24.4762V9.23806C27.3333 8.98547 27.2329 8.74322 27.0544 8.56463L19.4353 0.945573C19.2567 0.766966 19.0145 0.666626 18.7619 0.666626H7.33329ZM11.1815 16.8184C11.7394 17.3763 11.7394 18.2808 11.1815 18.8387L8.1536 21.8666L11.1815 24.8946C11.7394 25.4525 11.7394 26.3569 11.1815 26.9148C10.6237 27.4727 9.71912 27.4727 9.16124 26.9148L6.13329 23.887L3.10535 26.9148C2.54746 27.4727 1.64294 27.4727 1.08504 26.9148C0.527153 26.3569 0.527153 25.4525 1.08504 24.8946L4.11299 21.8666L1.08504 18.8387C0.527153 18.2808 0.527153 17.3763 1.08504 16.8184C1.64294 16.2605 2.54746 16.2605 3.10535 16.8184L6.13329 19.8462L9.16124 16.8184C9.71912 16.2605 10.6237 16.2605 11.1815 16.8184Z"
          fill="#828282"
        />
      </g>
      <defs>
        <clipPath id="clip0_1118_1486">
          <rect
            width="26.6667"
            height="26.6667"
            fill="white"
            transform="translate(0.666626 0.666626)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  success: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66675 9.99996C1.66675 5.39996 5.40008 1.66663 10.0001 1.66663C14.6001 1.66663 18.3334 5.39996 18.3334 9.99996C18.3334 14.6 14.6001 18.3333 10.0001 18.3333C5.40008 18.3333 1.66675 14.6 1.66675 9.99996ZM4.75008 10.5833L7.74175 13.575C8.06675 13.9 8.60008 13.9 8.91675 13.575L15.2417 7.24996C15.5667 6.92496 15.5667 6.39996 15.2417 6.07496C14.9167 5.74996 14.3917 5.74996 14.0667 6.07496L8.33341 11.8083L5.92508 9.40829C5.60008 9.08329 5.07508 9.08329 4.75008 9.40829C4.59404 9.56399 4.50634 9.77536 4.50634 9.99579C4.50634 10.2162 4.59404 10.4276 4.75008 10.5833Z"
        fill="#219653"
      />
    </svg>
  ),
  deposit: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66675 9.99996C1.66675 5.39996 5.40008 1.66663 10.0001 1.66663C14.6001 1.66663 18.3334 5.39996 18.3334 9.99996C18.3334 14.6 14.6001 18.3333 10.0001 18.3333C5.40008 18.3333 1.66675 14.6 1.66675 9.99996ZM4.75008 10.5833L7.74175 13.575C8.06675 13.9 8.60008 13.9 8.91675 13.575L15.2417 7.24996C15.5667 6.92496 15.5667 6.39996 15.2417 6.07496C14.9167 5.74996 14.3917 5.74996 14.0667 6.07496L8.33341 11.8083L5.92508 9.40829C5.60008 9.08329 5.07508 9.08329 4.75008 9.40829C4.59404 9.56399 4.50634 9.77536 4.50634 9.99579C4.50634 10.2162 4.59404 10.4276 4.75008 10.5833Z"
        fill="#219653"
      />
    </svg>
  ),
  empty: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66675 9.99996C1.66675 5.39996 5.40008 1.66663 10.0001 1.66663C14.6001 1.66663 18.3334 5.39996 18.3334 9.99996C18.3334 14.6 14.6001 18.3333 10.0001 18.3333C5.40008 18.3333 1.66675 14.6 1.66675 9.99996ZM4.75008 10.5833L7.74175 13.575C8.06675 13.9 8.60008 13.9 8.91675 13.575L15.2417 7.24996C15.5667 6.92496 15.5667 6.39996 15.2417 6.07496C14.9167 5.74996 14.3917 5.74996 14.0667 6.07496L8.33341 11.8083L5.92508 9.40829C5.60008 9.08329 5.07508 9.08329 4.75008 9.40829C4.59404 9.56399 4.50634 9.77536 4.50634 9.99579C4.50634 10.2162 4.59404 10.4276 4.75008 10.5833Z"
        fill="#219653"
      />
    </svg>
  )
}
