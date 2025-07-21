import React, { useReducer, useState } from 'react'
import SignupApi from '../redux/Api/signupApi'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'



function reducer() { }

const Signup = () => {

    const [inputValue, setValue] = useState(
        { name: "", age: "", email: "", phone: "", password: "" }

    )
    const navigate = useNavigate()


    let inputData = [
        { value: 'name', type: 'text' },
        { value: 'age', type: 'number' },
        { value: 'email', type: 'email' },
        { value: 'password', type: "password" },
        { value: 'phone', type: 'mobile' }
    ]

    function onChangeHandler(e) {
        const { value, name } = e.target
        setValue((prev) => {
            return { ...prev, [name]: value }
        })

    }


    let handelSubmit = async (signupData) => {
        const response = await SignupApi(signupData)

        if (response.status === 201) {
            enqueueSnackbar(response?.data?.message, {
                variant: 'success'
            })
            navigate("/home");
            setValue("")
            localStorage.setItem("token", JSON.stringify(response?.data));


        } else if (response.status === 400 || response.status === 500) {
            enqueueSnackbar(response.response?.data?.message, {
                variant: 'error'
            })
        }
    }

    return (
        <div style={{
            display: "grid",
            placeItems: "center",
            height: "91vh",
            backgroundImage: 'url("../src//assets/image.webp")',
            backgroundAttachment: 'fixed',
            backgroundPosition: "center"
            /* background-repeat: no-repeat; */
            /* background-size: 100%; */
        }}>
            <div style={{
                backgroundColor: "black",
                border: '1px solid white ',
                padding: 10,
                width: "50%",
                borderRadius: 15,
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                flexDirection: "column"
            }} >


                <h1 style={{ textAlign: 'center', color: 'white', fontWeight: 'bolder' }}>Signup</h1>


                {
                    inputData.map((item, key) => {

                        return <input
                            className="border border-blue-700  rounded-[10px]  px-2 py-1 w-full" placeholder={`Please type here ${item.value}`} onChange={onChangeHandler} type={item.type} name={item.value} />
                    })
                }
                <div onClick={() => handelSubmit(inputValue)} style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                    <button className="border border-blue-700 rounded-[10px]  w-[100px] py-1">Submit</button>
                </div>

            </div>
        </div>

    )
}

export default Signup