import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
export const Hero = () => {
  return (
    <section className="">
      <div className="mt-32">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full overflow-hidden bg-slate-400"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
                  <img src="http://localhost:5173/img1.png" alt="hero" />
                  <div>
                    <div className="flex-1">
                      <h1 className="text-4xl font-semibold">
                        Welcome to our website {index + 1}
                      </h1>
                      <p className="text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin vehicula, nisl nec vehicula.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

// export const Hero = () => {
//   return (
//     <Carousel className="w-full max-w-xs">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-4xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// };
