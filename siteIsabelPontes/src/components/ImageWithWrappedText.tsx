type ImageWithWrappedTextProps = {
  children?: React.ReactNode;
  ImageClassName?: string;
  imgUrl?: string;
};

export function ImageWithWrappedText({
  children,
  ImageClassName,
  imgUrl,
}: ImageWithWrappedTextProps) {
  return (
    <div className="text-primary mt-10 md:mt-5 lg:w-[90%] lg:mx-auto m-0 p-0">
      <img
        src={imgUrl || './sobre/SobreMim4.jpeg'}
        alt="Imagem"
        className={`float-left mr-4 mb-2 w-[45%] sm:w-[40%]  lg:w-[30%] md:ml-15  h-auto object-cover rounded-xl max-w-100 ${ImageClassName}`}
      />

      <p className=" text-sm sm:text-xl   leading-relaxed tracking-[0.02em]">
        <div className=" ">{children}</div>
      </p>

      {/* opcional: “limpa” o float pra garantir que nada depois fique do lado */}
      <div className="clear-both" />
    </div>
  );
}
