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
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {

  // Google Auth system :
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000" 
    })

    console.log("Data : ", data);
  }

  // Register Form system :
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema

    },
    onSubmit: async ({ value }) => {
      try {
        const toastId = toast.loading("Creating User...")
        const { name, email, password } = value
        const { data, error } = await authClient.signUp.email({ name, email, password })

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("User created successfully! Please check your email to verify your account.", { id: toastId })

      } catch (error) {

        toast.error("Something went wrong. Please try again.")
      }
    }
  })


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>

          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {

                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (<Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="name"
                    autoCapitalize="words"
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
          form="register-form"
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
          aria-disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? "Registering..." : "Register"}
        </Button>

        <Button className="w-full" onClick={() => handleGoogleLogin()} variant="outline" type="button">
          Login with Google
        </Button>

      </CardFooter>
    </Card>
  )
}
