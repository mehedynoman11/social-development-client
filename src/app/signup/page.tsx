'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignUpPage = () => {
    const router = useRouter();
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
            email: string;
            password: string;
        };
        const { data, error } = await authClient.signUp.email({
            ...user,
            // callbackURL: "/",
        });

        if (data) {
            toast.success("Sign up successful!");
            router.push('/');
        }
        if (error) {
            toast.error("Sign up failed: " + error.message);
            console.log(error);
        }

    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Create a new account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSignUp}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="url"
                                            placeholder="https://example.com/profile.jpg"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="*********"
                                            required />
                                    </Field>
                                    <Field>
                                        <Button type="submit">Sign up</Button>
                                        <FieldDescription className="text-center">
                                            Already have an account? <a href="/signin">Sign in</a>
                                        </FieldDescription>
                                    </Field>
                                    <Field>
                                        <Button variant="outline" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            Continue with Google
                                        </Button>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </FieldDescription>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;