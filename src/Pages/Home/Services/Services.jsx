import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [Service, setService] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [])
    return (
        <div className="mt-4 ">
            <div className="text-center space-y-3">
                <h3 className="text-3xl text-orange-600 font-bold">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or <br /> randomised words which do not look even slightly believable. </p>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    Service.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;