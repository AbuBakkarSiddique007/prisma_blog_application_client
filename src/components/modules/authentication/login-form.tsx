"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  // Google Auth system :
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    })

    console.log("Data : ", data);
  }

  // Login Form system :
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema

    },
    onSubmit: async ({ value }) => {
      try {
        const toastId = toast.loading("Logging in...")
        const { email, password } = value
        const { data, error } = await authClient.signIn.email({ email, password })

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("Logged in successfully!", { id: toastId })

      } catch (error) {

        toast.error("Invalid credentials or something went wrong. Please try again.")
      }
    }
  })


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>
          Enter your credentials to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>

          <FieldGroup>
            

            <form.Field
              name="email"
              children={(field) => {

                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (<Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="email"
                    autoCapitalize="none"
                    suppressHydrationWarning
                    aria-invalid={isInvalid}
                  ></Input>

                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} ></FieldError>
                    )
                  }

                </Field>)
              }}
            />

            <form.Field
              name="password"
              children={(field) => {

                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (<Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="new-password"
                    suppressHydrationWarning
                    aria-invalid={isInvalid}
                  ></Input>

                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} ></FieldError>
                    )
                  }

                </Field>)
              }}
            />

          </FieldGroup>
        </form>
      </CardContent>


      <CardFooter className="flex flex-col gap-4">
        <Button
          form="login-form"
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
          aria-disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <Button className="w-full" onClick={() => handleGoogleLogin()} variant="outline" type="button">
          Login with Google
        </Button>

      </CardFooter>
    </Card>
  )
}
