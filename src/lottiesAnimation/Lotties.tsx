import { useState, useEffect } from 'react'
import Lottie from 'react-lottie'
// import Lottie from 'lottie-react'
import rain from 'src/assets/Animation.json'
import { TextRoll } from 'src/components/components/motion-primitives/text-roll';
import { MorphingText } from 'src/components/magicui/morphing-text';
import { SparklesText } from 'src/components/magicui/sparkles-text';

function Lotties() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: rain,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    const texts = ['umbrella', 'umbrellas']

    return (
      <div>
        <SparklesText text={texts[0]}/>
        <TextRoll className='flex flex-col items-center text-xl'>{texts[0]}</TextRoll>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
        // <Lottie animationData={rain} />
    )
}

export default Lotties
