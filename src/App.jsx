import './App.css';
import { useEffect, useState, useRef } from 'react';
import { frames } from './frames';

function App() {
  const zoom_container = useRef()

  const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});
  const [ pan, setPan ] = useState({x: 0, y: 0})
  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: (event.screenX)/window.innerWidth,
        y: event.screenY/window.innerHeight,
      });

      setPan({
        x: globalCoords.x * (zoom_container.current.offsetWidth - window.innerWidth) * -1,
        y: globalCoords.y * (zoom_container.current.offsetHeight -window.innerHeight) * -1
      })

    };

    console.log(pan)

    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [globalCoords, pan]);

  return (
    <div className='full' >
    
     <div ref={zoom_container} style={{ transform: `translate(${pan.x}px, ${pan.y}px )` }}  className="container">
      {
        frames.map(data=>(
          <div key={data.id} className='frame' style={{
            width: `${data.sizes.x}%`,
            height: `${data.sizes.y}%`,
            top: `${data.position.y}%`,
            left: `${data.position.x}%`,
            background: data.bg_color,
            // opacity: data.opacity
          }} >
            {/* id: {data.id} <br />
            size: {data.sizes.x + ', '+ data.sizes.y} <br />
            position: {data.position.x + ', '+ data.position.y} */}

            <img src={data.image} alt={data.id} />
          </div>
        ))
      }
      
     </div>

     <div  className="zoom-container">
      <h3>
        Sami Rocks!

      </h3>
      </div>
    </div>


  );
}

export default App;
