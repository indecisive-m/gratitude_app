import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import COLORS from "./COLORS";

export const ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: COLORS.mood.sad, borderLeftWidth: 0 }}
      text1Style={{
        fontSize: 12,
      }}
    />
  ),
};
