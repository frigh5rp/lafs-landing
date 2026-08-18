import { Platform, Image, View, type ImageStyle, type StyleProp, type ViewStyle } from "react-native";

type Props = {
  uri?: string | null;
  style?: StyleProp<ImageStyle | ViewStyle>;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
};

/** Display a remote or local image URI (no app API helpers). */
export function RemoteImage({ uri, style, resizeMode = "cover" }: Props) {
  if (!uri) return <View style={style as StyleProp<ViewStyle>} />;

  if (Platform.OS === "web") {
    const size =
      resizeMode === "contain"
        ? "contain"
        : resizeMode === "stretch"
          ? "100% 100%"
          : "cover";
    return (
      <View
        style={[
          style as object,
          {
            backgroundImage: `url(${JSON.stringify(uri)})`,
            backgroundSize: size,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } as object,
        ]}
      />
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style as StyleProp<ImageStyle>}
      resizeMode={resizeMode}
    />
  );
}
