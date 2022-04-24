import { ref } from "vue";

function useWallet() {
  const provider = ref(null);
  const connect = () => 20;
  const isBlocknativeInstalled = false;
  return { connect };
}

export default useWallet;
