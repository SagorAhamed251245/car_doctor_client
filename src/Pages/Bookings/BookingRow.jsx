

const BookingRow = ({booking , handelDelete , handelBookingConfirm}) => {
    const {img,  service, price , date , _id , status } = booking

   
    return (
        <tr>
            <th>
                <button  onClick={()=> handelDelete(_id)} className="btn w-12 h-6">
                    X
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="w-24 rounded h-24">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{service}</div>
                       
                    </div>
                </div>
            </td>
           
            <td>{date}</td>
            <td>{price}</td>
            <th>{status === 'confirm' ? <span className="font-bold text-sky-600">Confirmed</span>  :
                <button onClick={()=> handelBookingConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>
                }
                
            </th>
        </tr>
    );
};

export default BookingRow;