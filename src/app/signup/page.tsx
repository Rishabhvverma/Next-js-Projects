"use client"
import React from 'react'
import Link from 'next/link';
import { Image, Card, Form, Button, Redirect, PasswordField } from '../components';
import { signIn } from "next-auth/react"
import { useFormik } from 'formik';
import { TextField, Typography, Divider } from '@mui/material';
import { SignupSchema } from '../schemas/signupSchema';
import { useRouter } from 'next/navigation'

interface InitialValues {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

function SignupPage() {

    const router = useRouter()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<InitialValues>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: SignupSchema,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm()
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    })

    return (
        <>
            <Card>
            <Typography sx={{color:'#5c5c5c',marginTop:3 }} variant="h5" component="h2">Sign up</Typography>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="First name"
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.firstName && touched.firstName ? errors.firstName : null}
                        error={Boolean(errors.firstName && touched.firstName)}
                    ></TextField>

                    <TextField
                        label="Last name"
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.lastName && touched.lastName ? errors.lastName : null}
                        error={Boolean(errors.lastName && touched.lastName)}
                    ></TextField>


                    <TextField
                        label="Email"
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.email && touched.email ? errors.email : null}
                        error={Boolean(errors.email && touched.email)}
                       ></TextField>


                    <PasswordField
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.password && touched.password ? errors.password : ""}
                        error={Boolean(errors.password && touched.password)}
                    />


                    <TextField
                        error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                        type='password'
                        label="Confirm Password"
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                    ></TextField>


                    <Button type="submit">Sign Up</Button>
                    <Redirect>Already have an account?  <Link href={'/login'} > Login</Link></Redirect>
                    <Divider sx={{fontSize:12}}>or</Divider>
                    <Button
                        secondary
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: '/' })}
                    >
                        <Image src='https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png'></Image>
                        Sign In with Google
                    </Button>
                    <Button secondary
                        onClick={()=>signIn("facebook")}
                                            >
                        <Image src='https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png'></Image>
                        Sign In with Facebook
                    </Button>


                </Form>
            </Card >
        </>
    )
}

export default SignupPage
