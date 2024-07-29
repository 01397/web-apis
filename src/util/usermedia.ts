let stream: MediaStream | null = null;
let constraints: MediaStreamConstraints = { video: true, audio: true };

export const setConstraints = (newConstraints: MediaStreamConstraints) => {
  constraints = newConstraints;
}

export const getStream = async (): Promise<MediaStream> => {
  if (stream === null) {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  }
  return stream;
};

export const stopStream = () => {
  if (stream !== null) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
}
