import axios from 'axios';
import React, { useState } from 'react'

const AddEmployee = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [dateHired, setDateHired] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = new FormData()
        form.append('first_name', firstName);
        form.append('last_name', lastName);
        form.append('email', email);
        form.append('phone', phone);
        form.append('position', position);
        form.append('salary', salary);
        form.append('date_hired', dateHired);
        if (image) form.append('image', image);

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/employees', form);
            console.log(response.data)
            setMessage("Employee added successfully!");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setPosition("");
            setSalary("");
            setDateHired("");
            setImage(null);
        }
        catch(error){
            console.log('Failed to add employee: ', error);
            setMessage('Failed to add employee');
        }

        setTimeout(() => { setMessage("") }, 2000)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                encType="multipart/form-data" 
                onSubmit={handleSubmit} 
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="font-bold text-center text-2xl mb-6">Add Employee</h2>

                <div className="flex gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="date"
                    value={dateHired}
                    onChange={(e) => setDateHired(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full mb-4"
                />

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200 cursor-pointer"
                >
                    Add Employee
                </button>

                {message && (
                    <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default AddEmployee