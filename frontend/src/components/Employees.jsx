import React from 'react'
import { useFetchEmployees } from '../hooks'

const Employees = () => {
    const { employees } = useFetchEmployees();
    return (
        <ul>
            {
                employees.map((emp, index) => (
                    <li key={index}>{emp.first_name} - {emp.image}</li>
                    
                ))
            }
        </ul>
    )
}

export default Employees