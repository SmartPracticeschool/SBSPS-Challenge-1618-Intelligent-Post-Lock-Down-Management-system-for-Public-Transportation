import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './Title';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// Generate Order Data
function createData(id, bookId, name, pickUp, drop, amount) {
    return { id, bookId, name, pickUp, drop, amount };
}

const rows = [
    createData(1, 111, 'Shivam Chauhan', 'Gtb nagar', 'Rohini Sector-18', 40),
    createData(2, 112, 'Himank Gupta', 'Rithala', 'Rohini Sector-17', 20),
    createData(3, 113, 'Shobhit Aggarwal', 'Janak Puri', 'Manali', 400),
    createData(4, 114, 'Manik Singh', 'Prashant Vihar', 'GB Road', 50)
];

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
}));

export default function BookingDetails() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Booking Details</Title>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Seat Id</StyledTableCell>
                            <StyledTableCell>Booking Id</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>PickUp</StyledTableCell>
                            <StyledTableCell>Drop</StyledTableCell>
                            <StyledTableCell align="right">Ticket Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                <StyledTableCell>{row.bookId}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.pickUp}</StyledTableCell>
                                <StyledTableCell>{row.drop}</StyledTableCell>
                                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}