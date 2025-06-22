import getUserData from "@/actions/auth/getUserData";
import { getOrders } from "@/actions/order/getOrders";
import { redirect } from "next/navigation";
import { IUserEntity } from "oneentry/dist/users/usersInterfaces";
import { useState, useEffect } from "react";
interface UserStats {
    lifetimeOrders: number;

    lifetimeSpent: number;

    yearlyOrders: number;

    yearlySpent: number;

    monthlyOrders: number;

    monthlySpent: number;
  }
const useProfile = () => {
    const [user, setUser] = useState<IUserEntity | null>(null);

    const [stats, setStats] = useState<UserStats>({
        lifetimeOrders: 0,

        lifetimeSpent: 0,

        yearlyOrders: 0,

        yearlySpent: 0,

        monthlyOrders: 0,

        monthlySpent: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData();

            if (userData) setUser(userData as IUserEntity);

            if (!userData) {
                setUser(null);

                setIsLoading(false);

                redirect("/auth?type=login");
            }

            const orders = await getOrders();

            if (orders) {
                let lifetimeOrders = 0;

                let lifetimeSpent = 0;

                let yearlyOrders = 0;

                let yearlySpent = 0;

                let monthlyOrders = 0;

                let monthlySpent = 0;

                orders.items.forEach(
                    (order: {
                        createdDate: string | number | Date;

                        totalSum: string;
                    }) => {
                        const orderDate = new Date(order.createdDate);

                        const orderYear = orderDate.getFullYear();

                        const orderMonth = orderDate.getMonth() + 1;

                        const totalSum = parseFloat(order.totalSum);

                        const currentYear = new Date().getFullYear(); // Define current year here

                        const currentMonth = new Date().getMonth() + 1; // Define current month here

                        // Lifetime

                        lifetimeOrders += 1;

                        lifetimeSpent += totalSum;

                        // Yearly

                        if (orderYear === currentYear) {
                            yearlyOrders += 1;

                            yearlySpent += totalSum;
                        }

                        // Monthly

                        if (orderYear === currentYear && orderMonth === currentMonth) {
                            monthlyOrders += 1;

                            monthlySpent += totalSum;
                        }
                    }
                );

                setStats({
                    lifetimeOrders,

                    lifetimeSpent,

                    yearlyOrders,

                    yearlySpent,

                    monthlyOrders,

                    monthlySpent,
                });
            }
        };

        fetchData();
    }, []);

    return {
        user,

        stats,

        isLoading,

      
  }
}

export default useProfile