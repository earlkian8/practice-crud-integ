import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetchEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/employees/');
            console.log(response.data)
            setEmployees(response.data)
        }

        fetchEmployees();
    }, [])

    return { employees }
}

export default useFetchEmployees