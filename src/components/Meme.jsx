import React, { useEffect, useRef, useState } from 'react'
import { FiDownload } from 'react-icons/fi';

const Meme = () => {

    const [memesArr, setMemesArr] = useState([]);
    const [meme, setMeme] = useState({
        text:[],
        randomImg:"https://i.imgflip.com/1g8my4.jpg",
        boxCount:2   //default for 2 box
    })

    const canvasRef = useRef(null);
    const downloadLinkRef = useRef(null);

    const handleChange = (e,idx)=>{
        const {value} = e.target
        setMeme((prev)=>{
            const updatdText = [...prev.text];
            updatdText[idx] = value;
            return{
                ...prev, text:updatdText
            }
        })
    }

    const fetchMemes = async()=>{
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json();
        console.log(data.data.memes);
        setMemesArr(data.data.memes);
    }

    const handleGetMeme = ()=>{
        const randomIdx = Math.floor(Math.random() * memesArr.length);
        const randomMeme = memesArr[randomIdx];

        setMeme((prev)=>({
            ...prev,
            randomImg:randomMeme.url,
            boxCount:randomMeme.box_count,
            text: Array(randomMeme.box_count).fill("")
        })
        )
    }

    useEffect(()=>{
        fetchMemes();
    },[])


    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = meme.randomImg;

        image.onload = ()=>{
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image,0,0);

            // Adjust font size dynamically based on image height
            const fontSize = Math.round(canvas.height * 0.05); // 5% of image height
            ctx.font = `${fontSize}px Impact`;
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4; // Thicker outline for better contrast
            ctx.textAlign = "center";
            

             // Adjust positions based on the number of text boxes (boxCount)
            const totalHeight = canvas.height;
            const topTextY = fontSize + 10; // Adjust the top position relative to font size
            const bottomTextY = totalHeight - 20; // Adjust the bottom text to not be too close to the edge
            const middleTextY = totalHeight / 2; // Centered text for 3-box layouts

            meme.text.forEach((text, index) => {
                let yPos;
                // Handle positions for 2 boxes (top and bottom)
                if (meme.boxCount === 2) {
                    yPos = index === 0 ? topTextY : bottomTextY;
                } 
                // Handle positions for 3 boxes (top, middle, bottom)
                else if (meme.boxCount === 3) {
                    yPos = index === 0 ? topTextY : index === 1 ? middleTextY : bottomTextY;
                } 
                // For more boxes, evenly distribute text positions
                else {
                    const spacing = totalHeight / (meme.boxCount + 1);
                    yPos = spacing * (index + 1);
                }
    
                ctx.fillText(text, canvas.width / 2, yPos);
                ctx.strokeText(text, canvas.width / 2, yPos);
            });

            // Generate download link
            downloadLinkRef.current.href = canvas.toDataURL("image/png");
        }
    },[meme])

  return (
    <main className='p-8'>
        <section className='form grid gap-4'>
            {
                Array(meme.boxCount).fill(null).map((e,i)=>(
                    <div className='flex flex-col'>
                        <label className='font-semibold text-lg'>
                            Text Box {i+1}
                        </label>
                        <input
                           type='text'
                           value={meme.text[i] ||null}
                           onChange={(e)=>handleChange(e,i)}
                           placeholder='Enter text'
                           className='border border-gray-300 rounded-lg p-2'
                        />
                    </div>
                ))
            }

            <button
            onClick={handleGetMeme}
               className='bg-green-500 mt-4 text-white rounded-lg px-4 py-2 hover:bg-green-600'
            >
               Get a new meme image 🖼️
            </button>
        </section>

        <section className='mt-8 relative'>
            <canvas ref={canvasRef} className='hidden'></canvas>
            <img src={meme.randomImg} alt="Meme" className='w-full h-85 object-cover rounded-lg shadow-lg' />

            {
                meme.text.map((text,idx)=>{
                    let textPos;
                    // Handling the top, middle, and bottom text positions
                    if(meme.boxCount === 2){
                        textPos = idx === 0 ? 'top-0' : 'bottom-0'
                    }else if(meme.boxCount === 3){
                        textPos = idx === 0 ? 'top-0' : idx === 1 ? 'top-1/2 -translate-y-1/2' : 'bottom-0'
                    }else{
                        textPos = `top-[${(idx + 1) * (100 / (meme.boxCount + 1))}%] -translate-y-1/2`
                    }
                    return(
                        <h2
                          className={`absolute w-full text-center text-white uppercase text-2xl tracking-wide bg-black bg-opacity-50 p-2 ${textPos}`}
                        >{text}
                        </h2>
                    )
                })
            }
        </section>
        <a 
           ref={downloadLinkRef}
           download="meme.png"
           className='flex items-center justify-center mt-6 w-full bg-green-500 text-white py-2 px-4 rounded-lg text-center hover:bg-green-600'
        >
            <FiDownload className="mr-2 text-lg" />  
            Download Meme
        </a>
    </main>
  )
}

export default Meme;
