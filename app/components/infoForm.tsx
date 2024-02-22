import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { errorAtom } from "@/app/states/common";
import { triggerPayment, userInfoAtom, checkoutResultAtom } from "@/app/states/order";
import { userInfoProps } from "@/app/types/order";
import Link from "next/link";
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

export const InfoForm: React.FC<{
    onError: (errorType: string, errorMsg: string) => void,
    cityCode: string,
    cityKey: string,
}> = ({ onError, cityCode, cityKey }) => {
    const [termsChecked, setTermsChecked] = useState<boolean>(false);
    const [isTriggerPayment, setIsTriggerPayment] = useAtom(triggerPayment);
    const setUserInfo = useSetAtom(userInfoAtom);
    const setErrors = useSetAtom(errorAtom);
    const errors = useAtomValue(errorAtom);
    // const checkoutResp = useAtomValue(checkoutResultAtom);
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

    const optStatement = (city_code: string) => {
        if (city_code === "lrw") {
            return `Yes, please sign me up to receive communication from Enchant and Resorts
            World to hear all about the new magic, promotions, and special offers.`;
        } else {
            return `Yes, please sign me up to receive communication from Enchant to hear all
            about the new magic, promotions, and special offers.`;
        }
    }
    const acceptMarketing = () => {
        console.log('marketing checked~')
    };
    const acceptSMS = () => {
        console.log('sms checked~')

    };
    const acceptTicketTerms = (e: any) => {
        const checked = e.target.checked;
        setTermsChecked(checked);

    };

    const onSubmit = async () => {
        // clear errors 
        setErrors([]);
        if (!termsChecked) {
            const errMsg = "Sorry, you must read and accept the Ticketing terms & conditions to process your order.";
            onError('acceptTicketTermsError', errMsg);
            console.log(errMsg, 'rerr', errors)
            return;
        }
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
        setIsTriggerPayment(true);
        // await completeCheckout();
    };

    return (
        <div>
            <h1 className="text-1xl font-semibold mb-2">Personal Details</h1>
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
                    <Checkbox onChange={acceptMarketing}>
                        {optStatement(cityCode)}
                    </Checkbox>
                    <Checkbox onChange={acceptSMS}>I agree to receive SMS based marketing updates at the provided phone number.</Checkbox>
                    <Checkbox onChange={acceptTicketTerms}>
                        I’ve read and accept the{' '}
                        <Link target="_blank" className="" rel="noopener noreferrer" href={`https://enchantchristmas.com/ticketing-terms`}>
                            <span className="font-semibold">Ticketing Terms & Conditions</span>
                        </Link>
                        {' '}and{' '}
                        <Link target="_blank" className="" rel="noopener noreferrer" href={`https://enchantchristmas.com/ticketing-terms`}>
                            <span className="font-semibold"> Privacy Policy</span>
                        </Link>
                        {' '}of Enchant Christmas.

                        {errors.some(error => error.type === 'acceptTicketTermsError') && (
                            <p className="text-red-500">{errors.find(error => error.type === 'acceptTicketTermsError')?.msg}</p>
                        )}

                    </Checkbox>
                    <Button type="button" disabled={isTriggerPayment} onClick={onSubmit}>
                        Complete Order
                    </Button>
                </form>
            </Form>
        </div>
    );
};
