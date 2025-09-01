import { Text, View } from "react-native";
import {Link} from "expo-router";


export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl text-primary font-bold text-center">Welcome to Mometum</Text>
      <Link href="/onboarding">Onboarding</Link>
    </View>
  );
}
