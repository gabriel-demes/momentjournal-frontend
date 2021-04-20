import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import React from "react"

const Profile = ({user}) => {

    return (
        <div style={{margin:"3em"}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <Button variant="contained">Edit</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>
                                <Button variant="contained">Edit</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>UserCode</TableCell>
                            <TableCell>{user.code}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Profile