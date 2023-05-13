import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const CheckOut = () => {
    const service = useLoaderData();
     const {user} = useContext(AuthContext)
    
    const { title, price , _id , img } = service

    const handelBookService = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking ={
            customerName: name ,
            email,
            date,
            img,
            price: price,
            service: title,
            service_id: _id
        }
        console.log(booking)

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                alert('service booked successfully')
            }
        })

    }

    return (


        <div>
            <h3 className='text-center text-3xl font-bold text-orange-600'>Book {title} </h3>

            <div className="card-body">
                <form onSubmit={handelBookService}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">name</span>
                            </label>
                            <input type="text" placeholder="name" required defaultValue={user?.displayName} name='name' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type='date' name='date' required className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" required  defaultValue={user?.email} placeholder="email" name='email' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due amount</span>
                            </label>
                            <input type="text" required defaultValue={'$ ' + price} className="input input-bordered" />

                        </div>
                    </div>
                    <div className="form-control mt-6">

                        <input className="btn btn-primary" type="submit" value="Order Confirm" />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CheckOut;