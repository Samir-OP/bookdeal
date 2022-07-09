import { toast } from "react-toastify";

export function alert(type: string, message: string, data?: any) {
  try {
    if (!data) {
      data = {
        position: "top-center",
        autoclose: 5000,
      };
    }

    if (!data.position) data.position = "top-center";
    if (!data.autoclose) data.autoclose = 5000;

    const options = {
      position: data.position,
      autoClose: data.autoclose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case "loading":
        toast.loading(message, options);
        break;

      case "error":
        toast.error(message, options);
        break;

      case "success":
        toast.success(message, options);
        break;
    }
  } catch (err) {
    console.log(err);
  }
}
