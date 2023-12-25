document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const captureBtn = document.getElementById('capture-btn');
  const resetBtn = document.getElementById('reset-btn');
  const saveBtn = document.getElementById('save-btn');
  const disableCameraBtn = document.getElementById('disable-camera-btn');
  const enableCameraBtn = document.getElementById('enable-camera-btn');
  const imagePreviewContainer = document.getElementById('image-preview-container');
  const cameraOffMessage = document.getElementById('camera-off-message');

  let stream;

  function startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(newStream => {
              stream = newStream;
              video.srcObject = stream;
              cameraOffMessage.style.display = 'none';
              video.style.display = 'block';
              imagePreviewContainer.style.display = 'none';
              saveBtn.style.display = 'none';
              disableCameraBtn.style.display = 'block';
              enableCameraBtn.style.display = 'none';
          })
          .catch(err => {
              console.error('Error accessing the camera:', err);
              cameraOffMessage.style.display = 'block';
              video.style.display = 'none';
              imagePreviewContainer.style.display = 'none';
              saveBtn.style.display = 'none';
              disableCameraBtn.style.display = 'none';
              enableCameraBtn.style.display = 'block';
          });
  }

  startCamera();

  captureBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width * -1, canvas.height);


      const capturedImage = new Image();
      capturedImage.src = canvas.toDataURL('image/png');
      imagePreviewContainer.innerHTML = '';
      imagePreviewContainer.appendChild(capturedImage);


      video.style.display = 'none';
      imagePreviewContainer.style.display = 'block';
      saveBtn.style.display = 'block';
  });


  saveBtn.addEventListener('click', () => {
      const capturedImage = imagePreviewContainer.querySelector('img');

      const downloadLink = document.createElement('a');
      downloadLink.href = capturedImage.src;
      downloadLink.download = 'captured_image.png';
      document.body.appendChild(downloadLink);

      downloadLink.click();
      document.body.removeChild(downloadLink);
  });


  disableCameraBtn.addEventListener('click', () => {
      if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          video.srcObject = null;
          video.style.display = 'none';
          imagePreviewContainer.style.display = 'none';
          saveBtn.style.display = 'none';
          disableCameraBtn.style.display = 'none';
          enableCameraBtn.style.display = 'block';
          cameraOffMessage.style.display = 'block';
      }
  });

  enableCameraBtn.addEventListener('click', () => {
      startCamera();
  });

  resetBtn.addEventListener('click', () => {
      if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
      }


      imagePreviewContainer.innerHTML = '';

      saveBtn.style.display = 'none';
      video.style.display = 'block';
      imagePreviewContainer.style.display = 'none';
      cameraOffMessage.style.display = 'none';
      disableCameraBtn.style.display = 'block';
      enableCameraBtn.style.display = 'none';

      startCamera();
  });
});