import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Image = {
  src: string;
  alt?: string;
  title?: string;
};

type Props = {
  items: Image[];
  className?: string;
  gridof?: boolean;
};

export function CarouselSpacing({ items, className, gridof }: Props) {
  return (
    <Carousel
      className={cn(className, 'relative w-full mx-5 max-w-full ml-0')}
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent className="ml-1 sm:px-7 justify-between gap-4">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className={`p-1 ${gridof ? 'basis-1/1 md:basis-1/2 lg:basis-1/3' : 'basis-1/3 md:basis-1/3 lg:basis-1/4'}`}
          >
            <div className="p-1">
              <Card className="rounded-xl  ">
                <CardContent className="flex aspect-3/4  items-center justify-between p-0  m-0 rounded-xl ">
                  <img
                    src={`${item.src}`}
                    alt={item.alt}
                    className="w-full rounded-xl h-full  md:h-72 lg:h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
