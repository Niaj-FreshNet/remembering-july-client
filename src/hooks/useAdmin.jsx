import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log('Admin check response:', res.data);
            return res.data?.admin;
        }
    })

    return [isAdmin, isAdminLoading];
};

export default useAdmin;



// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
//     const { user } = useAuth();
//     // const axiosSecure = useAxiosSecure();

//     const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async () => {
//             if (!user?.email) return false; // Handle the case where user is not available
//             const res = await axios.get(`http://localhost:5000/users/admin/${user.email}`);
//             console.log('Admin check response:', res.data);
//             return res.data?.admin;
//         },
//         enabled: !!user?.email, // Ensure the query runs only if the user email is available
//     });

//     return [isAdmin, isAdminLoading];
// };

// export default useAdmin;


