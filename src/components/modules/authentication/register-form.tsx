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
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),


})

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema

    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
          id="login-form"
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


      <CardFooter className="flex justify-end">
        <Button form="login-form" type="submit">Register</Button>
      </CardFooter>


    </Card>
  )
}
