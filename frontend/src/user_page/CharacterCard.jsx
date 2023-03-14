import {useEffect, useMemo, useState} from "react";
import { useTable } from "react-table";
import * as PropTypes from "prop-types";
import API from "../shared/api"



export default function CharacterCard({user_id}) {
    const [characterData, setCharacterData] = useState([]);

     // API call to get data
    useEffect(() => {
        API.get(`/api/character/${user_id}`)
        .then((response) => {
            setCharacterData(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    // columns for the table
    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Group",
                accessor: "group",
            }
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columns,
        data: characterData
    })

    return (
        <>
            <p>Hier könnte ihre Werbung stehen</p>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps}>
                        {
                            headerGroup.headers.map( column => (
                                <th {...column.getHeaderProps}>{column.render('Header')}</th>
                            ))
                        }
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps}>{cell.render('Cell')}</td>
                            })
                            }

                    </tr>
                    )
                    })
                }
                </tbody>
            </table>
        </>
    )
}
CharacterCard.propTypes = {
    user_id: PropTypes.string.isRequired,
}