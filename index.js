/**
 * Audio to RAW PCM decoder
 * 
 * @module decode
 */

'use strict'

const getType = require('audio-type');
const Decoder = require('wav-decoder');
const createBuffer = require('audio-buffer-from');
const toArrayBuffer = require('to-array-buffer');
const toBuffer = require('typedarray-to-buffer');
const isBuffer = require('is-buffer');
const AV = require('av');
const { Asset } = require('av');

module.exports = function decode(buffer) {

    if (!isBuffer(buffer)) {
        if (ArrayBuffer.isView(buffer)) {
            buffer = toBuffer(buffer);
        }
        else {
            buffer = Buffer.from(toArrayBuffer(buffer));
        }
    }

    const type = getType(buffer);

    if (!type || type !== 'wav') {
        let err = Error('Audio is not in .wav format!');
        return Promise.reject(err);
    }

    if (type === 'wav') {
        return Decoder.decode(buffer).then((audioData) => {
            const audBuffer = createBuffer(audioData.channelData, {
                channels: audioData.numberOfChannels,
                sampleRate: audioData.sampleRate
            });
            return Promise.resolve(audBuffer);
        }, (error) => {
            return Promise.reject(err);
        });
    }

    return new Promise((resolve, reject) => {
        const audio = AV.Asset.fromBuffer(buffer);

        audio.on('error', (error) => {
            reject(err);
        });

        audio.decodeToBuffer((buffer) => {
            const data = createBuffer(buffer, {
                channels: audio.format.channelsPerFrame,
                sampleRate: audio.format.sampleRate
            });

            resolve(data);
        });
    });
};