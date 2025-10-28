import React from 'react';
import TaskList from '../components/TaskList';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 5 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate('/create')}
      >
        Tambah Task
      </Button>

      <TaskList />
    </Container>
  );
};

export default HomePage;
