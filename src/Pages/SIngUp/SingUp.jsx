import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const SingUp = () => {

    const {createUser} = useContext(AuthContext)
    const location = useLocation()
    console.log(location);
    const from = location?.state?.state?.from?.pathname || '/';
    const navigate = useNavigate()

    const handelSingUp = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            navigate(from , {replace: true})
        })
        .catch(error =>{
            console.log(error)
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row ">
            <div className="mr-12 w-1/2">

                <img src={loginImg} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold">Sing Up</h1>
                    <form  onSubmit={handelSingUp}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Sing Up" />
                        </div>
                    </form>
                    <p className='mt-4 text-center'>Already Have An Account?<Link className='text-orange-600 font-bold' to='/login'>Log in</Link></p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default SingUp;