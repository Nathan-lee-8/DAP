import { WebView } from "react-native-webview";

const PrivacyPolicy = (route: any) => {
  const section = route.route.params.section;
  const uri = `https://daplegal.s3.us-west-2.amazonaws.com/legal.html#${section}`;
  return (
    <WebView 
      source={{ uri: uri}} 
      style={{ flex: 1 }}
    />
  );
}

export default PrivacyPolicy;