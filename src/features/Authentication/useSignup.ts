import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/AuthApi";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: Signup, isLoading: isSignupLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      console.log("Sign up successfully");
      toast.success("Sign up  successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => {
      console.log("Login error", error);
      toast.error("Incorect email or password");
    },
  });

  return { Signup, isSignupLoading };
}
