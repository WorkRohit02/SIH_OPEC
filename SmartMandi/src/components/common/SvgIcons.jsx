import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export const WheatLogoIcon = ({ size = 48, color = '#1E653A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#E5F2E9" />
    <Path
      d="M12 18V6M12 6L9 9M12 6L15 9M12 10L8 12M12 10L16 12M12 14L9 16M12 14L15 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CheckCircleIcon = ({ size = 24, color = '#1E653A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path d="M8 12L11 15L16 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowLeftIcon = ({ size = 24, color = '#1A231E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRightIcon = ({ size = 20, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CalendarIcon = ({ size = 20, color = '#1E653A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ClockIcon = ({ size = 20, color = '#1E653A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 7V12L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const TrendUpIcon = ({ size = 20, color = '#1E653A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const InfoCircleIcon = ({ size = 20, color = '#1E653A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 16V12M12 8H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const BellIcon = ({ size = 20, color = '#1A231E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GlobeIcon = ({ size = 20, color = '#1A231E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M2 12H22M12 3C14.5 6.5 16 9.5 16 12C16 14.5 14.5 17.5 12 21C9.5 17.5 8 14.5 8 12C8 9.5 9.5 6.5 12 3Z" stroke={color} strokeWidth="2" />
  </Svg>
);

export const QrCodeGraphic = ({ size = 160 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Rect width="100" height="100" rx="12" fill="#FFFFFF" />
    <Rect x="10" y="10" width="28" height="28" rx="4" stroke="#1A231E" strokeWidth="6" fill="none" />
    <Rect x="18" y="18" width="12" height="12" fill="#1E653A" />
    <Rect x="62" y="10" width="28" height="28" rx="4" stroke="#1A231E" strokeWidth="6" fill="none" />
    <Rect x="70" y="18" width="12" height="12" fill="#1E653A" />
    <Rect x="10" y="62" width="28" height="28" rx="4" stroke="#1A231E" strokeWidth="6" fill="none" />
    <Rect x="18" y="70" width="12" height="12" fill="#1E653A" />
    <Rect x="48" y="12" width="6" height="24" fill="#1A231E" />
    <Rect x="62" y="62" width="12" height="12" fill="#1E653A" />
    <Rect x="78" y="62" width="12" height="26" fill="#1A231E" />
    <Rect x="48" y="48" width="24" height="6" fill="#1A231E" />
    <Rect x="48" y="76" width="24" height="12" fill="#1A231E" />
  </Svg>
);

export const BarcodeGraphic = ({ width = 200, height = 40 }) => (
  <Svg width={width} height={height} viewBox="0 0 200 40">
    <G fill="#1A231E">
      <Rect x="10" y="0" width="4" height="40" />
      <Rect x="18" y="0" width="2" height="40" />
      <Rect x="24" y="0" width="6" height="40" />
      <Rect x="34" y="0" width="2" height="40" />
      <Rect x="40" y="0" width="8" height="40" />
      <Rect x="52" y="0" width="4" height="40" />
      <Rect x="60" y="0" width="2" height="40" />
      <Rect x="66" y="0" width="6" height="40" />
      <Rect x="76" y="0" width="8" height="40" />
      <Rect x="88" y="0" width="2" height="40" />
      <Rect x="94" y="0" width="4" height="40" />
      <Rect x="102" y="0" width="6" height="40" />
      <Rect x="112" y="0" width="2" height="40" />
      <Rect x="118" y="0" width="8" height="40" />
      <Rect x="130" y="0" width="4" height="40" />
      <Rect x="138" y="0" width="6" height="40" />
      <Rect x="148" y="0" width="2" height="40" />
      <Rect x="154" y="0" width="6" height="40" />
      <Rect x="164" y="0" width="8" height="40" />
      <Rect x="176" y="0" width="2" height="40" />
      <Rect x="182" y="0" width="6" height="40" />
    </G>
  </Svg>
);
