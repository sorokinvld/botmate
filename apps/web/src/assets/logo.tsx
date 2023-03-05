type LogoProps = {
  height: string;
  width: string;
  color?: string;
};

export const BotMateLogo = ({
  height,
  width,
  color = '#FFFFFF',
}: LogoProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>botmate-logo-dark</title>
    <g
      id="botmate-logo-dark"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <path
        d="M413.92,32 C450.967261,32 481,62.032739 481,99.08 L481,125.057143 C481,128.723604 480.705845,132.321362 480.139846,135.828103 L480.139313,416.92 C480.139313,453.967261 450.106574,484 413.059313,484 L387.131527,484 C350.084266,484 320.051527,453.967261 320.051527,416.92 L320.051,192.137 L97.08,192.137143 C60.032739,192.137143 30,162.104404 30,125.057143 L30,99.08 C30,62.032739 60.032739,32 97.08,32 L413.92,32 Z M147.053435,248.96 C211.700262,248.96 264.10687,301.382765 264.10687,366.049524 C264.10687,430.716282 211.700262,483.139048 147.053435,483.139048 C82.406608,483.139048 30,430.716282 30,366.049524 C30,301.382765 82.406608,248.96 147.053435,248.96 Z"
        id="BotMate-Logo"
        fill={color}
      ></path>
    </g>
  </svg>
);
