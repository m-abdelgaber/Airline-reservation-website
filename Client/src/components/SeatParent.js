import { SearchSharp } from "@material-ui/icons";
import { Alert, Button, Typography, Modal , Fade, Backdrop } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import Notification from "./Notification";
import Seat from "./Seat";

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "80%",
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// props is flight_id and class Flight
  const SeatParent = (props) => {
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [selected, setSelected] = React.useState([]);
  const [reachedMax , setReachedMax ] = React.useState( false );
  const [seats , setSeats] = React.useState([]);
  const [index , setIndex ] = React.useState(0);

  React.useEffect( async() => {
   const flight = {
     _id : props.flightNumber 
   };
    await axios.get('http://localhost:8000/user/readFlightSeats', flight)
        .then(result => {
          console.log( result);
          setSeats(result.data);
        }).catch(err => {
           setNotify({
            isOpen: true,
            message: 'Failed to Retrieve The Seats',
            type: 'error'
        });
      });

      while (index < seats.length) {
        if ( seats[index].length == 0){
            break;
        }
        setIndex( index + 1 );
    }
    console.log(index);
    console.log(seats);
    console.log(props.flightNumber);
    console.log(props.Class);


  }, [] );


  const handleSeatReservation = () => {
    if ( selected.length < 5 ){
        setReachedMax(true);
    }
    else {
        setReachedMax(false);
        // send the Selected Array to Backend that contained The Seat Id
    }
    console.log(selected) 
  };


  // ( props.Class === 'business' )? seats.slice(0,index) : seats.slice(index+1 , seats.length)
  return (
    <>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        {...props}
        onClose= { ()=> { setSelected([]); props.close(false , selected);}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
         <Fade in={props.open}>
         <Box sx={style}>
    <div className="w-1/2">
        <div className="w-full flex justify-center my-16">
      <Seat setSelected={setSelected} maxNumber="5" seat={( props.Class === 'business' )? seats.slice(0,index) : seats.slice(index+1 , seats.length)}/>
        </div>
      <div className="">
        <div className="w-full flex justify-center"> 
        { reachedMax ? <Alert severity="error">You Haven't Chosen All The Seats!</Alert> : <></>}
        </div>
        <div className="w-full flex justify-center mt-3">
        <Button variant="contained" onClick={handleSeatReservation}> Continue </Button>
        </div>
      </div>
    </div>
    </Box>
    </Fade>
    </Modal>
    <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </>
  );
}

export default SeatParent

