import { useEffect, useState } from 'react'
import factsData from './facts.json'
import './App.css'

function App() {
   // history stores the indices of the facts we've seen
   const [history, setHistory] = useState<number[]>([])
   // pointer tells us which index in the 'history' array we are currently viewing
   const [pointer, setPointer] = useState(-1)

   const getRandomFact = () => {
      let randomIndex;
      
      // Prevent showing the same fact twice in a row
      do {
         randomIndex = Math.floor(Math.random() * factsData.length);
      } while (history.length > 0 && randomIndex === history[pointer]);

      // If we were 'back' in time and hit 'new', we clear the 'future' history
      const newHistory = [...history.slice(0, pointer + 1), randomIndex];
      
      setHistory(newHistory);
      setPointer(newHistory.length - 1);
   }

   const goBack = () => {
      if (pointer > 0) {
         setPointer(prev => prev - 1);
      }
   }

   useEffect(() => {
      getRandomFact();
   }, [])

   // Select the fact based on the current pointer in history
   const currentFact = factsData[history[pointer]] || "";

   return (
      <div className='container'>
         <header>
            <img src='/logo.png' alt='platypus facts logo' />
            <div>platypus facts</div>
         </header>

         <main>
            <div className='text'>{currentFact}</div>
         </main>

         <section className='buttons'>
            <button className='new' onClick={getRandomFact}>
               new fact
            </button>
            
            {/* Only show the previous button if there's actually a history to go back to */}
            {pointer > 0 && (
               <button className='previous' onClick={goBack}>
                  previous fact
               </button>
            )}
         </section>
      </div>
   )
}

export default App