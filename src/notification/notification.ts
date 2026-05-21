import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function success(message: string) {
  iziToast.success({
    title: "✅",
    message: message,
    position: "center",
    timeout: 600,
  });
}

export function error() {
  iziToast.error({
    title: "❌",
    message: "Something went wrong!Try again",
    position: "center",
  });
}
