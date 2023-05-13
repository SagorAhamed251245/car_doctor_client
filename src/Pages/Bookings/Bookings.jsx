import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url])

    const handelDelete = id => {
        const proceed = confirm('Are you sure you want to delete')
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Item deleted successfully')
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining)
                    }

                })
        }
    }

    const handelBookingConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method:'PATCH',
        headers:{
            'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({status: 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // updated 
                const remaining = bookings.filter(booking => booking._id !== id)
                const updated = bookings.find(booking => booking._id === id)
                updated.status = 'confirm';
                const newBookings = [updated, ...remaining]
                setBookings(newBookings)
            }
        })
    }
    return (
        <div>
            <p className="text-3xl text-center my-3 font-bold">Total bookings Item: {bookings.length}</p>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>

                                </label>
                            </th>
                            <th>Service Name</th>
                            <th>Booking Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handelDelete={handelDelete}
                                handelBookingConfirm={handelBookingConfirm}
                            ></BookingRow>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;