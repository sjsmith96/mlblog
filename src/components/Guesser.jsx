import { useState, useRef, useEffect } from "react";

export default function Guesser() {

  const [guess, setGuess] = useState('');
  const [canvasCtx, setCanvasCtx] = useState();
  const canvasRef = useRef();


  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvasCtx(canvas.getContext('2d'));
  }, [canvasRef])


  let drawing = false;

  async function makeGuess()
  {
    const payload = {
      image: `data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAcABwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+f+vs3T/+CV/g5vjBpPwS1P48aLov7R+qSWenN4Zl8OT3nhmw1q5vY7ZNAm1q0lnddSQSKZNtk1pFKHhe6Vkcj5e+Avxh1L9nn45eC/iBo9rpt9q/gbXbHxBY22oxNNZ3E9pcJPGkyKys0bNGAyhlJUkAjrX6Df8ABO3xx+yj8Rv+Cyvwh+Ij6p8fp9W8W/EHTtQg8H6xolpqcNlr17OghaXxA2rpdXUFvqUyT+fLY+dNHCFkRnZ2IB+ZtFFFABXt3/BM/wAY6T8O/wDgo9+z94g17UrHRtD0P4k+HdQ1HUL2ZYLaxtotUtpJZpZGIVI0RWZmJAABJ4rxGigAooooA//Z`
    }
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if(response.status == 200)
    {
      const { prediction } = await response.json();
      setGuess(prediction);
    }
    else
    {
      console.error(response.error)
    }

  }
  
  function draw(event)
  {
    if(!drawing) return;

    canvasCtx.lineWidth = 10;
    canvasCtx.lineCap = 'round'  ;
    canvasCtx.strokeStyle = 'black';

    canvasCtx.fillStyle = "red";
    //canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, 0);
    canvasCtx.lineTo(150, 150);
    canvasCtx.stroke();
  }

  return (
    <div>
      <canvas width="280" 
              height="280"
              onMouseDown={() => drawing = true}
              onMouseUp={() => drawing = false}
              onMouseMove={(e) => draw(e)}
              ref={canvasRef}
              />
      <div>
        {guess}
      </div>
      <button onClick={makeGuess}>
        Guess
      </button>
    </div>
  )
}