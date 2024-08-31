import { useState } from 'react';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function BannerDesktop() {
  const [isVisible, setIsVisible] = useState(true);

  const handleHidden = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='overflow-hidden relative'
        >
          <div className='relative isolate flex items-center gap-x-6 overflow-hidden bg-background/50 backdrop-blur-sm px-6 py-2.5 sm:px-3.5 sm:before:flex-1'>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2 h-12'>
              <p className='text-sm leading-6 text-foreground'>
                <strong className='font-semibold'>Atencion</strong>
                <svg
                  viewBox='0 0 2 2'
                  aria-hidden='true'
                  className='mx-2 inline h-0.5 w-0.5 fill-current'
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                Recuerda que es necesario la aplicacion de escritorio para poder
                ejecturar los comandos.
              </p>
              <Button
                asChild
                size={'sm'}
                className='glow rounded-full py-1.5 px-4 size-fit text-white'
              >
                <Link href='#'>
                  Descargar <span aria-hidden='true'>&rarr;</span>
                </Link>
              </Button>
            </div>
            <div className='flex flex-1 space-x-2 justify-end'>
              <Button
                variant={'ghost'}
                size={'sm'}
                className=' py-1 px-2 size-fit text-muted-foreground'
              >
                No volver a mostrar
              </Button>
              <Button
                type='button'
                variant={'ghost'}
                size={'icon'}
                onClick={handleHidden}
                className=' p-1 size-fit text-muted-foreground'
              >
                <span className='sr-only'>Dismiss</span>
                <XIcon
                  aria-hidden='true'
                  className='h-5 w-5 text-muted-foreground'
                />
              </Button>
            </div>
            <div className='absolute top-0 right-0 w-[300px] h-full bg-primary blur-[200px] pointer-events-none'></div>
            <div className='absolute top-0 left-0 w-[500px] h-full bg-primary blur-[200px] pointer-events-none'></div>
          </div>

          <div className='absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 opacity-70 glow animate-pulse'></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}