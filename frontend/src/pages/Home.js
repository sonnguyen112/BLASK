import Container from '@mui/material/Container';
import * as React from 'react';

import Instruction from '../components/Instruction'
import Introduction from '../components/Introduction';


function Home() {
  return (
    <>
    <Container maxWidth='false' disableGutters>
      <Introduction/>
      <Instruction/>
    </Container>
    </>
    );
  };
  
  export default Home;