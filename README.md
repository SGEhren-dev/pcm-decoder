# pcm-decoder
I created this decoder to allow me to convert data from a WAV file to raw PCM data to send to DVR's that used PCM data. 
Feel free to use it as you see fit and even build onto it! There will be more files supported in the near future.

### How to use
Getting started with this decoder is simple

```javascript
const decoder = require('pcm-decoder');

const decodedData = decoder(myBuffer).then((data) => {
    // TODO Send or modify the decoded audio data
}, (error) => {
    // TODO Handle the error accordingly
});
```

### API
Decodes `buffer` and resolves to a promise. The source currently supports *ArrayBuffer*, *ArrayBufferView*, *Buffer*, *Blob*, *File*, or *data-uri string*.

### Supported codecs
 - wav