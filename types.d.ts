declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }
  
  type Icon = FC<IconProps>;
  
  export const ArrowUp: Icon;
  export const ArrowDown: Icon;
  export const Coins: Icon;
  export const Info: Icon;
  export const TrendingUp: Icon;
  export const ArrowUpDown: Icon;
  export const Clock: Icon;
  export const PhoneCall: Icon;
  export const Github: Icon;
  export const LayoutGrid: Icon;
  export const LineChart: Icon;
  
  // Add other icons as needed
} 