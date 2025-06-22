import { getLoginFormData, handleLoginSubmit } from "@/actions/auth/login";
import { getSignupFormData, handleSignupSubmit } from "@/actions/auth/signup";
import { useRouter, useSearchParams } from "next/navigation";
import { IAttributes } from "oneentry/dist/base/utils";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface SignUpFormData {
    email: string;

    password: string;

    name: string;
}

interface LoginFormData {
    email: string;

    password: string;
}
const useAuth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState<IAttributes[]>([]);
    const [inputValues, setInputValues] = useState<
        Partial<SignUpFormData & LoginFormData>
    >({});

    const [isLoading, setIsLoading] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState<string | null>("Not valid");
    const searchParams = useSearchParams();
    useEffect(() => {
        const type = searchParams.get('type');

        setIsSignUp(type !== 'login');
    }, [searchParams]);



    useEffect(() => {
        setIsLoading(true);

        setError(null);

        const fetchData = isSignUp ? getSignupFormData : getLoginFormData;

        fetchData()
            .then((data) => setFormData(data))

            .catch(() => setError("Failed to load form data. Please try again."))

            .finally(() => setIsLoading(false));
    }, [isSignUp]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        setError(null);

        try {
            if (isSignUp) {
                if (inputValues.email && inputValues.password && inputValues.name) {
                    const response = await handleSignupSubmit(
                        inputValues as SignUpFormData
                    );

                    if ("identifier" in response) {
                        setInputValues({});

                        setIsSignUp(false);

                        toast("User has been created", {
                            description: "Please enter your credentials to log in.",

                            duration: 5000,
                        });
                    } else {
                        setError(response.message);
                    }
                } else {
                    setError("Please fill out all required fields.");
                }
            } else {
                if (inputValues.email && inputValues.password) {
                    const response = await handleLoginSubmit(
                        inputValues as LoginFormData
                    );

                    if (response.message) {
                        setError(response.message);
                    }
                } else {
                    setError("Please fill out all required fields.");
                }
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setError(null);
        setInputValues({});
    };
    return {
        isSignUp,

        setIsSignUp,

        formData,

        inputValues,

        isLoading,

        isSubmitting,

        error,

        handleInputChange,

        handleSubmit,

        toggleForm,

        router,
    }
}

export default useAuth