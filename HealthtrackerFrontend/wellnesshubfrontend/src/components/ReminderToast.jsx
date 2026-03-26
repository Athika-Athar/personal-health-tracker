
import { useEffect } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReminderToast = () => {
  useEffect(() => {
    console.log("🔔 ReminderToast initialized");

    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      console.log(`🕒 Checking time: ${hour}:${minute}`);

      const withinActiveHours = hour >= 9 && hour <= 21;

      if (withinActiveHours && minute === 0) {
        const key = `reminder-${hour}`;

        if (!sessionStorage.getItem(key)) {
          // 💧 Water Reminder: every hour
          toast.info("💧 Time to log your water intake!", {
            toastId: `water-${hour}`,
          });

          // 🏃 Activity Reminder: 8 PM
          if (hour === 20) {
            toast.info("🏃 Don't forget to log your activity today!", {
              toastId: `activity`,
            });
          }

          // 😊 Mood Reminder: 7 PM
          if (hour === 19) {
            toast.info("😊 How are you feeling today? Log your mood.", {
              toastId: `mood`,
            });
          }

          // 😴 Sleep Reminder: 9 PM
          if (hour === 21) {
            toast.info("😴 Time to log your sleep details before bed!", {
              toastId: `sleep`,
            });
          }

          sessionStorage.setItem(key, "true");
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
    />
  );
};

export default ReminderToast;
