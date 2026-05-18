import { cn } from '@/lib/utils';

type ImageWithWrappedTextProps = {
  children?: React.ReactNode;
  ImageClassName?: string;
  imgUrl?: string;
  dropCap?: boolean;
};

export function ImageWithWrappedText({
  children,
  ImageClassName,
  imgUrl,
  dropCap = false,
}: ImageWithWrappedTextProps) {
  return (
    <div className="text-primary mt-10 md:mt-5 lg:w-[90%] lg:mx-auto">
      <img
        src={imgUrl || './sobre/SobreMim4.jpeg'}
        alt="Imagem"
        className={cn(
          'float-left mr-4 mb-2 w-[45%] sm:w-[40%] lg:w-[30%] md:ml-15 h-auto object-cover rounded-xl max-w-100',
          ImageClassName,
        )}
      />

      {/* div em vez de p — p não pode conter elementos block */}
      <div
        className={cn(
          'type-body leading-relaxed',
          dropCap &&
            'first-letter:float-left first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.75] first-letter:mr-2 first-letter:mt-1 first-letter:font-light first-letter:text-primary',
        )}
      >
        {children}
      </div>

      <div className="clear-both" />
    </div>
  );
}
