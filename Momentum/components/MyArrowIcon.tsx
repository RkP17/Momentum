import Svg, { Path } from "react-native-svg";

export function MyArrowIcon({ size = 24, color = "#e3e3e3" }) {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960" fill={color} fontFamily="instrumentBold">
      <Path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
    </Svg>
  );
}
