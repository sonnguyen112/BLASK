import Container from '@mui/material/Container';
import * as React from 'react';

import Instruction from '../components/Instruction'
import Introduction from '../components/Introduction';
import Footer from '../components/Footer';


function Home(props) {
  return (
    <Container maxWidth='false' disableGutters>
      <Introduction/>
      <Instruction token={props.token}/>
      <Footer/>
    </Container>
    );
  };
  
  export default Home;