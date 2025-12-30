import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export function useFormHook<T extends z.ZodType<any, any>>(
  schema: T,
  options?: UseFormProps<z.infer<T>>
): UseFormReturn<z.infer<T>> {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    ...options
  });

  return form;
}
