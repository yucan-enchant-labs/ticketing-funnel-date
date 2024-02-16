
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import { errorAtom } from "@/app/states/common";
import { triggerPayment, userInfoAtom } from "@/app/states/order";
import { userInfoProps } from "@/app/types/order";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";

const formSchema: any = z.object({
    first_name: z.string().min(2, {
        message: "This field is required.",
    }),
    last_name: z.string().min(2, {
        message: "This field is required.",
    }),
    phone: z.string(),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    confirm_email: z.string().email({
        message: "Invalid email address.",
    }),
}).refine((data) => data.email === data.confirm_email, {
    message: "Oops! email doesnt match",
});

type UppercaseFirstLetter<T> = T extends `${infer U}${infer R}`
    ? `${Uppercase<U>}${R}`
    : T;
type FormSchemaType = UppercaseFirstLetter<z.infer<typeof formSchema>>;

export const InfoForm: React.FC<{ onError: (errorType: string, errorMsg: string) => void }> = ({ onError }) => {
    const setTriggerPayment = useSetAtom(triggerPayment);
    const setUserInfo = useSetAtom(userInfoAtom);
    const setErrors = useSetAtom(errorAtom);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            confirm_email: "",
        },
    });

    const formatLabel = (name: string | number): string | number => {
        if (typeof name === 'string') {
            return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
        } else {
            return name;
        }
    };

    const onSubmit = async () => {
        // clear errors 
        setErrors([]);

        // start checking
        await form.trigger();

        if (form.formState.isValid) {
            // Get form values
            const values = form.getValues();
            console.log("Form is valid. Submitting:", values);
            setUserInfo((props): userInfoProps => ({
                ...props,
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
            }))

        } else {
            return;
        }
        setTriggerPayment(true);
        // await completeCheckout();
    };

    return (
        <>
            Personal Details
            <Form {...form}>
                <form className="space-y-8">
                    {Object.keys(form.formState.defaultValues as {}).map((fieldName) => (
                        <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>{formatLabel(fieldName)}</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder={formatLabel(fieldName) as string} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button type="button" onClick={onSubmit}> Complete Order
                    </Button>
                </form>
            </Form>
        </>

    );
};
