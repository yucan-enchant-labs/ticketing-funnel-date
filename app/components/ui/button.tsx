import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"
import { DateTime } from 'luxon';
import { createCart } from '@/app/apis/order';
import { processOrder } from '@/app/hooks/order';
import { ReviewTicketProps } from "@/app/types/order";
import { useSetAtom } from "jotai";
import { cartAtom, selectedTicket, timerAtom } from "@/app/states/order";
import Link from 'next/link';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
        outline:
          "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const ReviewTicketButton: React.FC<ReviewTicketProps> = ({ canCheckout = false, ...props }) => {
  const setTickets = useSetAtom(selectedTicket);
  const setCart = useSetAtom(cartAtom);
  const setTimer = useSetAtom(timerAtom);
  const { tickets, sellerId, city, session } = props;
  const reviewTickets = async () => {
    const selectedTickets = tickets.filter((ticket) => ticket.qty > 0);
    try {
      await createCart(sellerId).then(async (resp) => {
        setCart(resp);
        if (resp.id) {
          const orderResp = await processOrder(resp.id, selectedTickets, session);

          const reservedOrder = orderResp.data;

          const orderInfo = {
            tickets: selectedTickets,
            cart_fees: reservedOrder.cart_fees._data,
            cart: reservedOrder.cart._data,
          }
          setTickets(orderInfo);
          console.log('OrderInfo:', orderInfo)
        }
        const end = DateTime.fromISO(resp.expires_at).set({ millisecond: 0 });

        const interval = setInterval(() => {
            const now = DateTime.local();
            const diff = end.diff(now);
            const duration = diff.shiftTo('minutes', 'seconds');
            if (diff.as('milliseconds') < 0) {
                clearInterval(interval);
                // Redirect or perform other actions when the time expires
                window.location.href = "/";
            }
            setTimer(duration.toFormat('mm:ss'));
        }, 1000);
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
  };
  return (
    // <Link href={`/${city}/order-review`} passHref>
    <Link href={`/${city}/order-review`}>
      <Button
        className="w-full bg-gray-700 rounded text-white py-3 mt-6"
        onClick={reviewTickets}
        disabled={!canCheckout}
      >
        Review Tickets
      </Button>

    </Link>
  );
};

export { Button, buttonVariants, ReviewTicketButton }
