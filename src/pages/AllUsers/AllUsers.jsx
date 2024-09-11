import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "If you make him an ADMIN, you won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "x Make ADMIN! x"
        })
            .then((result) => {
                console.log(result)
                if (result.isConfirmed === true) {
                    axiosSecure.patch(`/users/admin/${user._id}`)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} is an Admin Now!`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }

                        })
                }
            })
    }

    const handleUserDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                console.log(result)
                if (result.isConfirmed === true) {
                    axiosSecure.delete(`/users/${user._id}`)
                        .then(res => {
                            console.log(res)
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} user removed`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }
            })
    }

    return (
        <Box paddingY={1} marig bgcolor="background.paper">

            <Helmet>
                <title>All Users - GENOCIDE</title>
            </Helmet>

            <div className="flex justify-center top-0 mb-4">
                <h2 className="text-3xl underline italic">users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto md:max-w-screen-md mx-auto mb-6">
                <table className="table table-sm">
                    {/* head */}
                    <thead className="bg-red-500 text-white">
                        <tr>
                            <th>Serial</th>
                            <th>User</th>
                            <th>Thana</th>
                            <th>Institue</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    {/* row */}
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>{index + 1}.</td>
                                <td>
                                    <span className="font-bold">{user.name}</span> <span>({user.email})</span>
                                    <p>{user.email}</p>
                                </td>
                                <td>{user.thana}</td>
                                <td>{user.institute}</td>
                                <td className="italic underline">
                                    {
                                        user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg">
                                                <FaUser className="text-amber-600"></FaUser>
                                            </button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </Box >
    );
};

export default AllUsers;