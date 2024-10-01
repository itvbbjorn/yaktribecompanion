import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Paper, CssBaseline, Slide } from '@mui/material';
import GangerCard from './GangerCard';
import { Ganger } from './models/Ganger';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [gangData, setGangData] = useState<Ganger[] | null>(null);
  const [gangType, setGangType] = useState<string>('');
  const [gangImage, setGangImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);

  const fetchGangData = async () => {
    try {
      const url = 'https://thingproxy.freeboard.io/fetch/' + jsonInput;
      // const url = 'https://corsproxy.io/?' + encodeURIComponent(jsonInput);
      // const url = jsonInput;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging log
      setGangData(data.gang.gangers);
      setGangType(data.gang.gang_type);
      setGangImage(data.gang.gang_image);
      console.log('Updated gangData state:', data.gang.gangers); // Debugging log

      // Start the timer after setting the gangImage
      if (data.gang.gang_image) {
        const timer = setTimeout(() => {
          setShowImage(true);
        }, 4000); // Wait for 4000ms (4 seconds)

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
      }
    } catch (error) {
      console.error('Error fetching JSON:', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Stack spacing={2}>
          {gangData && (
            <Paper elevation={3} style={{ padding: '4px' }} >
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
                placeholder='Paste yaktribe JSON URL here'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                multiline
                rows={2}
                variant="outlined"
              />
              <Button
                variant='contained'
                color='primary'
                onClick={fetchGangData}
              >
                yak me up daddy
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default App;