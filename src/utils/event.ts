import { onMounted, onUnmounted } from "vue";

const useEventListener = (
  target: any,
  eventName: string,
  callback: Function
) => {
  onMounted(() => target.addEventListener(eventName, callback));
  onUnmounted(() => target.removeEventListener(eventName, callback));
};

export default useEventListener;
