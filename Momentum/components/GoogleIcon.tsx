import Svg, { Path } from "react-native-svg";

export default function GoogleIcon({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#4285F4" d="M..."/>  {/* use official G path data */}
      <Path fill="#34A853" d="M..."/>
      <Path fill="#FBBC05" d="M..."/>
      <Path fill="#EA4335" d="M..."/>
    </Svg>
  );
}
