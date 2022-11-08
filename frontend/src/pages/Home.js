import Container from '@mui/material/Container';
import * as React from 'react';

import Instruction from '../components/Instruction'
import Introduction from '../components/Introduction';
import Footer from '../components/Footer';


function Home() {
  return (
    <Container maxWidth='false' disableGutters>
      <Introduction/>
      <Instruction/>
      <Footer/>
    </Container>
    );
  };
  
  export default Home;