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
    }


    return (
        <div>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <h2>Add Employee</h2>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                /><br />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /><br />

                <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                /><br />

                <input
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                /><br />

                <input
                    type="date"
                    value={dateHired}
                    onChange={(e) => setDateHired(e.target.value)}
                /><br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                /><br />

                <button type="submit">Add Employee</button>

                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default AddEmployee