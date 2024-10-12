"use client";
import React, { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
import { Input } from "./ui/input";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={
                  name === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : "text"
                }
                {...field}
              />
            </FormControl>
            {name === "password" && (
              <div className="absolute right-0 h-full flex items-center justify-center px-2">
                {showPassword ? (
                  <Eye
                    className="size-6 text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    className="size-6 text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            )}
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
