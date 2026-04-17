import toast from "react-hot-toast";

export const successfulToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
  });
};
