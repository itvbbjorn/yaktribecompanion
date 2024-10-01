import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Paper, CssBaseline, Slide, CircularProgress, Snackbar, Typography, Alert } from '@mui/material';
import GangerCard from './GangerCard';
import { Ganger } from './models/Ganger';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [jsonUrlInput, setJsonInput] = useState('');
  const [rawJsonInput, setRawJsonInput] = useState('')
  const [gangData, setGangData] = useState<Ganger[] | null>(null);
  const [gangType, setGangType] = useState<string>('');
  const [gangImage, setGangImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGangData = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const url = 'https://corsproxy.io/?' + encodeURIComponent(jsonUrlInput);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGangData(data.gang.gangers);
      setGangType(data.gang.gang_type);
      setGangImage(data.gang.gang_image);
  
      if (data.gang.gang_image) {
        const timer = setTimeout(() => {
          setShowImage(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    } catch (error: unknown) { // Explicitly typing error as unknown
      if (error instanceof Error) {
        console.error('Error fetching JSON:', error);
        setError(error.message); // Set error message to state
      } else {
        console.error('Unknown error:', error);
        setError('An unknown error occurred'); // Fallback for unknown errors
      }
    } finally {
      setLoading(false); // Stop loading state
    }
  };
  
  const fetchGangDataFromJson = () => {
    setError(null);
    try {
      const data = JSON.parse(rawJsonInput);
      setGangData(data.gang.gangers);
      setGangType(data.gang.gang_type);
      setGangImage(data.gang.gang_image);
    } catch (error: unknown) { // Explicitly typing error as unknown
      if (error instanceof Error) {
        console.error('Error parsing JSON:', error);
        setError('Invalid JSON input'); // Set error message for invalid JSON
      } else {
        console.error('Unknown error while parsing JSON:', error);
        setError('An unknown error occurred'); // Fallback for unknown errors
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Stack spacing={2}>
        {error && (
          <Alert
            severity='error'
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
          {gangData && (
            <Paper elevation={3} style={{ padding: '4px' }}>
              {showImage && gangImage ? <img src={gangImage} alt='gang' style={{ width: '100%' }} /> : null}
              {gangData.map((ganger: Ganger, index: number) => (
                <Slide
                  in={true}
                  direction="up"
                  style={{ transformOrigin: '0 0 0' }}
                  {...(true ? { timeout: 1000 * (index + 1) } : {})}
                  key={ganger.ganger_id}
                >
                  <div>
                    <GangerCard ganger={ganger} gangType={gangType} />
                  </div>
                </Slide>
              ))}
            </Paper>
          )}
          <Paper elevation={3} style={{ padding: '4px', marginTop: '8px' }}>
            <Stack spacing={2}>
              <TextField
                placeholder='Paste yaktribe gang JSON here'
                value={rawJsonInput}
                onChange={(e) => setRawJsonInput(e.target.value)}
                multiline
                rows={4}
                variant='outlined'
              />
              <Button
                variant='contained'
                color='primary'
                onClick={fetchGangDataFromJson}
              >
                do it
              </Button>
              <Typography variant='caption' color='warning'>
                WARNING: Pasting the Url below may result in outdated gang information. Pasting the full JSON above is recommended.
              </Typography>
              <TextField
                placeholder='Paste yaktribe JSON URL here'
                value={jsonUrlInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={1}
                variant="outlined"
              />
              <Button
                variant='contained'
                color='primary'
                onClick={fetchGangData}
              >
                { loading? <CircularProgress></CircularProgress> : 'yak me up daddy'}
              </Button>
            </Stack>
          </Paper>
        </Stack>
        
      </div>
    </ThemeProvider>
  );
}

export default App;