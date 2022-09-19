import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({employees, deleteEmployee}) => {
    return employees.map(employee=>(
        <tr key={employee.name}>
            <td>{employee.name}</td>
            <td>{employee.address}</td>
            <td>{employee.position}</td>
            <td>{employee.company_name}</td>
            <td className='delete-btn' onClick={()=>deleteEmployee(employee.name)}>
                <Icon icon={trash}/>
            </td>
        </tr>
    ))
}