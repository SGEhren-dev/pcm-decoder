# pcm-decoder [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
I created this decoder to allow me to convert data from a WAV file to raw PCM data to send to DVR's that used PCM data. 
Feel free to use it as you see fit and even build onto it! There will be more files supported in the near future.

### How to use
Getting started with this decoder is simple

```javascript
const decoder = require('pcm-decoder');

const decodedData = decoder(buffer).then((data) => {
    // TODO Send or modify the decoded audio data
}, (error) => {
    // TODO Handle the error accordingly
});
```

### React Example
```typescript
/* React imports ... */
import { decoder } from 'pcm-decoder';

export default decodeAudio = () => {
    const [ recorder, setRecorder ] = useState(null);
    const [ recording, setRecording ] = useState(false);

    const handleCapture = (event) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(event.data);

        // This is extremely important so you are not getting null data
        reader.onloadend = () => {
            decoder(reader.result as ArrayBuffer).then((buffer) => {
                // Handle converted data as you would like
            }, (error) => {
                console.log(`Failed to decode with error ${ error }.`);
            });
        }
    }

    const handleRecording = () => {
        if (recording) {
            return;
        }

        setRecording(true);

        navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 8000 } })
            .then((stream: MediaStream) => {
                console.log("Media Stream Established");

                setRecorder(new MediaRecorder(stream));
                recorder.ondataavailable = handleCapture;
                recorder.start(1000);                       // 1 second intervals
            });
    };

    return {
        // UI code will go here to trigger recording (button with onClick to trigger handleRecording)
    }
};

```

### API
Decodes `buffer` and resolves to a promise. The source currently supports *ArrayBuffer*, *ArrayBufferView*, *Buffer*, *Blob*, *File*, or *data-uri string*.

### Supported codecs
 - wav

### Contributors
SGEhren-dev (Creator)

### License
MIT