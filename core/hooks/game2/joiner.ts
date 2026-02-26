import { useRouter } from "expo-router";
import { useFormHook } from "../use-form-hook";
import {
  JoinGame2Interface,
  JoinGame2SessionSchema,
} from "@/core/types/schema/game2";
import { joinGame2Sesion } from "@/core/services/game2/session/game2.session.service";

export function useJoinGame2Session() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(JoinGame2SessionSchema, {
    defaultValues: {
      code: undefined,
      name: undefined,
      avatar: undefined,
    },
  });

  const onSubmit = async (payload: JoinGame2Interface) => {
    try {
      await joinGame2Sesion(payload);
      router.replace("/game2/ready");
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}
